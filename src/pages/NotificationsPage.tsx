import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, RefreshCw, Lock, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import { ToggleSwitch } from '../components/ui';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const categoryInfo = {
  privacy: { icon: Shield, label: 'Privacy Updates', color: 'text-[#FF6B00]', bg: 'bg-orange-100 dark:bg-orange-900/40' },
  security: { icon: AlertTriangle, label: 'Security Alerts', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/40' },
  email: { icon: Mail, label: 'Email Preferences', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/40' },
};

const NotificationsPage: React.FC = () => {
  const { notifications, updateNotification } = useApp();

  const grouped = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
    if (!acc[n.category]) acc[n.category] = [];
    acc[n.category].push(n);
    return acc;
  }, {});

  return (
    <div className="page-container flex flex-col h-screen">
      <Navbar showDashboardLinks />
      <PrivacyCenterLayout>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Notifications</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage how Vedantu alerts you about privacy changes and security events.
            </p>
          </div>

          {/* Notification Groups */}
          <div className="space-y-6">
            {(Object.keys(grouped) as (keyof typeof categoryInfo)[]).map((category, gi) => {
              const cat = categoryInfo[category];
              const Icon = cat.icon;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.1 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Group header */}
                  <div className="px-5 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', cat.bg)}>
                      <Icon className={cn('w-4 h-4', cat.color)} />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.label}</span>
                  </div>

                  {/* Notification items */}
                  <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {grouped[category].map((notif, i) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: gi * 0.1 + i * 0.06 }}
                        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{notif.description}</p>
                        </div>
                        <ToggleSwitch
                          enabled={notif.enabled}
                          onChange={(v) => updateNotification(notif.id, v)}
                          id={`notif-${notif.id}`}
                          size="sm"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legal note */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl flex gap-3">
            <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Security alerts and breach notifications cannot be disabled as they are required for your safety under DPDP Act 2023, Section 8(6) — breach notification obligations.
            </p>
          </div>
        </motion.div>
      </PrivacyCenterLayout>
    </div>
  );
};

export default NotificationsPage;
