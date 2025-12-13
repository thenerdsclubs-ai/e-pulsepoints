import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - E-PulsePoints',
  description: 'Terms and conditions for using E-PulsePoints educational platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-purple-100">
            Last Updated: December 13, 2025
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
          <p className="text-slate-700 mb-6">
            By accessing or using E-PulsePoints, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Educational Purpose</h2>
          <p className="text-slate-700 mb-6">
            E-PulsePoints provides educational content for medical professionals. Our content is designed to supplement, not replace, professional medical education and clinical judgment. Always consult appropriate medical guidelines and expert supervision when making clinical decisions.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">User Responsibilities</h2>
          <p className="text-slate-700 mb-4">As a user, you agree to:</p>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Provide accurate information when creating an account</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use our services only for lawful educational purposes</li>
            <li>Not share, reproduce, or distribute our content without permission</li>
            <li>Respect intellectual property rights</li>
            <li>Not use our services to harm others or spread misinformation</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Intellectual Property</h2>
          <p className="text-slate-700 mb-6">
            All content on E-PulsePoints, including text, images, ECG tracings, tutorials, and software, is the property of E-PulsePoints or its licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Medical Disclaimer</h2>
          <p className="text-slate-700 mb-6">
            The information provided on E-PulsePoints is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions regarding medical conditions. Never disregard professional medical advice or delay seeking it because of information obtained from E-PulsePoints.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Limitation of Liability</h2>
          <p className="text-slate-700 mb-6">
            E-PulsePoints and its affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services. This includes but is not limited to errors in content, service interruptions, or loss of data.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Service Availability</h2>
          <p className="text-slate-700 mb-6">
            We strive to maintain continuous service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">User-Generated Content</h2>
          <p className="text-slate-700 mb-6">
            If you submit comments, questions, or other content to E-PulsePoints, you grant us a non-exclusive, royalty-free, perpetual license to use, reproduce, and display such content. You represent that you own or have the right to share any content you submit.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Account Termination</h2>
          <p className="text-slate-700 mb-6">
            We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Governing Law</h2>
          <p className="text-slate-700 mb-6">
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Changes to Terms</h2>
          <p className="text-slate-700 mb-6">
            We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Contact Information</h2>
          <p className="text-slate-700 mb-6">
            For questions about these Terms of Service, please{' '}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700">
              contact us
            </Link>.
          </p>
        </div>
      </Section>
    </div>
  );
}
