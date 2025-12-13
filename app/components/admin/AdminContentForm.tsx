'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ContentType = 'news' | 'blog';

export default function AdminContentForm() {
  const [contentType, setContentType] = useState<ContentType>('news');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: 'research',
    tags: '',
    imageUrl: '',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const baseData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        imageUrl: formData.imageUrl || undefined,
        tags: tagsArray,
        publishedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0,
      };

      if (contentType === 'news') {
        await addDoc(collection(db, 'news'), {
          ...baseData,
          category: formData.category as 'research' | 'clinical' | 'technology' | 'education',
          featured: formData.featured,
        });
      } else {
        await addDoc(collection(db, 'blog'), {
          ...baseData,
          authorId: 'admin', // Replace with actual auth
          likes: 0,
          commentCount: 0,
        });
      }

      setMessage(`${contentType === 'news' ? 'Article' : 'Blog post'} published successfully!`);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: 'research',
        tags: '',
        imageUrl: '',
        featured: false,
      });
    } catch (error) {
      console.error('Error publishing content:', error);
      setMessage('Error publishing content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Admin Content Manager</h2>
        
        {/* Content Type Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setContentType('news')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              contentType === 'news'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📰 News Article
          </button>
          <button
            onClick={() => setContentType('blog')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              contentType === 'blog'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ✍️ Blog Post
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              required
              placeholder="Enter article title"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Excerpt *</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none h-24 resize-none"
              required
              placeholder="Brief summary (2-3 sentences)"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none h-64 resize-none font-mono text-sm"
              required
              placeholder="Full article content (supports markdown)"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Author *</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              required
              placeholder="Author name"
            />
          </div>

          {/* Category (News only) */}
          {contentType === 'news' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="research">🔬 Research</option>
                <option value="clinical">⚕️ Clinical</option>
                <option value="technology">💻 Technology</option>
                <option value="education">🎓 Education</option>
              </select>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="ECG, cardiology, education, ..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Featured (News only) */}
          {contentType === 'news' && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm font-bold text-slate-700">
                ⭐ Featured Article
              </label>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-4 rounded-xl font-bold text-white transition-all ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : contentType === 'news'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isSubmitting ? 'Publishing...' : `Publish ${contentType === 'news' ? 'Article' : 'Blog Post'}`}
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl ${
            message.includes('Error') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
