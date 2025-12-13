'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ForumTopic } from '@/types';
import Link from 'next/link';
import Section from '../components/ui/Section';

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
    category: 'general' as const,
    tags: [] as string[],
  });

  const categories = [
    { id: 'all', name: 'All Topics', icon: '💬', color: 'blue' },
    { id: 'general', name: 'General Discussion', icon: '🗣️', color: 'slate' },
    { id: 'technical', name: 'Technical Help', icon: '🛠️', color: 'orange' },
    { id: 'learning', name: 'Learning & Study', icon: '📚', color: 'green' },
    { id: 'bugs', name: 'Bug Reports', icon: '🐛', color: 'red' },
    { id: 'feature-request', name: 'Feature Requests', icon: '💡', color: 'purple' },
    { id: 'app', name: 'App Support', icon: '📱', color: 'indigo' },
  ];

  // Seed topics for initial community engagement
  const seedTopics: ForumTopic[] = [
    {
      id: 'seed-1',
      title: 'Welcome to E-PulsePoints Community!',
      description: 'Introduce yourself and share your ECG learning journey. What brought you to E-PulsePoints?',
      category: 'general',
      authorName: 'E-PulsePoints Team',
      authorId: 'admin',
      status: 'open',
      priority: 'medium',
      tags: ['welcome', 'introduction'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 245,
      replyCount: 18,
      resolved: false,
    },
    {
      id: 'seed-2',
      title: 'Best Study Techniques for ECG Pattern Recognition',
      description: 'Share your tips and tricks for mastering ECG interpretation. What study methods work best for you?',
      category: 'learning',
      authorName: 'Dr. Sarah Johnson',
      authorId: 'user-001',
      status: 'open',
      priority: 'medium',
      tags: ['study-tips', 'patterns', 'learning'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 189,
      replyCount: 24,
      resolved: false,
    },
    {
      id: 'seed-3',
      title: 'How to Download and Install the E-PulsePoints App',
      description: 'Step-by-step guide for downloading our mobile app on iOS and Android. Having trouble? Ask here!',
      category: 'app',
      authorName: 'Support Team',
      authorId: 'support',
      status: 'answered',
      priority: 'medium',
      tags: ['app', 'installation', 'guide'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 312,
      replyCount: 8,
      resolved: true,
    },
    {
      id: 'seed-4',
      title: 'Request: Offline Mode for MI Cases',
      description: 'It would be great to access MI case studies offline when studying without internet. Anyone else need this feature?',
      category: 'feature-request',
      authorName: 'Medical Student',
      authorId: 'user-045',
      status: 'open',
      priority: 'medium',
      tags: ['offline', 'mi-cases', 'feature'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 156,
      replyCount: 32,
      resolved: false,
    },
    {
      id: 'seed-5',
      title: 'Syncing Progress Across Multiple Devices',
      description: 'How do I sync my learning progress between my phone and tablet? Is there a way to ensure my data is backed up?',
      category: 'app',
      authorName: 'John Martinez',
      authorId: 'user-023',
      status: 'answered',
      priority: 'medium',
      tags: ['sync', 'multi-device', 'cloud'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 98,
      replyCount: 5,
      resolved: true,
    },
    {
      id: 'seed-6',
      title: 'Troubleshooting: App Crashes on Startup',
      description: 'The app crashes immediately after opening. I\'ve tried reinstalling but the issue persists. Using Android 13.',
      category: 'technical',
      authorName: 'Alex Chen',
      authorId: 'user-089',
      status: 'open',
      priority: 'high',
      tags: ['crash', 'android', 'bug'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 67,
      replyCount: 11,
      resolved: false,
    },
    {
      id: 'seed-7',
      title: 'Study Group: Preparing for USMLE Step 1',
      description: 'Looking for study partners focusing on cardiology and ECG interpretation for USMLE prep. Join our group!',
      category: 'learning',
      authorName: 'Emily Rodriguez',
      authorId: 'user-112',
      status: 'open',
      priority: 'low',
      tags: ['study-group', 'usmle', 'cardiology'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 223,
      replyCount: 41,
      resolved: false,
    },
    {
      id: 'seed-8',
      title: 'Request: More Real-World MI Cases',
      description: 'The current MI cases are excellent! Could we get more complex real-world scenarios with detailed explanations?',
      category: 'feature-request',
      authorName: 'Dr. Michael Brown',
      authorId: 'user-067',
      status: 'open',
      priority: 'medium',
      tags: ['mi-cases', 'content', 'feature'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 178,
      replyCount: 29,
      resolved: false,
    },
    {
      id: 'seed-9',
      title: 'How to Access Premium Features',
      description: 'I upgraded to premium but can\'t see the advanced MI cases. How do I access the premium content?',
      category: 'app',
      authorName: 'Lisa Wang',
      authorId: 'user-134',
      status: 'answered',
      priority: 'medium',
      tags: ['premium', 'access', 'help'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 145,
      replyCount: 6,
      resolved: true,
    },
    {
      id: 'seed-10',
      title: 'ECG Quiz Competition - Monthly Challenge',
      description: 'Join our monthly ECG challenge! Test your skills against the community. Top scorers get featured!',
      category: 'general',
      authorName: 'E-PulsePoints Team',
      authorId: 'admin',
      status: 'open',
      priority: 'low',
      tags: ['competition', 'quiz', 'challenge'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 401,
      replyCount: 56,
      resolved: false,
    },
    {
      id: 'seed-11',
      title: 'Images Not Loading in MI Cases',
      description: 'Some ECG images in the MI cases section fail to load. Is this a known issue? Using the latest version.',
      category: 'bugs',
      authorName: 'Kevin Park',
      authorId: 'user-178',
      status: 'open',
      priority: 'high',
      tags: ['images', 'bug', 'mi-cases'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 92,
      replyCount: 14,
      resolved: false,
    },
    {
      id: 'seed-12',
      title: 'Tips for Memorizing ECG Intervals and Segments',
      description: 'What are your favorite mnemonics or memory tricks for remembering normal ECG intervals (PR, QRS, QT)?',
      category: 'learning',
      authorName: 'Nursing Student',
      authorId: 'user-201',
      status: 'open',
      priority: 'low',
      tags: ['mnemonics', 'intervals', 'memory'],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 267,
      replyCount: 38,
      resolved: false,
    },
  ];

  useEffect(() => {
    fetchTopics();
  }, [selectedCategory]);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const topicsRef = collection(db, 'forum');
      
      let q;
      if (selectedCategory === 'all') {
        q = query(topicsRef, orderBy('createdAt', 'desc'), limit(50));
      } else {
        q = query(
          topicsRef,
          where('category', '==', selectedCategory),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedTopics: ForumTopic[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedTopics.push({ id: doc.id, ...doc.data() } as ForumTopic);
      });

      // Use seed topics if no topics in Firestore
      if (fetchedTopics.length === 0) {
        const filteredSeeds = selectedCategory === 'all' 
          ? seedTopics 
          : seedTopics.filter(t => t.category === selectedCategory);
        setTopics(filteredSeeds);
      } else {
        setTopics(fetchedTopics);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const topicData = {
        ...newTopic,
        authorId: 'demo-user', // Replace with actual auth
        authorName: 'Demo User',
        status: 'open' as const,
        priority: 'medium' as const,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0,
        replyCount: 0,
        resolved: false,
      };

      await addDoc(collection(db, 'forum'), topicData);
      
      setShowNewTopicModal(false);
      setNewTopic({
        title: '',
        description: '',
        category: 'general',
        tags: [],
      });
      
      fetchTopics();
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 168) return `${Math.floor(hours / 24)}d ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'answered': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Section padding="xl" className="bg-gradient-to-br from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6">
                <p className="text-sm font-semibold text-white/90">👥 Connect • Learn • Grow</p>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
                Community Forum
              </h1>
              <p className="text-lg lg:text-xl text-green-100 mb-6">
                Get help, share knowledge, and connect with fellow ECG learners
              </p>
              <button
                onClick={() => setShowNewTopicModal(true)}
                className="bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl"
              >
                ➕ Start New Discussion
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">{topics.length}</div>
                <div className="text-green-100 text-sm">Active Topics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-white mb-2">
                  {topics.filter(t => t.status === 'answered').length}
                </div>
                <div className="text-green-100 text-sm">Answered</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Category Filter */}
      <Section padding="md" className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-${category.color}-600 text-white shadow-lg`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Topics List */}
      <Section padding="xl" className="bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-200 w-12 h-12 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="bg-slate-200 h-6 rounded w-3/4 mb-3"></div>
                      <div className="bg-slate-200 h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : topics.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Topics Yet</h3>
              <p className="text-slate-600 mb-6">Be the first to start a discussion!</p>
              <button
                onClick={() => setShowNewTopicModal(true)}
                className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors"
              >
                Start New Topic
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/forum/${topic.id}`}
                  className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-green-300 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Category Icon */}
                    <div className="bg-gradient-to-br from-green-400 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {categories.find(c => c.id === topic.category)?.icon || '💬'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2">
                          {topic.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(topic.status)}`}>
                            {topic.status}
                          </span>
                          {topic.resolved && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              ✓ Resolved
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {topic.description}
                      </p>

                      {/* Tags */}
                      {topic.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{topic.authorName}</span>
                        <span>•</span>
                        <span>{formatDate(topic.createdAt)}</span>
                        <span>•</span>
                        <span>👁️ {topic.views}</span>
                        <span>•</span>
                        <span>💬 {topic.replyCount} replies</span>
                        {topic.priority !== 'low' && (
                          <>
                            <span>•</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${getPriorityColor(topic.priority)}`}>
                              {topic.priority} priority
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-slate-900">Start New Discussion</h2>
              <button
                onClick={() => setShowNewTopicModal(false)}
                className="text-slate-400 hover:text-slate-600 text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  placeholder="Brief description of your question or topic"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                  placeholder="Provide details about your question or topic..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none h-40 resize-none"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewTopicModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
                >
                  Create Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
