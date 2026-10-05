// Sample data for the demo. Replace with HealthKit / Health Connect and your backend later.
import type { Status } from '../components/ui';

export const patient = { firstName: 'Amara', initials: 'AO', id: 'CD-204871' };

export const nextVisit = {
  title: 'Video visit with Dr. Elena Marsh',
  meta: 'Today, 10:30 AM · 20 min · Blood pressure follow-up',
  countdown: 'Next up · in 45 min',
  note: 'Opens at 10:20 AM. Have your latest reading ready.',
};

export const metrics: { label: string; value: string; unit: string; context: string; status: string }[] = [
  { label: 'Sleep', value: '7h 12m', unit: '', context: 'Last night · 18 min over your average', status: 'Restful' },
  { label: 'Resting heart rate', value: '62', unit: 'bpm', context: 'This morning · range 55–70', status: 'In range' },
  { label: 'Blood pressure', value: '118/76', unit: 'mmHg', context: '7:42 AM · target under 130/80', status: 'In range' },
  { label: 'Blood oxygen', value: '97', unit: '%', context: 'Overnight avg · range 95–100', status: 'In range' },
];

export const activity = {
  steps: 6240,
  stepsGoal: 8000,
  activeMin: 24,
  activeGoal: 30,
  km: 4.1,
  kmGoal: 5,
};

export type Range = 'week' | 'month' | 'year';

export const heartTrend: Record<Range, { v: number[]; start: string; end: string; avg: string; change: string }> = {
  week: { v: [65, 64, 64, 63, 62, 62, 62], start: 'Wed', end: 'Today', avg: '62', change: '3 lower than last week' },
  month: { v: [66, 65, 66, 67, 65, 64, 65, 64, 63, 64, 63, 62, 63, 62], start: '8 Sep', end: 'Today', avg: '64', change: '2 lower than August' },
  year: { v: [68, 67, 67, 66, 66, 65, 65, 64, 64, 63, 63, 62], start: 'Nov', end: 'Oct', avg: '65', change: '6 lower than a year ago' },
};

export type Appointment = {
  id: string; mon: string; day: string; title: string; meta: string; badge: string; status: Status;
};

export const appointments: Appointment[] = [
  { id: 'a1', mon: 'THU', day: '9', title: 'Fasting blood panel', meta: 'Bayview Lab · 8:00 AM · 15 min', badge: 'Fast from 8 PM Wed', status: 'pending' },
  { id: 'a2', mon: 'TUE', day: '21', title: 'Follow-up with Dr. Samuel Ito', meta: 'Internal medicine · 2:30 PM · In person', badge: 'Confirmed', status: 'ok' },
];

export const clinicians = [
  { id: 'c1', name: 'Dr. Elena Marsh', role: 'Family medicine', initials: 'EM' },
  { id: 'c2', name: 'Dr. Samuel Ito', role: 'Internal medicine', initials: 'SI' },
];

export const days = [
  { id: 'd1', dow: 'Wed', date: '8' },
  { id: 'd2', dow: 'Thu', date: '9' },
  { id: 'd3', dow: 'Fri', date: '10' },
  { id: 'd4', dow: 'Mon', date: '13' },
  { id: 'd5', dow: 'Tue', date: '14' },
];

export const slots = ['9:00 AM', '10:30 AM', '11:15 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
export const bookedSlots = ['11:15 AM'];

export const results = {
  date: 'Results · 2 Oct',
  optimalPct: 87,
  total: 104,
  previousPct: 74,
  systems: [
    {
      id: 's1', name: 'Heart', count: 12, badge: '1 to review', status: 'review' as Status,
      markers: [
        { name: 'ApoB', value: 72, unit: 'mg/dL', min: 20, max: 160, low: 40, high: 90 },
        { name: 'LDL', value: 138, unit: 'mg/dL', min: 20, max: 190, low: 40, high: 100 },
        { name: 'HDL', value: 58, unit: 'mg/dL', min: 20, max: 100, low: 40, high: 90 },
      ],
    },
    {
      id: 's2', name: 'Metabolic', count: 9, badge: 'All in range', status: 'ok' as Status,
      markers: [
        { name: 'Glucose', value: 88, unit: 'mg/dL', min: 50, max: 140, low: 70, high: 99 },
        { name: 'HbA1c', value: 5.2, unit: '%', min: 4, max: 7, low: 4, high: 5.6 },
      ],
    },
    {
      id: 's3', name: 'Thyroid', count: 5, badge: 'All in range', status: 'ok' as Status,
      markers: [{ name: 'TSH', value: 1.9, unit: 'mIU/L', min: 0, max: 6, low: 0.4, high: 4 }],
    },
  ],
};
