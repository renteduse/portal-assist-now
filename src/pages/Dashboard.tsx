
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Plus, Clock, CheckCircle, AlertCircle, Filter } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'IT' | 'HR' | 'Admin';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: string;
  assignee?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock tickets data
  const [tickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Laptop screen flickering',
      description: 'My laptop screen has been flickering intermittently',
      category: 'IT',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2024-01-15',
      assignee: 'IT Support Team'
    },
    {
      id: '2',
      title: 'Payroll inquiry',
      description: 'Question about my recent payslip calculation',
      category: 'HR',
      status: 'Resolved',
      priority: 'Medium',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Meeting room booking issue',
      description: 'Unable to book conference room for next week',
      category: 'Admin',
      status: 'Open',
      priority: 'Low',
      createdAt: '2024-01-16'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Resolved':
      case 'Closed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
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

  const filteredTickets = selectedStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status.toLowerCase() === selectedStatus);

  const statusCounts = {
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    closed: tickets.filter(t => t.status === 'Closed').length
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your support tickets
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                  <p className="text-3xl font-bold text-red-600">{statusCounts.open}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{statusCounts.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{statusCounts.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-blue-600">{tickets.length}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link to="/create-ticket">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-slide-up">
              <Plus className="w-4 h-4 mr-2" />
              Create New Ticket
            </Button>
          </Link>

          <div className="flex items-center gap-2 animate-slide-up">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <Card className="animate-fade-in bg-white/60 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
            <CardDescription>
              Track and manage all your support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <Link key={ticket.id} to={`/ticket/${ticket.id}`}>
                    <div 
                      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white/50 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                            <Badge variant="outline" className={`text-xs ${ticket.category === 'IT' ? 'border-blue-200 text-blue-700' : ticket.category === 'HR' ? 'border-green-200 text-green-700' : 'border-purple-200 text-purple-700'}`}>
                              {ticket.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            {ticket.assignee && <span>Assigned to: {ticket.assignee}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getPriorityColor(ticket.priority)} text-xs`}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={`${getStatusColor(ticket.status)} text-xs flex items-center gap-1`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No tickets found for the selected filter</p>
                  <Link to="/create-ticket">
                    <Button variant="outline">Create Your First Ticket</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
