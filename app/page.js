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
  Gift,
  Play,
  Pause,
  Timer
} from 'lucide-react'

export default function App() {
  const [currentView, setCurrentView] = useState('welcome')
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState({ teaching: [], learning: [] })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [welcomeStep, setWelcomeStep] = useState(0)

  // Welcome animation sequence
  useEffect(() => {
    if (currentView === 'welcome') {
      const steps = [
        { step: 1, delay: 0 },     // Stars appear
        { step: 2, delay: 2000 },  // Laptop enters
        { step: 3, delay: 3500 },  // Text appears
        { step: 4, delay: 5500 },  // Portal opens
        { step: 5, delay: 6500 }   // Transition to landing
      ]

      steps.forEach(({ step, delay }) => {
        setTimeout(() => {
          setWelcomeStep(step)
          if (step === 5) {
            setTimeout(() => setCurrentView('landing'), 500)
          }
        }, delay)
      })
    }
  }, [currentView])

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

  // Welcome Animation Component
  const WelcomeAnimation = () => (
    <div className="fixed inset-0 bg-black overflow-hidden welcome-animation">
      {/* Animated stars background */}
      {welcomeStep >= 1 && (
        <div className="absolute inset-0 stars-appear">
          <div className="stars-bg opacity-60 w-full h-full"></div>
          {/* Additional floating stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full floating"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* 3D Laptop Animation */}
      {welcomeStep >= 2 && (
        <div className="absolute inset-0 flex items-center justify-center laptop-enters">
          <div className="laptop-3d relative">
            <div className="w-64 h-40 bg-gray-800 rounded-t-lg border-2 border-cyan-500/50 glow">
              {/* Laptop screen */}
              <div className="w-full h-full bg-black rounded-t-lg flex items-center justify-center relative overflow-hidden">
                {welcomeStep >= 3 && (
                  <div className="text-appears text-center px-4">
                    <p className="text-cyan-400 text-lg font-semibold gradient-text">
                      Exchange skills and learn for free with Troq
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Laptop base */}
            <div className="w-72 h-4 bg-gray-700 rounded-b-xl border-2 border-cyan-500/50 -mt-2"></div>
          </div>
        </div>
      )}

      {/* Portal Animation */}
      {welcomeStep >= 4 && (
        <div className="absolute inset-0 flex items-center justify-center portal-opens">
          <div className="w-32 h-32 portal-animation"></div>
        </div>
      )}
    </div>
  )

  // Navigation Component
  const Navigation = () => (
    <nav className="border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6">
          <button 
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-3 text-xl font-bold"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_b8878013-0740-4c63-9d96-b40eac9d03ed/artifacts/5bcxmlr8_file_0000000012dc62309c34f5e247327faa.png"
              alt="Troq Logo"
              className="h-8 w-8 invert"
            />
            <span className="gradient-text">Troq</span>
          </button>
        </div>

        {user && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'dashboard' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('marketplace')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'marketplace' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => setCurrentView('scheduling')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'scheduling' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Sessions
              </button>
              <button 
                onClick={() => setCurrentView('profile')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'profile' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setCurrentView('credits')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'credits' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Credits
              </button>
              <button 
                onClick={() => setCurrentView('help')}
                className={`transition-colors hover:text-cyan-400 ${currentView === 'help' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Help
              </button>
              
              {/* More Options Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                  className="flex items-center space-x-1 transition-colors hover:text-cyan-400 text-gray-300"
                >
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isMoreOptionsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md border border-gray-800 bg-black p-1 shadow-md">
                    <button 
                      onClick={() => { setCurrentView('discovery'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Skill Discovery
                    </button>
                    <button 
                      onClick={() => { setCurrentView('history'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Session History
                    </button>
                    <button 
                      onClick={() => { setCurrentView('resources'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Resource Library
                    </button>
                    <button 
                      onClick={() => { setCurrentView('challenges'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Challenges
                    </button>
                    <button 
                      onClick={() => { setCurrentView('feedback'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Feedback
                    </button>
                    <button 
                      onClick={() => { setCurrentView('mentorship'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
                    >
                      Mentorship
                    </button>
                    <button 
                      onClick={() => { setCurrentView('notifications'); setIsMoreOptionsOpen(false) }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-gray-800 hover:text-cyan-400 rounded-sm"
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
                <CreditCard className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">{user?.credits || 0}</span>
              </div>
              <Avatar className="h-8 w-8 border border-cyan-500/50">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gray-800 text-cyan-400">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-cyan-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {!user && (
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setIsLoginOpen(true)} className="text-gray-300 hover:text-cyan-400">
              Sign In
            </Button>
            <Button onClick={() => setIsSignupOpen(true)} className="bg-cyan-600 hover:bg-cyan-700 text-black font-semibold">
              Get Started
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black p-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Dashboard</button>
            <button onClick={() => { setCurrentView('marketplace'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Marketplace</button>
            <button onClick={() => { setCurrentView('scheduling'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Sessions</button>
            <button onClick={() => { setCurrentView('profile'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Profile</button>
            <button onClick={() => { setCurrentView('credits'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Credits</button>
            <button onClick={() => { setCurrentView('help'); setIsMobileMenuOpen(false) }} className="text-left hover:text-cyan-400">Help</button>
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-cyan-500/50">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gray-800 text-cyan-400">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="hover:text-cyan-400">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )

  // Landing Page Component with Futuristic Theme
  const LandingPage = () => (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 stars-bg opacity-30"></div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                Learn any skill in{' '}
                <span className="gradient-text">1 hour</span>
                {' '}— for free
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Trade skills with our community. Teach what you know, learn what you need. 
                Fair exchange, real connections, instant learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-cyan-600 hover:bg-cyan-700 text-black font-semibold glow"
                  onClick={() => setIsSignupOpen(true)}
                >
                  Start Learning Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-cyan-500 text-cyan-400 hover:bg-cyan-600/20"
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
                className="rounded-lg shadow-2xl neon-border floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How Troq Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple, fair skill exchange in three easy steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gray-900/50 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4 glow">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400">1. Share Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  List skills you can teach and skills you want to learn. 
                  Build your profile and connect with the community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-900/50 border-purple-500/30 hover:border-purple-500 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-purple">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-purple-400">2. Book Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Find teachers for skills you want to learn. Schedule 1-hour sessions 
                  that work for both of you.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-900/50 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4 glow">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-400">3. Learn & Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
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
            <p className="text-xl text-gray-300">Real stories from skill traders</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-cyan-500/30 hover:glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 border border-cyan-500/50">
                    <AvatarImage src="https://images.unsplash.com/photo-1758525860449-fa3602fceb31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx0ZWFjaGluZyUyMG1lbnRvcmluZ3xlbnwwfHx8fDE3NTg5NzE0MDF8MA&ixlib=rb-4.1.0&q=85" />
                    <AvatarFallback className="bg-gray-800">SC</AvatarFallback>
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
                <p className="text-gray-300">
                  "Learned Figma in one hour from Marcus. Now I can create my own designs! 
                  The credit system is brilliant - taught JavaScript to earn credits."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-500/30 hover:glow-purple transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 border border-purple-500/50">
                    <AvatarImage src="https://images.unsplash.com/photo-1758270704286-83476deb3bd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzU4OTcxNDA3fDA&ixlib=rb-4.1.0&q=85" />
                    <AvatarFallback className="bg-gray-800">MR</AvatarFallback>
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
                <p className="text-gray-300">
                  "Amazing platform! I've taught design to 30+ people and learned photography, 
                  guitar, and cooking. Community is incredibly supportive."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-cyan-500/30 hover:glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 border border-cyan-500/50">
                    <AvatarImage src="https://images.pexels.com/photos/9158364/pexels-photo-9158364.jpeg" />
                    <AvatarFallback className="bg-gray-800">AL</AvatarFallback>
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
                <p className="text-gray-300">
                  "The gamification keeps me motivated. Earned my 'Top Teacher' badge 
                  and made genuine connections while learning valuable skills."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 relative">
        <div className="absolute inset-0 stars-bg opacity-20"></div>
        <div className="container text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
            Ready to Start Your Skill Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers sharing knowledge every day
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-cyan-600 hover:bg-cyan-700 text-black font-semibold glow pulse-glow"
            onClick={() => setIsSignupOpen(true)}
          >
            Join Troq Today
          </Button>
        </div>
      </section>
    </div>
  )

  // Dashboard Component with Skill Galaxy Theme
  const Dashboard = () => (
    <div className="container py-8 relative">
      <div className="absolute inset-0 stars-bg opacity-20 pointer-events-none"></div>
      
      <div className="mb-8 relative">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome back, {user?.name}!</h1>
        <p className="text-gray-400">Your skill-sharing journey continues</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900/50 border-cyan-500/30 hover:glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Credits</p>
                <p className="text-2xl font-bold text-cyan-400">{user?.credits || 0}</p>
              </div>
              <CreditCard className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-purple-500/30 hover:glow-purple transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Sessions Taught</p>
                <p className="text-2xl font-bold text-purple-400">{user?.totalSessions || 0}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-yellow-500/30 hover:border-yellow-500 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-yellow-400">{user?.rating || 0}</p>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-green-500/30 hover:border-green-500 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Skills Offered</p>
                <p className="text-2xl font-bold text-green-400">{user?.teachingSkills?.length || 0}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Galaxy */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Your Teaching Skills</CardTitle>
            <CardDescription className="text-gray-400">Skills you offer to teach others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {user?.teachingSkills?.map((skill, index) => (
                <div key={index} className="skill-orb px-3 py-1 text-sm font-medium">
                  {skill}
                </div>
              )) || <p className="text-gray-400">No teaching skills added yet</p>}
            </div>
            <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-600/20">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">Skills You Want to Learn</CardTitle>
            <CardDescription className="text-gray-400">Skills you're looking to acquire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {user?.learningSkills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-purple-500 text-purple-400">{skill}</Badge>
              )) || <p className="text-gray-400">No learning goals added yet</p>}
            </div>
            <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 hover:bg-purple-600/20">
              <Plus className="h-4 w-4 mr-2" />
              Add Learning Goal
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription className="text-gray-400">Your scheduled learning and teaching sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.filter(s => s.status === 'upcoming').length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No upcoming sessions</p>
              <Button 
                className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-black" 
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
                    <div key={session.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg bg-gray-900/30">
                      <div className="flex items-center space-x-4">
                        <Avatar className="border border-cyan-500/50">
                          <AvatarImage src={teacher?.avatar} />
                          <AvatarFallback className="bg-gray-800">{teacher?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{session.skill} with {teacher?.name}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(session.scheduledFor).toLocaleDateString()} at {new Date(session.scheduledFor).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-600/20">
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
      <div className="container py-8 relative">
        <div className="absolute inset-0 stars-bg opacity-20 pointer-events-none"></div>
        
        <div className="mb-8 relative">
          <h1 className="text-3xl font-bold mb-2 gradient-text">Skill Marketplace</h1>
          <p className="text-gray-400">Discover amazing teachers and learn new skills</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-gray-900/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search skills or teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-600/20">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="cursor-pointer hover:bg-cyan-600/20 bg-gray-800 text-cyan-400 border-cyan-500/30"
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
            <Card key={teacher.id} className="bg-gray-900/50 border-gray-700 hover:glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16 border border-cyan-500/50">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback className="bg-gray-800 text-cyan-400">{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white">{teacher.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">{teacher.rating}</span>
                      <span className="text-sm text-gray-400">({teacher.totalSessions} sessions)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{teacher.bio}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2 text-gray-400">Teaches:</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.teachingSkills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-cyan-600/20 text-cyan-400">{skill}</Badge>
                    ))}
                    {teacher.teachingSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600">+{teacher.teachingSkills.length - 3} more</Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setCurrentView('profile')}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-700 text-black"
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
            <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-300">No teachers found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
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
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Welcome Back</DialogTitle>
            <DialogDescription className="text-gray-400">Sign in to your Troq account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-black">Sign In</Button>
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Join Troq</DialogTitle>
            <DialogDescription className="text-gray-400">Create your account and start skill sharing</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-300">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-gray-300">Skills You Can Teach</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.teachingSkills.map(skill => (
                  <Badge key={skill} className="bg-cyan-600/20 text-cyan-400">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('teachingSkills', skill)}
                      className="ml-2 hover:text-red-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you can teach..."
                  className="bg-gray-800 border-gray-600 text-white"
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
              <Label className="text-gray-300">Skills You Want to Learn</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.learningSkills.map(skill => (
                  <Badge key={skill} variant="outline" className="border-purple-500 text-purple-400">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill('learningSkills', skill)}
                      className="ml-2 hover:text-red-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill you want to learn..."
                  className="bg-gray-800 border-gray-600 text-white"
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

            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-black">Create Account</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  // Render current view
  const renderCurrentView = () => {
    if (currentView === 'welcome') return <WelcomeAnimation />
    if (!user) return <LandingPage />

    switch (currentView) {
      case 'dashboard': return <Dashboard />
      case 'marketplace': return <Marketplace />
      case 'scheduling': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Session Scheduling</h1><p className="text-gray-400">Schedule and manage your learning sessions</p></div>
      case 'profile': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Your Profile</h1><p className="text-gray-400">Manage your profile and reputation</p></div>
      case 'credits': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Credits & Gamification</h1><p className="text-gray-400">Track your credits, badges, and achievements</p></div>
      case 'help': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Help & FAQ</h1><p className="text-gray-400">Get help and find answers to common questions</p></div>
      case 'discovery': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Skill Discovery</h1><p className="text-gray-400">Discover new skills and get personalized recommendations</p></div>
      case 'history': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Session History</h1><p className="text-gray-400">View your learning and teaching history with analytics</p></div>
      case 'resources': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Resource Library</h1><p className="text-gray-400">Access learning materials and resources</p></div>
      case 'challenges': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Challenges & Streaks</h1><p className="text-gray-400">Take on learning challenges and build streaks</p></div>
      case 'feedback': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Feedback & Suggestions</h1><p className="text-gray-400">Share feedback and suggest new features</p></div>
      case 'mentorship': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Mentorship & Groups</h1><p className="text-gray-400">Join mentorship programs and group learning sessions</p></div>
      case 'notifications': return <div className="container py-8"><h1 className="text-3xl font-bold gradient-text">Notifications</h1><p className="text-gray-400">Manage your notifications and messages</p></div>
      default: return <LandingPage />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {currentView !== 'welcome' && <Navigation />}
      {renderCurrentView()}
      <LoginDialog />
      <SignupDialog />
    </div>
  )
}