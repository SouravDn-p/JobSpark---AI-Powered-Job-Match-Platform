"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle,
  Briefcase,
  Search,
  Sun,
  Moon,
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Code,
  Stethoscope,
  Building,
  DollarSign,
  Truck,
  Palette,
  ArrowRight,
  Zap,
} from "lucide-react";
import { AuthContexts } from "../providers/AuthProviders";

const Home = () => {
  const { user, isDarkMode, toggleTheme } = useContext(AuthContexts);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ jobs: 0, companies: 0, placements: 0 });
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const categoriesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Animate stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newJobs = prev.jobs < 10000 ? prev.jobs + 250 : prev.jobs;
        const newCompanies =
          prev.companies < 500 ? prev.companies + 15 : prev.companies;
        const newPlacements =
          prev.placements < 5000 ? prev.placements + 125 : prev.placements;

        if (
          newJobs === 10000 &&
          newCompanies === 500 &&
          newPlacements === 5000
        ) {
          clearInterval(interval);
        }

        return {
          jobs: newJobs,
          companies: newCompanies,
          placements: newPlacements,
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll effect for navbar and animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if sections are visible for animations
      const checkVisibility = (ref, id) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          setIsVisible((prev) => ({ ...prev, [id]: isVisible }));
        }
      };

      checkVisibility(heroRef, "hero");
      checkVisibility(featuresRef, "features");
      checkVisibility(statsRef, "stats");
      checkVisibility(categoriesRef, "categories");
      checkVisibility(testimonialsRef, "testimonials");
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Featured job categories
  const jobCategories = [
    {
      icon: <Code className="h-8 w-8" />,
      name: "Technology",
      count: "1,200+ Jobs",
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      name: "Healthcare",
      count: "800+ Jobs",
    },
    {
      icon: <Building className="h-8 w-8" />,
      name: "Finance",
      count: "650+ Jobs",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      name: "Sales",
      count: "950+ Jobs",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      name: "Logistics",
      count: "420+ Jobs",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      name: "Design",
      count: "380+ Jobs",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "JobSpark helped me find my dream job in just 2 weeks! The AI matching was spot on with my skills.",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "BrandGrowth",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "The personalized job recommendations saved me countless hours of searching. Highly recommended!",
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      company: "DesignHub",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
      text: "As someone switching careers, JobSpark's skill matching helped me leverage my transferable skills.",
    },
  ];

  // Animated background particles
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`relative overflow-hidden pt-16 ${
          isVisible.hero ? "animate-fade-in" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/80"></div>
        <Particles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-20 pb-24 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-blue-900/40 text-blue-200 text-sm font-medium backdrop-blur-sm border border-blue-500/20 animate-pulse">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>AI-Powered Job Matching</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
                <span className="block">Ignite Your Career With</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                  JobSpark
                </span>
              </h1>
              <p
                className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                Our AI-powered platform connects you with jobs that perfectly
                match your skills, experience, and career aspirations. Find your
                dream job faster.
              </p>

              {/* Animated highlight elements */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>

              <div
                className="mt-10 flex justify-center gap-4 flex-wrap animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                {user ? (
                  <>
                    <Link
                      to="/recommendations"
                      className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Get Job Recommendations
                    </Link>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center px-8 py-4 bg-gray-900/50 backdrop-blur-sm text-white border border-gray-500/30 font-medium rounded-lg hover:bg-gray-800/50 transition-all transform hover:-translate-y-1"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Browse All Jobs
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50 group"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center px-8 py-4 bg-gray-900/50 backdrop-blur-sm text-white border border-gray-500/30 font-medium rounded-lg hover:bg-gray-800/50 transition-all transform hover:-translate-y-1"
                    >
                      Browse Jobs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Job Search Bar */}
          <div
            className="relative -mt-10 mb-16 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="rounded-xl shadow-2xl overflow-hidden bg-gray-900/80 backdrop-blur-md border border-gray-700/50">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-700/50">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Job title or keyword"
                        className="ml-2 w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-700/50">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Location"
                        className="ml-2 w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <Link
                    to={"/jobs"}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors hover:shadow-lg hover:shadow-blue-600/30"
                  >
                    Search Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={statsRef}
        className={`py-16 bg-gray-900 relative ${
          isVisible.stats ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg transform transition-all hover:scale-105 hover:shadow-blue-900/20 hover:shadow-xl group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-900/50 text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-white">
                {stats.jobs.toLocaleString()}+
              </h3>
              <p className="mt-2 text-lg text-gray-300">Active Jobs</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg transform transition-all hover:scale-105 hover:shadow-purple-900/20 hover:shadow-xl group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-900/50 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-white">
                {stats.companies.toLocaleString()}+
              </h3>
              <p className="mt-2 text-lg text-gray-300">Companies</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg transform transition-all hover:scale-105 hover:shadow-green-900/20 hover:shadow-xl group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-900/50 text-green-400 mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-white">
                {stats.placements.toLocaleString()}+
              </h3>
              <p className="mt-2 text-lg text-gray-300">
                Successful Placements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div
        ref={categoriesRef}
        className={`py-16 bg-gray-900 relative ${
          isVisible.categories ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Explore Job Categories
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Browse jobs by category and find your perfect career path
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-all cursor-pointer group hover:bg-gray-700/50 hover:shadow-lg hover:shadow-blue-900/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-lg bg-blue-900/50 text-blue-400 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-blue-400">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 font-medium transition-all hover:shadow-lg hover:shadow-blue-900/10 group"
            >
              View All Categories
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        ref={featuresRef}
        className={`py-16 bg-gray-800 lg:py-24 relative ${
          isVisible.features ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Find Jobs That Match Your Skills
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Our AI-powered platform analyzes your skills and experience to
              find the perfect job match.
            </p>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Personalized Job Recommendations
              </h3>
              <p className="mt-3 text-lg text-gray-300">
                Our AI algorithm matches your profile with the most relevant job
                opportunities.
              </p>
              <dl className="mt-10 space-y-10">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">
                      AI-Powered Matching
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">
                      Analyzes your skills and preferences to recommend
                      high-match jobs.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <CheckCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">
                      Skills-Based Matching
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">
                      Identifies jobs where your skills align with requirements.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <TrendingUp className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">
                      Career Growth Insights
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">
                      Provides skill gap analysis and career advancement tips.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 z-10"></div>
                <img
                  className="w-full h-auto object-cover"
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="People working on computers"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-600 opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-purple-600 opacity-20 blur-2xl"></div>
            </div>
          </div>

          <div className="mt-20 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="lg:order-2">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                For Job Seekers & Employers
              </h3>
              <p className="mt-3 text-lg text-gray-300">
                JobSpark connects job seekers with dream roles and employers
                with top talent.
              </p>
              <dl className="mt-10 space-y-10">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <Briefcase className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">
                      Wide Range of Opportunities
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">
                      Explore thousands of jobs across industries like tech,
                      healthcare, and finance.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-white">
                      Real-time Updates
                    </dt>
                    <dd className="mt-2 text-base text-gray-300">
                      Get notified instantly when new matching jobs are posted.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="mt-10 lg:mt-0 lg:order-1 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/20 border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 z-10"></div>
                <img
                  className="w-full h-auto object-cover"
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="People in a meeting"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-600 opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-purple-600 opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        ref={testimonialsRef}
        className={`py-16 bg-gray-900 relative ${
          isVisible.testimonials ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Hear from professionals who found their dream jobs through
              JobSpark
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/10 transition-all hover:-translate-y-1"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${
                    index === 0
                      ? "bg-blue-500"
                      : index === 1
                      ? "bg-purple-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-700 group-hover:border-blue-500 transition-colors"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25"></div>

        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to find your perfect job?</span>
                <span className="block text-blue-200">
                  Start with JobSpark today.
                </span>
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of professionals who've already found their dream
                jobs through our platform. It takes less than 5 minutes to
                create your profile.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Link
                  to={user ? "/recommendations" : "/register"}
                  className="inline-flex items-center px-6 py-4 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20 group"
                >
                  {user ? "Get Recommendations" : "Get Started For Free"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center px-6 py-4 bg-blue-700 bg-opacity-20 backdrop-blur-sm text-white border border-blue-400 border-opacity-40 font-medium rounded-lg hover:bg-opacity-30 transition-all transform hover:-translate-y-1"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/3 relative">
              <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 border border-blue-500/20">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy professional"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full border-2 border-blue-400"
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="User"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        "I found my dream job in just 2 weeks!"
                      </p>
                      <p className="text-xs text-blue-200">
                        David Wilson, Software Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.4;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
