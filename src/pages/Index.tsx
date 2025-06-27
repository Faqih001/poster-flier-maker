import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TemplateGallery } from '@/components/TemplateGallery';
import { TestimonialSwiper } from '@/components/TestimonialSwiper';
import { PosterEditor } from '@/components/PosterEditor';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { AIAssistant } from '@/components/AIAssistant';
import { Template } from '@/types/template';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Zap, Download, Printer, Sparkles, Clock, Star, ArrowRight, Users, Globe, Palette, Rocket, Layout as LayoutIcon, Bot, Edit, FileDown, Wand2, Layers, Smartphone } from 'lucide-react';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleTemplateSelect = (template: Template) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setSelectedTemplate(template);
  };

  const handleBackToGallery = () => {
    setSelectedTemplate(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center fixed inset-0">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="relative mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            {/* Animated spinner */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-l-4 border-r-4 border-b-transparent border-white mx-auto"></div>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-white/5 blur-md transform scale-90"></div>
          </div>
          <div className="mt-8 text-white text-xl font-medium">Loading your creative workspace...</div>
          <div className="mt-3 text-blue-200 text-sm">Preparing your design experience</div>
        </div>
      </div>
    );
  }

  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <PosterEditor 
          template={selectedTemplate} 
          onBack={handleBackToGallery}
        />
      </div>
    );
  }

  return (
    <Layout>
      {/* Floating Buttons */}
      <WhatsAppButton />
      <AIAssistant />
      
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">AI-Powered Design Revolution</span>
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs">NEW</Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Design Posters in 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Seconds</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">No Designer Needed</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              An AI-powered poster & flier maker for small businesses and hustlers. 
              <span className="text-purple-300 font-semibold"> Fast. Affordable. Professional.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create a Poster
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => navigate('/pricing')}
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white bg-white/20 hover:bg-white hover:text-purple-900 text-lg px-10 py-6 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium"
              >
                View Pricing
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-12 text-white/80">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-sm">10,000+ Hustlers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Across Africa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-400" />
                <span className="text-sm">1000+ Templates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section - Enhanced */}
        <div className="bg-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 mb-6 text-sm font-medium">
                🚀 Powerful Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose FlierHustle?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful features designed to make your business stand out</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Layers,
                  title: "1000+ Templates",
                  description: "Events, food, salons, sales, and more professional designs ready to use.",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-100",
                  delay: "0ms",
                  image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=800&auto=format&fit=crop"
                },
                {
                  icon: Wand2,
                  title: "AI Text Generator",
                  description: "Write catchy poster copy in one click with our smart AI assistant.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-100",
                  delay: "200ms",
                  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
                },
                {
                  icon: Smartphone,
                  title: "Easy Customization",
                  description: "Change text, images, colors, and fonts with simple drag-and-drop.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-100",
                  delay: "400ms",
                  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"
                },
                {
                  icon: Download,
                  title: "Instant Downloads",
                  description: "High-res files, print-ready formats delivered instantly.",
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-100",
                  delay: "600ms",
                  image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop"
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg overflow-hidden animate-fade-in"
                  style={{
                    animationDelay: feature.delay,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-0 text-center h-full flex flex-col relative">
                    {/* Feature image */}
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-white/80 z-10`}></div>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="p-8 flex flex-col relative z-20">
                      <div className={`w-20 h-20 ${feature.bgColor} rounded-3xl flex items-center justify-center mx-auto -mt-16 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl relative border-4 border-white`}>
                        <feature.icon className={`w-10 h-10 ${
                          feature.title.includes("Templates") ? "text-purple-600" : 
                          feature.title.includes("AI") ? "text-blue-600" : 
                          feature.title.includes("Customization") ? "text-green-600" : 
                          "text-orange-600"
                        } group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600 flex-1 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                    
                      {/* Animated border */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Simple steps to create stunning designs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Choose a template", desc: "Browse our gallery of professional designs", icon: "🎨" },
                { step: 2, title: "Enter your details", desc: "Add your business information and offer details", icon: "✏️" },
                { step: 3, title: "Let AI help", desc: "Optional: Use AI to write compelling copy", icon: "🤖" },
                { step: 4, title: "Download & share", desc: "Get your design and start promoting!", icon: "🚀" }
              ].map((item) => (
                <div key={item.step} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {item.step}
                    </div>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    {item.step < 4 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-gradient-to-b from-white to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 mb-6 text-sm font-medium">
                💰 Affordable Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that fits your hustle - whether you're just starting out or running a growing business</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "KES 50",
                  priceDetail: "per poster",
                  description: "Perfect for occasional use and one-time projects",
                  features: [
                    "1 Poster Design at a time",
                    "High-resolution Downloads",
                    "Commercial Usage License",
                    "Basic Templates Access",
                    "24-hour Support"
                  ],
                  limitations: [
                    "No AI text generation",
                    "Standard templates only"
                  ],
                  cta: "Get Started",
                  popular: false,
                  icon: "🏆",
                  color: "from-blue-600 to-cyan-600"
                },
                {
                  name: "Unlimited",
                  price: "KES 399",
                  priceDetail: "/month",
                  description: "Best value for small businesses and regular marketers",
                  features: [
                    "Unlimited Poster Designs",
                    "All Premium Templates",
                    "AI Text Generator",
                    "Priority Customer Support",
                    "Custom Branding Options",
                    "Social Media Integration",
                    "Design History & Recovery"
                  ],
                  cta: "Choose This Plan",
                  popular: true,
                  icon: "⭐",
                  color: "from-purple-600 to-blue-600"
                },
                {
                  name: "Print & Delivery",
                  price: "From KES 200",
                  priceDetail: "per print",
                  description: "Professional printing service add-on for physical marketing",
                  features: [
                    "Multiple Size Options (A4, A3, A2)",
                    "Premium Paper Quality",
                    "Fast Delivery Within Africa",
                    "Bulk Order Discounts (10%+)",
                    "Quality Assurance",
                    "High-gloss or Matte Finish"
                  ],
                  cta: "Learn More",
                  popular: false,
                  icon: "🚚",
                  color: "from-green-600 to-teal-600"
                }
              ].map((plan, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-2 border-purple-500 shadow-xl' 
                    : 'border border-gray-200 hover:border-purple-300'
                }`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 shadow-md z-10">
                      Most Popular
                    </Badge>
                  )}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`}></div>
                  <CardContent className="p-8 text-center relative">
                    <div className="text-3xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.priceDetail && <span className="text-gray-600 font-medium ml-1">{plan.priceDetail}</span>}
                    </div>
                    <p className="text-gray-700 mb-6 font-medium">{plan.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="font-semibold text-gray-700 mb-2 text-left">Includes:</p>
                      <ul className="space-y-3 text-sm text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
                            <span className="text-gray-800">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="font-medium text-gray-600 mb-2 text-left">Limitations:</p>
                          <ul className="space-y-2 text-sm text-left">
                            {plan.limitations.map((limitation, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-gray-500">
                                <X className="w-4 h-4 flex-shrink-0" />
                                <span>{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <Button className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg' 
                        : 'bg-gray-800 hover:bg-gray-900'
                    } text-white text-lg py-6 font-medium transition-all duration-300`}>
                      {plan.cta}
                    </Button>
                    
                    {plan.popular && (
                      <p className="mt-3 text-sm text-purple-600 font-medium">30-day money-back guarantee</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16 bg-gray-50 py-8 px-6 rounded-xl max-w-3xl mx-auto border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Need a custom plan for your business?</h3>
              <p className="text-gray-600 mb-4">Contact our team for enterprise solutions and custom pricing packages.</p>
              <Button variant="outline" className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials - Enhanced */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 mb-6 text-sm font-medium">
                ⭐ Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Hustlers Say</h2>
              <p className="text-xl text-gray-600 mb-8">Real stories from real entrepreneurs across Africa</p>
            </div>
            <TestimonialSwiper />
          </div>
        </div>

        {/* Sample Templates Preview */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Browse Our Templates</h2>
              <p className="text-xl text-blue-100 mb-8">Professional designs for every business need</p>
            </div>
            <TemplateGallery onTemplateSelect={handleTemplateSelect} />
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate('/templates-gallery')}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View All Templates
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
