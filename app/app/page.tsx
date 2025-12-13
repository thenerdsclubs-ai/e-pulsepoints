import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import AppCTAButton from '../components/ui/AppCTAButton';
import MascotImage from '../components/ui/MascotImage';
import ImageCarousel from '../components/ui/ImageCarousel';

export const metadata: Metadata = {
  title: 'E-PulsePoints Mobile App - Gamified ECG Learning Platform',
  description: 'Download the E-PulsePoints app for interactive ECG practice, quizzes, exams, and gamified learning. Turn medical education into an engaging game!',
  keywords: ['ECG app', 'medical app', 'ECG practice', 'cardiology app', 'gamified medical education'],
};

export default function AppPage() {
  const appFeatures = [
    {
      title: '🎮 Interactive Learning',
      description: 'Engage with dynamic lessons through interactive slides and gamified content',
      icon: (
        <span className="text-3xl">🎮</span>
      ),
      color: 'purple'
    },
    {
      title: '📺 Video Lessons',
      description: 'Learn from expert medical professionals through high-quality video content',
      icon: (
        <span className="text-3xl">📺</span>
      ),
      color: 'blue'
    },
    {
      title: '� Smart Flashcards',
      description: 'Master concepts with spaced repetition flashcards and memory techniques',
      icon: (
        <span className="text-3xl">🃁</span>
      ),
      color: 'yellow'
    },
    {
      title: '⚡ ECG Simulator',
      description: 'Practice with real-time ECG simulation and interactive analysis tools',
      icon: (
        <span className="text-3xl">⚡</span>
      ),
      color: 'green'
    },
    {
      title: '👥 Community Learning',
      description: 'Connect with peers, share knowledge, and learn collaboratively',
      icon: (
        <span className="text-3xl">👥</span>
      ),
      color: 'red'
    },
    {
      title: '📊 Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and insights',
      icon: (
        <span className="text-3xl">📊</span>
      ),
      color: 'indigo'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Medical Student',
      quote: 'The gamification makes learning ECG interpretation actually fun! The XP and badge system keeps me motivated.',
      rating: 5
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Cardiology Resident',
      quote: 'Best ECG learning app I\'ve used. The interactive challenges and instant feedback are game-changers.',
      rating: 5
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Emergency Physician',
      quote: 'Perfect for staying sharp on ECG interpretation. The gamified approach makes daily practice enjoyable.',
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section backgroundVariant="gradient" padding="xl" className="hero-gradient relative overflow-hidden">
        {/* Floating animated elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                ECG Mastery <br/>Through 
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"> 🎮 Gaming</span>
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed font-medium">
                Turn medical learning into an addictive game! Earn gems, gain XP, 
                maintain heart streaks, and level up your ECG interpretation skills.
              </p>
              
              {/* Game Stats Preview */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card text-center p-4">
                  <div className="text-2xl font-bold text-white">💎 2,450</div>
                  <div className="text-sm text-gray-200">Total Gems</div>
                </div>
                <div className="glass-card text-center p-4">
                  <div className="text-2xl font-bold text-white">⚡ Level 15</div>
                  <div className="text-sm text-gray-200">ECG Expert</div>
                </div>
                <div className="glass-card text-center p-4">
                  <div className="text-2xl font-bold text-white">❤️ 5 Hearts</div>
                  <div className="text-sm text-gray-200">Full Health</div>
                </div>
                <div className="glass-card text-center p-4">
                  <div className="text-2xl font-bold text-white">💗 1,890</div>
                  <div className="text-sm text-gray-200">Pulse Points</div>
                </div>
              </div>
              
              <AppCTAButton variant="primary" size="lg" className="mb-8 btn-primary" />

              <div className="flex flex-wrap items-center gap-6 text-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-semibold">4.9 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📱</span>
                  <span className="font-semibold">50,000+ Players</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🎆</span>
                  <span className="font-semibold">Free to Play</span>
                </div>
              </div>
            </div>

            {/* Mobile App Screenshots Carousel */}
            <div className="relative">
              <div className="max-w-sm mx-auto">
                <ImageCarousel
                  images={[
                    {
                      src: '/lesson-demo-assets/lesson-main.jpg',
                      alt: 'Main Learning Dashboard',
                      title: 'Interactive Dashboard',
                      description: 'Your personalized learning hub with progress tracking',
                      reward: '🎮'
                    },
                    {
                      src: '/lesson-demo-assets/ecg-simulator.jpg',
                      alt: 'ECG Simulator Interface',
                      title: 'ECG Simulator',
                      description: 'Practice with real-time ECG simulation and analysis',
                      reward: '⚡'
                    },
                    {
                      src: '/lesson-demo-assets/interactive-algorithms.jpg',
                      alt: 'Interactive Algorithm Learning',
                      title: 'Algorithm Training',
                      description: 'Learn diagnostic algorithms step by step',
                      reward: '🧠'
                    },
                    {
                      src: '/lesson-demo-assets/community-tab.jpg',
                      alt: 'Community Learning Platform',
                      title: 'Learning Community',
                      description: 'Connect with peers and medical professionals',
                      reward: '👥'
                    }
                  ]}
                  autoPlay={true}
                  autoPlayInterval={3500}
                  aspectRatio="mobile"
                  className="border-4 border-white/50 shadow-2xl"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 achievement-badge animate-bounce">
                🎮
              </div>
              <div className="absolute -bottom-6 -right-6 achievement-badge animate-pulse">
                🏆
              </div>
              <div className="absolute top-1/2 -right-8 achievement-badge animate-bounce" style={{animationDelay: '1.5s'}}>
                ⭐
              </div>
              
              {/* Background glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-white/10 to-purple-400/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* App Features */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for ECG Learning
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our gamified platform combines the latest in educational technology with proven learning methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appFeatures.map((feature) => (
            <Card key={feature.title} variant="elevated" padding="lg" className="gamification-card hover-lift">
              <div className="text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* App Screenshots Gallery */}
      <Section backgroundVariant="gray" padding="xl" className="ocean-gradient relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-bounce"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              See the App in 
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"> Action</span>
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto font-medium">
              Experience the future of medical education with our interactive screenshots. 
              Swipe through to see how gamification transforms ECG learning!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ImageCarousel
              images={[
                {
                  src: '/lesson-demo-assets/lesson-first.jpg',
                  alt: 'Getting Started Interface',
                  title: 'Start Your Journey',
                  description: 'Begin with our guided introduction to ECG learning'
                },
                {
                  src: '/lesson-demo-assets/interactive-slides.jpg',
                  alt: 'Interactive Learning Slides',
                  title: 'Interactive Presentations',
                  description: 'Engaging slides with interactive elements and quizzes'
                },
                {
                  src: '/lesson-demo-assets/video-lessons.jpg',
                  alt: 'Video Learning Content',
                  title: 'Expert Video Lessons',
                  description: 'Learn from medical professionals through video content'
                },
                {
                  src: '/lesson-demo-assets/flashcards.jpg',
                  alt: 'Digital Flashcards System',
                  title: 'Smart Flashcards',
                  description: 'Spaced repetition system for effective memorization'
                },
                {
                  src: '/lesson-demo-assets/progress.jpg',
                  alt: 'Progress Tracking Dashboard',
                  title: 'Progress Analytics',
                  description: 'Detailed insights into your learning progress and performance'
                },
                {
                  src: '/lesson-demo-assets/profile.jpg',
                  alt: 'User Profile and Settings',
                  title: 'Personal Profile',
                  description: 'Customize your learning experience and track achievements'
                }
              ]}
              autoPlay={true}
              autoPlayInterval={6000}
              aspectRatio="mobile"
              className="border-4 border-white/30 shadow-2xl mx-auto max-w-sm"
            />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section backgroundVariant="gradient" padding="xl" className="sunset-gradient">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Loved by Medical Professionals
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            See what medical students and professionals are saying about our gamified learning approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="glass-card-dark p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-100 mb-4 italic">"{testimonial.quote}"</blockquote>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-300">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Download CTA */}
      <Section padding="xl" className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Master ECG? 🚀
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of medical professionals who've transformed their ECG learning 
            through our gamified approach. Start your journey today!
          </p>
          
          <AppCTAButton variant="primary" size="lg" className="btn-primary mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl mb-2">🎮</div>
              <div className="font-semibold text-gray-900">Gamified Learning</div>
              <div className="text-gray-600 text-sm">Turn education into play</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold text-gray-900">Mobile Optimized</div>
              <div className="text-gray-600 text-sm">Learn anywhere, anytime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold text-gray-900">Expert Content</div>
              <div className="text-gray-600 text-sm">Created by cardiologists</div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}