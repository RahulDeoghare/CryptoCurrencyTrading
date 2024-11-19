import React from 'react';
import { BookOpen, Play, FileText, Award } from 'lucide-react';

export function Education() {
  const courses = [
    {
      title: "Stock Market Basics",
      description: "Learn the fundamentals of stock market trading",
      duration: "2 hours",
      level: "Beginner",
      modules: 8,
      icon: BookOpen
    },
    {
      title: "Technical Analysis",
      description: "Master chart patterns and technical indicators",
      duration: "4 hours",
      level: "Intermediate",
      modules: 12,
      icon: FileText
    },
    {
      title: "Options Trading",
      description: "Understanding options and derivatives",
      duration: "3 hours",
      level: "Advanced",
      modules: 10,
      icon: Award
    }
  ];

  const webinars = [
    {
      title: "Market Outlook 2024",
      date: "March 15, 2024",
      time: "6:00 PM IST",
      speaker: "Rajesh Kumar",
      designation: "Senior Market Analyst"
    },
    {
      title: "Intraday Trading Strategies",
      date: "March 18, 2024",
      time: "7:00 PM IST",
      speaker: "Priya Sharma",
      designation: "Professional Trader"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.title} className="bg-gray-700 rounded-lg p-6">
              <course.icon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Modules:</span>
                  <span className="text-white">{course.modules}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Upcoming Webinars</h2>
        <div className="space-y-4">
          {webinars.map((webinar) => (
            <div key={webinar.title} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{webinar.title}</h3>
                  <p className="text-gray-400 mt-1">{webinar.speaker}</p>
                  <p className="text-sm text-gray-500">{webinar.designation}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">{webinar.date}</p>
                  <p className="text-sm text-gray-400">{webinar.time}</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Trading Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Trading Glossary",
              description: "Comprehensive list of trading terms and definitions",
              icon: BookOpen
            },
            {
              title: "Strategy Guide",
              description: "Popular trading strategies explained with examples",
              icon: FileText
            },
            {
              title: "Risk Management",
              description: "Learn how to protect your trading capital",
              icon: Award
            }
          ].map((resource) => (
            <div key={resource.title} className="bg-gray-700 p-4 rounded-lg">
              <resource.icon className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="text-white font-medium">{resource.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
              <button className="mt-3 text-blue-500 text-sm hover:text-blue-400">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}