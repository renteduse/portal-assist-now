
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
import { ArrowLeft, Send } from 'lucide-react';

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

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Ticket Created Successfully!",
        description: "Your support ticket has been submitted and assigned a tracking number.",
      });
      
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
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
            <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
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
                      className="bg-white/50"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="IT">IT Support</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Admin">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Priority *</Label>
                      <Select value={priority} onValueChange={setPriority} required>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
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
                      className="bg-white/50"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        'Creating Ticket...'
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
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Be Specific</h4>
                  <p className="text-gray-600">Include error messages, screenshots, and steps you've already tried.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Choose the Right Category</h4>
                  <p className="text-gray-600">This helps us route your ticket to the right team faster.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Set Priority Appropriately</h4>
                  <p className="text-gray-600">Critical issues block work, while low priority issues can wait.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Expected Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Critical</span>
                  <span className="text-gray-600">1 hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600 font-medium">High</span>
                  <span className="text-gray-600">4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600 font-medium">Medium</span>
                  <span className="text-gray-600">1 business day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Low</span>
                  <span className="text-gray-600">3 business days</span>
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
