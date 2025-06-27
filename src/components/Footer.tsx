import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, Mail, Phone, MapPin, Heart, Zap, Shield, Award, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email) {
      try {
        const res = await fetch('/api/send-newsletter-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error('Failed to send confirmation email');
        setIsSubscribed(true);
        setConfirmationSent(true);
        setEmail('');
        setTimeout(() => {
          setIsSubscribed(false);
          setConfirmationSent(false);
        }, 6000);
      } catch (err) {
        setError('Failed to send confirmation email. Please try again.');
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16 mt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src="/flier-icon.svg" alt="FlierHustle Logo" className="w-full h-full" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                FlierHustle
              </h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              AI-powered poster & flier maker designed specifically for small businesses and hustlers across Africa. 
              Create stunning designs in minutes, not hours.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base text-gray-400">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base text-gray-400">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-semibold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3 sm:space-y-3.5">
              {[
                { to: "/", label: "Home" },
                { to: "/templates-gallery", label: "Templates" },
                { to: "/pricing", label: "Pricing" },
                { to: "/about", label: "About Us" },
                { to: "/support", label: "Help Center" },
                { to: "/auth", label: "Get Started" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center space-x-2 group text-sm sm:text-base"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg sm:text-xl font-semibold text-white flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <span>Contact Us</span>
            </h4>
            <div className="space-y-5">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-base font-medium">Email</p>
                  <p className="text-sm text-gray-400">fakiiahmad001@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-base font-medium">WhatsApp</p>
                  <p className="text-sm text-gray-400">+254741140250</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-red-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-base font-medium">Serving</p>
                  <p className="text-sm text-gray-400">All of Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg sm:text-xl font-semibold text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              <span>Connect With Us</span>
            </h4>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: "hover:text-blue-500", bg: "hover:bg-blue-500/20" },
                { Icon: Instagram, color: "hover:text-pink-500", bg: "hover:bg-pink-500/20" },
                { Icon: Twitter, color: "hover:text-blue-400", bg: "hover:bg-blue-400/20" },
                { Icon: MessageCircle, color: "hover:text-green-500", bg: "hover:bg-green-500/20" }
              ].map(({ Icon, color, bg }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} ${bg} border border-white/20 hover:border-white/40`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            
            {/* Enhanced Newsletter Section */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Mail className="w-6 h-6 text-purple-400" />
                <h5 className="text-lg sm:text-xl font-bold text-white">Stay Updated</h5>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
                Get the latest templates, design tips, and exclusive offers delivered to your inbox weekly.
              </p>
              
              {isSubscribed ? (
                <div className="flex flex-col items-center space-y-2 text-green-400 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-base font-medium">Successfully subscribed!</span>
                  {confirmationSent && (
                    <span className="text-green-300 text-sm text-center">Check your inbox to confirm your subscription.</span>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 text-base focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-base py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </Button>
                  {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
                </form>
              )}
              
              <p className="text-sm text-gray-400 mt-4 text-center">
                Join 10,000+ hustlers getting design inspiration weekly
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 text-base text-gray-400 md:justify-start md:text-left justify-center text-center">
            <span>© 2025 FlierHustle</span>
            <span className="hidden md:inline">•</span>
            <span>Built for Hustlers in Africa</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center justify-center md:justify-start space-x-1.5">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <span>for entrepreneurs</span>
            </span>
          </div>
          <div className="flex items-center space-x-6 text-base text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link to="/support" className="hover:text-white transition-colors duration-300">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
