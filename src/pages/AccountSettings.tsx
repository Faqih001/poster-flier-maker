
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, CreditCard, Bell, Shield } from 'lucide-react';

const AccountSettings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    businessName: '',
    phone: ''
  });

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Sign In Required</h1>
            <p className="text-xl mb-8">Please sign in to access account settings</p>
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Account Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 text-purple-700">
                        <User className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <CreditCard className="w-5 h-5" />
                        <span>Billing</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Shield className="w-5 h-5" />
                        <span>Security</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={profileData.businessName}
                          onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          placeholder="+254..."
                        />
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                {/* Subscription */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Free Plan</p>
                        <p className="text-sm text-gray-600">Pay per poster - KES 50 each</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade to Unlimited
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm">Account created</span>
                        <span className="text-sm text-gray-500">Today</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        No design activity yet. <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/create')}>Create your first poster</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={async () => {
                          await signOut();
                          navigate('/');
                        }}
                      >
                        Sign Out
                      </Button>
                      <p className="text-sm text-gray-500">
                        Or <button className="text-red-600 underline">delete your account</button> permanently.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSettings;
