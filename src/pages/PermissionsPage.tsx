import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import PermissionCard from '../components/PermissionCard';
import { useApp } from '../context/AppContext';

const PermissionsPage: React.FC = () => {
  const { permissions, updatePermission } = useApp();
  const required = permissions.filter((p) => p.required);
  const optional = permissions.filter((p) => !p.required);
  const activeOptional = optional.filter(p => p.enabled).length;

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
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Permissions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Control how Vedantu uses your child's data. Required permissions cannot be disabled.
            </p>
          </div>

          {/* Summary bar */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/30 dark:from-orange-900/10 dark:to-orange-900/5 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-4 mb-7 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {activeOptional} of {optional.length} optional permissions active
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Changes take effect immediately</p>
            </div>
            <div className="w-24 h-2.5 bg-white dark:bg-gray-800 rounded-full overflow-hidden border border-orange-200 dark:border-orange-800/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-full"
                animate={{ width: `${(activeOptional / optional.length) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {/* Required */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Required — Always On
              </h2>
            </div>
            <div className="space-y-3">
              {required.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PermissionCard permission={p} onToggle={updatePermission} showEditButton />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Optional — Your Choice
              </h2>
            </div>
            <div className="space-y-3">
              {optional.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <PermissionCard permission={p} onToggle={updatePermission} showEditButton />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Changes to optional permissions are logged in Consent History. Withdrawing consent does not affect data already processed under previous consent. Ref: DPDP Act 2023, Section 6(5).
            </p>
          </div>
        </motion.div>
      </PrivacyCenterLayout>
    </div>
  );
};

export default PermissionsPage;
