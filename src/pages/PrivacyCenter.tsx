import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, ShieldCheck, CalendarClock, Download,
  Edit3, Trash2, XCircle, BarChart3, ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import { MetricCard, Badge, Card, Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { consentRateData } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const PrivacyCenterOverview: React.FC = () => {
  const navigate = useNavigate();
  const { student, permissions } = useApp();
  const enabledCount = permissions.filter(p => p.enabled).length;
  const totalCount = permissions.length;

  const quickActions = [
    {
      icon: Download,
      label: 'Download My Data',
      sublabel: 'Export data archive',
      path: '/privacy-center/download',
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Edit3,
      label: 'Request Correction',
      sublabel: 'Fix inaccurate data',
      path: '/privacy-center/permissions',
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: Trash2,
      label: 'Delete My Data',
      sublabel: 'Permanent erasure',
      path: '/privacy-center/delete',
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      icon: XCircle,
      label: 'Withdraw Consent',
      sublabel: 'Revoke all optional',
      path: '/privacy-center/permissions',
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Privacy Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your child's data and consent preferences — all in one place.
        </p>
      </motion.div>

      {/* Status Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Consent Status"
          value="Valid"
          subtitle="Until 2 Jul 2027"
          icon={<ShieldCheck className="w-5 h-5" />}
          color="green"
        />
        <MetricCard
          title="Parent Verified"
          value="Yes"
          subtitle="via Email OTP"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Last Updated"
          value={student.lastUpdated}
          icon={<CalendarClock className="w-5 h-5" />}
          color="orange"
        />
        <MetricCard
          title="Renewal Date"
          value={student.renewalDate}
          icon={<CalendarClock className="w-5 h-5" />}
          color="purple"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Consent health */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Consent Rate</h2>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <div>
                <p className="text-4xl font-display font-bold text-gray-900 dark:text-white">
                  {Math.round((enabledCount / totalCount) * 100)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">{enabledCount} of {totalCount} permissions active</p>
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(enabledCount / totalCount) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <LineChart data={consentRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, 'Consent Rate']}
                />
                <Line type="monotone" dataKey="rate" stroke="#FF6B00" strokeWidth={2.5} dot={{ fill: '#FF6B00', strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* DPDP Rights */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 h-full">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Your DPDP Rights</h2>
            <div className="space-y-3">
              {[
                { right: 'Right to Access', done: true },
                { right: 'Right to Correction', done: true },
                { right: 'Right to Erasure', done: true },
                { right: 'Right to Withdraw Consent', done: true },
                { right: 'Right to Grievance', done: true },
                { right: 'Right to Nomination', done: false },
              ].map(({ right, done }) => (
                <div key={right} className="flex items-center gap-3">
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    : <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                  }
                  <span className={`text-xs ${done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>{right}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-[10px] text-gray-400">Ref: DPDP Act 2023, Chapter III</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(({ icon: Icon, label, sublabel, path, color, bg }) => (
            <motion.button
              key={label}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(path)}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{sublabel}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PrivacyCenter: React.FC = () => (
  <div className="page-container flex flex-col h-screen">
    <Navbar showDashboardLinks />
    <PrivacyCenterLayout>
      <PrivacyCenterOverview />
    </PrivacyCenterLayout>
  </div>
);

export default PrivacyCenter;
