import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileArchive, CheckCircle2, Loader2, FolderOpen, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import PrivacyCenterLayout from '../components/PrivacyCenterLayout';
import { Button, Card } from '../components/ui';

type DownloadStatus = 'idle' | 'preparing' | 'ready';

const dataCategories = [
  { label: 'Student Profile', size: '12 KB', icon: '👤' },
  { label: 'Attendance Records', size: '48 KB', icon: '📅' },
  { label: 'Class Recordings Index', size: '156 KB', icon: '🎥' },
  { label: 'Quiz & Assignment Scores', size: '34 KB', icon: '📝' },
  { label: 'Consent History Log', size: '8 KB', icon: '📋' },
  { label: 'Payment Records', size: '22 KB', icon: '💳' },
];

const DownloadDataPage: React.FC = () => {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setStatus('preparing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('ready');
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 280);
  };

  const handleDownload = () => {
    // Simulate download
    const a = document.createElement('a');
    a.href = '#';
    a.download = 'vedantu-data-export.zip';
    setTimeout(() => setStatus('idle'), 1000);
  };

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
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Download Your Data</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generate a complete, machine-readable copy of your child's personal data as required by DPDP Act 2023.
            </p>
          </div>

          {/* Main card */}
          <Card className="p-8 mb-6">
            <AnimatePresence mode="wait">
              {/* Idle state */}
              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <FileArchive className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Export Personal Data Archive</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    Your archive will include all personal data we hold about your child in a structured, commonly-used, and machine-readable format (JSON + PDF).
                  </p>
                  <Button size="lg" onClick={handleGenerate} id="generate-archive-btn" className="mx-auto">
                    <Download className="w-5 h-5" />
                    Generate Archive
                  </Button>
                  <p className="text-xs text-gray-400 mt-4">Usually ready in 2–3 minutes. You'll be notified by email.</p>
                </motion.div>
              )}

              {/* Preparing state */}
              {status === 'preparing' && (
                <motion.div
                  key="preparing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-100 dark:border-gray-800" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-t-[#FF6B00] border-r-transparent border-b-transparent border-l-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#FF6B00]">{Math.min(Math.round(progress), 100)}%</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Preparing Your Archive...</h2>
                  <p className="text-sm text-gray-500 mb-6">Collecting and packaging your data securely.</p>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-full"
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    {['Collecting profile data...', 'Packaging records...', 'Encrypting archive...'].map((step, i) => (
                      <motion.p
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: progress > i * 30 ? 1 : 0 }}
                        className={progress > i * 30 ? 'text-gray-700 dark:text-gray-300' : ''}
                      >
                        {progress > i * 30 ? '✓ ' : '○ '}{step}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Ready state */}
              {status === 'ready' && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Archive Ready!</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Your data export is ready. The link expires in 24 hours.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-8">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>vedantu-data-export.zip</span>
                    <span>·</span>
                    <span>~280 KB</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expires in 24h</span>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button size="lg" onClick={handleDownload} id="download-archive-btn">
                      <Download className="w-5 h-5" />
                      Download ZIP
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setStatus('idle')}>
                      Generate New
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* What's included */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">What's Included in Your Export</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataCategories.map(({ label, size, icon }) => (
                <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</p>
                    <p className="text-[10px] text-gray-400">~{size}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Ref: DPDP Act 2023, Section 11 — Right to Access. Data provided in JSON and PDF formats. Processing time: up to 72 hours.
            </p>
          </Card>
        </motion.div>
      </PrivacyCenterLayout>
    </div>
  );
};

export default DownloadDataPage;
