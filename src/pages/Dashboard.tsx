import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ticketsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Plus, Clock, CheckCircle, AlertCircle, Filter, Zap, Users, Settings, Loader } from 'lucide-react';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  category: 'IT' | 'HR' | 'Admin';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: string;
  requester: {
    name: string;
    email: string;
  };
  assignedTo?: {
    name: string;
    email: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<any>({});
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTickets();
      fetchStats();
    }
  }, [user, selectedStatus]);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const params = selectedStatus !== 'all' ? { status: selectedStatus } : {};
      const response = await ticketsApi.getTickets(params);
      setTickets(response.tickets || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load tickets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await ticketsApi.getStats();
      const statusStats = response.statusStats.reduce((acc: any, stat: any) => {
        acc[stat._id.toLowerCase().replace(' ', '')] = stat.count;
        return acc;
      }, {});
      
      setStats({
        open: statusStats.open || 0,
        inProgress: statusStats.inprogress || 0,
        resolved: statusStats.resolved || 0,
        closed: statusStats.closed || 0,
        total: response.statusStats.reduce((sum: number, stat: any) => sum + stat.count, 0)
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

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
        return 'bg-red-100 text-red-800 border-red-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'IT':
        return <Zap className="w-4 h-4" />;
      case 'HR':
        return <Users className="w-4 h-4" />;
      case 'Admin':
        return <Settings className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IT':
        return 'border-blue-200 text-blue-700 bg-blue-50';
      case 'HR':
        return 'border-green-200 text-green-700 bg-green-50';
      case 'Admin':
        return 'border-purple-200 text-purple-700 bg-purple-50';
      default:
        return 'border-gray-200 text-gray-700 bg-gray-50';
    }
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
            {user.role === 'employee' || user.role === 'super-admin' 
              ? "Here's what's happening with your support tickets"
              : `Here are the ${user.role.toUpperCase()} tickets assigned to your team`
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all hover:scale-105 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                  <p className="text-3xl font-bold text-red-600">{stats.open || 0}</p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all hover:scale-105 duration-300" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.inProgress || 0}</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all hover:scale-105 duration-300" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.resolved || 0}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all hover:scale-105 duration-300" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
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
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-slide-up transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create New Ticket
            </Button>
          </Link>

          <div className="flex items-center gap-2 animate-slide-up">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:scale-105"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <Card className="animate-fade-in bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle>
              {user.role === 'employee' || user.role === 'super-admin' 
                ? 'Your Support Tickets' 
                : `${user.role.toUpperCase()} Department Tickets`
              }
            </CardTitle>
            <CardDescription>
              {user.role === 'employee' || user.role === 'super-admin'
                ? 'Track and manage all your support requests'
                : 'Tickets assigned to your department for resolution'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading tickets...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.length > 0 ? (
                  tickets.map((ticket, index) => (
                    <Link key={ticket._id} to={`/ticket/${ticket._id}`}>
                      <div 
                        className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white/50 animate-slide-up group hover:scale-[1.02] duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{ticket.title}</h3>
                              <Badge variant="outline" className={`text-xs flex items-center gap-1 ${getCategoryColor(ticket.category)}`}>
                                {getCategoryIcon(ticket.category)}
                                {ticket.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>By: {ticket.requester.name}</span>
                              {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo.name}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getPriorityColor(ticket.priority)} text-xs border group-hover:scale-110 transition-transform`}>
                              {ticket.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(ticket.status)} text-xs flex items-center gap-1 border group-hover:scale-110 transition-transform`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4">No tickets found for the selected filter</p>
                    <Link to="/create-ticket">
                      <Button variant="outline" className="hover:scale-105 transition-all duration-300">Create Your First Ticket</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
