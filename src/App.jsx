import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Car, Clock, Shield, Zap, Phone, Mail, MapPin, 
  Play, Pause, Volume2, VolumeX, Star, CheckCircle,
  Users, Building, Award, Target
} from 'lucide-react'
import easyLogo from './assets/easy-logo.png'
import demoVideo from './assets/WhatsAppVideo2025-09-19at23.09.50.mp4'
import './App.css'
import qrCodeImage from '../assets/QR_code_Mobile_App.png'; // Import the image


function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [selectedTower, setSelectedTower] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [userReservations, setUserReservations] = useState([])
  const [userSubscriptions, setUserSubscriptions] = useState([])
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const videoRef = useRef(null)

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setVideoProgress(progress)
    }
  }

  const handleVideoSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const width = rect.width
      const percentage = clickX / width
      const newTime = percentage * videoRef.current.duration
      videoRef.current.currentTime = newTime
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const towers = ['Tower A', 'Tower B', 'Tower C']
  const levels = ['1', '2', '3', '4', '5']
  const slots = Array.from({length: 20}, (_, i) => (i + 1).toString())

  const handleReservation = () => {
    if (selectedTower && selectedLevel && selectedSlot) {
      const newReservation = {
        id: Date.now(),
        tower: selectedTower,
        level: selectedLevel,
        slot: selectedSlot,
        status: 'Active',
        startTime: new Date().toLocaleString(),
        endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toLocaleString()
      }
      setUserReservations([...userReservations, newReservation])
      alert(`Reservation confirmed!\nTower: ${selectedTower}\nLevel: ${selectedLevel}\nSlot: ${selectedSlot}\n\nThank you for choosing EASY Parking!`)
      setSelectedTower('')
      setSelectedLevel('')
      setSelectedSlot('')
      setShowReservationModal(false)
    } else {
      alert('Please select tower, level, and slot')
    }
  }

  const handleSubscription = (plan) => {
    const newSubscription = {
      id: Date.now(),
      plan: plan,
      status: 'Active',
      startDate: new Date().toLocaleDateString(),
      endDate: plan.includes('Monthly') 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        : plan.includes('Annual')
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
        : 'Pay per use'
    }
    setUserSubscriptions([...userSubscriptions, newSubscription])
    alert(`Subscription activated!\nPlan: ${plan}\n\nWelcome to EASY Parking premium services!`)
    setShowSubscriptionModal(false)
  }

  const handleContactForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const subject = formData.get('subject') || 'General Inquiry'
    const message = formData.get('message') || ''
    const firstName = formData.get('firstName') || ''
    const lastName = formData.get('lastName') || ''
    const email = formData.get('email') || ''
    const phone = formData.get('phone') || ''
    
    const emailBody = `Hello EASY Parking Team,

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Best regards,
${firstName} ${lastName}`
    
    const mailtoLink = `mailto:info@easyparking.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    
    window.location.href = mailtoLink
    
    // Show confirmation
    alert('Thank you for your message! Your email application should open now.')
  }

  const cancelReservation = (reservationId) => {
    setUserReservations(userReservations.filter(res => res.id !== reservationId))
    alert('Reservation cancelled successfully!')
  }

  const cancelSubscription = (subscriptionId) => {
    setUserSubscriptions(userSubscriptions.filter(sub => sub.id !== subscriptionId))
    alert('Subscription cancelled successfully!')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                      Smart Parking Made <span className="text-yellow-400">EASY</span>
                    </h1>
                    <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                      Revolutionary automated parking towers at Smart Village, Alexandria. Experience the future of parking with our robotic stacking and retrieval system.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
                        onClick={() => setCurrentPage('pricing')}
                      >
                        Get Started
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent"
                        onClick={() => setCurrentPage('about')}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                  
                  {/* Demo Video Section */}
                  <div className="relative">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">See EASY Parking in Action</h3>
                      <p className="text-lg opacity-90">Watch our automated parking system demo</p>
                    </div>
                    <div 
                      className="relative bg-black rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
                      onMouseEnter={() => setShowVideoControls(true)}
                      onMouseLeave={() => setShowVideoControls(false)}
                      onClick={handleVideoClick}
                    >
                      <video
                        ref={videoRef}
                        className="w-full h-auto"
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onTimeUpdate={handleVideoProgress}
                        onLoadedMetadata={() => {
                          if (videoRef.current) {
                            setVideoDuration(videoRef.current.duration)
                          }
                        }}
                      >
                        <source src={demoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Video Controls Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        showVideoControls || !isVideoPlaying ? 'opacity-100' : 'opacity-0'
                      }`}>
                        {/* Main Play/Pause Button - Only show when video is not playing */}
                        {!isVideoPlaying && (
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleVideoClick(); }}
                              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 rounded-full p-4 transition-all transform hover:scale-110"
                            >
                              <Play size={32} />
                            </button>
                          </div>
                        )}
                        
                        {/* Controls for playing video - show on hover without black overlay */}
                        {isVideoPlaying && showVideoControls && (
                          <>
                            {/* Top Controls */}
                            <div className="absolute top-4 right-4 flex items-center space-x-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleVideoClick(); }}
                                className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2 transition-all"
                              >
                                <Pause size={20} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                                className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-2 transition-all"
                              >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                              </button>
                            </div>
                            
                            {/* Bottom Progress Bar and Controls */}
                            <div className="absolute bottom-4 left-4 right-4">
                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div 
                                  className="w-full h-3 bg-black bg-opacity-60 rounded-full cursor-pointer hover:bg-opacity-80 transition-all"
                                  onClick={handleVideoSeek}
                                >
                                  <div 
                                    className="h-full bg-blue-500 rounded-full transition-all duration-100 relative"
                                    style={{ width: `${videoProgress}%` }}
                                  >
                                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Time Display */}
                              <div className="flex justify-between items-center text-white text-sm bg-black bg-opacity-60 px-3 py-1 rounded">
                                <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                                <span>{formatTime(videoDuration)}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Play Button Overlay for Initial State */}
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 rounded-full p-6 transform transition-transform hover:scale-110">
                            <Play size={48} className="text-blue-600 ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-center mt-4 text-sm opacity-75">
                      🎬 Click to watch our automated parking system in action
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose EASY Parking?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our automated parking system saves you time, reduces stress, and provides a secure parking experience.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock size={32} className="text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Save 30 Minutes Daily</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      No more circling around looking for parking. Our automated system finds and parks your car in seconds.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield size={32} className="text-green-600" />
                    </div>
                    <CardTitle className="text-xl">100% Secure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Your vehicle is safely stored in our automated towers with 24/7 security monitoring and climate control.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap size={32} className="text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl">EV Charging Ready</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Charge your electric vehicle while it's parked. Our towers include integrated EV charging stations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-gray-600">Parking Towers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                    <div className="text-gray-600">Parking Spaces</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">30s</div>
                    <div className="text-gray-600">Average Parking Time</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Available Service</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16">
              <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-4">Ready to Experience Smart Parking?</h2>
                <p className="text-xl mb-8">Join hundreds of satisfied customers at Smart Village, Alexandria</p>
                
                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mb-8">
                  <a href="https://www.facebook.com/groups/774443268515072/?ref=share&mibextid=KtfwRi" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/watch?v=3X-rvMM2qME" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/easy_smartvillage/?igsh=MTEwOWIzaTNhbHBiNA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/></svg>
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4"
                    onClick={() => setShowReservationModal(true)}
                  >
                    <Car size={20} className="mr-2" />
                    Reserve Now
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-4"
                    onClick={() => setShowSubscriptionModal(true)}
                  >
                    <Star size={20} className="mr-2" />
                    Subscribe
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-4"
                    onClick={() => setShowStatusModal(true)}
                  >
                    <Clock size={20} className="mr-2" />
                    My Status
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-4"
                    onClick={() => setCurrentPage('contact')}
                  >
                    <Phone size={20} className="mr-2" />
                    Call Support
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4"
                    onClick={() => setCurrentPage('contact')}
                  >
                    Contact Form
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )

      case 'about':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About EASY Parking</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Revolutionizing parking solutions in Egypt with cutting-edge automated technology
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To transform the parking experience in Egypt by providing innovative, automated parking solutions 
                  that save time, reduce stress, and contribute to sustainable urban development.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Innovation First</h3>
                      <p className="text-gray-600">Leading Egypt's parking revolution with state-of-the-art technology</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Customer Focused</h3>
                      <p className="text-gray-600">Every solution designed with user experience at its core</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Sustainable Future</h3>
                      <p className="text-gray-600">Contributing to greener cities through efficient space utilization</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <Users size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">500+</h3>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                  <div>
                    <Building size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">3</h3>
                    <p className="text-gray-600">Parking Towers</p>
                  </div>
                  <div>
                    <Award size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">99.9%</h3>
                    <p className="text-gray-600">Uptime</p>
                  </div>
                  <div>
                    <Target size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">30s</h3>
                    <p className="text-gray-600">Avg. Park Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'services':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive automated parking solutions designed for modern urban needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Car size={48} className="text-blue-600 mb-4" />
                  <CardTitle>Automated Parking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    State-of-the-art robotic system that parks and retrieves your vehicle automatically.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Robotic stacking system</li>
                    <li>• 30-second parking time</li>
                    <li>• Climate-controlled storage</li>
                    <li>• 24/7 availability</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Zap size={48} className="text-green-600 mb-4" />
                  <CardTitle>EV Charging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrated electric vehicle charging stations in all parking towers.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fast charging capability</li>
                    <li>• Multiple connector types</li>
                    <li>• Smart charging management</li>
                    <li>• Competitive pricing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Phone size={48} className="text-purple-600 mb-4" />
                  <CardTitle>Mobile App</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete parking management through our intuitive mobile application.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time reservations</li>
                    <li>• Subscription management</li>
                    <li>• Payment integration</li>
                    <li>• Usage analytics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield size={48} className="text-red-600 mb-4" />
                  <CardTitle>Security & Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Comprehensive security measures to protect your vehicle and ensure safety.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 24/7 CCTV monitoring</li>
                    <li>• Access control systems</li>
                    <li>• Fire safety systems</li>
                    <li>• Insurance coverage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Building size={48} className="text-orange-600 mb-4" />
                  <CardTitle>Corporate Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Tailored parking solutions for businesses and corporate clients.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bulk subscriptions</li>
                    <li>• Employee parking programs</li>
                    <li>• Custom billing solutions</li>
                    <li>• Dedicated support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock size={48} className="text-teal-600 mb-4" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Round-the-clock customer support and technical assistance.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Phone support</li>
                    <li>• Live chat assistance</li>
                    <li>• On-site technical support</li>
                    <li>• Emergency response</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the perfect plan for your parking needs at Smart Village
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Hourly Plan</CardTitle>
                  <CardDescription>Perfect for occasional visits</CardDescription>
                  <div className="text-4xl font-bold text-blue-600 mt-4">25 EGP<span className="text-lg text-gray-600">/hour</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Flexible parking duration</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />No commitment required</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Pay as you park</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Basic customer support</li>
                  </ul>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow border-blue-500 border-2 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                  <CardDescription>Best value for regular users</CardDescription>
                  <div className="text-4xl font-bold text-blue-600 mt-4">500 EGP<span className="text-lg text-gray-600">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Unlimited parking hours</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Priority slot allocation</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />EV charging included</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />24/7 customer support</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Mobile app premium features</li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Annual Plan</CardTitle>
                  <CardDescription>Maximum savings for committed users</CardDescription>
                  <div className="text-4xl font-bold text-blue-600 mt-4">5000 EGP<span className="text-lg text-gray-600">/year</span></div>
                  <Badge className="bg-green-500 text-white mt-2">Save 17%</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />All monthly plan benefits</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />2 months free</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Premium customer support</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Exclusive member events</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Priority technical support</li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Choose Plan</Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-center mb-6">Corporate Solutions</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Enterprise Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Bulk employee subscriptions</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Custom billing and invoicing</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Dedicated account manager</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Usage analytics and reporting</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-green-600 mr-2" />Priority customer support</li>
                  </ul>
                </div>
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    Contact us for custom pricing based on your organization's needs
                  </p>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get in touch with our team for support, inquiries, or partnership opportunities
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="text-blue-600" />
                      <span>Phone Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+201111114114" className="text-2xl font-bold text-blue-600 mb-2 hover:underline">+201111114114</a>
                    <p className="text-gray-600">Available 24/7 for customer support and emergencies</p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="text-blue-600" />
                      <span>Email</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:info@easyparking.com" className="text-xl font-bold text-blue-600 mb-2 hover:underline">info@easyparking.com</a>
                    <p className="text-gray-600">For general inquiries and support requests</p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="text-blue-600" />
                      <span>Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-blue-600 mb-2">Smart Village</p>
                    <p className="text-gray-600">Alexandria Desert Road, Egypt</p>
                    <p className="text-sm text-gray-500 mt-2">Operating Hours: 24/7 Parking Service</p>
                    <p className="text-sm text-gray-500">Support Hours: 8:00 AM - 10:00 PM</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactForm} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" name="firstName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" name="lastName" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select name="subject" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Billing Question</option>
                        <option>Partnership Opportunity</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea rows="4" name="message" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-32 h-32 bg-transparent rounded-full flex items-center justify-center">
                <img src={easyLogo} alt="EASY Parking" className="w-28 h-28 object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-blue-600">EASY Parking</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['home', 'about', 'services', 'pricing', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize font-medium transition-colors ${
                    currentPage === page 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>

            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentPage('pricing')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-6 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-48 h-48 bg-transparent rounded-full flex items-center justify-center">
                  <img src={easyLogo} alt="EASY Parking" className="w-40 h-40 object-contain" />
                </div>
                <h3 className="text-xl font-bold">EASY Parking</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionary automated parking solutions for Smart Village, Alexandria.
              </p>
              <div className="flex space-x-4">
                <Star className="text-yellow-500" size={20} />
                <Star className="text-yellow-500" size={20} />
                <Star className="text-yellow-500" size={20} />
                <Star className="text-yellow-500" size={20} />
                <Star className="text-yellow-500" size={20} />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.facebook.com/groups/774443268515072/?ref=share&mibextid=KtfwRi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://www.youtube.com/watch?v=3X-rvMM2qME" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="https://www.instagram.com/easy_smartvillage/?igsh=MTEwOWIzaTNhbHBiNA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Mobile App</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setShowQRModal(true)} 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center transition-colors"
                >
                  Download Mobile App
                </button>
                <p className="text-gray-400 text-sm">Available for iOS and Android</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Automated Parking</li>
                <li>EV Charging</li>
                <li>Mobile App</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone size={16} />
                  <a href="tel:+201111114114" className="hover:text-white transition-colors">+201111114114</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail size={16} />
                  <a href="mailto:info@easyparking.com" className="hover:text-white transition-colors">info@easyparking.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Smart Village, Alexandria</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EASY Parking. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reserve Parking Slot</CardTitle>
              <CardDescription>Select your preferred parking location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Tower</label>
                <Select value={selectedTower} onValueChange={setSelectedTower}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose tower" />
                  </SelectTrigger>
                  <SelectContent>
                    {towers.map((tower) => (
                      <SelectItem key={tower} value={tower}>{tower}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>Level {level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Slot</label>
                <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Available Slot</SelectItem>
                    {slots.map((slot) => (
                      <SelectItem key={slot} value={slot}>Slot {slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleReservation} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Car size={16} className="mr-2" />
                  Confirm Reservation
                </Button>
                <Button variant="outline" onClick={() => setShowReservationModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Choose Your Subscription Plan</CardTitle>
              <CardDescription>Select the perfect plan for your parking needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSubscription('Monthly Plan - 500 EGP')}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">Monthly Plan</h3>
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">500 EGP/month</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unlimited parking hours</li>
                    <li>• Priority slot allocation</li>
                    <li>• EV charging included</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSubscription('Annual Plan - 5000 EGP')}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">Annual Plan</h3>
                    <Badge className="bg-green-600">Save 17%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">5000 EGP/year</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All monthly plan benefits</li>
                    <li>• 2 months free</li>
                    <li>• Premium customer support</li>
                    <li>• Exclusive member events</li>
                  </ul>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSubscription('Hourly Plan - 25 EGP/hour')}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">Hourly Plan</h3>
                    <Badge variant="outline">Flexible</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">25 EGP/hour</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pay as you park</li>
                    <li>• No commitment required</li>
                    <li>• Perfect for occasional use</li>
                    <li>• Basic customer support</li>
                  </ul>
                </Card>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowSubscriptionModal(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>My Parking Status</CardTitle>
              <CardDescription>View and manage your reservations and subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Reservations */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Car size={20} className="mr-2 text-blue-600" />
                  Current Reservations ({userReservations.length})
                </h3>
                {userReservations.length > 0 ? (
                  <div className="space-y-3">
                    {userReservations.map((reservation) => (
                      <Card key={reservation.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin size={16} className="text-blue-600" />
                              <span className="font-medium">
                                {reservation.tower} - Level {reservation.level} - Slot {reservation.slot}
                              </span>
                              <Badge className="bg-green-500 text-white">{reservation.status}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Clock size={14} />
                                <span>Start: {reservation.startTime}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock size={14} />
                                <span>End: {reservation.endTime}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => cancelReservation(reservation.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No active reservations</p>
                )}
              </div>

              {/* Active Subscriptions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star size={20} className="mr-2 text-purple-600" />
                  Active Subscriptions ({userSubscriptions.length})
                </h3>
                {userSubscriptions.length > 0 ? (
                  <div className="space-y-3">
                    {userSubscriptions.map((subscription) => (
                      <Card key={subscription.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-purple-800">{subscription.plan}</h4>
                              <Badge className="bg-purple-500 text-white">{subscription.status}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Start Date: {subscription.startDate}</p>
                              <p>End Date: {subscription.endDate}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => cancelSubscription(subscription.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No active subscriptions</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowStatusModal(false)} className="w-full">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Code Modal */}
     // replacing QRModal with QRimage

{showQRModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Download EASY Parking App</CardTitle>
        <CardDescription>Scan the QR code to download our mobile application</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        
        {/* Replace the placeholder with the actual QR code image */}
        <div className="bg-white p-4 rounded-lg inline-block">
          <img src={qrCodeImage} alt="Download EASY Parking App QR Code" className="w-48 h-48" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Scan with your phone camera or QR code reader
          </p>
          <p className="text-xs text-gray-500">
            Link: https://app.easyparking.smartvillage.com/download
          </p>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={() => setShowQRModal(false)} className="w-full">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)}
      
    </div>
  )
}

export default App
