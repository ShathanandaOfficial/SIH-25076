import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-300" />
              <span className="ml-2 text-2xl font-bold text-white">CottonGuard</span>
            </Link>
            <p className="text-green-200 mb-4 max-w-md">
              Protecting cotton crops through AI-powered disease detection. Helping farmers 
              identify issues early and take preventive measures for healthier harvests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/detect" className="text-green-200 hover:text-white transition-colors duration-200">
                  Detect Disease
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-green-200 hover:text-white transition-colors duration-200">
                  Detection History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-green-200 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-green-200 hover:text-white transition-colors duration-200">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                  Farming Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                  Disease Database
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-200">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-300">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-300 mr-3" />
                <span className="text-green-200">support@cottonguard.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-green-300 mr-3" />
                <span className="text-green-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-300 mr-3 mt-0.5" />
                <span className="text-green-200">
                  123 Agriculture Street<br />
                  Farmville, CA 12345<br />
                  United States
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-300 text-sm">
              © 2024 CottonGuard. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="text-green-300 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-300 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-300 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer