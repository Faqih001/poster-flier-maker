import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Home, Layout, Plus, CreditCard, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
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
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const closeSheet = () => {
    setSheetOpen(false);
  };
  
  const NavLinks = ({ mobile = false, onLinkClick = () => {} }: { mobile?: boolean; onLinkClick?: () => void }) => (
    <>
      <Link 
        to="/templates-gallery" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 ${mobile ? 'text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <Layout className={`${mobile ? 'mr-2' : 'hidden'}`} size={18} />
        Templates
      </Link>
      <Link 
        to="/pricing" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 ${mobile ? 'text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <CreditCard className={`${mobile ? 'mr-2' : 'hidden'}`} size={18} />
        Pricing
      </Link>
      <Link 
        to="/support" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 ${mobile ? 'text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <HelpCircle className={`${mobile ? 'mr-2' : 'hidden'}`} size={18} />
        Help
      </Link>
      <Link 
        to="/about" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 ${mobile ? 'text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <User className={`${mobile ? 'mr-2' : 'hidden'}`} size={18} />
        About
      </Link>
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">FlierHustle</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>
        
        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-white pt-10">
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </SheetClose>
              <div className="flex flex-col space-y-4 py-4">
                <NavLinks mobile onLinkClick={closeSheet} />
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 text-lg w-full flex justify-start items-center"
                      onClick={closeSheet}
                    >
                      <Home className="mr-2" size={18} />
                      Dashboard
                    </Link>
                    <Link 
                      to="/create" 
                      className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 text-lg w-full flex justify-start items-center"
                      onClick={closeSheet}
                    >
                      <Plus className="mr-2" size={18} />
                      Create Poster
                    </Link>
                    <Link 
                      to="/order-prints" 
                      className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 text-lg w-full flex justify-start items-center"
                      onClick={closeSheet}
                    >
                      <CreditCard className="mr-2" size={18} />
                      Order Prints
                    </Link>
                    <Link 
                      to="/account" 
                      className="text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-purple-50 text-lg w-full flex justify-start items-center"
                      onClick={closeSheet}
                    >
                      <Settings className="mr-2" size={18} />
                      Account Settings
                    </Link>
                    <button 
                      onClick={() => {
                        closeSheet();
                        handleSignOut();
                      }}
                      className="text-red-600 font-semibold hover:text-red-700 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-red-50 text-lg w-full flex justify-start items-center"
                    >
                      <LogOut className="mr-2" size={18} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 px-4">
                    <Button 
                      onClick={() => {
                        closeSheet();
                        navigate('/auth');
                      }}
                      variant="outline" 
                      className="text-gray-700 hover:text-purple-600 border-gray-300 hover:border-purple-300 bg-white hover:bg-purple-50 font-medium w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => {
                        closeSheet();
                        navigate('/auth');
                      }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
        
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
                <DropdownMenuItem onClick={() => navigate('/templates-gallery')} className="hover:bg-purple-50 text-gray-700">
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
            <div className="hidden md:flex items-center space-x-4">
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
