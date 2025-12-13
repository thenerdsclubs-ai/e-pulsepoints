import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Forum - Discuss ECG & Cardiology | E-PulsePoints',
  description: 'Join discussions about ECG interpretation, share case studies, get help, and connect with medical professionals in the E-PulsePoints community forum.',
  keywords: ['ECG forum', 'cardiology discussion', 'medical forum', 'ECG help', 'case studies', 'medical community'],
  openGraph: {
    title: 'E-PulsePoints Community Forum',
    description: 'Discuss ECG interpretation and connect with medical professionals.',
    url: 'https://ecgkid.com/forum',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-PulsePoints Community Forum',
    description: 'Discuss ECG interpretation with medical professionals.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/forum',
  },
};

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
