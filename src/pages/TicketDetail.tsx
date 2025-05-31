
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Clock, User, MessageSquare, Send } from 'lucide-react';

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');

  // Mock ticket data
  const ticket = {
    id: id || '1',
    title: 'Laptop screen flickering',
    description: 'My laptop screen has been flickering intermittently since yesterday. The issue seems to happen more frequently when I open multiple applications. I have tried restarting the laptop but the problem persists.',
    category: 'IT',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    assignee: 'IT Support Team',
    reporter: 'John Doe',
    comments: [
      {
        id: '1',
        author: 'John Doe',
        role: 'employee',
        content: 'The flickering seems to happen mostly when using Chrome browser.',
        timestamp: '2024-01-15T11:00:00Z'
      },
      {
        id: '2',
        author: 'IT Support',
        role: 'admin',
        content: 'Thank you for the additional information. We suspect this might be a graphics driver issue. Can you please check if there are any pending Windows updates?',
        timestamp: '2024-01-15T14:30:00Z'
      },
      {
        id: '3',
        author: 'John Doe',
        role: 'employee',
        content: 'I checked and installed all pending updates. The issue still persists.',
        timestamp: '2024-01-16T09:15:00Z'
      }
    ]
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate adding comment
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the ticket.",
    });
    setNewComment('');
  };

  const handleStatusUpdate = (newStatus: string) => {
    setTicketStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Ticket status has been updated to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ticket #{ticket.id}
              </h1>
              <p className="text-gray-600">{ticket.title}</p>
            </div>
            
            {(user.role === 'admin' || user.role === 'super-admin') && (
              <div className="flex items-center gap-2">
                <Select value={ticketStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ticket Details</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{ticket.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <Badge variant="outline" className={`mt-1 ${ticket.category === 'IT' ? 'border-blue-200 text-blue-700' : ticket.category === 'HR' ? 'border-green-200 text-green-700' : 'border-purple-200 text-purple-700'}`}>
                        {ticket.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reporter</p>
                      <p className="font-medium text-gray-900">{ticket.reporter}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assignee</p>
                      <p className="font-medium text-gray-900">{ticket.assignee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium text-gray-900">
                        {new Date(ticket.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Comments
                </CardTitle>
                <CardDescription>
                  Communication history for this ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticket.comments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className="border-l-4 border-blue-200 pl-4 py-3 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <Badge variant="outline" className={`text-xs ${comment.role === 'admin' ? 'border-orange-200 text-orange-700' : 'border-blue-200 text-blue-700'}`}>
                            {comment.role === 'admin' ? 'Support' : 'User'}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Add Comment</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add your comment or update..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="bg-white/50"
                    />
                    <Button onClick={handleAddComment} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Send className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned to</p>
                    <p className="font-medium">{ticket.assignee}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Priority Level</p>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority} Priority
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Related Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  View Similar Tickets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Escalate to Manager
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
