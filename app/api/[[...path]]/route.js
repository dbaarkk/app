import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

// MongoDB connection
let client
let db

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db('minute_savoir')
  }
  return db
}

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'minute-savoir-secret-key'

// Helper function to verify JWT token
async function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

// Auth Routes
async function handleAuth(request, path) {
  const db = await connectToDatabase()
  
  if (path === 'signup' && request.method === 'POST') {
    try {
      const body = await request.json()
      const { name, email, password, bio, teachingSkills, learningSkills, credits } = body

      // Check if user already exists
      const existingUser = await db.collection('users').findOne({ email })
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const userId = uuidv4()
      const user = {
        id: userId,
        name,
        email,
        password: hashedPassword,
        bio: bio || '',
        teachingSkills: teachingSkills || [],
        learningSkills: learningSkills || [],
        credits: credits || 10,
        rating: 0,
        totalSessions: 0,
        avatar: `/api/placeholder/100/100`,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('users').insertOne(user)

      // Generate JWT token
      const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' })

      // Remove password from response
      const { password: _, ...userResponse } = user

      return NextResponse.json({
        success: true,
        user: userResponse,
        token
      })
    } catch (error) {
      console.error('Signup error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  if (path === 'login' && request.method === 'POST') {
    try {
      const { email, password } = await request.json()

      // Find user
      const user = await db.collection('users').findOne({ email })
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' })

      // Remove password from response
      const { password: _, ...userResponse } = user

      return NextResponse.json({
        success: true,
        user: userResponse,
        token
      })
    } catch (error) {
      console.error('Login error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Route not found' }, { status: 404 })
}

// Users Routes
async function handleUsers(request, pathSegments) {
  const db = await connectToDatabase()
  
  console.log('handleUsers - method:', request.method)
  console.log('handleUsers - pathSegments:', pathSegments)
  
  if (request.method === 'GET') {
    try {
      // Get all users (excluding passwords)
      const users = await db.collection('users')
        .find({}, { projection: { password: 0 } })
        .toArray()
      
      return NextResponse.json({ success: true, users })
    } catch (error) {
      console.error('Get users error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  if (request.method === 'PUT' && pathSegments[0]) {
    try {
      const userId = pathSegments[0]
      const updates = await request.json()
      
      // Verify token
      const tokenData = await verifyToken(request)
      if (!tokenData || tokenData.userId !== userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // Update user
      const result = await db.collection('users').updateOne(
        { id: userId },
        { 
          $set: { 
            ...updates, 
            updatedAt: new Date() 
          } 
        }
      )

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      // Get updated user
      const updatedUser = await db.collection('users')
        .findOne({ id: userId }, { projection: { password: 0 } })

      return NextResponse.json({ success: true, user: updatedUser })
    } catch (error) {
      console.error('Update user error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Route not found' }, { status: 404 })
}

// Sessions Routes
async function handleSessions(request, pathSegments) {
  const db = await connectToDatabase()
  
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      const { teacherId, learnerId, skill, scheduledFor, meetingUrl } = body

      // Verify token
      const tokenData = await verifyToken(request)
      if (!tokenData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // Create session
      const sessionId = uuidv4()
      const session = {
        id: sessionId,
        teacherId,
        learnerId,
        skill,
        status: 'scheduled',
        scheduledFor: new Date(scheduledFor),
        meetingUrl: meetingUrl || '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('sessions').insertOne(session)

      return NextResponse.json({ success: true, session })
    } catch (error) {
      console.error('Create session error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  if (request.method === 'GET') {
    try {
      // Get user sessions
      const tokenData = await verifyToken(request)
      if (!tokenData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const sessions = await db.collection('sessions')
        .find({
          $or: [
            { teacherId: tokenData.userId },
            { learnerId: tokenData.userId }
          ]
        })
        .toArray()

      return NextResponse.json({ success: true, sessions })
    } catch (error) {
      console.error('Get sessions error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  if (request.method === 'PUT' && pathSegments[0]) {
    try {
      const sessionId = pathSegments[0]
      const updates = await request.json()
      
      // Verify token
      const tokenData = await verifyToken(request)
      if (!tokenData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // Update session
      const result = await db.collection('sessions').updateOne(
        { id: sessionId },
        { 
          $set: { 
            ...updates, 
            updatedAt: new Date() 
          } 
        }
      )

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      // Get updated session
      const updatedSession = await db.collection('sessions').findOne({ id: sessionId })

      // If session is completed, handle credit transfer
      if (updates.completed && updates.status === 'completed') {
        await handleSessionCompletion(db, sessionId)
      }

      return NextResponse.json({ success: true, session: updatedSession })
    } catch (error) {
      console.error('Update session error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Route not found' }, { status: 404 })
}

// Handle credit transfer when session is completed
async function handleSessionCompletion(db, sessionId) {
  try {
    const session = await db.collection('sessions').findOne({ id: sessionId })
    if (!session || session.status !== 'completed') return

    // Give 1 credit to teacher, deduct 1 credit from learner
    await db.collection('users').updateOne(
      { id: session.teacherId },
      { 
        $inc: { credits: 1, totalSessions: 1 },
        $set: { updatedAt: new Date() }
      }
    )

    await db.collection('users').updateOne(
      { id: session.learnerId },
      { 
        $inc: { credits: -1 },
        $set: { updatedAt: new Date() }
      }
    )
  } catch (error) {
    console.error('Session completion error:', error)
  }
}

// Skills Routes
async function handleSkills(request, pathSegments) {
  const db = await connectToDatabase()
  
  if (request.method === 'GET') {
    try {
      // Get all unique skills from users
      const users = await db.collection('users').find({}).toArray()
      const allSkills = new Set()
      
      users.forEach(user => {
        if (user.teachingSkills) {
          user.teachingSkills.forEach(skill => allSkills.add(skill))
        }
        if (user.learningSkills) {
          user.learningSkills.forEach(skill => allSkills.add(skill))
        }
      })

      const skills = Array.from(allSkills).sort()
      return NextResponse.json({ success: true, skills })
    } catch (error) {
      console.error('Get skills error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Route not found' }, { status: 404 })
}

// Main handler
export async function GET(request) {
  return handleRequest(request)
}

export async function POST(request) {
  return handleRequest(request)
}

export async function PUT(request) {
  return handleRequest(request)
}

export async function DELETE(request) {
  return handleRequest(request)
}

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    const pathSegments = url.pathname.split('/').filter(segment => segment && segment !== 'api')
    
    if (pathSegments.length === 0) {
      return NextResponse.json({ 
        message: 'Minute Savoir API',
        version: '1.0.0',
        endpoints: {
          auth: '/api/auth/{login,signup}',
          users: '/api/users',
          sessions: '/api/sessions', 
          skills: '/api/skills'
        }
      })
    }

    const [resource, ...remainingSegments] = pathSegments

    switch (resource) {
      case 'auth':
        return await handleAuth(request, remainingSegments[0])
      case 'users':
        return await handleUsers(request, remainingSegments)
      case 'sessions':
        return await handleSessions(request, remainingSegments)
      case 'skills':
        return await handleSkills(request, remainingSegments)
      default:
        return NextResponse.json({ error: 'Route not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}