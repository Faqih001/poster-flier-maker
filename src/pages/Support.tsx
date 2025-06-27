
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, MessageCircle, HelpCircle, Send, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/functions/v1/send-contact-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        toast({
          title: "Message Sent!",
          description: "We've received your message and will get back to you within 24 hours.",
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I create my first poster?",
      answer: "Simply click 'Create a Poster' on the homepage, choose a template that matches your business, and customize it with your information. Our AI can help generate catchy text for your poster."
    },
    {
      question: "What formats can I download my posters in?",
      answer: "You can download your posters in high-resolution PNG and PDF formats, perfect for both digital sharing and professional printing."
    },
    {
      question: "How does the printing service work?",
      answer: "After creating your poster, go to 'Order Prints', select your size (A4, A3, or A2), quantity, and delivery address. We'll print and deliver within 2-3 days across Kenya."
    },
    {
      question: "Can I edit my posters after creating them?",
      answer: "Yes! All your designs are saved in your dashboard where you can edit, download, or order prints anytime."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, Credit/Debit cards, and PayPal for both poster creation and printing services."
    },
    {
      question: "How does the AI text generator work?",
      answer: "Our AI analyzes your business type and offer details to generate compelling marketing copy. You can use it as-is or edit it to match your style."
    },
    {
      question: "What's the difference between pay-per-poster and unlimited plan?",
      answer: "Pay-per-poster costs KES 50 each with basic features. The unlimited plan (KES 399/month) includes unlimited posters, AI text generator, premium templates, and priority support."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer refunds within 24 hours if you're not satisfied with your poster. For printing orders, refunds are available if there are quality issues."
    },
    {
      question: "Do you deliver outside Kenya?",
      answer: "Currently, our printing and delivery service is available within Kenya only. However, you can download digital versions from anywhere."
    },
    {
      question: "How do I cancel my unlimited subscription?",
      answer: "You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Support & FAQ
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get help with using FlierHustle or contact our support team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Options */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-600" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Get help via email</p>
                  <p className="font-medium">fakiiahmad001@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Quick support via WhatsApp</p>
                  <p className="font-medium">+254741140250</p>
                  <p className="text-sm text-gray-500 mt-2">Available 9 AM - 6 PM EAT</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Check our FAQ below</p>
                    <p>• Visit your dashboard</p>
                    <p>• Try creating a test poster</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ */}
            <div className="lg:col-span-2">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:text-purple-600 transition-colors duration-200">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="mt-8 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2 text-purple-600" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-4">We'll get back to you within 24 hours.</p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            disabled={isSubmitting}
                            className="focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            disabled={isSubmitting}
                            className="focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          disabled={isSubmitting}
                          className="focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          disabled={isSubmitting}
                          className="focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
