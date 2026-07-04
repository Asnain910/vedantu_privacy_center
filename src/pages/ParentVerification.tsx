import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Mail, Fingerprint, CreditCard, Smartphone,
  CheckCircle2, ArrowRight, Loader2, ChevronLeft
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProgressBar, Button, Alert } from '../components/ui';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

type MethodId = 'otp' | 'aadhaar' | 'gov_id' | 'email';

interface VerificationMethod {
  id: MethodId;
  icon: React.ReactNode;
  title: string;
  description: string;
  available: boolean;
  badge?: string;
}

const methods: VerificationMethod[] = [
  {
    id: 'email',
    icon: <Mail className="w-5 h-5" />,
    title: 'Email Verification',
    description: 'Receive a verification code on your registered email.',
    available: true,
    badge: 'Recommended',
  },
  {
    id: 'otp',
    icon: <Smartphone className="w-5 h-5" />,
    title: 'OTP via SMS',
    description: 'Send a one-time password to your registered mobile number.',
    available: false,
    badge: 'Coming Soon',
  },
  {
    id: 'aadhaar',
    icon: <Fingerprint className="w-5 h-5" />,
    title: 'Aadhaar Verification',
    description: 'Verify identity using your Aadhaar card details (UIDAI compliant).',
    available: false,
    badge: 'Coming Soon',
  },
  {
    id: 'gov_id',
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Government ID',
    description: 'Upload a government-issued photo ID for manual verification.',
    available: false,
    badge: 'Coming Soon',
  },
];

// Mock OTP digits
const MOCK_OTP = ['4', '2', '8', '7', '9', '1'];

const ParentVerification: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setParentVerified } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<MethodId | null>(null);
  const [step, setStep] = useState<'select' | 'enter_otp' | 'success'>('select');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleSelectMethod = (id: MethodId, available: boolean) => {
    if (!available) return;
    setSelectedMethod(id);
  };

  const handleSendOtp = () => {
    if (!selectedMethod) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('enter_otp');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    // Accept any 6-digit OTP for demo
    if (enteredOtp.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setParentVerified(true);
    }, 1500);
  };

  const handleContinue = () => {
    navigate('/privacy-overview');
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <ProgressBar current={2} total={5} className="mb-8" />

          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Method */}
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-7">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-[#FF6B00]" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Verify Your Identity</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      As per the DPDP Act 2023, we need to verify that you are the legal guardian of the student.
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {methods.map((method) => (
                      <motion.button
                        key={method.id}
                        whileHover={method.available ? { scale: 1.01 } : undefined}
                        whileTap={method.available ? { scale: 0.99 } : undefined}
                        onClick={() => handleSelectMethod(method.id, method.available)}
                        id={`verify-method-${method.id}`}
                        className={cn(
                          'w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200',
                          !method.available && 'opacity-50 cursor-not-allowed',
                          selectedMethod === method.id
                            ? 'border-[#FF6B00] bg-orange-50 dark:bg-orange-900/10'
                            : method.available
                            ? 'border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800/50 bg-white dark:bg-gray-900'
                            : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          selectedMethod === method.id
                            ? 'bg-[#FF6B00] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        )}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{method.title}</span>
                            {method.badge && (
                              <span className={cn(
                                'text-[10px] font-bold px-2 py-0.5 rounded-full',
                                method.available
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                              )}>
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                        </div>
                        {selectedMethod === method.id && (
                          <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!selectedMethod}
                    loading={loading}
                    onClick={handleSendOtp}
                    id="send-verification"
                  >
                    Send Verification Code
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Enter OTP */}
              {step === 'enter_otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-7">
                    <button
                      onClick={() => setStep('select')}
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Enter Verification Code</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We've sent a 6-digit code to <span className="font-medium text-gray-900 dark:text-white">{formData.email || 'your email'}</span>
                    </p>
                    <div className="mt-2 text-xs text-[#FF6B00] bg-orange-50 dark:bg-orange-900/20 rounded-lg px-3 py-2">
                      Demo: Enter any 6 digits to verify
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div className="flex gap-2.5 mb-5 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        id={`otp-digit-${i}`}
                        className={cn(
                          'w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-200',
                          digit
                            ? 'border-[#FF6B00] bg-orange-50 dark:bg-orange-900/10 text-[#FF6B00]'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
                          'focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/20'
                        )}
                      />
                    ))}
                  </div>

                  {error && <Alert type="error" className="mb-4">{error}</Alert>}

                  <Button
                    size="lg"
                    className="w-full mb-3"
                    loading={loading}
                    onClick={handleVerifyOtp}
                    id="verify-otp"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                    {!loading && <CheckCircle2 className="w-5 h-5" />}
                  </Button>

                  <button className="w-full text-sm text-center text-gray-500 hover:text-[#FF6B00] transition-colors">
                    Didn't receive the code? <span className="font-medium text-[#FF6B00]">Resend</span>
                  </button>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" strokeWidth={2} />
                    </motion.div>
                  </motion.div>

                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Identity Verified!</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    You have been verified as the legal guardian of the student.
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-8 mt-4">
                    <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-full px-3 py-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-400">Parent Verified via Email</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleContinue} id="verification-continue">
                    Continue to Privacy Overview
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentVerification;
