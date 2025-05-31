
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Search, Users, Settings, Mail, Calendar, Ticket } from 'lucide-react';

const Index = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking 'Forgot Password' on the login page or contacting IT support.",
      category: "IT"
    },
    {
      question: "How do I request time off?",
      answer: "Submit a time-off request through the HR portal or create a ticket with HR category.",
      category: "HR"
    },
    {
      question: "Where can I find my payslips?",
      answer: "Payslips are available in the employee portal under 'Documents' section.",
      category: "HR"
    },
    {
      question: "How do I report a hardware issue?",
      answer: "Create an IT ticket describing the issue with your hardware and we'll assist you promptly.",
      category: "IT"
    },
    {
      question: "How do I book a meeting room?",
      answer: "Use the facilities booking system or contact Admin support for meeting room reservations.",
      category: "Admin"
    },
    {
      question: "What's the office WiFi password?",
      answer: "Contact IT support for the current WiFi credentials. Passwords are updated monthly for security.",
      category: "IT"
    }
  ];

  const features = [
    {
      icon: <Ticket className="w-6 h-6" />,
      title: "Smart Ticketing",
      description: "AI-powered ticket routing and intelligent categorization"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Seamless collaboration between departments and teams"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and performance insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How can we help you?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Welcome to HelpHub AI - Your intelligent workplace assistant for IT, HR, and Administrative support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Workplaces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your support processes with our AI-powered helpdesk solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in border-0 bg-white/60 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common workplace questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-slide-up bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={`
                      ${faq.category === 'IT' ? 'bg-blue-100 text-blue-800' : ''}
                      ${faq.category === 'HR' ? 'bg-green-100 text-green-800' : ''}
                      ${faq.category === 'Admin' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {faq.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Can't find what you're looking for?
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Create a Support Ticket
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to transform your workplace support?
          </h2>
          <p className="text-xl mb-8 animate-slide-up">
            Join thousands of employees already using HelpHub AI for faster, smarter support
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-scale-in">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
