'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  Zap, 
  BookOpen, 
  Calendar,
  Trophy,
  MessageSquare,
  Bell,
  Plus,
  Filter,
  MapPin,
  Video,
  Send,
  Menu,
  X,
  ChevronDown,
  User,
  CreditCard,
  Settings,
  LogOut,
  Target,
  TrendingUp,
  Award,
  Gift
} from 'lucide-react'

export default function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState({ teaching: [], learning: [] })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sample data - in real app this would come from database
  const [users] = useState([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: '/api/placeholder/100/100',
      bio: 'Full-stack developer with 5 years experience',
      rating: 4.9,
      totalSessions: 47,
      teachingSkills: ['JavaScript', 'React', 'Node.js'],
      learningSkills: ['Machine Learning', 'UI Design'],
      credits: 15,
      availability: ['Monday 9-12', 'Wednesday 14-17', 'Friday 10-13']
    },
    {
      id: '2', 
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      avatar: '/api/placeholder/100/100',
      bio: 'Graphic designer and digital artist',
      rating: 4.8,
      totalSessions: 32,
      teachingSkills: ['Photoshop', 'UI Design', 'Illustration'],
      learningSkills: ['Photography', 'Video Editing'],
      credits: 8,
      availability: ['Tuesday 10-13', 'Thursday 15-18', 'Saturday 9-12']
    }
  ])

  const [sessions] = useState([
    {
      id: '1',
      teacherId: '2',
      learnerId: '1', 
      skill: 'UI Design',
      status: 'upcoming',
      scheduledFor: '2025-01-15T14:00:00Z',
      meetingUrl: '',
      completed: false
    }
  ])

  const skillCategories = [
    'Technology', 'Design', 'Business', 'Language', 'Music', 
    'Cooking', 'Sports', 'Art', 'Writing', 'Photography'
  ]

  const popularSkills = [
    'JavaScript', 'Python', 'UI Design', 'Photography', 'Guitar',
    'Spanish', 'Cooking', 'Writing', 'Marketing', 'Excel'
  ]

  // Auth functions
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setUser(data.user)
        setCurrentView('dashboard')
        setIsLoginOpen(false)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleSignup = async (userData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      if (response.ok) {
        setUser(data.user)
        setCurrentView('dashboard')
        setIsSignupOpen(false)
      }
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('landing')
  }

  // Navigation Component
  const Navigation = () => (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6">
          <button 
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <Zap className="h-6 w-6 text-blue-600" />
            <span>Minute Savoir</span>
          </button>
        </div>

        {user && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'dashboard' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('marketplace')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'marketplace' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => setCurrentView('scheduling')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'scheduling' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Sessions
              </button>
              <button 
                onClick={() => setCurrentView('profile')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'profile' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setCurrentView('credits')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'credits' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Credits
              </button>
              <button 
                onClick={() => setCurrentView('help')}
                className={`transition-colors hover:text-foreground/80 ${currentView === 'help' ? 'text-foreground' : 'text-foreground/60'}`}
              >
                Help
              </button>
              
              {/* More Options Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                  className="flex items-center space-x-1 transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isMoreOptionsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
                    <button 
                      onClick={() => { setCurrentView('discovery'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Skill Discovery
                    </button>
                    <button 
                      onClick={() => { setCurrentView('history'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Session History
                    </button>
                    <button 
                      onClick={() => { setCurrentView('resources'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Resource Library
                    </button>
                    <button 
                      onClick={() => { setCurrentView('challenges'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Challenges
                    </button>
                    <button 
                      onClick={() => { setCurrentView('feedback'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Feedback
                    </button>
                    <button 
                      onClick={() => { setCurrentView('mentorship'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Mentorship
                    </button>
                    <button 
                      onClick={() => { setCurrentView('notifications'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    >
                      Notifications
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            <div className="hidden md:flex ml-auto items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">{user?.credits || 0}</span>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <button 
                onClick={handleLogout}
                className="text-sm text-foreground/60 hover:text-foreground/80"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {!user && (
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>
              Sign In
            </Button>
            <Button onClick={() => setIsSignupOpen(true)}>
              Get Started
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false) }}>Dashboard</button>
            <button onClick={() => { setCurrentView('marketplace'); setIsMobileMenuOpen(false) }}>Marketplace</button>
            <button onClick={() => { setCurrentView('scheduling'); setIsMobileMenuOpen(false) }}>Sessions</button>
            <button onClick={() => { setCurrentView('profile'); setIsMobileMenuOpen(false) }}>Profile</button>
            <button onClick={() => { setCurrentView('credits'); setIsMobileMenuOpen(false) }}>Credits</button>
            <button onClick={() => { setCurrentView('help'); setIsMobileMenuOpen(false) }}>Help</button>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Learn any skill in{' '}
                <span className="text-blue-600">1 hour</span>
                {' '}— for free
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Trade skills with our community. Teach what you know, learn what you need. 
                Fair exchange, real connections, instant learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => setIsSignupOpen(true)}
                >
                  Start Learning Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => setCurrentView('marketplace')}
                >
                  Browse Skills
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1618544976420-1f213fcf2052?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxza2lsbCUyMGxlYXJuaW5nJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Ymx1ZXwxNzU4OTcxMzMxfDA&ixlib=rb-4.1.0&q=85"
                alt="People collaborating and learning skills"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How Minute Savoir Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, fair skill exchange in three easy steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>1. Share Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  List skills you can teach and skills you want to learn. 
                  Build your profile and connect with the community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>2. Book Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find teachers for skills you want to learn. Schedule 1-hour sessions 
                  that work for both of you.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>3. Learn & Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn credits by teaching, spend credits learning. 
                  Fair exchange keeps the community balanced.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground">Real stories from skill traders</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1758525860449-fa3602fceb31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx0ZWFjaGluZyUyMG1lbnRvcmluZ3xlbnwwfHx8fDE3NTg5NzE0MDF8MA&ixlib=rb-4.1.0&q=85" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Learned Figma in one hour from Marcus. Now I can create my own designs! 
                  The credit system is brilliant - taught JavaScript to earn credits."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1758270704286-83476deb3bd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzU4OTcxNDA3fDA&ixlib=rb-4.1.0&q=85" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Marcus Rodriguez</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Amazing platform! I've taught design to 30+ people and learned photography, 
                  guitar, and cooking. Community is incredibly supportive."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.pexels.com/photos/9158364/pexels-photo-9158364.jpeg" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex Liu</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The gamification keeps me motivated. Earned my 'Top Teacher' badge 
                  and made genuine connections while learning valuable skills."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Skill Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers sharing knowledge every day
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => setIsSignupOpen(true)}
          >
            Join Minute Savoir Today
          </Button>
        </div>
      </section>
    </div>
  )

  // Dashboard Component
  const Dashboard = () => (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Your skill-sharing journey continues</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold">{user?.credits || 0}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sessions Taught</p>
                <p className="text-2xl font-bold">{user?.totalSessions || 0}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold">{user?.rating || 0}</p>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Skills Offered</p>
                <p className="text-2xl font-bold">{user?.teachingSkills?.length || 0}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Teaching Skills</CardTitle>
            <CardDescription>Skills you offer to teach others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {user?.teachingSkills?.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              )) || <p className="text-muted-foreground">No teaching skills added yet</p>}
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills You Want to Learn</CardTitle>
            <CardDescription>Skills you're looking to acquire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {user?.learningSkills?.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              )) || <p className="text-muted-foreground">No learning goals added yet</p>}
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Learning Goal
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled learning and teaching sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.filter(s => s.status === 'upcoming').length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming sessions</p>
              <Button 
                className="mt-4" 
                onClick={() => setCurrentView('marketplace')}
              >
                Find Skills to Learn
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions
                .filter(s => s.status === 'upcoming')
                .map(session => {
                  const teacher = users.find(u => u.id === session.teacherId)
                  return (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={teacher?.avatar} />
                          <AvatarFallback>{teacher?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{session.skill} with {teacher?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.scheduledFor).toLocaleDateString()} at {new Date(session.scheduledFor).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Session
                      </Button>
                    </div>
                  )
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  // Marketplace Component
  const Marketplace = () => {
    const filteredUsers = users.filter(u => {
      const matchesSearch = !searchQuery || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.teachingSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || 
        u.teachingSkills.some(skill => 
          skillCategories.includes(selectedCategory) && 
          skill.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      
      return matchesSearch && matchesCategory
    })

    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skill Marketplace</h1>
          <p className="text-muted-foreground">Discover amazing teachers and learn new skills</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search skills or teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => setSearchQuery(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(teacher => (
            <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                      <span className="text-sm text-muted-foreground">({teacher.totalSessions} sessions)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{teacher.bio}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Teaches:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.teachingSkills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    {teacher.teachingSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{teacher.teachingSkills.length - 3} more</Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentView('profile')}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setCurrentView('scheduling')}
                  >
                    Request Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teachers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    )
  }

  // Login/Signup Dialogs
  const LoginDialog = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      handleLogin(email, password)
    }

    return (
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>Sign in to your Minute Savoir account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  const SignupDialog = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      bio: '',
      teachingSkills: [],
      learningSkills: []
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      handleSignup({ ...formData, credits: 10 })
    }

    const addSkill = (type, skill) => {
      if (skill && !formData[type].includes(skill)) {
        setFormData(prev => ({
          ...prev,
          [type]: [...prev[type], skill]
        }))
      }
    }

    const removeSkill = (type, skillToRemove) => {
      setFormData(prev => ({
        ...prev,
        [type]: prev[type].filter(skill => skill !== skillToRemove)
      }))
    }

    return (
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Join Minute Savoir</DialogTitle>
            <DialogDescription>Create your account and start skill sharing</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
              />
            </div>
            
            <div>
              <Label>Skills You Can Teach</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.teachingSkills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('teachingSkills', skill)}
                      className="ml-2 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you can teach..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill('teachingSkills', e.target.value.trim())
                      e.target.value = ''
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <Label>Skills You Want to Learn</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.learningSkills.map(skill => (
                  <Badge key={skill} variant="outline">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('learningSkills', skill)}
                      className="ml-2 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you want to learn..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill('learningSkills', e.target.value.trim())
                      e.target.value = ''
                    }
                  }}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  // Render current view
  const renderCurrentView = () => {
    if (!user) return <LandingPage />

    switch (currentView) {
      case 'dashboard': return <Dashboard />
      case 'marketplace': return <Marketplace />
      case 'scheduling': return <div className="container py-8"><h1 className="text-3xl font-bold">Session Scheduling</h1><p className="text-muted-foreground">Schedule and manage your learning sessions</p></div>
      case 'profile': return <div className="container py-8"><h1 className="text-3xl font-bold">Your Profile</h1><p className="text-muted-foreground">Manage your profile and reputation</p></div>
      case 'credits': return <div className="container py-8"><h1 className="text-3xl font-bold">Credits & Gamification</h1><p className="text-muted-foreground">Track your credits, badges, and achievements</p></div>
      case 'help': return <div className="container py-8"><h1 className="text-3xl font-bold">Help & FAQ</h1><p className="text-muted-foreground">Get help and find answers to common questions</p></div>
      case 'discovery': return <div className="container py-8"><h1 className="text-3xl font-bold">Skill Discovery</h1><p className="text-muted-foreground">Discover new skills and get personalized recommendations</p></div>
      case 'history': return <div className="container py-8"><h1 className="text-3xl font-bold">Session History</h1><p className="text-muted-foreground">View your learning and teaching history with analytics</p></div>
      case 'resources': return <div className="container py-8"><h1 className="text-3xl font-bold">Resource Library</h1><p className="text-muted-foreground">Access learning materials and resources</p></div>
      case 'challenges': return <div className="container py-8"><h1 className="text-3xl font-bold">Challenges & Streaks</h1><p className="text-muted-foreground">Take on learning challenges and build streaks</p></div>
      case 'feedback': return <div className="container py-8"><h1 className="text-3xl font-bold">Feedback & Suggestions</h1><p className="text-muted-foreground">Share feedback and suggest new features</p></div>
      case 'mentorship': return <div className="container py-8"><h1 className="text-3xl font-bold">Mentorship & Groups</h1><p className="text-muted-foreground">Join mentorship programs and group learning sessions</p></div>
      case 'notifications': return <div className="container py-8"><h1 className="text-3xl font-bold">Notifications</h1><p className="text-muted-foreground">Manage your notifications and messages</p></div>
      default: return <LandingPage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderCurrentView()}
      <LoginDialog />
      <SignupDialog />
    </div>
  )
}