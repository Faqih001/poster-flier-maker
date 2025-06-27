
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Home, Layout, Plus, CreditCard, Settings, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">FlierHustle</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/templates" 
            className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            Templates
          </Link>
          <Link 
            to="/pricing" 
            className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            Pricing
          </Link>
          <Link 
            to="/support" 
            className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            Help
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-gray-700 hover:text-purple-600 border-gray-300 hover:border-purple-300 bg-white hover:bg-purple-50 shadow-sm">
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline font-medium">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-xl">
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-purple-50 text-gray-700">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/create')} className="hover:bg-purple-50 text-gray-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Poster
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/templates')} className="hover:bg-purple-50 text-gray-700">
                  <Layout className="w-4 h-4 mr-2" />
                  Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/order-prints')} className="hover:bg-purple-50 text-gray-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Order Prints
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')} className="hover:bg-purple-50 text-gray-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/support')} className="hover:bg-purple-50 text-gray-700">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="hover:bg-red-50 text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline" 
                className="text-gray-700 hover:text-purple-600 border-gray-300 hover:border-purple-300 bg-white hover:bg-purple-50 font-medium"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
