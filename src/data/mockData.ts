// ============================================================
// VEDANTU PRIVACY CENTER - MOCK DATA
// ============================================================

export interface Permission {
  id: string;
  icon: string;
  title: string;
  description: string;
  purpose: string;
  required: boolean;
  enabled: boolean;
  category: 'required' | 'optional';
  lastUpdated: string;
  learnMore: string;
}

export interface ConsentHistoryItem {
  id: string;
  date: string;
  action: string;
  detail: string;
  type: 'created' | 'accepted' | 'declined' | 'modified' | 'downloaded' | 'deleted';
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'privacy' | 'security' | 'email';
}

export interface Student {
  name: string;
  age: number;
  grade: string;
  parentName: string;
  email: string;
  phone: string;
  avatar: string;
  consentValid: boolean;
  parentVerified: boolean;
  lastUpdated: string;
  renewalDate: string;
}

export interface DashboardClass {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'live' | 'completed';
  icon: string;
}

export interface Activity {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: 'class' | 'assignment' | 'quiz' | 'achievement';
}

// ============================================================
// STUDENT DATA
// ============================================================

export const studentData: Student = {
  name: 'Arjun Sharma',
  age: 14,
  grade: 'Class 9',
  parentName: 'Priya Sharma',
  email: 'priya.sharma@gmail.com',
  phone: '+91 98765 43210',
  avatar: 'PS',
  consentValid: true,
  parentVerified: true,
  lastUpdated: '2 July 2026',
  renewalDate: '2 July 2027',
};

// ============================================================
// PERMISSIONS
// ============================================================

export const defaultPermissions: Permission[] = [
  {
    id: 'account_creation',
    icon: 'User',
    title: 'Account Creation',
    description: 'Basic profile information needed to create and manage your child\'s learning account.',
    purpose: 'To create and maintain your child\'s student profile on the platform.',
    required: true,
    enabled: true,
    category: 'required',
    lastUpdated: '2 Jul 2026',
    learnMore: 'This includes name, age, grade, and contact information. This data cannot be collected without providing the core service. Retained until account deletion.',
  },
  {
    id: 'attendance',
    icon: 'CalendarCheck',
    title: 'Attendance Tracking',
    description: 'Track which classes your child attends to generate accurate progress reports.',
    purpose: 'To monitor class attendance and generate progress reports for parents.',
    required: true,
    enabled: true,
    category: 'required',
    lastUpdated: '2 Jul 2026',
    learnMore: 'We record which live and recorded classes your child accesses. This data is essential for generating attendance certificates and academic reports. Retained for 365 days.',
  },
  {
    id: 'recommendations',
    icon: 'Sparkles',
    title: 'Learning Recommendations',
    description: 'AI-powered suggestions for courses, topics and practice problems tailored to your child\'s learning pace.',
    purpose: 'To improve learning outcomes through personalised content recommendations.',
    required: false,
    enabled: true,
    category: 'optional',
    lastUpdated: '2 Jul 2026',
    learnMore: 'Our recommendation engine analyses learning patterns, quiz scores, and time-on-task to suggest the most relevant content. No data is shared with third parties. Retained for 180 days.',
  },
  {
    id: 'notifications',
    icon: 'Bell',
    title: 'Personalised Notifications',
    description: 'Class reminders, assignment due dates, and study milestone alerts tailored to your child\'s schedule.',
    purpose: 'To keep students and parents informed about learning activities and deadlines.',
    required: false,
    enabled: true,
    category: 'optional',
    lastUpdated: '2 Jul 2026',
    learnMore: 'Notifications are sent via email, SMS, and push notifications. You can customise notification preferences at any time. Data retained for 30 days.',
  },
  {
    id: 'marketing',
    icon: 'Megaphone',
    title: 'Marketing Emails',
    description: 'Updates about new courses, special offers, and Vedantu feature announcements.',
    purpose: 'To inform you about new products, services, and promotional offers from Vedantu.',
    required: false,
    enabled: false,
    category: 'optional',
    lastUpdated: '3 Jul 2026',
    learnMore: 'We may share aggregated (not personally identifiable) data with trusted marketing partners. You can unsubscribe at any time. Your data will not be sold to third parties.',
  },
  {
    id: 'analytics',
    icon: 'BarChart3',
    title: 'Research & Analytics',
    description: 'Anonymised usage patterns used to improve Vedantu\'s platform and teaching methods.',
    purpose: 'To improve the quality of education through data-driven insights and research.',
    required: false,
    enabled: false,
    category: 'optional',
    lastUpdated: '2 Jul 2026',
    learnMore: 'All data used for research is fully anonymised. Individual students cannot be identified from research datasets. This helps us improve content quality for all students.',
  },
  {
    id: 'progress_reports',
    icon: 'FileText',
    title: 'Progress Reports',
    description: 'Detailed weekly and monthly reports on your child\'s academic performance shared with parents.',
    purpose: 'To keep parents informed about their child\'s academic progress and achievements.',
    required: false,
    enabled: true,
    category: 'optional',
    lastUpdated: '2 Jul 2026',
    learnMore: 'Progress reports include quiz scores, assignment grades, attendance records, and teacher feedback. Reports are sent to the verified parent email only. Retained for 365 days.',
  },
];

// ============================================================
// CONSENT HISTORY
// ============================================================

