import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold">PosterPro</div>
            <div className="space-x-4">
              <Link href="/templates" className="hover:underline">Templates</Link>
              <Link href="/pricing" className="hover:underline">Pricing</Link>
              <Link href="/auth/signin" className="bg-white text-primary px-4 py-2 rounded-md font-medium">Sign In</Link>
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Create Stunning Fliers for Your Business
              </h1>
              <p className="text-lg mb-8 max-w-md">
                No design skills needed. Our AI-powered tool helps small businesses create 
                professional fliers in minutes, not hours.
              </p>
              <div className="space-x-4">
                <Link href="/templates" className="bg-white text-primary px-6 py-3 rounded-md font-medium">
                  Get Started
                </Link>
                <Link href="/pricing" className="bg-transparent border border-white px-6 py-3 rounded-md font-medium">
                  View Plans
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full md:h-96">
                <Image
                  src="/flyer-preview.jpg" 
                  alt="Poster preview"
                  fill
                  className="object-contain rounded-md shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Choose a Template</h3>
              <p className="text-gray-600">
                Select from dozens of professionally designed templates for any business need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Customize with AI</h3>
              <p className="text-gray-600">
                Use our AI to generate professional text and images specific to your business.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Download & Share</h3>
              <p className="text-gray-600">
                Get your high-quality flier in seconds. Print it or share it online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">Affordable Plans for Everyone</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Choose the perfect plan that fits your business needs. No hidden fees.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/pricing"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PosterPro</h3>
              <p className="text-gray-400">
                AI-powered poster and flier maker for small businesses.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/templates" className="text-gray-400 hover:text-white">Templates</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/auth/signin" className="text-gray-400 hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">
                info@posterpro.com<br />
                +254 700 123 456
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PosterPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
    </div>
  );
}
