'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Section from '../components/ui/Section';
import { useAdmin } from '@/contexts/AdminContext';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const { isAdmin, toggleAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const postsPerPage = 12;

  const popularTags = ['all', 'ECG Tips', 'Case Studies', 'Study Guide', 'Career', 'Technology'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsRef = collection(db, 'blog');
      const q = query(postsRef, orderBy('publishedAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const fetchedPosts: BlogPost[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
      });

      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getValidImageUrl = (imageUrl: string | undefined): string | null => {
    if (!imageUrl) return null;
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path without leading slash, add it
    if (!imageUrl.startsWith('/')) {
      return '/' + imageUrl;
    }
    
    return imageUrl;
  };

  const getAuthorName = (author: any): string => {
    if (typeof author === 'string') return author;
    if (typeof author === 'object' && author?.name) return author.name;
    return 'Anonymous';
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscribeMessage('Please enter a valid email address');
      setTimeout(() => setSubscribeMessage(''), 3000);
      return;
    }

    try {
      setSubscribing(true);
      setSubscribeMessage('');

      await addDoc(collection(db, 'newsletter-subscribers'), {
        email: email.toLowerCase().trim(),
        subscribedAt: Timestamp.now(),
        source: 'blog-page',
        active: true
      });

      setSubscribeMessage('✅ Successfully subscribed!');
      setEmail('');
      
      setTimeout(() => setSubscribeMessage(''), 5000);
    } catch (error: any) {
      console.error('Subscription error:', error);
      if (error.code === 'permission-denied') {
        setSubscribeMessage('❌ Subscription temporarily unavailable');
      } else {
        setSubscribeMessage('❌ Failed to subscribe. Please try again.');
      }
      setTimeout(() => setSubscribeMessage(''), 5000);
    } finally {
      setSubscribing(false);
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin || selectedPosts.size === 0) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete ${selectedPosts.size} article(s)? This action cannot be undone.`);
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const deletePromises = Array.from(selectedPosts).map(postId => 
        deleteDoc(doc(db, 'blog', postId))
      );
      
      await Promise.all(deletePromises);
      
      // Refresh posts and clear selection
      await fetchPosts();
      setSelectedPosts(new Set());
      alert(`Successfully deleted ${deletePromises.length} article(s)`);
    } catch (error) {
      console.error('Error deleting posts:', error);
      alert('Failed to delete articles. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
            <p className="text-sm font-semibold text-white/90">✍️ Expert Insights & Stories</p>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
            E-PulsePoints Blog
          </h1>
          <p className="text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto">
            Learn from medical professionals, discover study tips, and explore the world of ECG interpretation
          </p>
          
          {/* Admin Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={toggleAdmin}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all"
            >
              {isAdmin ? '🔓 Admin Mode (ON)' : '🔒 Admin Mode (OFF)'}
            </button>
          </div>
        </div>
      </Section>

      {/* Tag Filter */}
      <Section padding="md" className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
                }`}
              >
                {tag === 'all' ? '🌟 All Posts' : `#${tag}`}
              </button>
            ))}
          </div>
          
          {/* Admin Delete Controls */}
          {isAdmin && selectedPosts.size > 0 && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <span className="text-sm font-semibold text-slate-700">
                {selectedPosts.size} article(s) selected
              </span>
              <button
                onClick={handleDeleteSelected}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? '🗑️ Deleting...' : `🗑️ Delete Selected (${selectedPosts.size})`}
              </button>
              <button
                onClick={() => setSelectedPosts(new Set())}
                className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-2 rounded-full font-semibold text-sm transition-all"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section padding="xl" className="bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 h-56 rounded-2xl mb-4"></div>
                  <div className="bg-slate-200 h-6 rounded mb-3"></div>
                  <div className="bg-slate-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-slate-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-slate-600">Stay tuned for insightful articles and expert tips.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {currentPosts.length > 0 && (
                <div className="mb-12 relative">
                  {isAdmin && (
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedPosts.has(currentPosts[0].id)}
                        onChange={(e) => {
                          e.preventDefault();
                          handleSelectPost(currentPosts[0].id);
                        }}
                        className="w-6 h-6 cursor-pointer accent-purple-600"
                      />
                    </div>
                  )}
                  <Link
                    href={`/blog/${currentPosts[0].slug || currentPosts[0].id}`}
                    className="block bg-gradient-to-br from-slate-50 to-purple-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    onClick={(e) => {
                      if (isAdmin && selectedPosts.size > 0) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-96">
                        {getValidImageUrl(currentPosts[0].imageUrl) ? (
                          <Image
                            src={getValidImageUrl(currentPosts[0].imageUrl)!}
                            alt={currentPosts[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                            <span className="text-9xl">✍️</span>
                          </div>
                        )}
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentPosts[0].tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight group-hover:text-purple-600 transition-colors">
                          {currentPosts[0].title}
                        </h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                          {currentPosts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                          <span>By {getAuthorName(currentPosts[0].author)}</span>
                          <span>•</span>
                          <span>{formatDate(currentPosts[0].publishedAt)}</span>
                          <span>•</span>
                          <span>❤️ {currentPosts[0].likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.slice(1).map((post) => (
                  <div key={post.id} className="relative">
                    {isAdmin && (
                      <div className="absolute top-4 left-4 z-10">
                        <input
                          type="checkbox"
                          checked={selectedPosts.has(post.id)}
                          onChange={(e) => {
                            e.preventDefault();
                            handleSelectPost(post.id);
                          }}
                          className="w-5 h-5 cursor-pointer accent-purple-600"
                        />
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug || post.id}`}
                      className="group"
                      onClick={(e) => {
                        if (isAdmin && selectedPosts.size > 0) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 bg-slate-100">
                        {getValidImageUrl(post.imageUrl) ? (
                          <Image
                            src={getValidImageUrl(post.imageUrl)!}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-300 to-pink-400 flex items-center justify-center">
                            <span className="text-6xl">✍️</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs font-semibold">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                          <span>{formatDate(post.publishedAt)}</span>
                          <div className="flex items-center gap-3">
                            <span>❤️ {post.likes || 0}</span>
                            <span>💬 {post.commentCount || 0}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                  </div>
                ))}
              </div>

              {/* Featured Posts Section */}
              <div className="mt-16 mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Featured Post 1 - ECG Tutorial */}
                  <Link
                    href="/tutorials"
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all group"
                  >
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      Master ECG Interpretation
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Comprehensive tutorials covering all ECG patterns from basic rhythms to complex arrhythmias and MI recognition.
                    </p>
                    <span className="text-purple-600 font-semibold">Explore Tutorials →</span>
                  </Link>

                  {/* Featured Post 2 - Mobile App */}
                  <Link
                    href="/#app-section"
                    className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all group"
                  >
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Practice On the Go
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Download our mobile app to practice ECG interpretation with real cases, instant feedback, and track your progress.
                    </p>
                    <span className="text-blue-600 font-semibold">Get the App →</span>
                  </Link>

                  {/* Featured Post 3 - Expert Review */}
                  <Link
                    href="/expert-review"
                    className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all group"
                  >
                    <div className="text-4xl mb-4">👨‍⚕️</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Get Expert Guidance
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Submit challenging cases for expert review and get personalized feedback from experienced cardiologists.
                    </p>
                    <span className="text-orange-600 font-semibold">Learn More →</span>
                  </Link>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-purple-600 hover:bg-purple-50 border border-slate-200'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-purple-600 hover:bg-purple-50 border border-slate-200'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Never Miss a Post
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Get the latest articles and tips delivered straight to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={subscribing}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-purple-200 focus:outline-none focus:border-white disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={subscribing}
              className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscribeMessage && (
            <p className="mt-4 text-white font-semibold bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 inline-block">
              {subscribeMessage}
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
