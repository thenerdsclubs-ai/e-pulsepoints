import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import AppCTAButton from '../components/ui/AppCTAButton';
import MascotImage from '../components/ui/MascotImage';

export const metadata: Metadata = {
  title: 'ECG Learning Community - Join Medical Professionals Worldwide',
  description: 'Join the E-PulsePoints community of medical professionals. Compete on leaderboards, participate in challenges, and connect with peers in our mobile app.',
  keywords: ['ECG community', 'medical students community', 'learning community', 'medical app community', 'cardiology forum', 'medical professionals'],
  openGraph: {
    title: 'ECG Learning Community',
    description: 'Join medical professionals worldwide in our ECG learning community.',
    url: 'https://ecgkid.com/community',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECG Learning Community',
    description: 'Join medical professionals worldwide.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/community',
  },
};

export default function CommunityPage() {
  const communityFeatures = [
    {
      title: 'Global Leaderboards',
      description: 'Compete with medical students and professionals worldwide',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      color: 'red'
    },
    {
      title: 'Daily Challenges',
      description: 'New ECG challenges every day to keep you engaged',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.89-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2z"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Study Groups',
      description: 'Form groups with peers for collaborative learning',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2.5c0-2.45 1.55-4.5 4-4.5s4 2.05 4 4.5V14h2v4H4z"/>
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'Achievement System',
      description: 'Unlock badges and rewards for your learning milestones',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      color: 'purple'
    },
    {
      title: 'Progress Sharing',
      description: 'Share achievements and celebrate milestones together',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
        </svg>
      ),
      color: 'orange'
    },
    {
      title: 'Discussion Forums',
      description: 'Ask questions and help others in topic-based discussions',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      ),
      color: 'teal'
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Dr. Sarah Chen', points: 15840, badge: '🏆', level: 'Expert' },
    { rank: 2, name: 'Mark Rodriguez', points: 14200, badge: '🥈', level: 'Advanced' },
    { rank: 3, name: 'Lisa Park', points: 13650, badge: '🥉', level: 'Advanced' },
    { rank: 4, name: 'Alex Thompson', points: 12900, badge: '🏅', level: 'Intermediate' },
    { rank: 5, name: 'Emily Davis', points: 12400, badge: '🏅', level: 'Intermediate' },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Complete your first ECG quiz', icon: '🌟', unlock: '100 users' },
    { title: 'Streak Master', description: '7-day learning streak', icon: '🔥', unlock: '250 users' },
    { title: 'Quiz Champion', description: '100% accuracy in advanced quiz', icon: '🎯', unlock: '75 users' },
    { title: 'Community Helper', description: 'Help 10 peers in discussions', icon: '🤝', unlock: '150 users' },
    { title: 'ECG Expert', description: 'Complete all learning modules', icon: '👨‍⚕️', unlock: '50 users' },
    { title: 'Daily Challenger', description: '30-day challenge completion', icon: '💪', unlock: '85 users' },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section backgroundVariant="gradient" padding="xl" className="medical-hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn ECG with a <span className="text-gradient">Community</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join thousands of medical professionals and students in the E-PulsePoints community. 
              Compete, collaborate, and celebrate your ECG learning journey together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <AppCTAButton variant="primary" size="lg" />
              <Link href="#leaderboards" className="btn-secondary">
                View Leaderboards
              </Link>
            </div>

            <div className="flex items-center space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10,000+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Global Community</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <MascotImage 
              src="/mascots/heart_mascot_level_up.png"
              alt="Community Learning Mascot"
              size="xl"
              position="center"
            />
          </div>
        </div>
      </Section>

      {/* Community Features */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Community Features in the App
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience the full power of collaborative learning through our mobile and web app's community features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityFeatures.map((feature) => (
            <Card key={feature.title} variant="elevated" padding="lg" className="text-center group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white
                ${feature.color === 'red' ? 'bg-red-600' : 
                  feature.color === 'blue' ? 'bg-blue-600' :
                  feature.color === 'green' ? 'bg-green-600' :
                  feature.color === 'purple' ? 'bg-purple-600' :
                  feature.color === 'orange' ? 'bg-orange-600' :
                  'bg-teal-600'}
                group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-2xl p-6 inline-block">
            <p className="text-blue-800 mb-4">
              <strong>All community features are available in the E-PulsePoints app</strong>
            </p>
            <AppCTAButton variant="primary" size="md" />
          </div>
        </div>
      </Section>

      {/* Leaderboards Preview */}
      <Section backgroundVariant="gray" padding="xl" id="leaderboards">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Global Leaderboards
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              See how you rank against medical professionals and students worldwide. 
              Climb the leaderboards through consistent practice and achievement unlocks.
            </p>

            <div className="space-y-6 mb-8">
              {[
                'Weekly and monthly rankings',
                'Category-specific leaderboards (students, residents, professionals)',
                'Regional and global competitions',
                'Special event challenges with prizes'
              ].map((feature) => (
                <div key={feature} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <AppCTAButton variant="secondary" size="lg" />
          </div>

          <div>
            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">This Week's Top Learners</h3>
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Live Rankings
                </div>
              </div>
              
              <div className="space-y-4">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl">{user.badge}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.level} Level</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">Want to see your name here?</p>
                <AppCTAButton variant="outline" size="sm" className="w-full" />
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Achievement System */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Achievement System
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Unlock badges and rewards as you progress through your ECG learning journey. 
            Each achievement represents a significant milestone in your medical education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <Card key={achievement.title} variant="elevated" padding="lg" className="text-center group">
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
              <p className="text-gray-700 mb-4">{achievement.description}</p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Unlocked by {achievement.unlock}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-purple-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Earning Achievements Today</h3>
            <p className="text-gray-700 mb-6">
              Join the community and begin unlocking achievements. Every quiz completed, 
              streak maintained, and milestone reached brings you closer to mastery.
            </p>
            <AppCTAButton variant="primary" size="lg" />
          </div>
        </div>
      </Section>

      {/* Daily Challenges */}
      <Section backgroundVariant="gradient" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Daily Challenges
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Start each day with a new ECG challenge. These specially curated cases 
              help you maintain consistent practice while competing with the community.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Today's Challenge</h4>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Atrial Fibrillation Recognition:</strong> Identify irregular rhythms 
                and distinguish AF from other arrhythmias.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">2,847 participants today</span>
                <span className="text-sm font-semibold text-blue-600">+50 bonus points</span>
              </div>
            </div>

            <AppCTAButton variant="primary" size="lg" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/app-screenshots/screenshot-1.jpg"
                  alt="Daily Challenge Interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/app-screenshots/screenshot-3.jpg"
                  alt="Challenge Leaderboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/app-screenshots/screenshot-2.jpg"
                  alt="Achievement Unlock"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/app-screenshots/screenshot-4.jpg"
                  alt="Community Rankings"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Study Groups */}
      <Section backgroundVariant="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Study Groups & Collaboration
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Form study groups with peers, share progress, and learn together. 
            The power of collaborative learning amplified through our app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2.5c0-2.45 1.55-4.5 4-4.5s4 2.05 4 4.5V14h2v4H4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Form Groups</h3>
            <p className="text-gray-700">Create or join study groups based on your medical school, specialty, or learning level.</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share Progress</h3>
            <p className="text-gray-700">Share achievements, discuss challenging cases, and motivate each other to reach learning goals.</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Group Challenges</h3>
            <p className="text-gray-700">Participate in group-specific challenges and compete with other study groups.</p>
          </Card>
        </div>
      </Section>

      {/* Join Community CTA */}
      <Section padding="xl" className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Download the E-PulsePoints app and become part of a global community 
            of medical professionals and students learning ECG interpretation together.
          </p>
          
          <AppCTAButton variant="primary" size="lg" showBoth={true} className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">10,000+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Active Members</div>
              <div className="text-gray-700">Join a thriving community</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Countries</div>
              <div className="text-gray-700">Global learning network</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Community Activity</div>
              <div className="text-gray-700">Always someone online to help</div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}