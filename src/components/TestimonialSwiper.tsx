
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I made a poster for my chips kiosk in 2 minutes! My sales went up 30% that week. FlierHustle is a game-changer for small businesses.",
    name: "Sarah K.",
    business: "Food Vendor, Nairobi",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616c669a2f9?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "No more waiting on designers! I can create professional event flyers whenever I need them. The AI text generator is incredible!",
    name: "John M.",
    business: "Event Organizer, Mombasa",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The AI text generator is amazing. It writes better copy than I ever could! My salon's social media engagement has doubled.",
    name: "Grace W.",
    business: "Salon Owner, Kisumu",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "FlierHustle helped me create stunning product launch posters that attracted hundreds of customers. Worth every shilling!",
    name: "David O.",
    business: "Electronics Shop, Eldoret",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "From zero design skills to creating beautiful restaurant menus and promotions. This tool is perfect for hustlers like me!",
    name: "Amina H.",
    business: "Restaurant Owner, Nakuru",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The templates are exactly what I needed for my fashion boutique. Professional, modern, and eye-catching designs!",
    name: "Mary L.",
    business: "Fashion Boutique, Machakos",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

export const TestimonialSwiper = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className="group h-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg relative overflow-hidden animate-fade-in"
            style={{
              animationDelay: `${index * 200}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardContent className="p-8 h-full flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm animate-pulse" 
                      style={{
                        animationDelay: `${(index * 200) + (i * 100)}ms`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-purple-300 opacity-60 group-hover:text-purple-400 transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
              
              <div className="flex-1 mb-6">
                <p className="text-gray-700 text-lg leading-relaxed font-medium italic group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200 group-hover:border-purple-200 transition-colors duration-300">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">{testimonial.business}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
