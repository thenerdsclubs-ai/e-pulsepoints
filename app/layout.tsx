import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./performance.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GamificationHeader from "./components/ui/GamificationHeader";
import LoadingScreen from "./components/ui/LoadingScreen";
import { AdminProvider } from "@/contexts/AdminContext";
import { generateWebSiteSchema } from "@/lib/schemas";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Faster font loading
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ecgkid.com'),
  title: {
    default: "E-PulsePoints - Master ECG Interpretation | Medical Education Platform",
    template: "%s | E-PulsePoints"
  },
  description: "Learn ECG interpretation through interactive education, practice with our mobile app, and get expert consultation. The complete ECG learning ecosystem for medical professionals.",
  keywords: ["ECG", "EKG", "medical education", "cardiology", "medical students", "ECG interpretation", "heart rhythm", "arrhythmia", "myocardial infarction", "ECG learning", "medical app"],
  authors: [{ name: "E-PulsePoints" }],
  creator: "E-PulsePoints",
  publisher: "E-PulsePoints",
  applicationName: "E-PulsePoints",
  openGraph: {
    title: "E-PulsePoints - Master ECG Interpretation",
    description: "Complete ECG learning ecosystem with interactive education, mobile practice app, and expert consultation.",
    url: "https://ecgkid.com",
    siteName: "E-PulsePoints",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-PulsePoints - Master ECG Interpretation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-PulsePoints - Master ECG Interpretation",
    description: "Complete ECG learning ecosystem with interactive education, mobile practice app, and expert consultation.",
    images: ["/og-image.png"],
    creator: "@epulsepoints",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ecgkid.com',
  },
  category: 'Medical Education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo/logo.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo/logo.png" />
        <link rel="shortcut icon" href="/logo/logo.png" />
        
        {/* Web App Manifest */}
        <meta name="application-name" content="E-PulsePoints" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="E-PulsePoints" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-TileImage" content="/logo/logo.png" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'E-PulsePoints',
              alternateName: 'E-PulsePoints ECG Learning',
              description: 'Master ECG interpretation through interactive education, mobile practice app, and expert consultation.',
              url: 'https://ecgkid.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://ecgkid.com/logo/logo.png',
                width: 512,
                height: 512,
                caption: 'E-PulsePoints logo - ECG learning platform',
              },
              image: {
                '@type': 'ImageObject',
                url: 'https://ecgkid.com/og-image.png',
                width: 1200,
                height: 630,
                caption: 'E-PulsePoints - Master ECG Interpretation',
              },
              sameAs: [
                'https://www.facebook.com/ecgkid',
                'https://twitter.com/ecgkid',
                'https://www.linkedin.com/company/ecgkid',
                'https://www.instagram.com/ecgkid',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'support@ecgkid.com',
              },
              offers: {
                '@type': 'Offer',
                category: 'Medical Education',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '1250',
                bestRating: '5',
                worstRating: '1',
              },
              publisher: {
                '@type': 'Organization',
                name: 'E-PulsePoints',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://ecgkid.com/logo/logo.png',
                  width: 512,
                  height: 512,
                  caption: 'E-PulsePoints brand logo',
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AdminProvider>
          <LoadingScreen />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <GamificationHeader />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </body>
    </html>
  );
}
