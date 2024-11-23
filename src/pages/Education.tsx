import { useState } from 'react';
import { BookOpen, Play, FileText, Award, CheckCircle, X, Clock, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTradingContext } from '../context/TradingContext';

export function Education() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addNotification } = useTradingContext();

  const courses = [
    {
      id: 1,
      title: "Introduction to Stock Market",
      description: "Learn the basics of stock market trading and investment strategies",
      duration: "2 hours",
      lessons: 8,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400",
      price: "₹999"
    },
    {
      id: 2,
      title: "Technical Analysis Masterclass",
      description: "Master the art of reading charts and technical indicators",
      duration: "4 hours",
      lessons: 12,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400",
      price: "₹1,499"
    },
    {
      id: 3,
      title: "Fundamental Analysis",
      description: "Learn how to analyze company financials and make informed decisions",
      duration: "3 hours",
      lessons: 10,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      price: "₹1,999"
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "Market Outlook 2024",
      date: "March 20, 2024",
      time: "6:00 PM IST",
      speaker: "Rakesh Kumar",
      designation: "Senior Market Analyst",
      topics: [
        "Global market trends",
        "Sector-wise analysis",
        "Investment opportunities"
      ]
    },
    {
      id: 2,
      title: "Options Trading Strategies",
      date: "March 25, 2024",
      time: "7:00 PM IST",
      speaker: "Priya Sharma",
      designation: "Derivatives Expert",
      topics: [
        "Options basics",
        "Advanced strategies",
        "Risk management"
      ]
    }
  ];

  const resources = [
    {
      title: "Trading Psychology Guide",
      type: "PDF",
      size: "2.5 MB",
      description: "Master the mental aspects of trading"
    },
    {
      title: "Risk Management Handbook",
      type: "PDF",
      size: "1.8 MB",
      description: "Learn to protect your capital"
    },
    {
      title: "Market Analysis Templates",
      type: "Excel",
      size: "3.2 MB",
      description: "Ready-to-use analysis tools"
    }
  ];

  const handleCourseEnroll = (course: any) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const confirmEnrollment = () => {
    addNotification(
      'Course Enrollment Successful',
      `You have been enrolled in ${selectedCourse.title}. Start learning now!`
    );
    setIsDialogOpen(false);
  };

  const handleWebinarRegistration = (webinar: any) => {
    addNotification(
      'Webinar Registration Successful',
      `You have registered for ${webinar.title}. A calendar invite has been sent to your email.`
    );
  };

  const handleDownload = (resource: any) => {
    addNotification(
      'Download Started',
      `${resource.title} will be downloaded shortly.`
    );
  };

  return (
    <div className="space-y-8">
      {/* Learning Paths */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Beginner</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Start your trading journey with fundamental concepts</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Basic Market Concepts</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Introduction to Trading</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Risk Management</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Intermediate</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Advance your knowledge with practical strategies</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Technical Analysis</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Chart Patterns</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Trading Strategies</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-white">Advanced</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Master complex trading techniques</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Advanced Technical Analysis</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Options & Derivatives</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-300">Portfolio Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-700 rounded-lg overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.lessons} lessons
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">{course.price}</span>
                  <span className="text-sm text-gray-400">{course.level}</span>
                </div>
                <button
                  onClick={() => handleCourseEnroll(course)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webinars Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Upcoming Webinars</h2>
        <div className="space-y-4">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{webinar.title}</h3>
                  <p className="text-sm text-gray-400">{webinar.speaker} - {webinar.designation}</p>
                  <div className="mt-2 flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {webinar.date} at {webinar.time}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 font-medium mb-1">Topics covered:</p>
                    <ul className="list-disc list-inside text-sm text-gray-400">
                      {webinar.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => handleWebinarRegistration(webinar)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Learning Resources</h2>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-white font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{resource.type} • {resource.size}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(resource)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold text-white">
                Course Enrollment
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            {selectedCourse && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedCourse.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selectedCourse.description}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-400">Duration: {selectedCourse.duration}</p>
                    <p className="text-sm text-gray-400">Level: {selectedCourse.level}</p>
                    <p className="text-sm text-gray-400">Price: {selectedCourse.price}</p>
                  </div>
                </div>
                <button
                  onClick={confirmEnrollment}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirm Enrollment
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default Education;