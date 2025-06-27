
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-12 h-12 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-xl text-gray-600">Your privacy is important to us. Learn how we protect your data.</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Email address and account credentials</li>
                  <li>Business information and poster designs you create</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Usage data and analytics to improve our services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-green-600" />
                  <span>How We Use Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Provide and maintain the FlierHustle service</li>
                  <li>Process payments and send transaction confirmations</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Improve our AI algorithms and template recommendations</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                  <span>Data Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>All data is encrypted in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure cloud infrastructure with leading providers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-orange-600" />
                  <span>Data Sharing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information only in these limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>With service providers who help us operate our platform</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                  <li>With your explicit consent</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <UserCheck className="w-6 h-6 text-indigo-600" />
                  <span>Your Rights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Access and review your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:privacy@flierhustle.com" className="text-purple-600 hover:underline">
                    privacy@flierhustle.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About Our Privacy Policy?</h3>
                <p className="text-gray-700 mb-6">
                  We're here to help. Contact our privacy team if you have any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:privacy@flierhustle.com" 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Email Privacy Team
                  </a>
                  <a 
                    href="/support" 
                    className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Visit Help Center
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
