import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Study Groups - E-PulsePoints',
  description: 'Join our ECG study groups and learn collaboratively with medical professionals worldwide.',
};

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Study Groups
          </h1>
          <p className="text-xl text-purple-100">
            Learn together, grow together - Join collaborative ECG study sessions
          </p>
        </div>
      </Section>

      {/* Coming Soon */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">👥</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Study Groups Coming Soon!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We&apos;re creating a platform for medical professionals to collaborate, share knowledge, 
            and learn ECG interpretation together. Stay connected for updates!
          </p>
        </div>
      </Section>

      {/* Features Preview */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We&apos;re Building</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Discussion Forums</h3>
              <p className="text-slate-600">
                Engage in meaningful discussions about challenging ECG cases and interpretations
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Study Sessions</h3>
              <p className="text-slate-600">
                Join scheduled group sessions with expert instructors and peer learners
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Shared Resources</h3>
              <p className="text-slate-600">
                Access curated study materials and ECG cases contributed by the community
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Group Challenges</h3>
              <p className="text-slate-600">
                Participate in collaborative challenges and competitions to test your skills
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Study in Groups?</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="text-3xl">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Peer Learning</h3>
                <p className="text-slate-600">
                  Learn from diverse perspectives and experiences of fellow medical professionals
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Stay Motivated</h3>
                <p className="text-slate-600">
                  Group accountability helps you stay consistent with your learning goals
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-3xl">🎓</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Guidance</h3>
                <p className="text-slate-600">
                  Benefit from facilitated sessions led by experienced cardiologists
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Global Network</h3>
                <p className="text-slate-600">
                  Connect with medical professionals from around the world
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            Be the First to Join
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Sign up for our newsletter to get notified when study groups launch
          </p>
          <Link
            href="/blog#newsletter"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </Section>
    </div>
  );
}
