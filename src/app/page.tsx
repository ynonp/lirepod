'use client';

import React, { useState, useEffect } from 'react';
import { Search, Headphones, Mail, X } from 'lucide-react';
import Image from 'next/image';

export type PodcastInfo = {
  id: number,
  title: string,
  publisher: string,
  image: string,
  subscribers: number,
  episodes: number
}

const allPodcasts = [
  {
    id: 1,
    title: "The Daily",
    publisher: "The New York Times",
    image: "/api/placeholder/64/64",
    subscribers: 245000,
    episodes: 1240
  },
  {
    id: 2,
    title: "Hardcore History",
    publisher: "Dan Carlin",
    image: "/api/placeholder/64/64",
    subscribers: 180000,
    episodes: 68
  },
  {
    id: 3,
    title: "Crime Daily",
    publisher: "Crime Network",
    image: "/api/placeholder/64/64",
    subscribers: 125000,
    episodes: 890
  },
  {
    id: 4,
    title: "Developer Tea",
    publisher: "Spec Network",
    image: "/api/placeholder/64/64",
    subscribers: 95000,
    episodes: 456
  }
];

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<Array<PodcastInfo>>([]);    
  
  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = allPodcasts.filter(podcast => 
        podcast.title.toLowerCase().includes(query) || 
        podcast.publisher.toLowerCase().includes(query)
      );
      setFilteredResults(results);
    }, 300); // 300ms delay for debouncing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredResults([]);
  };

  const showResults = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="text-2xl font-bold text-purple-600">LirePod</div>
        <div className="space-x-6">
          <button className="text-gray-600 hover:text-purple-600">Sign In</button>
          <button className="px-4 py-2 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container px-6 mx-auto mt-20 text-center">
        <h1 className={`text-5xl font-bold tracking-tight text-gray-900 transition-all duration-300 ${showResults ? 'scale-75' : ''}`}>
          Your Favorite Podcasts,
          <br />
          <span className="text-purple-600">In Your Inbox</span>
        </h1>
        
        <p className={`max-w-2xl mx-auto mt-6 text-xl text-gray-600 transition-all duration-300 ${showResults ? 'scale-75' : ''}`}>
          Subscribe to any podcast and receive newly released episodes as searchable transcripts,
          translated to your preferred language, directly in your email.
        </p>

        {/* Search Box */}
        <div className={`max-w-2xl mx-auto mt-12 transition-all duration-300 ${showResults ? '-mt-4' : ''}`}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by podcast name or paste Spotify URL"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-600"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-16 top-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
            <div className="absolute right-2 top-2 p-2 bg-purple-600 text-white rounded-full">
              <Search size={24} />
            </div>
          </div>

          {/* Live Search Results */}
          {showResults && (
            <div className="mt-6 text-left bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {filteredResults.length > 0 ? (
                filteredResults.map((podcast) => (
                  <div 
                    key={podcast.id}
                    className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={podcast.image}
                        alt={podcast.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{podcast.title}</h3>
                        <p className="text-gray-600">{podcast.publisher}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {podcast.subscribers.toLocaleString()} subscribers
                          </span>
                          <span className="flex items-center">
                            <Headphones className="w-4 h-4 mr-1" />
                            {podcast.episodes} episodes
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50">
                        Subscribe
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No podcasts found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Grid - Only show when no search results */}
        {!showResults && (
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-20 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Email Delivery</h3>
              <p className="mt-2 text-gray-600">Get new episodes delivered straight to your inbox</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Smart Transcription</h3>
              <p className="mt-2 text-gray-600">Full searchable transcripts of every episode</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Translation</h3>
              <p className="mt-2 text-gray-600">Automatic translation to your preferred language</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;