import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Settings, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProgressBar, Button, Alert } from '../components/ui';
import PermissionCard from '../components/PermissionCard';
import { useApp } from '../context/AppContext';

const GranularConsent: React.FC = () => {
  const navigate = useNavigate();
  const { permissions, updatePermission } = useApp();

  const required = permissions.filter((p) => p.required);
  const optional = permissions.filter((p) => !p.required);
  const enabledOptional = optional.filter((p) => p.enabled);

  const handleAcceptSelected = () => navigate('/consent-summary');
  const handleCustomizeLater = () => navigate('/consent-summary');

  return (
    <div className="page-container">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar current={4} total={5} className="mb-8" />

          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Choose Your Preferences
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              You're in control. Required permissions are always on to deliver the service. 
              Optional ones are your choice — toggle them on or off anytime.
            </p>
          </div>

          {/* Summary banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/10 dark:to-orange-800/5 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-4 mb-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {enabledOptional.length} of {optional.length} optional permissions active
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">You can change these at any time in Privacy Center</p>
            </div>
            <div className="flex items-center gap-2">
              {optional.map((p) => (
                <div
                  key={p.id}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${p.enabled ? 'bg-[#FF6B00]' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Required Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Required Permissions</h2>
            </div>
            <div className="space-y-3">
              {required.map((permission, i) => (
                <motion.div
                  key={permission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PermissionCard
                    permission={permission}
                    onToggle={updatePermission}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Optional Permissions</h2>
            </div>
            <div className="space-y-3">
              {optional.map((permission, i) => (
                <motion.div
                  key={permission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <PermissionCard
                    permission={permission}
                    onToggle={updatePermission}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info */}
          <Alert type="info" className="mb-6">
            You can update these preferences at any time from your Privacy Center. Withdrawing consent does not affect previously processed data.
          </Alert>

          {/* Bottom CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCustomizeLater}
              className="sm:flex-1"
            >
              Customize Later
            </Button>
            <Button
              size="lg"
              onClick={handleAcceptSelected}
              id="accept-selected-consent"
              className="sm:flex-2"
            >
              Accept Selected & Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GranularConsent;
