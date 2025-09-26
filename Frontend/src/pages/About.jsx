import { 
  MessageSquare, 
  BrainCircuit, 
  Sparkles, 
  Sprout, 
  Landmark, 
  TrendingUp, 
  CloudSun, 
  Bug, 
  FlaskConical,
  Heart, 
  Code, 
  Database,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const About = () => {
  const team = [
    {
      name: "AI & ML Engineers",
      role: "Building the Brains",
      icon: <Code className="h-8 w-8" />
    },
    {
      name: "Agricultural Experts",
      role: "Providing Domain Knowledge",
      icon: <Sprout className="h-8 w-8" />
    },
    {
      name: "Data Scientists",
      role: "Managing Knowledge Base",
      icon: <Database className="h-8 w-8" />
    }
  ];

  const topics = [
    {
      name: "Pest & Disease Control",
      description: "Get instant advice on identifying and managing crop pests and diseases.",
      icon: <Bug className="h-8 w-8 text-red-500" />
    },
    {
      name: "Crop Management",
      description: "Best practices for planting, irrigation, and harvesting your specific crops.",
      icon: <Sprout className="h-8 w-8 text-green-500" />
    },
    {
      name: "Weather Advisories",
      description: "Localized weather forecasts to help you plan your farming activities.",
      icon: <CloudSun className="h-8 w-8 text-blue-500" />
    },
    {
      name: "Market Prices",
      description: "Access real-time market trends and prices for your produce.",
      icon: <TrendingUp className="h-8 w-8 text-yellow-500" />
    },
    {
      name: "Government Schemes",
      description: "Information on subsidies, insurance, and other government support.",
      icon: <Landmark className="h-8 w-8 text-indigo-500" />
    },
    {
      name: "Soil & Fertilizers",
      description: "Recommendations for soil health management and fertilizer application.",
      icon: <FlaskConical className="h-8 w-8 text-purple-500" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> Digital Krishi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Providing instant, reliable, and context-aware agricultural advice to every farmer in Kerala.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700">
            To bridge the information gap between farmers and agricultural experts by creating an AI-powered advisory system that understands and responds to queries in local languages. We aim to empower farmers with timely knowledge, making farming more productive and sustainable.
          </p>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Ask Anything</h3>
            <p className="text-gray-600">
              Farmers can ask questions using text or voice in Malayalam, and even upload images of crops.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. AI Analysis</h3>
            <p className="text-gray-600">
              Our AI engine processes the query, using fine-tuned LLMs and a vast agricultural knowledge base.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Instant Advice</h3>
            <p className="text-gray-600">
              Receive an accurate, context-aware answer tailored to your location, crop, and season.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Topics Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get Advice On</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center space-x-4">
              <div className="flex-shrink-0">{topic.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{topic.name}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center p-3 bg-gray-200 rounded-full text-gray-600 mb-4">
                {member.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-green-50 rounded-2xl p-8"
      >
        <div className="flex items-center mb-6">
          <Heart className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Our Impact</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">For Farmers</h3>
            <ul className="space-y-2">
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Makes expert-level advice instantly accessible to all.</li>
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Reduces uncertainty and improves on-farm decision making.</li>
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Provides easy access to information on government schemes.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">For the Agricultural System</h3>
            <ul className="space-y-2">
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Bridges the communication gap with extension systems.</li>
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Supports Krishibhavans by automating first-level support.</li>
              <li className="flex items-start"><span className="mr-2 mt-1">•</span>Generates valuable data insights for policy making.</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About;