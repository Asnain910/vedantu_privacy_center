import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Shield, Star, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui';

const successItems = [
  { icon: CheckCircle2, text: 'Consent preferences saved', color: 'text-green-600 dark:text-green-400' },
  { icon: Shield, text: 'Parent identity verified', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Lock, text: 'DPDP Act 2023 compliant', color: 'text-[#FF6B00]' },
  { icon: Star, text: 'Privacy Center activated', color: 'text-purple-600 dark:text-purple-400' },
];

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {/* Confetti animation rings */}
          <div className="relative mb-8 inline-block">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2 border-[#FF6B00]/20"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1 + ring * 0.4, opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: ring * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] rounded-full flex items-center justify-center shadow-2xl shadow-orange-200/60 dark:shadow-orange-900/40"
            >
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-3">
              All Set! 🎉
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-lg">
              Your child's privacy preferences have been saved successfully. 
              You can update them anytime from the Privacy Center.
            </p>
          </motion.div>

          {/* Success items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-8 text-left shadow-soft"
          >
            <div className="space-y-3">
              {successItems.map(({ icon: Icon, text, color }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              id="go-to-dashboard"
              className="w-full"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
            <button
              onClick={() => navigate('/privacy-center')}
              className="mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-[#FF6B00] transition-colors"
            >
              View Privacy Center →
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
