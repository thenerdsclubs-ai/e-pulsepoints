import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import AppCTAButton from '../components/ui/AppCTAButton';
import MascotImage from '../components/ui/MascotImage';

export const metadata: Metadata = {
  title: 'About E-PulsePoints - Mission & Vision for ECG Medical Education',
  description: 'Learn about E-PulsePoints mission to transform ECG education for medical professionals. Our vision for accessible, interactive, and expert-guided learning.',
  keywords: ['about E-PulsePoints', 'ECG education mission', 'medical education platform', 'team', 'cardiology education', 'medical learning'],
  openGraph: {
    title: 'About E-PulsePoints - Our Mission',
    description: 'Transforming ECG education for medical professionals through accessible, interactive learning.',
    url: 'https://ecgkid.com/about',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About E-PulsePoints',
    description: 'Transforming ECG education for medical professionals.',
  },
  alternates: {
    canonical: 'https://ecgkid.com/about',
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Michael Anderson',
      role: 'Chief Medical Officer',
      credentials: 'MD, FACC',
      description: 'Board-certified cardiologist with 15+ years experience in medical education',
      image: '/team/dr-anderson.jpg'
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Lead Educator',
      credentials: 'MD, MEd',
      description: 'Medical education specialist focusing on innovative learning methodologies',
      image: '/team/dr-williams.jpg'
    },
    {
      name: 'Dr. James Chen',
      role: 'Cardiology Consultant',
      credentials: 'MD, PhD',
      description: 'Electrophysiology expert and academic researcher',
      image: '/team/dr-chen.jpg'
    },
    {
      name: 'Alex Thompson',
      role: 'Technology Director',
      credentials: 'MS Computer Science',
      description: 'Former Google engineer specializing in educational technology',
      image: '/team/alex-thompson.jpg'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Platform Founded', description: 'Started with a vision to revolutionize ECG education' },
    { year: '2021', title: 'First Mobile App', description: 'Launched interactive ECG learning app' },
    { year: '2022', title: '10,000 Users', description: 'Reached first major user milestone' },
    { year: '2023', title: 'Expert Network', description: 'Established network with board-certified cardiologists' },
    { year: '2024', title: 'Global Community', description: 'Expanded to serve medical professionals worldwide' }
  ];

  const values = [
    {
      title: 'Educational Excellence',
      description: 'Commitment to the highest standards in medical education content and methodology',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: 'Medical Integrity',
      description: 'All content reviewed by board-certified cardiologists and medical educators',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: 'Innovation in Learning',
      description: 'Leveraging technology to make medical education more engaging and effective',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.89-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2z"/>
        </svg>
      )
    },
    {
      title: 'Global Accessibility',
      description: 'Making quality ECG education accessible to medical professionals worldwide',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 16.09c-3.36-.91-6.17-3.54-7.12-6.89h5.13c.29 1.68.84 3.23 1.6 4.57-.52.23-1.08.37-1.61.32zm-2.65-9.37H2.67c.99-3.35 3.8-5.98 7.12-6.89-.76 1.35-1.31 2.9-1.6 4.57.53.02 1.09.16 1.61.32h5.13c-.95 3.35-3.76 5.98-7.12 6.89-.52-.95-.76-1.35-1.31-2.9.01-.68.29-1.68.84-3.23-.76-1.35 1.31-2.9 1.60-4.57z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section backgroundVariant="gradient" padding="xl" className="medical-hero">
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Transforming <span className="text-gradient">ECG Education</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
              Our mission is to make high-quality ECG education accessible, engaging, and effective 
              for medical professionals and students worldwide through innovative technology 
              and expert-guided learning.
            </p>

            <div className="flex justify-center mb-16">
              <MascotImage 
                src="/mascots/Dr. Pulse_teaching.png"
                alt="E-PulsePoints Mission Mascot"
                size="xl"
                position="center"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To democratize access to high-quality ECG education by providing interactive, 
              expert-guided learning experiences that enhance clinical competency and 
              improve patient care outcomes globally.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM7.5 12l3-2.5 3 2.5-3 2.5L7.5 12zm4.5 4.5L8.5 14l3-2.5 3 2.5-3 2.5z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A world where every medical professional has the confidence and competency 
              to interpret ECGs accurately, leading to better patient outcomes and 
              advancing the standard of cardiovascular care worldwide.
            </p>
          </Card>
        </div>
      </Section>

      {/* Values */}
      <Section backgroundVariant="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The principles that guide everything we do in developing and delivering 
            ECG education solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <Card key={value.title} variant="elevated" padding="lg" className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-700 leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Story & Timeline */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From a simple idea to a global platform serving thousands of medical professionals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-center space-x-8">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-red-600">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-red-600 rounded-full relative">
                    {index < milestones.length - 1 && (
                      <div className="absolute top-4 left-1/2 w-0.5 h-12 bg-red-200 -translate-x-px"></div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section backgroundVariant="gradient" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A combination of medical experts, educators, and technologists dedicated 
            to advancing ECG education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} variant="elevated" padding="lg" className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                {/* Placeholder for team member photos */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <div className="text-red-600 font-semibold mb-1">{member.role}</div>
              <div className="text-sm text-blue-600 mb-4">{member.credentials}</div>
              <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Impact & Statistics */}
      <Section padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Global Impact
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Measuring success through the achievements of our learning community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-4">50,000+</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">App Downloads</div>
            <div className="text-gray-700">Medical professionals worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-4">95%</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Improvement Rate</div>
            <div className="text-gray-700">In ECG interpretation skills</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-4">150+</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Medical Schools</div>
            <div className="text-gray-700">Using our platform</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-4">50+</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Countries</div>
            <div className="text-gray-700">In our global community</div>
          </div>
        </div>
      </Section>

      {/* Trust & Credibility */}
      <Section backgroundVariant="gray" padding="xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Medical Institutions
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our platform is endorsed and used by leading medical education institutions worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Education Board</h3>
            <p className="text-gray-700">Officially recognized for excellence in medical education technology</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cardiology Association</h3>
            <p className="text-gray-700">Endorsed by leading cardiologists and medical professionals</p>
          </Card>

          <Card variant="elevated" padding="lg" className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Hospitals</h3>
            <p className="text-gray-700">Integrated into curricula at major teaching hospitals globally</p>
          </Card>
        </div>
      </Section>

      {/* Call to Action */}
      <Section padding="xl" className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Be part of the revolution in ECG education. Download our app and join thousands 
            of medical professionals advancing their skills with E-PulsePoints.
          </p>
          
          <AppCTAButton variant="primary" size="lg" showBoth={true} className="mb-8" />
          
          <div className="bg-blue-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Partner with Us?</h3>
            <p className="text-gray-700 mb-6">
              We're always looking for partnerships with medical institutions, educators, 
              and technology innovators who share our vision.
            </p>
            <Link href="mailto:partnerships@ecgkid.com" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}