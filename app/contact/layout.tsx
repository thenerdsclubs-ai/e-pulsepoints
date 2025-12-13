import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact E-PulsePoints - Get Support & Send Feedback',
  description: 'Contact E-PulsePoints for support, feedback, or inquiries. We\'re here to help you with your ECG learning journey.',
  keywords: ['contact E-PulsePoints', 'customer support', 'feedback', 'help', 'ECG support'],
  openGraph: {
    title: 'Contact E-PulsePoints',
    description: 'Get support and send feedback for your ECG learning journey.',
    url: 'https://ecgkid.com/contact',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact E-PulsePoints',
    description: 'Get support and send feedback.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
