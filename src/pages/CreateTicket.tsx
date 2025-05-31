
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Send, Zap, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI ticket routing based on category
    const routingInfo = {
      'IT': 'Your ticket will be routed to the IT Support team',
      'HR': 'Your ticket will be routed to the Human Resources team',
      'Admin': 'Your ticket will be routed to the Administration team'
    };

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Ticket Created Successfully!",
        description: `${routingInfo[category as keyof typeof routingInfo]}. Tracking ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
      
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const categoryInfo = {
    'IT': {
      icon: <Zap className="w-5 h-5" />,
      description: 'Hardware issues, software problems, network connectivity, password resets',
      color: 'from-blue-500 to-purple-600'
    },
    'HR': {
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Payroll questions, time-off requests, benefits, policy clarifications',
      color: 'from-green-500 to-blue-500'
    },
    'Admin': {
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Facility issues, meeting room bookings, office supplies, security',
      color: 'from-purple-500 to-pink-500'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Support Ticket
          </h1>
          <p className="text-gray-600">
            Describe your issue and we'll get you the help you need
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-purple-600" />
                  Ticket Details
                </CardTitle>
                <CardDescription>
                  Provide as much detail as possible to help us resolve your issue quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of your issue"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white/50 transition-all duration-300 focus:scale-[1.02]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger className="bg-white/50 transition-all duration-300 hover:scale-105">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="IT" className="hover:bg-blue-50">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-blue-600" />
                              IT Support
                            </div>
                          </SelectItem>
                          <SelectItem value="HR" className="hover:bg-green-50">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Human Resources
                            </div>
                          </SelectItem>
                          <SelectItem value="Admin" className="hover:bg-purple-50">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-purple-600" />
                              Administration
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {category && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md animate-fade-in">
                          <div className="flex items-center gap-2 text-sm">
                            {categoryInfo[category as keyof typeof categoryInfo].icon}
                            <span className="text-gray-600">
                              {categoryInfo[category as keyof typeof categoryInfo].description}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Priority *</Label>
                      <Select value={priority} onValueChange={setPriority} required>
                        <SelectTrigger className="bg-white/50 transition-all duration-300 hover:scale-105">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Low">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Low
                            </div>
                          </SelectItem>
                          <SelectItem value="Medium">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              Medium
                            </div>
                          </SelectItem>
                          <SelectItem value="High">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              High
                            </div>
                          </SelectItem>
                          <SelectItem value="Critical">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              Critical
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your issue, including steps to reproduce, error messages, etc."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="bg-white/50 transition-all duration-300 focus:scale-[1.02]"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Ticket...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Ticket
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/dashboard')}
                      disabled={isLoading}
                      className="hover:scale-105 transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="group hover:bg-blue-50 p-2 rounded-md transition-all">
                  <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600">Be Specific</h4>
                  <p className="text-gray-600">Include error messages, screenshots, and steps you've already tried.</p>
                </div>
                <div className="group hover:bg-green-50 p-2 rounded-md transition-all">
                  <h4 className="font-medium text-gray-900 mb-1 group-hover:text-green-600">Choose the Right Category</h4>
                  <p className="text-gray-600">This helps us route your ticket to the right team faster.</p>
                </div>
                <div className="group hover:bg-purple-50 p-2 rounded-md transition-all">
                  <h4 className="font-medium text-gray-900 mb-1 group-hover:text-purple-600">Set Priority Appropriately</h4>
                  <p className="text-gray-600">Critical issues block work, while low priority issues can wait.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Expected Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center hover:bg-red-50 p-2 rounded-md transition-all">
                  <span className="text-red-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Critical
                  </span>
                  <span className="text-gray-600 font-medium">1 hour</span>
                </div>
                <div className="flex justify-between items-center hover:bg-orange-50 p-2 rounded-md transition-all">
                  <span className="text-orange-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    High
                  </span>
                  <span className="text-gray-600 font-medium">4 hours</span>
                </div>
                <div className="flex justify-between items-center hover:bg-yellow-50 p-2 rounded-md transition-all">
                  <span className="text-yellow-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Medium
                  </span>
                  <span className="text-gray-600 font-medium">1 business day</span>
                </div>
                <div className="flex justify-between items-center hover:bg-green-50 p-2 rounded-md transition-all">
                  <span className="text-green-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Low
                  </span>
                  <span className="text-gray-600 font-medium">3 business days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
