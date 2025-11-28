import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Target, Menu } from 'lucide-react';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design landing page', status: 'completed', priority: 'high', assignee: 'Alex' },
    { id: 2, title: 'API integration', status: 'in-progress', priority: 'high', assignee: 'Sarah' },
    { id: 3, title: 'Write documentation', status: 'in-progress', priority: 'medium', assignee: 'Mike' },
    { id: 4, title: 'Bug fixes', status: 'todo', priority: 'low', assignee: 'Alex' },
    { id: 5, title: 'Database migration', status: 'completed', priority: 'high', assignee: 'Sarah' },
    { id: 6, title: 'User testing', status: 'todo', priority: 'medium', assignee: 'Lisa' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Analytics data
  const statusData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: '#10b981' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: '#3b82f6' },
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length, color: '#f59e0b' },
  ];

  const priorityData = [
    { name: 'High', count: tasks.filter(t => t.priority === 'high').length },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'medium').length },
    { name: 'Low', count: tasks.filter(t => t.priority === 'low').length },
  ];

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask,
      status: 'todo',
      priority: selectedPriority,
      assignee: 'You'
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {sidebarOpen && (
          <nav className="px-4 space-y-2">
            <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium">Dashboard</div>
            <div className="px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">Projects</div>
            <div className="px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">Team</div>
            <div className="px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors">Settings</div>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dashboard</h1>
              <p className="text-slate-400 mt-1">Manage your projects and track progress</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <span className="text-sm text-slate-300">Nov 28, 2025</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Tasks</p>
                  <h3 className="text-3xl font-bold mt-2">{tasks.length}</h3>
                </div>
                <Target className="w-10 h-10 text-purple-500" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed</p>
                  <h3 className="text-3xl font-bold mt-2 text-green-500">{tasks.filter(t => t.status === 'completed').length}</h3>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">In Progress</p>
                  <h3 className="text-3xl font-bold mt-2 text-blue-500">{tasks.filter(t => t.status === 'in-progress').length}</h3>
                </div>
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completion</p>
                  <h3 className="text-3xl font-bold mt-2">{Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Task Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Status Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Task */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Enter task title..."
                className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={addTask}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-6 py-3 font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 hover:bg-slate-700/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(task.status)}
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-slate-400">Assigned to {task.assignee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="bg-slate-600/50 border border-slate-500/50 rounded-lg px-3 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