export const consentHistory: ConsentHistoryItem[] = [
  {
    id: '1',
    date: '2 Jul 2026',
    action: 'Account Created',
    detail: 'Parent verified and account setup completed',
    type: 'created',
  },
  {
    id: '2',
    date: '2 Jul 2026',
    action: 'Accepted Learning Recommendations',
    detail: 'Personalised AI recommendations enabled',
    type: 'accepted',
  },
  {
    id: '3',
    date: '2 Jul 2026',
    action: 'Accepted Progress Reports',
    detail: 'Weekly progress reports enabled',
    type: 'accepted',
  },
  {
    id: '4',
    date: '2 Jul 2026',
    action: 'Accepted Notifications',
    detail: 'Class and assignment notifications enabled',
    type: 'accepted',
  },
  {
    id: '5',
    date: '3 Jul 2026',
    action: 'Declined Marketing Emails',
    detail: 'Marketing communications disabled',
    type: 'declined',
  },
  {
    id: '6',
    date: '3 Jul 2026',
    action: 'Declined Research & Analytics',
    detail: 'Research data sharing declined',
    type: 'declined',
  },
  {
    id: '7',
    date: '10 Jul 2026',
    action: 'Data Download Requested',
    detail: 'Personal data archive generated and downloaded',
    type: 'downloaded',
  },
];

// ============================================================
// NOTIFICATIONS
// ============================================================

export const defaultNotifications: Notification[] = [
  {
    id: 'privacy_updates',
    title: 'Privacy Policy Updates',
    description: 'Get notified when our privacy policy changes',
    enabled: true,
    category: 'privacy',
  },
  {
    id: 'consent_renewal',
    title: 'Consent Renewal Reminder',
    description: 'Reminder to review and renew annual consent',
    enabled: true,
    category: 'privacy',
  },
  {
    id: 'data_requests',
    title: 'Data Request Updates',
    description: 'Status updates on data download and deletion requests',
    enabled: true,
    category: 'privacy',
  },
  {
    id: 'security_alerts',
    title: 'Security Alerts',
    description: 'Alerts for unusual login activity or security events',
    enabled: true,
    category: 'security',
  },
  {
    id: 'breach_notifications',
    title: 'Breach Notifications',
    description: 'Immediate alerts if your data is affected by a breach',
    enabled: true,
    category: 'security',
  },
  {
    id: 'weekly_digest',
    title: 'Weekly Privacy Digest',
    description: 'Weekly summary of privacy-related activities',
    enabled: false,
    category: 'email',
  },
  {
    id: 'monthly_report',
    title: 'Monthly Consent Report',
    description: 'Monthly overview of your active consents',
    enabled: true,
    category: 'email',
  },
];

// ============================================================
// DASHBOARD DATA
// ============================================================

export const todaysClasses: DashboardClass[] = [
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Mr. Rajesh Kumar',
    time: '10:00 AM',
    duration: '60 min',
    status: 'completed',
    icon: '📐',
  },
  {
    id: '2',
    subject: 'Physics',
    teacher: 'Ms. Anita Verma',
    time: '12:00 PM',
    duration: '60 min',
    status: 'live',
    icon: '⚛️',
  },
  {
    id: '3',
    subject: 'Chemistry',
    teacher: 'Mr. Suresh Iyer',
    time: '3:00 PM',
    duration: '60 min',
    status: 'upcoming',
    icon: '🧪',
  },
  {
    id: '4',
    subject: 'English',
    teacher: 'Ms. Deepa Nair',
    time: '5:00 PM',
    duration: '45 min',
    status: 'upcoming',
    icon: '📚',
  },
];

export const recentActivity: Activity[] = [
  {
    id: '1',
    title: 'Completed Quiz',
    detail: 'Algebra: Quadratic Equations — Score 92%',
    time: '2 hours ago',
    type: 'quiz',
  },
  {
    id: '2',
    title: 'Submitted Assignment',
    detail: 'Physics Lab Report: Newton\'s Laws',
    time: '4 hours ago',
    type: 'assignment',
  },
  {
    id: '3',
    title: 'Achievement Unlocked',
    detail: '🏆 7-Day Learning Streak',
    time: 'Yesterday',
    type: 'achievement',
  },
  {
    id: '4',
    title: 'Attended Class',
    detail: 'Chemistry: Periodic Table Trends',
    time: 'Yesterday',
    type: 'class',
  },
];

// ============================================================
// CHART DATA
// ============================================================

export const privacyRequestsData = [
  { month: 'Jan', requests: 2 },
  { month: 'Feb', requests: 0 },
  { month: 'Mar', requests: 1 },
  { month: 'Apr', requests: 3 },
  { month: 'May', requests: 1 },
  { month: 'Jun', requests: 2 },
  { month: 'Jul', requests: 4 },
];

export const consentRateData = [
  { month: 'Jan', rate: 72 },
  { month: 'Feb', rate: 78 },
  { month: 'Mar', rate: 75 },
  { month: 'Apr', rate: 82 },
  { month: 'May', rate: 85 },
  { month: 'Jun', rate: 88 },
  { month: 'Jul', rate: 91 },
];

// ============================================================
// PROGRESS DATA
// ============================================================

export const subjectProgress = [
  { subject: 'Mathematics', progress: 78, color: '#FF6B00' },
  { subject: 'Physics', progress: 65, color: '#8B5CF6' },
  { subject: 'Chemistry', progress: 82, color: '#16A34A' },
  { subject: 'English', progress: 91, color: '#0EA5E9' },
];
