import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Phone, Mail, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProgressBar, Button, Alert } from '../components/ui';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const grades = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11 (Science)', 'Class 11 (Commerce)', 'Class 12 (Science)', 'Class 12 (Commerce)'];

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FieldProps> = ({ label, id, type = 'text', placeholder, value, onChange, icon, required }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label} {required && <span className="text-[#FF6B00]">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-all duration-200"
        required={required}
      />
    </div>
  </div>
);

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useApp();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { studentName, age, parentName, email, phone, grade, guardianConfirmed } = formData;

    if (!studentName || !age || !parentName || !email || !phone || !grade) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!guardianConfirmed) {
      setError('Please confirm that you are the legal guardian.');
      return;
    }
    if (parseInt(age) < 6 || parseInt(age) > 18) {
      setError('Please enter a valid age between 6 and 18.');
      return;
    }

    setError('');
    navigate('/verify-parent');
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
          {/* Progress */}
          <ProgressBar current={1} total={5} className="mb-8" />

          {/* Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">Create Account</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set up your child's learning profile to get started.
              </p>
            </div>

            {error && (
              <Alert type="error" className="mb-5">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Info */}
              <div className="space-y-1 mb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Student Information</p>
              </div>

              <FormField
                label="Student Name"
                id="studentName"
                placeholder="e.g. Arjun Sharma"
                value={formData.studentName}
                onChange={(v) => updateFormData({ studentName: v })}
                icon={<User className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Age"
                  id="age"
                  type="number"
                  placeholder="e.g. 14"
                  value={formData.age}
                  onChange={(v) => updateFormData({ age: v })}
                  icon={<Calendar className="w-4 h-4" />}
                  required
                />
                <div className="space-y-1.5">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grade <span className="text-[#FF6B00]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => updateFormData({ grade: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent appearance-none transition-all duration-200"
                    >
                      <option value="">Select</option>
                      {grades.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="pt-2 pb-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Parent / Guardian</p>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>

              <FormField
                label="Parent / Guardian Name"
                id="parentName"
                placeholder="e.g. Priya Sharma"
                value={formData.parentName}
                onChange={(v) => updateFormData({ parentName: v })}
                icon={<User className="w-4 h-4" />}
                required
              />

              <FormField
                label="Email Address"
                id="email"
                type="email"
                placeholder="e.g. priya@gmail.com"
                value={formData.email}
                onChange={(v) => updateFormData({ email: v })}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <FormField
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(v) => updateFormData({ phone: v })}
                icon={<Phone className="w-4 h-4" />}
                required
              />

              {/* Guardian Confirmation */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      id="guardianConfirmed"
                      checked={formData.guardianConfirmed}
                      onChange={(e) => updateFormData({ guardianConfirmed: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className={cn(
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200',
                      formData.guardianConfirmed
                        ? 'bg-[#FF6B00] border-[#FF6B00]'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-[#FF6B00]'
                    )}>
                      {formData.guardianConfirmed && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    I confirm that I am the legal guardian of the student and consent to data processing on their behalf under the DPDP Act 2023.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-2"
                id="create-account-submit"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already set up?{' '}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-[#FF6B00] font-medium hover:underline"
            >
              Go to Dashboard →
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAccount;
