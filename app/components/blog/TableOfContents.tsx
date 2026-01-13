'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, BookOpen, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName[1]);
      
      // Create a unique ID from the text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Set ID on the actual heading element in the DOM
      const actualHeading = document.querySelector(`${heading.tagName}:nth-of-type(${index + 1})`);
      if (actualHeading) {
        actualHeading.id = id;
      }
      
      return { id, text, level };
    });
    
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Intersection Observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle Table of Contents"
      >
        <BookOpen className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Table of Contents */}
      <nav
        className={`
          fixed z-40 bg-white rounded-2xl shadow-xl border-2 border-slate-200
          transition-all duration-300 max-h-[80vh] overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-[120%]'}
          lg:translate-x-0 lg:sticky lg:top-24
          left-4 right-4 bottom-20
          lg:left-auto lg:right-auto lg:bottom-auto
          lg:w-80
        `}
      >
        <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Contents
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <ul className="p-4 space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  w-full text-left px-4 py-2.5 rounded-lg transition-all
                  ${heading.level === 2 ? 'font-bold text-base' : 'font-medium text-sm ml-4'}
                  ${
                    activeId === heading.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                {heading.level === 2 && '📖 '}
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

// Clinical Pearl Callout
export function ClinicalPearl({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-r-xl shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-emerald-900 mb-2 text-lg">💎 Clinical Pearl</h4>
          <div className="text-slate-700 leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Key Takeaway Callout
export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-blue-900 mb-2 text-lg">🔑 Key Takeaway</h4>
          <div className="text-slate-700 leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Emergency Management Alert
export function EmergencyAlert({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-xl shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-red-900 mb-2 text-lg">🚨 Emergency Management</h4>
          <div className="text-slate-700 leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Common Pitfalls Warning
export function PitfallsWarning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-xl shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-amber-900 mb-2 text-lg">⚠️ Common Pitfalls</h4>
          <div className="text-slate-700 leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
