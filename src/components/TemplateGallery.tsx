
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/template';
import { Eye, Sparkles } from 'lucide-react';

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Grand Opening Sale',
    category: 'Business',
    previewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600',
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
    accentColor: '#FFE66D',
    layout: 'hero',
    elements: []
  },
  {
    id: '2',
    name: 'Restaurant Special',
    category: 'Food & Beverage',
    previewImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=600',
    backgroundColor: '#4ECDC4',
    textColor: '#2C3E50',
    accentColor: '#FF8B94',
    layout: 'split',
    elements: []
  },
  {
    id: '3',
    name: 'Service Promotion',
    category: 'Services',
    previewImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600',
    backgroundColor: '#A8E6CF',
    textColor: '#2C3E50',
    accentColor: '#FF8B94',
    layout: 'minimal',
    elements: []
  },
  {
    id: '4',
    name: 'Event Announcement',
    category: 'Events',
    previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=600',
    backgroundColor: '#6C5CE7',
    textColor: '#FFFFFF',
    accentColor: '#FDCB6E',
    layout: 'bold',
    elements: []
  },
  {
    id: '5',
    name: 'Product Launch',
    category: 'Product',
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600',
    backgroundColor: '#FD79A8',
    textColor: '#FFFFFF',
    accentColor: '#00B894',
    layout: 'hero',
    elements: []
  },
  {
    id: '6',
    name: 'Seasonal Sale',
    category: 'Retail',
    previewImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=600',
    backgroundColor: '#00CEC9',
    textColor: '#2D3436',
    accentColor: '#E17055',
    layout: 'split',
    elements: []
  },
  // New templates
  {
    id: '7',
    name: 'Hair Salon Discount',
    category: 'Services',
    previewImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=600',
    backgroundColor: '#FF9A8B',
    textColor: '#2D3436',
    accentColor: '#6C5B7B',
    layout: 'minimal',
    elements: []
  },
  {
    id: '8',
    name: 'Music Concert',
    category: 'Events',
    previewImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=600',
    backgroundColor: '#4B0082',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    layout: 'bold',
    elements: []
  },
  {
    id: '9',
    name: 'Bakery Menu',
    category: 'Food & Beverage',
    previewImage: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=600',
    backgroundColor: '#D4A373',
    textColor: '#3A3238',
    accentColor: '#FAEDCD',
    layout: 'split',
    elements: []
  },
  {
    id: '10',
    name: 'Tech Workshop',
    category: 'Events',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=600',
    backgroundColor: '#2A2A72',
    textColor: '#FFFFFF',
    accentColor: '#009FFD',
    layout: 'hero',
    elements: []
  },
  {
    id: '11',
    name: 'Fashion Sale',
    category: 'Retail',
    previewImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600',
    backgroundColor: '#F8F9FA',
    textColor: '#212529',
    accentColor: '#FF758F',
    layout: 'minimal',
    elements: []
  },
  {
    id: '12',
    name: 'Gym Membership',
    category: 'Services',
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600',
    backgroundColor: '#212529',
    textColor: '#FFFFFF',
    accentColor: '#FFC107',
    layout: 'bold',
    elements: []
  },
  {
    id: '13',
    name: 'Coffee Shop Promo',
    category: 'Food & Beverage',
    previewImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600',
    backgroundColor: '#6F4E37',
    textColor: '#FFFFFF',
    accentColor: '#F5DEB3',
    layout: 'split',
    elements: []
  },
  {
    id: '14',
    name: 'Business Conference',
    category: 'Business',
    previewImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=600',
    backgroundColor: '#004E92',
    textColor: '#FFFFFF',
    accentColor: '#E9E9E9',
    layout: 'hero',
    elements: []
  },
  {
    id: '15',
    name: 'Electronics Sale',
    category: 'Product',
    previewImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=600',
    backgroundColor: '#151515',
    textColor: '#FFFFFF',
    accentColor: '#00F2EA',
    layout: 'bold',
    elements: []
  },
  {
    id: '16',
    name: 'Cooking Class',
    category: 'Events',
    previewImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=600',
    backgroundColor: '#E76F51',
    textColor: '#FFFFFF',
    accentColor: '#F4A261',
    layout: 'split',
    elements: []
  },
  {
    id: '17',
    name: 'Car Wash Service',
    category: 'Services',
    previewImage: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=600',
    backgroundColor: '#3A86FF',
    textColor: '#FFFFFF',
    accentColor: '#FFBE0B',
    layout: 'minimal',
    elements: []
  },
  {
    id: '18',
    name: 'Real Estate Open House',
    category: 'Business',
    previewImage: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=600',
    backgroundColor: '#023047',
    textColor: '#FFFFFF',
    accentColor: '#8ECAE6',
    layout: 'hero',
    elements: []
  }
];

interface TemplateGalleryProps {
  onTemplateSelect: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onTemplateSelect }) => {
  const categories = ['All', 'Business', 'Food & Beverage', 'Services', 'Events', 'Product', 'Retail'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? sampleTemplates 
    : sampleTemplates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl' 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-md'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group cursor-pointer overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-xl"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 font-medium backdrop-blur-sm">
                  {template.category}
                </Badge>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    onClick={() => onTemplateSelect(template)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                    {template.name}
                  </h3>
                  <Sparkles className="w-5 h-5 text-yellow-400 opacity-70" />
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full shadow-md" 
                      style={{ backgroundColor: template.backgroundColor }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full shadow-md" 
                      style={{ backgroundColor: template.accentColor }}
                    ></div>
                  </div>
                  <span className="text-sm text-white/80 font-medium capitalize bg-white/10 px-2 py-1 rounded-full">
                    {template.layout}
                  </span>
                </div>
                
                <Button
                  onClick={() => onTemplateSelect(template)}
                  className="w-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Select Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
