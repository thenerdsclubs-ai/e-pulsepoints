'use client';

import Link from 'next/link';
import { Smartphone, CheckCircle2, Download, Heart } from 'lucide-react';

export default function AppCTA() {
  return (
    <div className="my-16 p-8 md:p-10 lg:p-12 bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl">
              <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Master ECGs on the Go!
          </h3>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Take your ECG learning to the next level with the <span className="font-bold text-white">E-PulsePoints</span> mobile app. 
            Access hundreds of ECG cases, interactive quizzes, and expert guidance—anytime, anywhere.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <CheckCircle2 className="w-8 h-8 text-white mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">500+ ECG Cases</h4>
            <p className="text-sm text-white/80">
              Learn from real-world examples with detailed explanations
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <CheckCircle2 className="w-8 h-8 text-white mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">Interactive Quizzes</h4>
            <p className="text-sm text-white/80">
              Test your knowledge and track your progress
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <CheckCircle2 className="w-8 h-8 text-white mb-3" />
            <h4 className="text-lg font-bold text-white mb-2">Offline Access</h4>
            <p className="text-sm text-white/80">
              Study anywhere without internet connection
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-pink-600 font-black text-lg md:text-xl rounded-2xl shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 group"
          >
            <Smartphone className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            Download E-PulsePoints App
            <Download className="w-7 h-7 group-hover:translate-y-1 transition-transform" />
          </Link>
          
          <p className="mt-4 text-sm text-white/70">
            Available on Google Play Store • Free to Download
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <div className="flex items-center justify-center gap-2 text-white/90 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 fill-yellow-300"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="font-bold">4.8/5</span>
          </div>
          <p className="text-sm text-white/70">
            Join thousands of healthcare professionals improving their ECG skills
          </p>
        </div>
      </div>
    </div>
  );
}
