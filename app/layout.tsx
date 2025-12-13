import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GamificationHeader from "./components/ui/GamificationHeader";
import LoadingScreen from "./components/ui/LoadingScreen";
import { AdminProvider } from "@/contexts/AdminContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "E-PulsePoints - Master ECG Interpretation | Medical Education Platform",
  description: "Learn ECG interpretation through interactive education, practice with our mobile app, and get expert consultation. The complete ECG learning ecosystem for medical professionals.",
  keywords: ["ECG", "EKG", "medical education", "cardiology", "medical students", "ECG interpretation", "heart rhythm"],
  authors: [{ name: "E-PulsePoints" }],
  creator: "E-PulsePoints",
  publisher: "E-PulsePoints",
  openGraph: {
    title: "E-PulsePoints - Master ECG Interpretation",
    description: "Complete ECG learning ecosystem with interactive education, mobile practice app, and expert consultation.",
    url: "https://epulsepoints.com",
    siteName: "E-PulsePoints",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-PulsePoints - Master ECG Interpretation",
    description: "Complete ECG learning ecosystem with interactive education, mobile practice app, and expert consultation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />
        <meta name="theme-color" content="#dc2626" />
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
