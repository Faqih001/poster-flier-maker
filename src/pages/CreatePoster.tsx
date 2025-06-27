
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TemplateGallery } from '@/components/TemplateGallery';
import { PosterEditor } from '@/components/PosterEditor';
import { Template } from '@/types/template';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CreatePoster = () => {
  const location = useLocation();
  const initialTemplate = location.state?.template;
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(initialTemplate || null);
  const { user } = useAuth();
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

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Sign In Required</h1>
            <p className="text-xl mb-8">Please sign in to create posters</p>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
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
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Create Your Poster
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Choose a template to get started with your poster design.
            </p>
          </div>
          
          <TemplateGallery onTemplateSelect={handleTemplateSelect} />
        </div>
      </div>
    </Layout>
  );
};

export default CreatePoster;
