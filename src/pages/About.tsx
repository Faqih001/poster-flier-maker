
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Zap, Heart } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Built for Hustlers, By Hustlers
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We understand the hustle. That's why we built FlierHustle - to help small businesses and entrepreneurs create professional marketing materials without the designer fees or long wait times.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Our Story */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                FlierHustle was born from a simple frustration: watching talented hustlers and small business owners struggle to create professional marketing materials. Too many brilliant ideas were held back by expensive design costs and long turnaround times.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                In Kenya and across Africa, we saw street vendors with amazing products, salon owners with incredible skills, and event organizers with creative visions - all limited by their ability to create eye-catching posters and flyers to promote their businesses.
              </p>
              <p className="text-xl leading-relaxed">
                So we built FlierHustle - an AI-powered design tool that puts professional poster creation in everyone's hands. No design experience needed. No expensive software. Just great designs, fast results, and affordable pricing.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">What Drives Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-gray-600">Professional design tools should be available to everyone, regardless of budget or technical skills.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Speed</h3>
                  <p className="text-gray-600">Business moves fast. Your marketing materials should be ready in minutes, not days.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Community</h3>
                  <p className="text-gray-600">We're building tools for hustlers, by hustlers. We understand your challenges because we've been there.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Impact</h3>
                  <p className="text-gray-600">Every poster created helps a business grow. We're proud to be part of Africa's entrepreneurial journey.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-2xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To democratize professional design and empower every hustler, small business owner, and entrepreneur across Africa with the tools they need to market their business effectively and affordably.
            </p>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                    FA
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Fakii Ahmad</h3>
                  <p className="text-purple-600 font-medium mb-4">Founder & CEO</p>
                  <p className="text-gray-600 leading-relaxed">
                    A passionate entrepreneur who believes in the power of technology to level the playing field for small businesses. With experience in both business and technology, Fakii built FlierHustle to solve real problems for real hustlers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of hustlers who are already creating professional posters and growing their businesses with FlierHustle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/create')}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-4"
              >
                Create Your First Poster
              </Button>
              <Button
                onClick={() => navigate('/support')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
