import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  Award,
  Brain,
  BarChart3,
} from "lucide-react";
import Button from "../components/common/Button";
import { useAuth } from "../contexts/AuthContext";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }

    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isAuthenticated, navigate]);

  const testimonials = [
    {
      content:
        "The BronxBoard platform has completely transformed how our community approaches education. The interactive quizzes and structured learning paths make it easy to stay engaged.",
      author: "Marcus Johnson",
      role: "Community Member",
    },
    {
      content:
        "As a teacher, I can now track my students' progress effectively. The analytics help me identify areas where they need additional support.",
      author: "Sarah Williams",
      role: "Local School Teacher",
    },
    {
      content:
        "I earned my first certificate through BronxBoard last month! The material was presented in a way that made complex topics accessible.",
      author: "David Chen",
      role: "Student",
    },
  ];

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary-600" />,
      title: "Structured Learning Paths",
      description:
        "Follow our carefully designed learning paths that guide you from beginner to advanced levels in various subjects.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary-600" />,
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with our engaging quizzes designed to reinforce learning and identify areas for improvement.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary-600" />,
      title: "Earn Certificates",
      description:
        "Receive certificates upon completion of courses to showcase your achievements and newly acquired skills.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary-600" />,
      title: "Track Your Progress",
      description:
        "Monitor your learning journey with detailed progress tracking and performance analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">
                BronxBoard
              </span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 md:py-32 overflow-hidden transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-white opacity-10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empower Your Education Journey With the Bronx Community
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100">
              Interactive learning paths, engaging quizzes, and certificates to
              recognize your achievements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-primary-10 text-primary-700 hover:bg-primary-50"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BronxBoard?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to make education accessible, engaging,
              and effective for the Bronx community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Explore Our Learning Paths
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our carefully designed learning paths guide you through a
                structured educational journey, from foundational concepts to
                advanced applications.
              </p>
              <ul className="space-y-4 mb-8">
                {["Mathematics", "Science", "Language Arts", "History"].map(
                  (subject, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-success-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        {subject} learning path with interactive lessons and
                        quizzes
                      </span>
                    </li>
                  )
                )}
              </ul>
              <Button onClick={() => navigate("/signup")} className="mt-4">
                Explore Paths
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div
              className="lg:w-1/2 animate-on-scroll opacity-0"
              style={{ animationDelay: "150ms" }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Students learning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md translate-y-8">
                  <img
                    src="https://images.pexels.com/photos/8423164/pexels-photo-8423164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Online education"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md -translate-y-8">
                  <img
                    src="https://images.pexels.com/photos/7516447/pexels-photo-7516447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Student with laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Group learning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              BronxBoard is making a real difference in our community's
              educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-8 animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="inline-block h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Join our growing community of learners and take the first step
              toward a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-primary-10 text-primary-700 hover:bg-primary-50"
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold">BronxBoard</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering the Bronx community through accessible education and
                knowledge sharing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Learning Paths
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Quizzes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Certificates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} BronxBoard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
