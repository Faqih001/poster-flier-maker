
import React from 'react';
import { Layout } from '@/components/Layout';
import { TemplateGallery } from '@/components/TemplateGallery';
import { Template } from '@/types/template';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TemplatesGallery = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTemplateSelect = (template: Template) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/create', { state: { template } });
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Choose Your Template
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Professional designs for every business. Click any template to start customizing.
            </p>
          </div>
          
          <TemplateGallery onTemplateSelect={handleTemplateSelect} />
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesGallery;
