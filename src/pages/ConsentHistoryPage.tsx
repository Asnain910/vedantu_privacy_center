import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Download, Plus, User, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import { Badge } from '../components/ui';
import { consentHistory } from '../data/mockData';
import { cn } from '../lib/utils';

const typeConfig = {
  created: { icon: User, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/40', badge: 'info' as const },
  accepted: { icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/40', badge: 'success' as const },
  declined: { icon: XCircle, color: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', badge: 'neutral' as const },
  modified: { icon: RefreshCw, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/40', badge: 'info' as const },
  downloaded: { icon: Download, color: 'text-[#FF6B00]', bg: 'bg-orange-100 dark:bg-orange-900/40', badge: 'orange' as const },
  deleted: { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/40', badge: 'danger' as const },
};

const ConsentHistoryPage: React.FC = () => {
  // Group by date
  const grouped = consentHistory.reduce<Record<string, typeof consentHistory>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
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
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Consent History</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A full audit trail of all consent changes and data actions.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl px-3 py-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">Tamper-proof Log</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800" />

            <div className="space-y-2">
              {Object.entries(grouped).map(([date, items], groupIdx) => (
                <div key={date} className="mb-6">
                  {/* Date label */}
                  <div className="flex items-center gap-3 mb-3 pl-14">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {date}
                    </span>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                  </div>

                  <div className="space-y-3">
                    {items.map((item, i) => {
                      const config = typeConfig[item.type];
                      const Icon = config.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: groupIdx * 0.1 + i * 0.07 }}
                          className="flex items-start gap-4"
                        >
                          {/* Icon dot */}
                          <div className={cn('relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm', config.bg)}>
                            <Icon className={cn('w-5 h-5', config.color)} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.action}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{item.detail}</p>
                              </div>
                              <Badge variant={config.badge} className="flex-shrink-0 capitalize text-[10px]">
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Start indicator */}
            <div className="flex items-center gap-3 pl-0 mt-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200/50 dark:shadow-orange-900/30">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-2xl px-4 py-3 flex-1">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Account Registration</p>
                <p className="text-xs text-gray-400 mt-0.5">Start of privacy journey · 2 Jul 2026</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              This log is tamper-proof and maintained for audit purposes as required by DPDP Act 2023, Section 5. Records are retained for 7 years.
            </p>
          </div>
        </motion.div>
      </PrivacyCenterLayout>
    </div>
  );
};

export default ConsentHistoryPage;
