
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TemplateGallery } from '@/components/TemplateGallery';
import { Template } from '@/types/template';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Bookmark, ArrowRight, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { AIAssistant } from '@/components/AIAssistant';

const TemplatesGallery = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleTemplateSelect = (template: Template) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/create', { state: { template } });
  };

  return (
    <Layout>
      {/* Floating Buttons */}
      <WhatsAppButton />
      <AIAssistant />
      
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Hundreds of templates</span>
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs">NEW</Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Browse Our
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Template Gallery</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Professional designs for every business need. Click any template to start customizing.
            </p>
            
            {/* Search and filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400 w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Search templates by name or category..." 
                  className="pl-12 pr-4 py-6 w-full bg-white/10 backdrop-blur-sm text-white border-white/20 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {!user && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto mb-16 border border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Sign in to save your designs</h3>
                    <p className="text-blue-100">Create an account to save your poster designs and access them anytime</p>
                  </div>
                  <Button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <Bookmark className="w-5 h-5 mr-2" />
                    Sign In Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-12">
            <TemplateGallery onTemplateSelect={handleTemplateSelect} />
          </div>

          <div className="text-center mt-16 pb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Can't find what you're looking for?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Use our AI-powered poster creator to design a custom poster from scratch
            </p>
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Custom Poster
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesGallery;
