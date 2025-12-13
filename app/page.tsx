import Link from 'next/link';
import Image from 'next/image';
import Section from './components/ui/Section';
import Card from './components/ui/Card';
import AppCTAButton from './components/ui/AppCTAButton';
import MascotImage from './components/ui/MascotImage';
import ImageCarousel from './components/ui/ImageCarousel';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-PulsePoints - Master ECG Interpretation | Free ECG Learning Platform',
  description: 'Learn ECG interpretation with interactive tutorials, practice MI cases, and join our community of medical professionals. Download our free mobile app for iOS and Android.',
  keywords: ['ECG learning', 'EKG interpretation', 'medical education', 'MI cases', 'arrhythmia', 'cardiology', 'medical students', 'nursing education', 'free ECG app'],
  openGraph: {
    title: 'E-PulsePoints - Master ECG Interpretation',
    description: 'Learn ECG interpretation with interactive tutorials, practice MI cases, and join our community of medical professionals.',
    url: 'https://ecgkid.com',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'E-PulsePoints ECG Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-PulsePoints - Master ECG Interpretation',
    description: 'Learn ECG interpretation with interactive tutorials, practice MI cases, and join our community.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://ecgkid.com',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] bg-gradient-to-br from-[#1e40af] via-[#7e22ce] to-[#be185d]">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 container-width py-20 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
              {/* Left: Content */}
              <div className="space-y-8 lg:space-y-10">
                <div className="inline-block">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
                    <p className="text-sm font-semibold text-white/90">🎓 Learn • Practice • Master</p>
                  </div>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight">
                  Master ECG
                  <br />Like a{' '}
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent inline-block">Game</span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-blue-50/90 leading-relaxed max-w-2xl">
                  Transform heart rhythm learning into an engaging adventure. Practice with real cases, earn rewards, and become an ECG expert through interactive challenges.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <AppCTAButton variant="primary" size="xl" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all" />
                  <Link 
                    href="/app" 
                    className="inline-flex items-center justify-center space-x-2 px-10 py-5 text-lg font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 hover:border-white/50 rounded-2xl transition-all duration-300"
                  >
                    <span>🌐</span>
                    <span>Open Web App</span>
                  </Link>
                </div>
                
                <div className="flex flex-wrap gap-6 lg:gap-8 pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <div className="text-sm font-bold text-white">4.9/5</div>
                      <div className="text-xs text-blue-100">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3">
                    <span className="text-2xl">👨‍⚕️</span>
                    <div>
                      <div className="text-sm font-bold text-white">50,000+</div>
                      <div className="text-xs text-blue-100">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="text-sm font-bold text-white">Award</div>
                      <div className="text-xs text-blue-100">Winning</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Main Image */}
              <div className="relative">
                <div className="aspect-[4/5] max-w-md mx-auto relative">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-sm"></div>
                  <Image
                    src="/lesson-demo-assets/lesson-main.jpg"
                    alt="E-PulsePoints interactive ECG learning dashboard showing real-time heart rhythm analysis and educational modules"
                    fill
                    className="object-contain rounded-3xl relative z-10 drop-shadow-2xl"
                    priority
                  />
                </div>
                
                {/* Mascot Guide */}
                <div className="absolute -bottom-6 -left-6 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-lg"></div>
                    <MascotImage 
                      src="/mascots/heart-mascot-hello.png"
                      alt="Dr. Pulse, the E-PulsePoints heart mascot character, welcoming new medical students to ECG learning platform"
                      size="md"
                      className="relative animate-bounce"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards */}
      <Section padding="2xl" className="bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Master ECG in Three Steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From learning fundamentals to practicing with real cases and consulting experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Learn Foundations */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                <Image
                  src="/lesson-demo-assets/lesson-first.jpg"
                  alt="ECG learning fundamentals course interface showing basic cardiac rhythm patterns and wave interpretation"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Learn Fundamentals
                </h3>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Master ECG basics through structured lessons designed by medical experts
                </p>
                <Link 
                  href="/learn-ecg" 
                  className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Start Learning
                </Link>
              </div>
            </div>

            {/* Card 2: Practice with Games */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-purple-200">
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                <Image
                  src="/lesson-demo-assets/ecg-simulator.jpg"
                  alt="Interactive ECG simulator with real patient cases, gamified challenges, and instant diagnostic feedback system"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Practice with Games
                </h3>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Interactive challenges with real ECG cases and instant feedback
                </p>
                <AppCTAButton variant="primary" className="w-full bg-purple-600 hover:bg-purple-700" />
              </div>
            </div>

            {/* Card 3: Expert Consultation */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                <Image
                  src="/lesson-demo-assets/community-tab.jpg"
                  alt="E-PulsePoints community forum showing medical professionals discussing ECG cases and expert consultation feature"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Expert Guidance
                </h3>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  Connect with medical professionals and get personalized feedback
                </p>
                <Link 
                  href="/consultation" 
                  className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Get Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learning Journey */}
      <Section padding="xl" className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Your Learning Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Follow our proven 4-step pathway to ECG mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0"></div>
            
            {[
              {
                step: 1,
                title: 'Learn Basics',
                description: 'Master ECG fundamentals',
                color: 'blue',
                icon: '📚'
              },
              {
                step: 2,
                title: 'Practice Daily',
                description: 'Interactive simulations',
                color: 'purple',
                icon: '🎮'
              },
              {
                step: 3,
                title: 'Test Knowledge',
                description: 'Assessment challenges',
                color: 'green',
                icon: '🏆'
              },
              {
                step: 4,
                title: 'Expert Review',
                description: 'Professional guidance',
                color: 'indigo',
                icon: '👨‍⚕️'
              }
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className={`w-24 h-24 bg-${item.color}-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className={`absolute top-2 right-2 w-8 h-8 bg-${item.color}-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Interactive Simulator Feature */}
      <Section padding="xl" className="bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Practice with 
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Real ECG Cases</span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Master ECG interpretation through interactive simulations with real patient cases. 
                Get instant feedback and build confidence in your diagnostic skills.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">Real patient ECG recordings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">Instant diagnostic feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">Progressive difficulty levels</span>
                </div>
              </div>
              
              <AppCTAButton variant="primary" size="lg" className="bg-green-600 hover:bg-green-700" />
            </div>
            
            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/5] max-w-sm mx-auto relative">
                <Image
                  src="/lesson-demo-assets/ecg-simulator.jpg"
                  alt="Real-time ECG simulator interface with patient case studies, heart rhythm analysis tools, and diagnostic feedback"
                  fill
                  className="object-contain rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4">
                <MascotImage 
                  src="/mascots/Dr. Pulse_teaching.png"
                  alt="Dr. Pulse mascot in teaching pose, explaining ECG interpretation concepts to medical students"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Flashcards Feature */}
      <Section padding="xl" className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] max-w-sm mx-auto relative">
                <Image
                  src="/lesson-demo-assets/flashcards.jpg"
                  alt="AI-powered spaced repetition flashcard system for ECG rhythm patterns and cardiac arrhythmia learning"
                  fill
                  className="object-contain rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute -top-3 -right-3">
                <MascotImage 
                  src="/mascots/heart-mascot-thinking.png"
                  alt="Dr. Pulse mascot in thoughtful pose, encouraging critical thinking in ECG interpretation"
                  size="sm"
                />
              </div>
            </div>
            
            {/* Right: Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Smart 
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Flashcards</span>
              </h2>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Master ECG patterns and rhythms with our AI-powered flashcard system. 
                Spaced repetition ensures you remember what you learn.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">AI-powered spaced repetition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">500+ ECG rhythm cards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">Track your progress automatically</span>
                </div>
              </div>
              
              <Link 
                href="/app" 
                className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors duration-200"
              >
                Try Flashcards
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Section */}
      <Section padding="xl" className="bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Trusted by Medical Professionals
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join thousands of medical students and professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-black text-blue-400 mb-4">50,000+</div>
              <div className="text-xl font-semibold text-white mb-2">Active Learners</div>
              <div className="text-slate-400">Medical students and professionals</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-green-400 mb-4">4.9/5</div>
              <div className="text-xl font-semibold text-white mb-2">App Rating</div>
              <div className="text-slate-400">Highly rated by users</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-purple-400 mb-4">95%</div>
              <div className="text-xl font-semibold text-white mb-2">Success Rate</div>
              <div className="text-slate-400">Improved ECG skills</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Master ECG?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of medical professionals who've transformed their ECG skills with E-PulsePoints
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AppCTAButton variant="primary" size="xl" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl" />
            <Link 
              href="/app" 
              className="inline-flex items-center justify-center space-x-3 px-12 py-6 text-xl font-bold text-white border-2 border-white/30 hover:border-white/50 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <span>🌐</span>
              <span>Try Web App</span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

