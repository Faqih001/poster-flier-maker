import Link from "next/link";
import { CheckCircle } from "lucide-react";

const pricingPlans = [
  {
    name: "Pay-Per-Design",
    price: "KES 50",
    description: "Perfect for occasional users",
    features: [
      "1 Poster or Flier design",
      "Access to all templates",
      "AI text generation",
      "High-quality download",
      "Valid for 7 days"
    ],
    ctaText: "Purchase Now",
    ctaLink: "/auth/signup?plan=single",
    popular: false
  },
  {
    name: "Premium",
    price: "KES 500/month",
    description: "Most popular for regular users",
    features: [
      "Unlimited designs",
      "Access to all templates",
      "AI text generation",
      "Priority support",
      "High-quality downloads",
      "Remove watermark"
    ],
    ctaText: "Get Started",
    ctaLink: "/auth/signup?plan=premium",
    popular: true
  },
  {
    name: "Business",
    price: "KES 1,500/month",
    description: "Best for small businesses",
    features: [
      "Unlimited designs",
      "Access to all templates",
      "AI text generation",
      "Priority support",
      "High-quality downloads",
      "Remove watermark",
      "Print delivery service",
      "Team collaboration (3 users)"
    ],
    ctaText: "Contact Sales",
    ctaLink: "/contact",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-primary text-white">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              PosterPro
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/templates" className="font-medium">
                Templates
              </Link>
              <Link href="/pricing" className="font-medium">
                Pricing
              </Link>
              <Link
                href="/auth/signin"
                className="bg-white text-primary px-4 py-2 rounded-md font-medium"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business. All plans include access to our
            AI-powered design tools and template library.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-lg overflow-hidden shadow-lg border ${
                plan.popular ? 'border-primary' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.name !== "Pay-Per-Design" && <span className="text-gray-500 ml-1">/ month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                    plan.popular
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Print service upsell */}
        <div className="bg-gray-100 rounded-lg p-8 mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need Your Fliers Printed?</h2>
          <p className="text-gray-600 mb-6">
            We partner with local printing services to deliver high-quality printed fliers and posters directly to you.
            Available with our Business plan or as an add-on service.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-primary text-white py-3 px-6 rounded-md font-medium"
          >
            Learn More About Printing Services
          </Link>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">Can I cancel my subscription at any time?</h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription anytime. Your access will remain active until the end of your billing period.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">How do I pay for the service?</h3>
            <p className="text-gray-600">
              We accept M-Pesa, credit cards, and bank transfers for all our plans.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">What happens when my free trial ends?</h3>
            <p className="text-gray-600">
              After your free trial ends, you'll be automatically switched to the Pay-Per-Design plan unless you choose a subscription.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">Can I upgrade my plan later?</h3>
            <p className="text-gray-600">
              Absolutely! You can upgrade your plan at any time. The new pricing will be prorated for the remaining billing period.
            </p>
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
                <li>
                  <Link href="/templates" className="text-gray-400 hover:text-white">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="text-gray-400 hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">
                info@posterpro.com
                <br />
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
