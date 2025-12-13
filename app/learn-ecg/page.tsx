import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import AppCTAButton from '../components/ui/AppCTAButton';
import MascotImage from '../components/ui/MascotImage';

export const metadata: Metadata = {
  title: 'Learn ECG Interpretation - Interactive Tutorials & MI Case Studies',
  description: 'Master ECG interpretation with comprehensive tutorials, real MI cases, and expert guidance. From basic rhythms to advanced cardiac conditions - structured learning for medical professionals.',
  keywords: ['ECG learning', 'EKG interpretation', 'cardiac rhythm', 'medical education', 'cardiology', 'MI cases', 'arrhythmia', 'ECG tutorial'],
  openGraph: {
    title: 'Learn ECG Interpretation',
    description: 'Master ECG interpretation with comprehensive tutorials and real MI cases.',
    url: 'https://ecgkid.com/learn-ecg',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn ECG Interpretation',
    description: 'Master ECG interpretation with comprehensive tutorials.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/learn-ecg',
  },
};

export default function LearnECGPage() {
  const learningTopics = [
    {
      title: '🎯 ECG Foundations',
      topics: [
        'Cardiac electrical conduction system',
        'Lead placement and orientation', 
        'Normal ECG morphology',
        'Rate and rhythm analysis',
        'Axis determination'
      ],
      difficulty: 'Beginner',
      color: 'green',
      xpReward: 100,
      gems: 25,
      hearts: 1
    },
    {
      title: '⚡ Rhythm Mastery',
      topics: [
        'Atrial arrhythmias',
        'Ventricular arrhythmias',
        'Heart blocks and conduction delays',
        'Pacemaker rhythms',
        'Emergency rhythms'
      ],
      difficulty: 'Intermediate', 
      color: 'blue',
      xpReward: 200,
      gems: 50,
      hearts: 2
    },
    {
      title: '🏆 Expert Level',
      topics: [
        'ST-segment analysis',
        'Acute coronary syndromes',
        'Electrolyte abnormalities',
        'Drug effects on ECG',
        'Complex cases'
      ],
      difficulty: 'Advanced',
      color: 'purple',
      xpReward: 300,
      gems: 100,
      hearts: 3
    }
  ];

  const practiceFeatures = [
    {
      title: 'Interactive ECG Simulator',
      description: 'Practice with thousands of real ECG tracings',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: 'Adaptive Learning',
      description: 'AI-powered questions that adjust to your skill level',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      )
    },
    {
      title: 'Expert Explanations',
      description: 'Detailed explanations for every answer',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section backgroundVariant="gradient" padding="xl" className="duo-gradient">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Learn ECG Like a 
              <span className="text-gradient">🎮 Game!</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              Master heart rhythm interpretation through interactive lessons, 
              earn <span className="font-bold text-purple-600">💎 gems</span> and 
              <span className="font-bold text-yellow-600">⚡ XP</span> while building medical expertise!
            </p>
            
            {/* Learning rewards preview */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🎓 Complete Lessons +50 XP
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                💎 Practice Mode +25 Gems
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🏆 Master Level +100 Points
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="#curriculum" className="btn-primary px-8 py-4 text-lg">
                📚 Start Learning Journey
              </Link>
              <AppCTAButton variant="secondary" size="lg" className="px-8 py-4 text-lg" />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-xl">👨‍⚕️</span>
                <span className="font-semibold">Expert-Created Curriculum</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">⏱️</span>
                <span className="font-semibold">Self-Paced Learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎯</span>
                <span className="font-semibold">Interactive Practice</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Mobile app preview with learning interface */}
            <div className="mobile-screenshot max-w-sm mx-auto relative">
              <Image
                src="/app-screenshots/Screenshot_20241027_143636.png"
                alt="ECG Learning Interface"
                width={350}
                height={757}
                className="rounded-3xl shadow-2xl border-4 border-white"
                priority
              />
              {/* Floating learning elements */}
              <div className="absolute -top-6 -left-6 achievement-badge animate-bounce">
                🎓
              </div>
              <div className="absolute -bottom-6 -right-6 achievement-badge animate-pulse">
                🧠
              </div>
              <div className="absolute top-1/2 -left-8 gems-display text-sm px-3 py-1">
                <span>💎</span>
                <span>+25</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learning Curriculum */}
      <Section padding="xl" id="curriculum">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Your 🎮 Learning Adventure
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Level up through our structured curriculum! Complete lessons to earn XP, 
            unlock achievements, and master ECG interpretation step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {learningTopics.map((topic) => (
            <Card key={topic.title} variant="elevated" padding="lg" className="group gamification-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{topic.title}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  topic.color === 'green' ? 'bg-green-100 text-green-800' :
                  topic.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {topic.difficulty}
                </div>
              </div>
              
              {/* Gamification rewards */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ⚡ {topic.xpReward} XP
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  💎 {topic.gems} Gems
                </div>
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ❤️ {topic.hearts} Heart{topic.hearts > 1 ? 's' : ''}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {topic.topics.map((subtopic, index) => (
                  <li key={subtopic} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{subtopic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border-2 border-blue-100">
                  <p className="text-sm text-gray-700 font-semibold mb-2">
                    🎮 Interactive Learning:
                  </p>
                  <p className="text-sm text-gray-600">
                    Gamified challenges and instant feedback for {topic.title.toLowerCase().replace(/🎯|⚡|🏆/g, '').trim()} 
                    with progress tracking and achievements!
                  </p>
                </div>
                
                <AppCTAButton variant="primary" size="sm" className="w-full btn-primary" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Learning Methods */}
      <Section backgroundVariant="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How You'll Learn
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Multiple learning modalities designed to reinforce your ECG interpretation skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Video Tutorials',
              description: 'Step-by-step visual explanations',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )
            },
            {
              title: 'Interactive Cases',
              description: 'Real patient scenarios and discussions',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              )
            },
            {
              title: 'Practice Quizzes',
              description: 'Immediate feedback and explanations',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.89-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2z"/>
                </svg>
              )
            },
            {
              title: 'Reference Materials',
              description: 'Quick-access guides and cheat sheets',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
              )
            }
          ].map((method) => (
            <div key={method.title} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-600">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
              <p className="text-gray-700">{method.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* App Promotion Section */}
      <Section padding="xl">
        <div className="bg-red-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Practice ECG Interpretation in the E-PulsePoints App
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Take your learning beyond theory. Our mobile and web app provides interactive 
                practice with real ECG tracings, instant feedback, and gamified learning.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {practiceFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-700">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <AppCTAButton variant="primary" size="lg" showBoth={true} />
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/app-screenshots/Screenshot_20251209_203501.png"
                      alt="ECG Practice App Screenshot 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/app-screenshots/Screenshot_20251209_203537.png"
                      alt="ECG Practice App Screenshot 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/app-screenshots/Screenshot_20251209_203611.png"
                      alt="ECG Practice App Screenshot 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/app-screenshots/Screenshot_20251209_203716.png"
                      alt="ECG Practice App Screenshot 4"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learning Path */}
      <Section backgroundVariant="gradient" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your ECG Learning Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Follow our proven step-by-step approach to master ECG interpretation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { step: 1, title: 'Learn Theory', description: 'Start with fundamental concepts' },
            { step: 2, title: 'Practice Basic', description: 'Apply knowledge with simple cases' },
            { step: 3, title: 'Take Quizzes', description: 'Test understanding with assessments' },
            { step: 4, title: 'Advanced Cases', description: 'Challenge yourself with complex ECGs' },
            { step: 5, title: 'Expert Review', description: 'Get feedback on difficult interpretations' },
          ].map((item, index) => (
            <div key={item.step} className="text-center relative">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
              
              {index < 4 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-red-200 -translate-x-8"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-6 inline-block shadow-lg">
            <p className="text-gray-700 mb-4">
              Ready to start your ECG learning journey?
            </p>
            <AppCTAButton variant="primary" size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}