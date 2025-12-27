import { getAllArticles } from '@/lib/articles';
import { getFeaturedVideos } from '@/lib/videos';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/app/components/ui/Section';
import Card from '@/app/components/ui/Card';

export const revalidate = 3600; // Revalidate every hour

export default async function AuthorPage() {
  // Get all articles (file-based)
  const allArticles = await Promise.resolve(getAllArticles());
  const totalArticles = allArticles.length;
  const articles = allArticles.slice(0, 10); // Show first 10

  const authorInfo = {
    name: 'Dr. Raj K Reddy',
    title: 'Board-Certified Emergency Medicine Physician',
    credentials: 'MD, Emergency Medicine',
    avatar: '/team/dr-raj-k-reddy.jpg',
    bio: `Dr. Raj K Reddy is a board-certified Emergency Medicine physician with extensive experience in acute cardiac care and ECG interpretation. With a passion for medical education, Dr. Reddy founded E-PulsePoints to bridge the gap between theoretical knowledge and practical clinical skills in ECG interpretation.

Throughout his career in emergency medicine, Dr. Reddy has treated thousands of patients with cardiac emergencies, gaining invaluable real-world experience in rapid ECG assessment and life-saving interventions. This hands-on expertise forms the foundation of the evidence-based educational content he creates.`,
    expertise: [
      'Emergency Cardiac Care',
      'ECG Interpretation & Analysis',
      'Acute Coronary Syndromes',
      'Arrhythmia Recognition',
      'STEMI & NSTEMI Management',
      'Medical Education & Training'
    ],
    education: [
      {
        degree: 'Doctor of Medicine (MD)',
        institution: 'Medical School',
        year: 'Board-Certified in Emergency Medicine'
      }
    ],
    achievements: [
      'Founded E-PulsePoints ECG Learning Platform',
      'Published 100+ Educational ECG Articles',
      'Trained thousands of healthcare providers',
      'Developed innovative mobile ECG learning app',
      'Created comprehensive ECG interpretation curriculum'
    ],
    social: {
      email: 'dr.raj@ecgkid.com',
      linkedin: '#',
      twitter: '#'
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getValidImageUrl = (imageUrl: string | undefined): string | null => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (!imageUrl.startsWith('/')) {
      return '/' + imageUrl;
    }
    return imageUrl;
  };

  return (
    <>
      {/* Author Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": authorInfo.name,
            "jobTitle": authorInfo.title,
            "description": authorInfo.bio,
            "url": "https://ecgkid.com/author/raj-k-reddy",
            "sameAs": [
              authorInfo.social.linkedin,
              authorInfo.social.twitter
            ],
            "knowsAbout": authorInfo.expertise,
            "alumniOf": authorInfo.education.map(edu => ({
              "@type": "EducationalOrganization",
              "name": edu.institution
            })),
            "award": authorInfo.achievements
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ecgkid.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Authors",
                "item": "https://ecgkid.com/author"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": authorInfo.name,
                "item": "https://ecgkid.com/author/raj-k-reddy"
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <Section backgroundVariant="gradient" padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <Link 
                href="/blog"
                className="inline-flex items-center text-blue-900 hover:text-blue-700 font-semibold mb-6"
              >
                ← Back to Articles
              </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Author Photo */}
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-bold text-6xl">
                      RKR
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                    {authorInfo.name}
                  </h1>
                  <p className="text-2xl text-blue-600 font-semibold mb-4">
                    {authorInfo.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                    <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      {authorInfo.credentials}
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      Founder, E-PulsePoints
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 justify-center md:justify-start mb-6">
                    <div>
                      <div className="text-3xl font-black text-red-600">{totalArticles}+</div>
                      <div className="text-sm text-gray-600">Articles Published</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-red-600">50K+</div>
                      <div className="text-sm text-gray-600">Students Trained</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-red-600">10+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a
                      href={`mailto:${authorInfo.social.email}`}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Email Dr. Raj K Reddy"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                    <a
                      href={authorInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                    <a
                      href={authorInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-sky-500 hover:bg-sky-600 rounded-full transition-colors"
                      aria-label="Twitter profile"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.04-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.27 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63.96-.7 1.8-1.56 2.46-2.55z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section padding="xl">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Bio */}
              <div className="lg:col-span-2">
                <Card variant="elevated" padding="lg">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">About Dr. Reddy</h2>
                  <div className="prose prose-lg max-w-none">
                    {authorInfo.bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Key Achievements</h3>
                    <ul className="space-y-3">
                      {authorInfo.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span className="text-gray-700 text-lg">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Areas of Expertise */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Areas of Expertise</h3>
                  <div className="space-y-2">
                    {authorInfo.expertise.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm font-semibold text-gray-800"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Education */}
                <Card variant="elevated" padding="lg">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Education & Credentials</h3>
                  <div className="space-y-4">
                    {authorInfo.education.map((edu, index) => (
                      <div key={index}>
                        <div className="font-bold text-gray-900">{edu.degree}</div>
                        <div className="text-sm text-gray-600">{edu.institution}</div>
                        <div className="text-sm text-blue-600 mt-1">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Contact CTA */}
                <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <h3 className="text-xl font-black mb-3">Get Expert Consultation</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Need expert review of your ECG cases? Schedule a consultation with Dr. Reddy.
                  </p>
                  <Link
                    href="/expert-review"
                    className="block w-full text-center px-4 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    Book Consultation
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </Section>

        {/* Published Articles */}
        <Section backgroundVariant="gray" padding="xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Published Articles
              </h2>
              <p className="text-xl text-gray-600">
                {totalArticles > 0 
                  ? `${totalArticles} articles written by Dr. Raj K Reddy`
                  : 'Loading articles...'}
              </p>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => {
                  const imageUrl = getValidImageUrl(article.imageUrl);
                  
                  return (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="group"
                    >
                      <Card variant="elevated" className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                        {imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={article.title}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold capitalize">
                              {article.tags[0] || 'ECG'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                          <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {article.excerpt}
                          </p>
                          <span className="text-blue-600 font-semibold group-hover:underline">
                            Read more →
                          </span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </Section>

        {/* CTA Section */}
        <Section padding="xl">
          <div className="max-w-4xl mx-auto text-center">
            <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Learn ECG Interpretation with Dr. Reddy
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Download the E-PulsePoints mobile app and access comprehensive ECG lessons, 
                practice cases, and interactive learning tools created by Dr. Raj K Reddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-white text-blue-600 py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span>Download on Google Play</span>
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-white text-white py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-white hover:text-blue-600 font-bold"
                >
                  <span>Read More Articles</span>
                </Link>
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </>
  );
}
