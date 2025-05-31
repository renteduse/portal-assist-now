
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Ticket, Clock, TrendingUp, Filter, Download } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for charts
  const ticketData = [
    { name: 'Mon', IT: 12, HR: 8, Admin: 5 },
    { name: 'Tue', IT: 15, HR: 10, Admin: 7 },
    { name: 'Wed', IT: 8, HR: 6, Admin: 4 },
    { name: 'Thu', IT: 18, HR: 12, Admin: 9 },
    { name: 'Fri', IT: 20, HR: 15, Admin: 11 },
    { name: 'Sat', IT: 5, HR: 3, Admin: 2 },
    { name: 'Sun', IT: 3, HR: 2, Admin: 1 },
  ];

  const statusData = [
    { name: 'Open', value: 24, color: '#ef4444' },
    { name: 'In Progress', value: 35, color: '#f59e0b' },
    { name: 'Resolved', value: 67, color: '#10b981' },
    { name: 'Closed', value: 45, color: '#6b7280' },
  ];

  const recentTickets = [
    {
      id: 'T-001',
      title: 'Email server down',
      category: 'IT',
      priority: 'Critical',
      status: 'Open',
      assignee: 'John Tech',
      createdAt: '2024-01-16T10:30:00Z'
    },
    {
      id: 'T-002',
      title: 'New employee onboarding',
      category: 'HR',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Sarah HR',
      createdAt: '2024-01-16T09:15:00Z'
    },
    {
      id: 'T-003',
      title: 'Office supplies request',
      category: 'Admin',
      priority: 'Low',
      status: 'Open',
      assignee: 'Mike Admin',
      createdAt: '2024-01-16T08:45:00Z'
    }
  ];

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage support operations across all departments
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-blue-600">171</p>
                  <p className="text-xs text-green-600 mt-1">↗ +12% from last week</p>
                </div>
                <Ticket className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-xs text-green-600 mt-1">↗ +5% from last week</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                  <p className="text-3xl font-bold text-orange-600">2.4h</p>
                  <p className="text-xs text-green-600 mt-1">↗ 15% improvement</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in bg-white/60 backdrop-blur-sm border-0 hover:shadow-lg transition-all" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                  <p className="text-3xl font-bold text-purple-600">94%</p>
                  <p className="text-xs text-green-600 mt-1">↗ +3% from last week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ticket Volume by Department</CardTitle>
                  <CardDescription>Daily ticket creation trends</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="IT" fill="#3b82f6" />
                  <Bar dataKey="HR" fill="#10b981" />
                  <Bar dataKey="Admin" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-slide-up bg-white/80 backdrop-blur-sm border-0" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Ticket Status Distribution</CardTitle>
              <CardDescription>Current status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tickets Table */}
        <Card className="animate-fade-in bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest support requests requiring attention</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTickets.map((ticket, index) => (
                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50/50 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <td className="py-3 px-4 font-mono text-sm">{ticket.id}</td>
                      <td className="py-3 px-4">{ticket.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`
                          ${ticket.category === 'IT' ? 'border-blue-200 text-blue-700' : ''}
                          ${ticket.category === 'HR' ? 'border-green-200 text-green-700' : ''}
                          ${ticket.category === 'Admin' ? 'border-purple-200 text-purple-700' : ''}
                        `}>
                          {ticket.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`
                          ${ticket.priority === 'Critical' ? 'bg-red-100 text-red-800' : ''}
                          ${ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                          ${ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${ticket.priority === 'Low' ? 'bg-green-100 text-green-800' : ''}
                        `}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`
                          ${ticket.status === 'Open' ? 'bg-red-100 text-red-800' : ''}
                          ${ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : ''}
                        `}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{ticket.assignee}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
