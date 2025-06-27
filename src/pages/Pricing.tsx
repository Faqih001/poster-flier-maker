
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Pay Per Poster */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold mb-4">Pay Per Poster</CardTitle>
                <div className="text-5xl font-bold text-purple-600 mb-2">KES 50</div>
                <p className="text-gray-600">Perfect for occasional use</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>1 Poster Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>High-res Download (PNG, PDF)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Commercial License</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic Templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Email Support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/create')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Unlimited Plan */}
            <Card className="border-2 border-purple-500 relative hover:shadow-lg transition-shadow">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold mb-4">Unlimited Plan</CardTitle>
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  KES 399
                  <span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">Best for small businesses</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-medium">Unlimited Posters</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>AI Text Generator</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium Templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom Branding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Team Collaboration</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate('/auth')}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>

            {/* Print Service */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold mb-4">Print & Delivery</CardTitle>
                <div className="text-3xl font-bold text-purple-600 mb-2">Add-on Service</div>
                <p className="text-gray-600">Professional printing</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>A4 Size - KES 150</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>A3 Size - KES 300</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>A2 Size - KES 600</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>High-quality Paper</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Fast Delivery (2-3 days)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Bulk Discounts Available</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/order-prints')}
                >
                  Order Prints
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Accepted Payment Methods</h3>
            <div className="flex justify-center items-center space-x-8 text-gray-600">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="font-medium">M-Pesa</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💳</span>
                </div>
                <p className="font-medium">Credit Card</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏦</span>
                </div>
                <p className="font-medium">PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
