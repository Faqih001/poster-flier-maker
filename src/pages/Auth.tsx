
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and confirm your account before signing in.');
        } else {
          toast.error(error.message || 'Failed to sign in');
        }
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
        } else if (error.message.includes('Password should be at least 6 characters')) {
          toast.error('Password should be at least 6 characters long.');
        } else {
          toast.error(error.message || 'Failed to create account');
        }
      } else {
        toast.success('Account created! Please check your email to confirm your account.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white hover:text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              <CardTitle className="text-2xl font-bold text-white">FlyerForge</CardTitle>
            </div>
            <p className="text-blue-100">Sign in to your account or create a new one</p>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        type="password"
                        placeholder="Create a password (min. 6 characters)"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
