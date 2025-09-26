import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, BrainCircuit, Sparkles, Mic, MapPin } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Ask in Your Language",
      description: "Use text or voice in Malayalam to ask any farming-related question."
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "Comprehensive AI Knowledge",
      description: "Our AI is trained on a vast dataset of agricultural topics, from pests to market prices."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Instant, Tailored Advice",
      description: "Get context-aware answers personalized to your location, crop, and season."
    }
  ]

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Instant Farming Advice is Here
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            >
              Your Digital Krishi Officer is ready to answer questions about pests, weather, subsidies, and market trends—24/7, in your own language.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/detect" // Link to the main chat page
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask a Question
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A Smarter Way to Farm</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system provides instant, reliable support for all your farming needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Agricultural Topics Covered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">Seconds</div>
              <div className="text-gray-600">To Get an Answer</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Expert Availability</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Have a Question? Get an Answer.</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stop waiting and start getting the information you need. Our AI is ready to help you make better decisions for your farm today.
          </p>
          <Link
            to="/" // Link to the main chat page
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <MessageSquare className="mr-2 h-6 w-6" />
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home