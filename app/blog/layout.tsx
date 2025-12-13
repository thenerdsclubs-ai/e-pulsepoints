import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECG Blog - Latest Articles & Case Studies | E-PulsePoints',
  description: 'Read the latest ECG articles, case studies, and medical education content. Learn from expert insights on cardiology, arrhythmias, and myocardial infarction.',
  keywords: ['ECG blog', 'cardiology articles', 'MI cases', 'arrhythmia', 'medical education', 'ECG case studies', 'EKG learning'],
  openGraph: {
    title: 'E-PulsePoints ECG Blog',
    description: 'Latest ECG articles, case studies, and medical education content.',
    url: 'https://ecgkid.com/blog',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-PulsePoints ECG Blog',
    description: 'Latest ECG articles and case studies.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
