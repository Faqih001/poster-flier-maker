import Image from "next/image";
import Link from "next/link";

// Template data
const templates = [
  {
    id: 1,
    title: "Business Promotion",
    description: "Perfect for promoting your products or services",
    imageUrl: "/templates/business-promo.jpg",
    category: "business",
  },
  {
    id: 2,
    title: "Event Announcement",
    description: "Great for advertising upcoming events",
    imageUrl: "/templates/event.jpg",
    category: "event",
  },
  {
    id: 3,
    title: "Restaurant Menu",
    description: "Showcase your food and drink offerings",
    imageUrl: "/templates/restaurant.jpg",
    category: "food",
  },
  {
    id: 4,
    title: "Sale Flyer",
    description: "Highlight special offers and discounts",
    imageUrl: "/templates/sale.jpg",
    category: "retail",
  },
  {
    id: 5,
    title: "Product Launch",
    description: "Introduce new products to your customers",
    imageUrl: "/templates/product.jpg",
    category: "business",
  },
  {
    id: 6,
    title: "Workshop Invitation",
    description: "Invite participants to educational workshops",
    imageUrl: "/templates/workshop.jpg",
    category: "education",
  },
];

export default function TemplatesPage() {
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
        <h1 className="text-3xl font-bold mb-8 text-center">
          Choose a Template to Start
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-4 py-2 bg-primary text-white rounded-full">
            All
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100">
            Business
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100">
            Event
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100">
            Food
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100">
            Retail
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100">
            Education
          </button>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/editor?template=${template.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Template Image</span>
                </div>
                {/* Uncomment when you have actual template images */}
                {/* <Image
                  src={template.imageUrl}
                  alt={template.title}
                  fill
                  className="object-cover"
                /> */}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{template.title}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {template.category}
                  </span>
                  <span className="text-primary font-medium">Use Template →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

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
