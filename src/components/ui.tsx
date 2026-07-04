import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Step {current} of {total}
        </span>
        <span className="text-xs font-semibold text-[#FF6B00]">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8F3F] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <div className="flex gap-1.5 mt-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-1 rounded-full transition-all duration-300',
              i < current
                ? 'bg-[#FF6B00]'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// METRIC CARD
// ============================================================

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color?: 'orange' | 'green' | 'blue' | 'purple';
  className?: string;
}

const colorMap = {
  orange: 'from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-100 dark:border-orange-800/30',
  green: 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-100 dark:border-green-800/30',
  blue: 'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-100 dark:border-blue-800/30',
  purple: 'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-100 dark:border-purple-800/30',
};

const iconColorMap = {
  orange: 'bg-orange-100 dark:bg-orange-900/40 text-[#FF6B00]',
  green: 'bg-green-100 dark:bg-green-900/40 text-green-600',
  blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600',
  purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'orange',
  className,
}) => (
  <motion.div
    whileHover={{ y: -2, scale: 1.01 }}
    transition={{ duration: 0.2 }}
    className={cn(
      'bg-gradient-to-br border rounded-2xl p-5 shadow-sm',
      colorMap[color],
      className
    )}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend.positive ? 'text-green-600' : 'text-red-500')}>
            <span>{trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            <span className="text-gray-400">vs last month</span>
          </div>
        )}
      </div>
      {icon && (
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconColorMap[color])}>
          {icon}
        </div>
      )}
    </div>
  </motion.div>
);

// ============================================================
// TOGGLE SWITCH
// ============================================================

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  id?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  onChange,
  disabled = false,
  size = 'md',
  id,
}) => {
  const trackSize = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6';
  const thumbSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5';
  const thumbTranslate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2',
        trackSize,
        enabled ? 'bg-[#FF6B00]' : 'bg-gray-200 dark:bg-gray-700',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'absolute left-0.5 bg-white rounded-full shadow-sm',
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5',
          enabled ? (size === 'sm' ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0.5'
        )}
      />
    </button>
  );
};

// ============================================================
// BADGE
// ============================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'orange';
  className?: string;
}

const badgeVariants = {
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => (
  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeVariants[variant], className)}>
    {children}
  </span>
);

// ============================================================
// CARD
// ============================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, hover, onClick }) => (
  <motion.div
    whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className={cn(
      'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm',
      hover && 'cursor-pointer',
      className
    )}
  >
    {children}
  </motion.div>
);

// ============================================================
// BUTTON
// ============================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-[#FF6B00] hover:bg-[#e55f00] text-white shadow-lg shadow-orange-200/50 dark:shadow-orange-900/30',
  secondary: 'bg-orange-50 hover:bg-orange-100 text-[#FF6B00] dark:bg-orange-900/20 dark:hover:bg-orange-900/30 dark:text-orange-400',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200/50',
  outline: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  className,
  disabled,
  ...props
}) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.15 }}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      buttonVariants[variant],
      buttonSizes[size],
      className
    )}
    {...(props as any)}
  >
    {loading && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
      />
    )}
    {children}
  </motion.button>
);

// ============================================================
// ALERT
// ============================================================

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertStyles = {
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
};

const alertTitleStyles = {
  info: 'text-blue-800 dark:text-blue-300',
  success: 'text-green-800 dark:text-green-300',
  warning: 'text-amber-800 dark:text-amber-300',
  error: 'text-red-800 dark:text-red-300',
};

const alertTextStyles = {
  info: 'text-blue-700 dark:text-blue-400',
  success: 'text-green-700 dark:text-green-400',
  warning: 'text-amber-700 dark:text-amber-400',
  error: 'text-red-700 dark:text-red-400',
};

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, children, className }) => (
  <div className={cn('border rounded-xl p-4', alertStyles[type], className)}>
    {title && <p className={cn('text-sm font-semibold mb-1', alertTitleStyles[type])}>{title}</p>}
    <p className={cn('text-sm', alertTextStyles[type])}>{children}</p>
  </div>
);
