import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Image from './assets/Logo.jpg'
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    issues: '',
    resolved: ''
  });

  // Chart data
  const issuesData = [
    { month: 'Jan', reported: 65, resolved: 58 },
    { month: 'Feb', reported: 59, resolved: 55 },
    { month: 'Mar', reported: 80, resolved: 75 },
    { month: 'Apr', reported: 81, resolved: 78 },
    { month: 'May', reported: 56, resolved: 60 },
    { month: 'Jun', reported: 55, resolved: 58 },
    { month: 'Jul', reported: 40, resolved: 42 },
    { month: 'Aug', reported: 45, resolved: 48 }
  ];

  const categoriesData = [
    { name: 'Login Issues', value: 35, color: '#ff9500' },
    { name: 'App Bugs', value: 25, color: '#2196f3' },
    { name: 'Feature Requests', value: 20, color: '#4caf50' },
    { name: 'Account Problems', value: 20, color: '#f44336' }
  ];

  const activityData = [
    { day: 'Mon', activeUsers: 820, newRegistrations: 45 },
    { day: 'Tue', activeUsers: 932, newRegistrations: 52 },
    { day: 'Wed', activeUsers: 901, newRegistrations: 48 },
    { day: 'Thu', activeUsers: 934, newRegistrations: 61 },
    { day: 'Fri', activeUsers: 1290, newRegistrations: 55 },
    { day: 'Sat', activeUsers: 1330, newRegistrations: 67 },
    { day: 'Sun', activeUsers: 1200, newRegistrations: 43 }
  ];

  // Issues data
  const openIssues = [
    { id: '#TK001', user: 'jaya patel', description: 'Street Light not working', priority: 'High', status: 'Open', date: 'Aug 30, 2025' },
    { id: '#TK002', user: 'sanya sharma', description: 'Garbage not cleaned', priority: 'Medium', status: 'In Progress', date: 'Aug 29, 2025' },
    { id: '#TK003', user: 'David patel', description: 'Dustbin overflowig', priority: 'Low', status: 'Open', date: 'Aug 29, 2025' },
    { id: '#TK004', user: 'nishant mishra', description: 'Potholes', priority: 'Medium', status: 'In Progress', date: 'Aug 28, 2025' },
    { id: '#TK005', user: 'Michael Brown', description: 'Water leakage', priority: 'High', status: 'Open', date: 'Aug 28, 2025' },
    { id: '#TK006', user: 'dolly koul', description: 'Potholes on my road', priority: 'High', status: 'Open', date: 'Aug 27, 2025' },
    { id: '#TK007', user: 'sonia khajuria', description: 'Sewage Blocked in Street', priority: 'Low', status: 'In Progress', date: 'Aug 27, 2025' },
    { id: '#TK008', user: 'ruhi agarwal', description: 'Too many poholes on whole road', priority: 'Medium', status: 'Open', date: 'Aug 26, 2025' }
  ];

  const resolvedIssues = [
    { id: '#TK098', user: 'sukhwinder', description: 'Garbage not collected', resolution: 'Garbage collected by municipal workers', resolvedBy: 'Sanitation Department', date: 'Aug 30, 2025' },
    { id: '#TK097', user: 'arti singh', description: 'Potholes in front of my house', resolution: 'Potholes filled and road repaired', resolvedBy: 'Road Maintenance Department', date: 'Aug 29, 2025' },
    { id: '#TK096', user: 'paras koko', description: 'Dustbin overflow', resolution: 'Dustbin emptied and cleaned', resolvedBy: 'Sanitation Department', date: 'Aug 29, 2025' },
    { id: '#TK095', user: 'shiva mishra', description: 'Street not cleaned', resolution: 'Street cleaned by municipal staff', resolvedBy: 'Sanitation Department', date: 'Aug 28, 2025' },
    { id: '#TK094', user: 'rajesh kumar', description: 'Sewage blocked', resolution: 'Sewage blockage cleared', resolvedBy: 'Water & Sewage Department', date: 'Aug 28, 2025' },
    { id: '#TK093', user: 'mayur singh', description: 'Water overflowing from sewage', resolution: 'Overflow stopped and area sanitized', resolvedBy: 'Water & Sewage Department', date: 'Aug 27, 2025' },
    { id: '#TK092', user: 'satyam singh', description: 'Broken bench of park', resolution: 'Bench repaired and made safe', resolvedBy: 'Parks & Recreation Department', date: 'Aug 27, 2025' },
    { id: '#TK091', user: 'danish sudani', description: 'Street light not working', resolution: 'Street light repaired and functional', resolvedBy: 'Electrical Department', date: 'Aug 26, 2025' }
  ];

  const showSection = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (type, value) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
  };

  const filterIssues = (issues, searchTerm) => {
    return issues.filter(issue =>
      Object.values(issue).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleViewDetails = (ticketId) => {
    alert(`Viewing details for ${ticketId}`);
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 font-semibold';
      case 'medium': return 'text-yellow-600 font-semibold';
      case 'low': return 'text-green-600 font-semibold';
      default: return '';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium';
      case 'in progress': return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium';
      case 'resolved': return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium';
      default: return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const titles = {
    'dashboard': 'Dashboard',
    'issues': 'Issues Table',
    'resolved': 'Resolved Issues'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 w-64 h-full bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        {/* Logo Section */}
        <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-400 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl mx-auto mb-4 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div
                className="w-12 h-10 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${Image})` }}
              ></div>
            </div>
          </div>
          <div className="text-xl font-semibold mb-1">Admin Panel</div>
          <div className="text-sm opacity-90">Management System</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); showSection('dashboard'); }}
            className={`flex items-center px-6 py-4 text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-l-4 hover:border-orange-500 transition-all duration-300 ${activeSection === 'dashboard' ? 'bg-orange-50 text-orange-500 border-l-4 border-orange-500 font-semibold' : ''
              }`}
          >
            <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Dashboard
          </a>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); showSection('issues'); }}
            className={`flex items-center px-6 py-4 text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-l-4 hover:border-orange-500 transition-all duration-300 ${activeSection === 'issues' ? 'bg-orange-50 text-orange-500 border-l-4 border-orange-500 font-semibold' : ''
              }`}
          >
            <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            Issues Table
          </a>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); showSection('resolved'); }}
            className={`flex items-center px-6 py-4 text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-l-4 hover:border-orange-500 transition-all duration-300 ${activeSection === 'resolved' ? 'bg-orange-50 text-orange-500 border-l-4 border-orange-500 font-semibold' : ''
              }`}
          >
            <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Resolved Issues
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="bg-white px-6 py-5 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden mr-4 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">{titles[activeSection]}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <div>
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</span>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zM12 14c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">1,247</div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↗ +12% this month
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Open Issues</span>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">23</div>
                  <div className="text-sm text-red-600 flex items-center">
                    ↘ -5 from yesterday
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Resolved Today</span>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">18</div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↗ +3 vs yesterday
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Response Time</span>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">2.4h</div>
                  <div className="text-sm text-green-600 flex items-center">
                    ↗ 15% faster
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Issues Overview</h3>
                    <p className="text-gray-600 text-sm">Monthly trends and patterns</p>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={issuesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="reported"
                          stroke="#ff9500"
                          strokeWidth={3}
                          name="Issues Reported"
                          dot={{ fill: '#ff9500', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="resolved"
                          stroke="#4caf50"
                          strokeWidth={3}
                          name="Issues Resolved"
                          dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Issue Categories</h3>
                    <p className="text-gray-600 text-sm">Distribution by type</p>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoriesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoriesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value} (${Math.round((value / 100) * 100)}%)`, name]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* User Activity Chart */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">User Activity</h3>
                  <p className="text-gray-600 text-sm">Daily active users and registrations</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="activeUsers" fill="#ff9500" name="Active Users" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="newRegistrations" fill="#2196f3" name="New Registrations" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Issues Table */}
          {activeSection === 'issues' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Open Issues</h3>
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerms.issues}
                  onChange={(e) => handleSearch('issues', e.target.value)}
                  className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-white placeholder-opacity-80 w-64"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Ticket ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Issue Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterIssues(openIssues, searchTerms.issues).map((issue, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{issue.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={getPriorityClass(issue.priority)}>{issue.priority}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadgeClass(issue.status)}>{issue.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewDetails(issue.id)}
                            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Resolved Issues Table */}
          {activeSection === 'resolved' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Resolved Issues</h3>
                <input
                  type="text"
                  placeholder="Search resolved issues..."
                  value={searchTerms.resolved}
                  onChange={(e) => handleSearch('resolved', e.target.value)}
                  className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-white placeholder-opacity-80 w-64"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Ticket ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Issue Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Resolution</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Resolved By</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date Resolved</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterIssues(resolvedIssues, searchTerms.resolved).map((issue, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{issue.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{issue.resolution}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.resolvedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewDetails(issue.id)}
                            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;