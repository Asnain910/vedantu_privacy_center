import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, TrendingUp, ClipboardList,
  Shield, Play, CheckCircle2, Clock, ChevronRight,
  Flame, Star, Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Navbar from '../components/Navbar';
import { MetricCard, Badge, Card } from '../components/ui';
import { useApp } from '../context/AppContext';
import { todaysClasses, recentActivity, subjectProgress, privacyRequestsData } from '../data/mockData';
import { cn } from '../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useApp();

  const statusConfig = {
    upcoming: { label: 'Upcoming', class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: Clock },
    live: { label: 'Live Now', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Play },
    completed: { label: 'Done', class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400', icon: CheckCircle2 },
  };

  const activityConfig = {
    class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    assignment: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    quiz: 'bg-orange-100 dark:bg-orange-900/30 text-[#FF6B00]',
    achievement: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
  };

  return (
    <div className="page-container">
      <Navbar showDashboardLinks />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Banner */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white/70 text-sm">Good evening,</span>
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-0.5">
                      <Flame className="w-3 h-3 text-amber-300" />
                      <span className="text-xs font-bold text-white">7-day streak!</span>
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    Welcome back, {student.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-white/70 text-sm">{student.grade} · Parent: {student.parentName}</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/privacy-center')}
                    id="dashboard-privacy-center-btn"
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    Privacy Center
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Classes Today" value="4" subtitle="1 live now" icon={<BookOpen className="w-5 h-5" />} color="orange" trend={{ value: 2, positive: true }} />
            <MetricCard title="Assignments Due" value="3" subtitle="2 this week" icon={<ClipboardList className="w-5 h-5" />} color="purple" />
            <MetricCard title="Avg. Score" value="82%" subtitle="Last 30 days" icon={<TrendingUp className="w-5 h-5" />} color="green" trend={{ value: 5, positive: true }} />
            <MetricCard title="Learning Hours" value="24h" subtitle="This month" icon={<Target className="w-5 h-5" />} color="blue" trend={{ value: 12, positive: true }} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Classes */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Today's Classes</h2>
                  <button className="text-xs text-[#FF6B00] font-medium hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {todaysClasses.map((cls, i) => {
                    const config = statusConfig[cls.status];
                    const StatusIcon = config.icon;
                    return (
                      <motion.div
                        key={cls.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
                          cls.status === 'live'
                            ? 'border-orange-200 dark:border-orange-800/40 bg-orange-50/50 dark:bg-orange-900/10'
                            : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        )}
                      >
                        <div className="text-2xl w-10 text-center">{cls.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{cls.subject}</span>
                            {cls.status === 'live' && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full px-2 py-0.5 animate-pulse">
                                🔴 LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{cls.teacher}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{cls.time}</p>
                          <span className={cn('text-[10px] font-semibold rounded-full px-2 py-0.5', config.class)}>
                            {config.label}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Subject Progress */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Progress</h2>
                  <Badge variant="orange">This Month</Badge>
                </div>
                <div className="space-y-4">
                  {subjectProgress.map(({ subject, progress, color }) => (
                    <div key={subject}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{subject}</span>
                        <span className="text-xs font-bold" style={{ color }}>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Achievement */}
              <Card className="p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-100 dark:border-amber-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Week Topper</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mathematics · Class 9</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-500 fill-amber-500" />)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Charts + Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Chart */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Learning Hours</h2>
                  <Badge variant="neutral">Last 7 months</Badge>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={privacyRequestsData}>
                    <defs>
                      <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      labelStyle={{ fontSize: 11, color: '#64748b' }}
                      itemStyle={{ fontSize: 12, color: '#FF6B00', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="requests" stroke="#FF6B00" strokeWidth={2.5} fill="url(#colorOrange)" dot={{ fill: '#FF6B00', strokeWidth: 0, r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                  <button className="text-xs text-[#FF6B00] font-medium hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm', activityConfig[activity.type])}>
                        {activity.type === 'quiz' ? '📝' : activity.type === 'assignment' ? '📋' : activity.type === 'achievement' ? '🏆' : '🎓'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.detail}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
