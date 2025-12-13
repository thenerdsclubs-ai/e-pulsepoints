import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Practice Tests - E-PulsePoints',
  description: 'Test your ECG interpretation skills with our comprehensive practice tests and quizzes.',
};

export default function PracticeTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Practice Tests
          </h1>
          <p className="text-xl text-purple-100">
            Master ECG interpretation through interactive practice and instant feedback
          </p>
        </div>
      </Section>

      {/* Coming Soon */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">🎯</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Practice Tests Coming Soon!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            We&apos;re building a comprehensive testing platform with hundreds of practice questions, 
            detailed explanations, and performance tracking. Stay tuned!
          </p>
        </div>
      </Section>

      {/* Features Preview */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Comprehensive Tests</h3>
              <p className="text-slate-600">
                Hundreds of practice questions covering all ECG topics from basic to advanced
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
              <p className="text-slate-600">
                Detailed explanations for every answer to help you learn from mistakes
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600">
                Monitor your improvement with detailed analytics and performance metrics
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mobile App CTA */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 text-center border-2 border-purple-200">
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Practice On The Go
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Download our mobile app to practice ECG interpretation anytime, anywhere with 
            real-world cases and instant feedback.
          </p>
          <Link
            href="/#app-section"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Learn More About Our App
          </Link>
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            Get Notified When We Launch
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Subscribe to our newsletter to be the first to know when practice tests go live
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
