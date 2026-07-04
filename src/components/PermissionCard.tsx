import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Info, Lock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ToggleSwitch, Badge } from './ui';
import { cn } from '../lib/utils';
import type { Permission } from '../data/mockData';

interface PermissionCardProps {
  permission: Permission;
  onToggle: (id: string, enabled: boolean) => void;
  showEditButton?: boolean;
  compact?: boolean;
}

const getIcon = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
};

const iconBgMap: Record<string, string> = {
  User: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  CalendarCheck: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
  Sparkles: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
  Bell: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
  Megaphone: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
  BarChart3: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400',
  FileText: 'bg-orange-100 text-[#FF6B00] dark:bg-orange-900/40 dark:text-orange-400',
};

const PermissionCard: React.FC<PermissionCardProps> = ({
  permission,
  onToggle,
  showEditButton = false,
  compact = false,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-900 border rounded-2xl shadow-sm overflow-hidden transition-all duration-300',
        permission.enabled
          ? 'border-gray-100 dark:border-gray-800'
          : 'border-gray-100 dark:border-gray-800 opacity-80',
        !compact && 'hover:shadow-md hover:border-orange-100 dark:hover:border-orange-900/30'
      )}
    >
      <div className={cn('flex items-start gap-4', compact ? 'p-4' : 'p-5')}>
        {/* Icon */}
        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
          iconBgMap[permission.icon] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        )}>
          {getIcon(permission.icon)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{permission.title}</span>
            {permission.required ? (
              <Badge variant="orange" className="gap-1">
                <Lock className="w-2.5 h-2.5" />
                Required
              </Badge>
            ) : (
              <Badge variant={permission.enabled ? 'success' : 'neutral'}>
                {permission.enabled ? 'Active' : 'Inactive'}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {permission.description}
          </p>

          {/* Purpose row */}
          {!compact && (
            <div className="flex items-center gap-1.5 mt-2">
              <Info className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">Purpose: {permission.purpose}</span>
            </div>
          )}

          {/* Learn More Expandable */}
          {!compact && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 mt-2.5 text-xs font-medium text-[#FF6B00] hover:text-[#e55f00] transition-colors"
            >
              Learn More
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>
          )}

          {/* Expanded Content */}
          {expanded && !compact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 p-3 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20"
            >
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {permission.learnMore}
              </p>
            </motion.div>
          )}

          {showEditButton && permission.lastUpdated && (
            <p className="text-xs text-gray-400 mt-2">Last updated: {permission.lastUpdated}</p>
          )}
        </div>

        {/* Toggle */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <ToggleSwitch
            enabled={permission.enabled}
            onChange={(v) => onToggle(permission.id, v)}
            disabled={permission.required}
            id={`permission-${permission.id}`}
          />
          {permission.required && (
            <span className="text-[10px] text-gray-400 text-right leading-tight">Always<br />enabled</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PermissionCard;
