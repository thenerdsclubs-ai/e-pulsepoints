import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - E-PulsePoints',
  description: 'Learn how E-PulsePoints collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-purple-100">
            Last Updated: December 13, 2025
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
          <p className="text-slate-700 mb-6">
            E-PulsePoints (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Information We Collect</h2>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Personal Information</h3>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Email address (for newsletter subscriptions and account creation)</li>
            <li>Name and professional information (if provided)</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Pages viewed and time spent on pages</li>
            <li>Referring website addresses</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Provide and maintain our services</li>
            <li>Send newsletters and educational content (with your consent)</li>
            <li>Improve our website and user experience</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze usage patterns to enhance our content</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Data Sharing and Disclosure</h2>
          <p className="text-slate-700 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Service providers who assist in operating our website (e.g., hosting, analytics)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Your Rights</h2>
          <p className="text-slate-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-slate-700 mb-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from newsletters at any time</li>
            <li>Object to processing of your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Cookies and Tracking</h2>
          <p className="text-slate-700 mb-6">
            We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Data Security</h2>
          <p className="text-slate-700 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Children&apos;s Privacy</h2>
          <p className="text-slate-700 mb-6">
            Our services are not intended for children under 13. We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Changes to This Policy</h2>
          <p className="text-slate-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Contact Us</h2>
          <p className="text-slate-700 mb-6">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700">
              our contact page
            </Link>.
          </p>
        </div>
      </Section>
    </div>
  );
}
