import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPermissions, defaultNotifications, studentData } from '../data/mockData';
import type { Permission, Notification, Student } from '../data/mockData';

// ============================================================
// TYPES
// ============================================================

interface FormData {
  studentName: string;
  age: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  guardianConfirmed: boolean;
}

interface AppState {
  darkMode: boolean;
  formData: FormData;
  parentVerified: boolean;
  permissions: Permission[];
  notifications: Notification[];
  student: Student;
  onboardingComplete: boolean;
}

interface AppContextValue extends AppState {
  toggleDarkMode: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  setParentVerified: (v: boolean) => void;
  updatePermission: (id: string, enabled: boolean) => void;
  updateNotification: (id: string, enabled: boolean) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

// ============================================================
// DEFAULT FORM DATA
// ============================================================

const defaultFormData: FormData = {
  studentName: '',
  age: '',
  parentName: '',
  email: '',
  phone: '',
  grade: '',
  guardianConfirmed: false,
};

// ============================================================
// CONTEXT
// ============================================================

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [parentVerified, setParentVerified] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updatePermission = (id: string, enabled: boolean) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id && !p.required ? { ...p, enabled } : p))
    );
  };

  const updateNotification = (id: string, enabled: boolean) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled } : n))
    );
  };

  const completeOnboarding = () => setOnboardingComplete(true);

  const resetOnboarding = () => {
    setOnboardingComplete(false);
    setFormData(defaultFormData);
    setParentVerified(false);
    setPermissions(defaultPermissions);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        formData,
        parentVerified,
        permissions,
        notifications,
        student: studentData,
        onboardingComplete,
        toggleDarkMode,
        updateFormData,
        setParentVerified,
        updatePermission,
        updateNotification,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
