import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Eye, Download, Trash2, CheckCircle2,
  ArrowRight, Star, Lock, Users, Zap, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui';

const featureCards = [
  {
    icon: Eye,
    title: 'Transparent Consent',
    description: 'See exactly what data we collect and why — in simple, plain language.',
    color: 'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Shield,
    title: 'Privacy Dashboard',
    description: 'Manage all permissions from one beautiful, easy-to-use dashboard.',
    color: 'from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40 text-[#FF6B00] dark:text-orange-400',
  },
  {
    icon: Download,
    title: 'Download Your Data',
    description: 'Export a complete copy of your child\'s data at any time, in minutes.',
    color: 'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
  },
  {
    icon: Trash2,
    title: 'Delete Data Anytime',
    description: 'Request complete data erasure with one click — we\'ll action it within 30 days.',
    color: 'from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10',
    iconBg: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
  },
  {
    icon: CheckCircle2,
    title: 'DPDP Compliant',
    description: 'Fully compliant with India\'s Digital Personal Data Protection Act 2023.',
    color: 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10',
    iconBg: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
  },
];

const trustBadges = [
  { icon: Lock, label: 'End-to-End Encrypted' },
  { icon: Shield, label: 'DPDP Act 2023 Compliant' },
  { icon: Users, label: '1M+ Parents Trust Us' },
  { icon: Star, label: 'ISO 27001 Certified' },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 dark:bg-orange-900/10 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              {/* DPDP Badge */}
              <motion.div variants={itemVariants} className="inline-flex mb-6">
                <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/40 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-[#FF6B00]">DPDP Act 2023 Compliant</span>
                  <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white leading-[1.05] mb-6"
              >
                Your Child's{' '}
                <span className="gradient-text">Learning.</span>
                <br />
                Your{' '}
                <span className="relative">
                  Control.
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
              >
                Vedantu now gives parents complete visibility and control over how their child's personal data is collected and used — in full compliance with India's DPDP Act 2023.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/create-account')}
                  id="cta-start-setup"
                  className="group"
                >
                  Start Setup
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  id="cta-view-dashboard"
                >
                  View Dashboard
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-3"
              >
                {trustBadges.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    variants={itemVariants}
                    className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Main Card */}
              <div className="relative animate-float">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-orange-100/50 dark:shadow-orange-900/20 p-8 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Privacy Center</p>
                      <p className="text-sm text-gray-500">Arjun Sharma • Class 9</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">Protected</span>
                    </div>
                  </div>

                  {/* Mini consent items */}
                  {[
                    { label: 'Learning Recommendations', on: true },
                    { label: 'Progress Reports', on: true },
                    { label: 'Marketing Emails', on: false },
                    { label: 'Research & Analytics', on: false },
                  ].map(({ label, on }) => (
                    <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                      <div className={`w-10 h-5.5 rounded-full flex items-center px-0.5 transition-colors ${on ? 'bg-[#FF6B00]' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}

                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Consent valid until</span>
                      <span className="font-semibold text-gray-900 dark:text-white">2 Jul 2027</span>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Parent Verified</p>
                      <p className="text-[10px] text-gray-500">via Email OTP</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center">
                      <Lock className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">DPDP Compliant</p>
                      <p className="text-[10px] text-gray-500">Act 2023 Certified</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-full px-4 py-2 mb-4">
              <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wide">Privacy First</span>
            </div>
            <h2 className="section-heading mb-4">Everything you need to stay in control</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We believe privacy is a fundamental right. That's why we've built tools that put you, the parent, in complete control.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`bg-gradient-to-br ${card.color} border border-gray-100 dark:border-gray-800/50 rounded-2xl p-6 ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
                <button className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#FF6B00] hover:gap-2 transition-all group">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DPDP Principles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
                Built for the Digital Personal Data Protection Act 2023
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Every feature on this platform has been designed to meet the highest standards of India's DPDP Act — including informed consent, purpose limitation, data minimization, and the right to erasure.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/create-account')}
                className="bg-white text-[#FF6B00] border-white hover:bg-orange-50"
              >
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8F3F] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Vedantu Privacy Center</span>
              <p className="text-xs text-gray-500">Learning with Transparency.</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">© 2026 Vedantu Innovations Pvt. Ltd. All rights reserved. DPDP Act 2023 compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
