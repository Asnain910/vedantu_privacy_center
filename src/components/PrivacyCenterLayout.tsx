import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Shield, History, Download, Trash2, Bell,
  ChevronRight, Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  danger?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/privacy-center' },
  { id: 'permissions', label: 'Permissions', icon: Shield, path: '/privacy-center/permissions' },
  { id: 'history', label: 'Consent History', icon: History, path: '/privacy-center/history' },
  { id: 'download', label: 'Download Data', icon: Download, path: '/privacy-center/download' },
  { id: 'delete', label: 'Delete Data', icon: Trash2, path: '/privacy-center/delete', danger: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/privacy-center/notifications' },
];

interface PrivacyCenterLayoutProps {
  children: React.ReactNode;
}

const PrivacyCenterLayout: React.FC<PrivacyCenterLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-64 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-y-auto hidden md:flex flex-col"
      >
        <div className="p-5">
          {/* Sidebar header */}
          <div className="flex items-center gap-2.5 mb-6 px-1">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#FF6B00]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Privacy Center</p>
              <p className="text-[10px] text-gray-500">Manage your data & consent</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {sidebarItems.map(({ id, label, icon: Icon, path, danger }) => {
              const isActive = location.pathname === path || (path !== '/privacy-center' && location.pathname.startsWith(path));
              return (
                <motion.button
                  key={id}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(path)}
                  id={`sidebar-${id}`}
                  className={cn(
                    'sidebar-item w-full',
                    isActive
                      ? 'sidebar-item-active'
                      : danger
                      ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10'
                      : 'sidebar-item-inactive'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* DPDP badge at bottom */}
        <div className="mt-auto p-5">
          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-xs font-bold text-gray-900 dark:text-white">DPDP Compliant</p>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
              This platform complies with India's Digital Personal Data Protection Act 2023.
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FAFAFA] dark:bg-gray-950">
        <div className="p-6 md:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PrivacyCenterLayout;
