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
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-50 text-sm sm:text-base ${mobile ? 'text-base sm:text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <Layout className={`${mobile ? 'mr-2' : 'hidden'}`} size={mobile ? 18 : 16} />
        Templates
      </Link>
      <Link 
        to="/pricing" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-50 text-sm sm:text-base ${mobile ? 'text-base sm:text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <CreditCard className={`${mobile ? 'mr-2' : 'hidden'}`} size={mobile ? 18 : 16} />
        Pricing
      </Link>
      <Link 
        to="/support" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-50 text-sm sm:text-base ${mobile ? 'text-base sm:text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <HelpCircle className={`${mobile ? 'mr-2' : 'hidden'}`} size={mobile ? 18 : 16} />
        Help
      </Link>
      <Link 
        to="/about" 
        className={`text-gray-700 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-purple-50 text-sm sm:text-base ${mobile ? 'text-base sm:text-lg w-full flex justify-start items-center' : ''}`}
        onClick={onLinkClick}
      >
        <User className={`${mobile ? 'mr-2' : 'hidden'}`} size={mobile ? 18 : 16} />
        About
      </Link>
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <img src="/flier-icon.svg" alt="FlierHustle Logo" className="w-full h-full" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">FlierHustle</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
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
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline" 
                size="sm"
                className="text-gray-700 hover:text-purple-600 border-gray-300 hover:border-purple-300 bg-white hover:bg-purple-50 font-medium text-sm lg:text-base h-9 lg:h-10"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base h-9 lg:h-10"
              >
                Get Started
              </Button>
            </div>
          )}
          
          {/* Mobile Navigation - Moved here to be at the end */}
          {isMobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-white">
                <SheetHeader className="mb-5">
                  <SheetTitle>FlierHustle Menu</SheetTitle>
                  <SheetDescription>Navigate our services and features</SheetDescription>
                </SheetHeader>
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
        </div>
      </div>
    </header>
  );
};
