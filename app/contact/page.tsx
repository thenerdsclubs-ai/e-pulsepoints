'use client';

import { useState } from 'react';
import Section from '../components/ui/Section';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('❌ Please fill in all required fields');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitMessage('');

      await addDoc(collection(db, 'contact-messages'), {
        ...formData,
        submittedAt: Timestamp.now(),
        status: 'new'
      });

      setSubmitMessage('✅ Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('❌ Failed to send message. Please try again.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-purple-100">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </Section>

      {/* Contact Form */}
      <Section padding="xl">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:outline-none disabled:opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:outline-none disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={submitting}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={submitting}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:outline-none disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <div className="text-center p-4 rounded-xl bg-slate-100 font-semibold">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </Section>

      {/* Contact Info */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">support@epulsepoints.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Support</h3>
              <p className="text-slate-600">Available Monday-Friday<br />9 AM - 5 PM EST</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Follow Us</h3>
              <p className="text-slate-600">Connect with us on social media</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
