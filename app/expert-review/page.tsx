import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Expert Review - E-PulsePoints',
  description: 'Get personalized ECG interpretation guidance from experienced cardiologists.',
};

export default function ExpertReviewPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Expert Review
          </h1>
          <p className="text-xl text-purple-100">
            Personalized ECG interpretation guidance from experienced cardiologists
          </p>
        </div>
      </Section>

      {/* Main Content */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">👨‍⚕️</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Get Personalized Expert Guidance
            </h2>
            <p className="text-lg text-slate-600">
              Advance your ECG interpretation skills with one-on-one expert consultation and feedback
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border-2 border-purple-200 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What We Offer</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-purple-600 text-xl">✓</span>
                <div>
                  <strong className="text-slate-900">ECG Case Review:</strong>
                  <span className="text-slate-700"> Submit your challenging cases for expert analysis</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-600 text-xl">✓</span>
                <div>
                  <strong className="text-slate-900">Personalized Feedback:</strong>
                  <span className="text-slate-700"> Detailed explanations tailored to your learning needs</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-600 text-xl">✓</span>
                <div>
                  <strong className="text-slate-900">One-on-One Consultations:</strong>
                  <span className="text-slate-700"> Schedule sessions with experienced cardiologists</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-600 text-xl">✓</span>
                <div>
                  <strong className="text-slate-900">Learning Path Guidance:</strong>
                  <span className="text-slate-700"> Get customized recommendations for skill development</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Expert Review?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Targeted Learning</h3>
              <p className="text-slate-600">
                Focus on your specific areas of difficulty with personalized guidance
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accelerated Growth</h3>
              <p className="text-slate-600">
                Learn faster with expert insights and avoid common pitfalls
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clinical Confidence</h3>
              <p className="text-slate-600">
                Build confidence in your ECG interpretation for real clinical scenarios
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Your Request</h3>
                <p className="text-slate-600">
                  Contact us with your ECG cases, questions, or consultation needs
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Assignment</h3>
                <p className="text-slate-600">
                  We match you with a cardiologist specializing in your area of interest
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Receive Guidance</h3>
                <p className="text-slate-600">
                  Get detailed feedback, explanations, or schedule a consultation session
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Continue Learning</h3>
                <p className="text-slate-600">
                  Apply insights to your practice and submit follow-up questions as needed
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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Contact us to discuss your expert review needs
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </Section>
    </div>
  );
}
