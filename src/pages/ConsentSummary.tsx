import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, ChevronLeft, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProgressBar, Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const ConsentSummary: React.FC = () => {
  const navigate = useNavigate();
  const { permissions, completeOnboarding } = useApp();

  const accepted = permissions.filter((p) => p.enabled);
  const declined = permissions.filter((p) => !p.enabled);

  const handleConfirm = () => {
    completeOnboarding();
    navigate('/success');
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar current={5} total={5} className="mb-8" />

          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft overflow-hidden">
            {/* Header */}
            <div className="p-8 pb-5">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Review Your Choices</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please review your consent preferences before confirming. You can always change these later.
              </p>
            </div>

            {/* Accepted */}
            <div className="px-8 pb-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  You have agreed to ({accepted.length})
                </span>
              </div>
              <div className="space-y-2">
                {accepted.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{p.title}</span>
                      {p.required && (
                        <span className="ml-2 text-[10px] font-bold text-gray-400 uppercase">Required</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            {declined.length > 0 && (
              <div className="px-8">
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
              </div>
            )}

            {/* Declined */}
            {declined.length > 0 && (
              <div className="px-8 pb-5 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Not selected ({declined.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {declined.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl"
                    >
                      <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{p.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal note */}
            <div className="px-8 pb-6 pt-4">
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  By confirming, you agree to Vedantu's processing of your child's data as described above. 
                  This consent is valid for 1 year and can be withdrawn at any time from the Privacy Center. 
                  Ref: DPDP Act 2023, Section 6 — Consent.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/granular-consent')}
                className="sm:flex-1"
              >
                <ChevronLeft className="w-5 h-5" />
                Go Back
              </Button>
              <Button
                size="lg"
                onClick={handleConfirm}
                id="confirm-consent"
                className="sm:flex-2"
              >
                Confirm & Save
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsentSummary;
