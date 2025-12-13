import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Tools & Calculators - E-PulsePoints',
  description: 'Essential medical calculators for ECG interpretation, cardiology assessments, and clinical decision support. Educational tools for medical professionals.',
  keywords: ['medical calculators', 'QTc calculator', 'heart rate calculator', 'CHA2DS2-VASc', 'HAS-BLED', 'medical tools'],
  openGraph: {
    title: 'Medical Tools & Calculators',
    description: 'Essential medical calculators for ECG interpretation and cardiology assessments.',
    url: 'https://ecgkid.com/tools',
    type: 'website',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://ecgkid.com/tools',
  },
};

const tools = [
  {
    title: 'QTc Calculator',
    description: 'Calculate corrected QT interval using Bazett formula',
    icon: '⚡',
    href: '/tools/qtc-calculator',
    category: 'ECG',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Heart Rate Calculator',
    description: 'Calculate heart rate from RR interval or ECG squares',
    icon: '💓',
    href: '/tools/heart-rate-calculator',
    category: 'ECG',
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Mean Arterial Pressure',
    description: 'Calculate MAP from systolic and diastolic pressures',
    icon: '🩺',
    href: '/tools/mean-arterial-pressure',
    category: 'Hemodynamics',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Body Mass Index',
    description: 'Calculate BMI and interpret weight categories',
    icon: '⚖️',
    href: '/tools/body-mass-index',
    category: 'General',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    title: 'CHA₂DS₂-VASc Score',
    description: 'Assess stroke risk in atrial fibrillation patients',
    icon: '🧠',
    href: '/tools/cha2ds2-vasc',
    category: 'Risk Assessment',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'HAS-BLED Score',
    description: 'Evaluate bleeding risk for anticoagulation therapy',
    icon: '🩸',
    href: '/tools/has-bled',
    category: 'Risk Assessment',
    color: 'from-rose-500 to-red-500'
  },
  {
    title: 'ABG Interpreter',
    description: 'Interpret acid–base disorders using pH, PaCO₂, and HCO₃⁻ with step-by-step logic',
    icon: '💨',
    href: '/tools/abg-interpreter',
    category: 'ICU / Respiratory',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Anion Gap Calculator',
    description: 'Calculate anion gap and classify high-gap vs normal-gap metabolic acidosis',
    icon: '🔬',
    href: '/tools/anion-gap',
    category: 'Metabolic',
    color: 'from-emerald-500 to-green-500'
  },
  {
    title: 'PaO₂ / FiO₂ Ratio',
    description: 'Assess oxygenation status and classify ARDS severity',
    icon: '🫁',
    href: '/tools/pf-ratio',
    category: 'ICU / Respiratory',
    color: 'from-sky-500 to-cyan-500'
  },
  {
    title: 'Corrected Calcium Calculator',
    description: 'Adjust serum calcium based on albumin level for accurate interpretation',
    icon: '🦴',
    href: '/tools/corrected-calcium',
    category: 'Electrolytes',
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Creatinine Clearance',
    description: 'Estimate renal function using the Cockcroft–Gault equation',
    icon: '🏥',
    href: '/tools/creatinine-clearance',
    category: 'Renal',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    title: 'Sodium Correction in Hyperglycemia',
    description: 'Calculate corrected sodium levels in hyperglycemic states',
    icon: '🍯',
    href: '/tools/sodium-correction',
    category: 'Electrolytes',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    title: 'ECG Heart Axis Calculator',
    description: 'Determine cardiac electrical axis using limb lead polarity',
    icon: '🧭',
    href: '/tools/ecg-axis',
    category: 'ECG',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Cardiac Output Calculator',
    description: 'Estimate cardiac output using heart rate and stroke volume',
    icon: '❤️‍🔥',
    href: '/tools/cardiac-output',
    category: 'Hemodynamics',
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Shock Index Calculator',
    description: 'Assess hemodynamic instability using heart rate and systolic blood pressure',
    icon: '⚡',
    href: '/tools/shock-index',
    category: 'Emergency / ICU',
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'Body Surface Area (BSA) Calculator',
    description: 'Calculate body surface area using the Mosteller formula',
    icon: '📏',
    href: '/tools/bsa',
    category: 'General / Dosing',
    color: 'from-slate-500 to-gray-500'
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-3xl">🧮</span>
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/logo.png"
                  alt="E-PulsePoints logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Medical Tools & Calculators
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Essential calculators for ECG interpretation, cardiology assessments, and clinical decision support. 
              All tools are designed for educational purposes and learning support.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <span className="text-amber-500 text-xl">⚠️</span>
                <p className="text-amber-800 font-semibold text-left">
                  <strong>Educational Use Only:</strong> These tools are for learning and reference only. 
                  They do not replace clinical judgment or medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className={`h-3 bg-gradient-to-r ${tool.color}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center text-white text-xl mr-4`}>
                        {tool.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-blue-600 font-semibold">
                      <span>Open Calculator</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* App Promotion */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Practice ECG Interpretation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Take your medical education to the next level with interactive ECG cases, 
              real-time simulations, and expert-guided learning.
            </p>
            
            <Link
              href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div>
                <div className="text-sm text-blue-500">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}