
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { Search, Users, Settings, Mail, Calendar, Ticket, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // For now, redirect to login. In real implementation, this would show AI response
      navigate('/login');
    }
  };

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
      description: "AI-powered ticket routing and intelligent categorization",
      color: "from-blue-600 to-purple-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Seamless collaboration between departments and teams",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and performance insights",
      color: "from-pink-600 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                How can we help you?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Welcome to HelpHub AI - Your intelligent workplace assistant for IT, HR, and Administrative support
            </p>
            
            {/* Question Input */}
            <div className="max-w-2xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <form onSubmit={handleQuestionSubmit} className="relative">
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Ask me anything about IT, HR, or Admin support..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:shadow-2xl"
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Ask AI
                  </Button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-2">
                Try asking: "How do I reset my password?" or "How to request time off?"
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Access Portal
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Watch Demo
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
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 animate-scale-in border-0 bg-white/60 backdrop-blur-sm group hover:scale-105 overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{feature.title}</CardTitle>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/50 to-blue-50/50">
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
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 animate-slide-up bg-white/80 backdrop-blur-sm group hover:scale-105 border-0" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={`transition-all duration-300 group-hover:scale-110
                      ${faq.category === 'IT' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' : ''}
                      ${faq.category === 'HR' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' : ''}
                      ${faq.category === 'Admin' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800' : ''}
                    `}>
                      {faq.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in">
            <p className="text-lg text-gray-600 mb-6">
              Can't find what you're looking for?
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Create a Support Ticket
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to transform your workplace support?
          </h2>
          <p className="text-xl mb-8 animate-slide-up">
            Join thousands of employees already using HelpHub AI for faster, smarter support
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-scale-in rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
