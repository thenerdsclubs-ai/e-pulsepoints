import { ReactNode } from 'react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

export default function CalculatorLayout({ title, description, icon, children }: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mr-4">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{title}</h1>
                <p className="text-slate-600 text-lg">{description}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 text-lg">⚠️</span>
                <p className="text-amber-800 font-semibold">
                  <strong>Educational Use Only:</strong> This tool is for educational purposes only. 
                  It does not replace clinical judgment or medical advice.
                </p>
              </div>
            </div>
          </div>

          {/* Calculator Content */}
          {children}

          {/* App Promotion */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 md:p-8 mt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Practice ECG Interpretation & Clinical Scenarios
              </h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Master your skills with interactive cases, real-time simulations, and expert-guided learning in the E-PulsePoints mobile app.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-white text-green-600 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span>Get the App</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}