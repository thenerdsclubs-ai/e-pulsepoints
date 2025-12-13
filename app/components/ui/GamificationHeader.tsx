'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface Currency {
  type: 'gems' | 'xp' | 'hearts' | 'pulsepoints';
  value: number;
  icon: string;
  color: string;
}

const GamificationHeader = () => {
  const [currencies] = useState<Currency[]>([
    { type: 'gems', value: 1250, icon: '💎', color: 'from-purple-500 to-pink-500' },
    { type: 'xp', value: 3420, icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { type: 'hearts', value: 5, icon: '❤️', color: 'from-red-500 to-pink-500' },
    { type: 'pulsepoints', value: 890, icon: '💗', color: 'from-green-500 to-teal-500' },
  ]);

  const [streak, setStreak] = useState(7);
  const pathname = usePathname();

  // Only show on homepage
  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="bg-white border-b-2 border-gray-100 shadow-sm">
      <div className="container-width">
        <div className="flex items-center justify-between py-3">
          {/* User Progress Section */}
          <div className="flex items-center space-x-6">
            {/* User Avatar & Level */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/mascots/Dr. Pulse_teaching.png"
                  alt="Dr. Pulse"
                  width={48}
                  height={48}
                  className="rounded-full border-3 border-green-400 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  12
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-800">ECG Explorer</div>
                <div className="text-sm text-gray-600">Level 12 • {streak} day streak 🔥</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex flex-col space-y-1">
              <div className="text-xs text-gray-600 font-medium">Progress to Level 13</div>
              <div className="progress-bar w-48">
                <div 
                  className="progress-fill"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">2,250 / 3,000 XP</div>
            </div>
          </div>

          {/* Currencies */}
          <div className="flex items-center space-x-4">
            {currencies.map((currency) => (
              <div
                key={currency.type}
                className={`flex items-center space-x-2 bg-gradient-to-r ${currency.color} text-white px-3 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-200`}
              >
                <span className="text-lg">{currency.icon}</span>
                <span className="text-sm font-bold">{currency.value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Daily Challenge */}
          <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg">
            <span className="text-lg">🎯</span>
            <div>
              <div className="text-sm font-bold">Daily Challenge</div>
              <div className="text-xs opacity-90">Complete 3 ECG readings</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
              2/3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationHeader;