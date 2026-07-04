import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import { Button, Alert } from '../components/ui';
import { cn } from '../lib/utils';

type DeleteStep = 'warning' | 'confirm_dialog' | 'deleting' | 'done';

const consequences = [
  'All class recordings and learning history will be permanently deleted',
  'Quiz scores, assignments, and academic progress will be lost',
  'Your subscription will be cancelled with no refund for unused time',
  'You will lose access to all course materials immediately',
  'This action cannot be undone once processing begins',
];

const DeleteDataPage: React.FC = () => {
  const [understood, setUnderstood] = useState(false);
  const [step, setStep] = useState<DeleteStep>('warning');
  const [confirmText, setConfirmText] = useState('');

  const handleRequest = () => {
    if (!understood) return;
    setStep('confirm_dialog');
  };

  const handleConfirmDelete = () => {
    if (confirmText.toLowerCase() !== 'delete') return;
    setStep('deleting');
    setTimeout(() => setStep('done'), 2500);
  };

  return (
    <div className="page-container flex flex-col h-screen">
      <Navbar showDashboardLinks />
      <PrivacyCenterLayout>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl"
        >
          <AnimatePresence mode="wait">
            {/* Warning step */}
            {step === 'warning' && (
              <motion.div key="warning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <div className="mb-8">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-4">
                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Delete Account Data</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This is a permanent, irreversible action. Please read carefully before proceeding.
                  </p>
                </div>

                {/* Warning card */}
                <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800/50 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">This cannot be undone</p>
                      <p className="text-xs text-red-700 dark:text-red-400">
                        Deleting your account permanently removes all data associated with your child's profile from Vedantu's systems.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {consequences.map((c) => (
                      <div key={c} className="flex items-start gap-2.5">
                        <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What is retained */}
                <Alert type="info" title="What we're required to retain" className="mb-6">
                  Payment records and invoices are retained for 7 years as required by Indian tax law (GST Act), even after account deletion.
                </Alert>

                {/* Understand checkbox */}
                <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={understood}
                      onChange={(e) => setUnderstood(e.target.checked)}
                      className="sr-only"
                      id="understand-checkbox"
                    />
                    <div className={cn(
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200',
                      understood
                        ? 'bg-red-600 border-red-600'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-red-400'
                    )}>
                      {understood && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    I understand that deleting my account is permanent and all data will be erased. I confirm I am the legal guardian.
                  </span>
                </label>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => window.history.back()}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    disabled={!understood}
                    onClick={handleRequest}
                    id="request-deletion-btn"
                    className="flex-1"
                  >
                    <Trash2 className="w-5 h-5" />
                    Request Deletion
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Confirmation dialog step */}
            {step === 'confirm_dialog' && (
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-soft"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    Final Confirmation
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Type <strong className="text-red-600 font-mono">delete</strong> below to confirm you want to permanently delete all data.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder='Type "delete" to confirm'
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  id="confirm-delete-input"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900/20 mb-5 text-center font-mono placeholder-gray-400"
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => { setStep('warning'); setConfirmText(''); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    className="flex-1"
                    disabled={confirmText.toLowerCase() !== 'delete'}
                    onClick={handleConfirmDelete}
                    id="confirm-delete-btn"
                  >
                    Yes, Delete Everything
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Deleting step */}
            {step === 'deleting' && (
              <motion.div
                key="deleting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-red-200 dark:border-red-900/30 border-t-red-600 rounded-full mx-auto mb-6"
                />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Processing Deletion Request...</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we process your request securely.</p>
              </motion.div>
            )}

            {/* Done step */}
            {step === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">Deletion Request Submitted</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Your data deletion request has been received. All personal data will be permanently deleted within 30 days, as required by DPDP Act 2023, Section 12.
                </p>
                <div className="mt-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-4">
                  <p className="text-xs text-green-700 dark:text-green-400">
                    Reference ID: VED-DEL-2026-07142 · Confirmation sent to priya.sharma@gmail.com
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PrivacyCenterLayout>
    </div>
  );
};

export default DeleteDataPage;
