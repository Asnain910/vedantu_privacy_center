import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Video, CalendarCheck, CreditCard, ArrowRight, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProgressBar, Button } from '../components/ui';

const dataCards = [
  {
    icon: User,
    color: 'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    title: 'Student Profile',
    purpose: 'Create and manage your child\'s learning account',
    retention: 'Until account deletion',
    examples: ['Name', 'Age', 'Grade', 'Contact Info'],
  },
  {
    icon: Video,
    color: 'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    title: 'Class Recordings',
    purpose: 'Learning history and revision access',
    retention: '180 Days',
    examples: ['Session recordings', 'Notes', 'Timestamps', 'Replay data'],
  },
  {
    icon: CalendarCheck,
    color: 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10',
    iconBg: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    title: 'Attendance Records',
    purpose: 'Track progress and generate reports',
    retention: '365 Days',
    examples: ['Class check-ins', 'Duration', 'Engagement score', 'Certificates'],
  },
  {
    icon: CreditCard,
    color: 'from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    title: 'Payment Records',
    purpose: 'Billing, invoicing and financial compliance',
    retention: '7 Years (as per law)',
    examples: ['Transaction IDs', 'Amount', 'Invoice', 'GST data'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PrivacyOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar current={3} total={5} className="mb-8" />

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-orange-100 dark:bg-orange-900/40 rounded-2xl items-center justify-center mb-4">
              <Info className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
              How We Use Your Data
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
              Under the DPDP Act 2023, we must tell you exactly what data we collect, why we collect it, and how long we keep it. Here's a clear breakdown.
            </p>
          </div>

          {/* Data Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {dataCards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`bg-gradient-to-br ${card.color} border border-gray-100 dark:border-gray-800/50 rounded-2xl p-5`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{card.title}</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Purpose</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{card.purpose}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Retention Period</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/60 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 rounded-lg px-2.5 py-1">
                      {card.retention}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Includes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.examples.map((ex) => (
                        <span key={ex} className="text-[10px] font-medium bg-white/70 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 rounded-md px-2 py-0.5">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* DPDP Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-5 mb-8"
          >
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Your Rights Under DPDP Act 2023</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  You have the right to access, correct, and delete your data. You can withdraw consent at any time, and we must process your request within 30 days. Your data is never sold to third parties.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/verify-parent')}
              className="flex-1"
            >
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/granular-consent')}
              id="privacy-overview-continue"
              className="flex-2"
            >
              Continue to Consent
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyOverview;
