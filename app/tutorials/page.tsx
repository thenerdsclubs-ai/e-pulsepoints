import Section from '../components/ui/Section';
import Link from 'next/link';

export const metadata = {
  title: 'ECG Tutorials - E-PulsePoints',
  description: 'Comprehensive ECG tutorials covering rhythm interpretation, conduction abnormalities, and clinical applications.',
};

export default function TutorialsPage() {
  const tutorials = [
    {
      category: 'Basic ECG',
      icon: '📊',
      topics: [
        'ECG Basics and Lead Placement',
        'Normal Sinus Rhythm',
        'Rate and Rhythm Calculation',
        'P Wave, QRS Complex, and T Wave',
        'Intervals and Segments'
      ]
    },
    {
      category: 'Arrhythmias',
      icon: '💓',
      topics: [
        'Atrial Fibrillation',
        'Atrial Flutter',
        'Supraventricular Tachycardia',
        'Ventricular Tachycardia',
        'Premature Contractions'
      ]
    },
    {
      category: 'Conduction Blocks',
      icon: '🚧',
      topics: [
        'First-Degree AV Block',
        'Second-Degree AV Block (Mobitz I & II)',
        'Third-Degree (Complete) Heart Block',
        'Bundle Branch Blocks',
        'Fascicular Blocks'
      ]
    },
    {
      category: 'Myocardial Infarction',
      icon: '🚨',
      topics: [
        'STEMI Recognition',
        'Anterior Wall MI',
        'Inferior Wall MI',
        'Lateral Wall MI',
        'Posterior Wall MI'
      ]
    },
    {
      category: 'Advanced Topics',
      icon: '🎓',
      topics: [
        'Left Ventricular Hypertrophy',
        'Right Ventricular Hypertrophy',
        'Pericarditis',
        'Electrolyte Abnormalities',
        'Drug Effects on ECG'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            ECG Tutorials
          </h1>
          <p className="text-xl text-purple-100">
            Master ECG interpretation with our comprehensive, expertly-crafted tutorials
          </p>
        </div>
      </Section>

      {/* Tutorial Categories */}
      <Section padding="xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Learning Path</h2>
            <p className="text-lg text-slate-600">
              From foundational concepts to advanced interpretation skills
            </p>
          </div>

          <div className="space-y-8">
            {tutorials.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-purple-300 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{category.category}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-center gap-2 text-slate-700">
                          <span className="text-purple-600">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Tutorial Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real ECG Examples</h3>
              <p className="text-slate-600">
                Learn from actual ECG tracings with detailed annotations and explanations
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Step-by-Step Guidance</h3>
              <p className="text-slate-600">
                Systematic approach to ECG interpretation with clear diagnostic criteria
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Practice Questions</h3>
              <p className="text-slate-600">
                Test your knowledge with interactive quizzes and case studies
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            Start Learning Today
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Access our comprehensive ECG tutorials and case studies
          </p>
          <Link
            href="/blog"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Explore Tutorials
          </Link>
        </div>
      </Section>
    </div>
  );
}
