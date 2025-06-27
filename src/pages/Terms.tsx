
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale } from 'lucide-react';

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <FileText className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            <p className="text-xl text-gray-600">Please read these terms carefully before using FlierHustle.</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-green-600" />
                  <span>Acceptance of Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using FlierHustle, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These terms apply to all users of the service, including without limitation users who 
                  are browsers, vendors, customers, merchants, and/or contributors of content.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <span>Use License</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Permission is granted to temporarily use FlierHustle for personal and commercial purposes. 
                  This includes the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Create and download poster designs for your business</li>
                  <li>Use our templates and AI-generated content in your designs</li>
                  <li>Print and distribute the posters you create</li>
                  <li>Use designs for commercial purposes without additional licensing fees</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This license shall automatically terminate if you violate any of these restrictions 
                  and may be terminated by FlierHustle at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <span>Prohibited Uses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You may not use FlierHustle for any of the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Creating content that is illegal, harmful, or offensive</li>
                  <li>Violating any intellectual property rights</li>
                  <li>Attempting to reverse engineer or copy our AI algorithms</li>
                  <li>Reselling or redistributing our templates without permission</li>
                  <li>Creating fake or misleading advertisements</li>
                  <li>Spamming or sending unsolicited communications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <span>Payment Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Payment terms for FlierHustle services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Per-poster charges are processed immediately upon download</li>
                  <li>Monthly subscriptions are billed monthly in advance</li>
                  <li>All payments are processed securely through third-party providers</li>
                  <li>Refunds are available within 30 days for unused subscriptions</li>
                  <li>Prices are subject to change with 30 days notice</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  By providing payment information, you authorize us to charge your chosen payment method 
                  for the selected services.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Scale className="w-6 h-6 text-indigo-600" />
                  <span>Disclaimer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The information on this platform is provided on an "as is" basis. To the fullest extent 
                  permitted by law, FlierHustle excludes all representations, warranties, conditions and 
                  terms whether express or implied.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  FlierHustle shall not be liable for any damages arising from the use or inability to 
                  use this service, including but not limited to direct, indirect, incidental, punitive, 
                  and consequential damages.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <span>Termination</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you wish to terminate your account, you may simply discontinue using the service 
                  or contact us to delete your account permanently.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h3>
                <p className="text-gray-700 mb-6">
                  If you have any questions about these Terms of Service, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:legal@flierhustle.com" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Email Legal Team
                  </a>
                  <a 
                    href="/support" 
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    Get Support
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

export default Terms;
