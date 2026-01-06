import React from 'react';
import { Card, Badge, Stat } from '../ui/Components';
import { studentResults, announcements, timetable, feePayments, dashboardStats } from '../../data/mockData';
import { formatCurrency, getGradeColor, formatDate } from '../../utils/helpers';

export default function StudentDashboard() {
    const studentData = {
        name: 'Adaeze Okonkwo',
        class: 'SS 2 Science',
        regNumber: 'USS/2024/001',
    };

    const result = studentResults[0];
    const payment = feePayments[0];
    const todaySchedule = timetable[0]?.periods || [];
    const recentAnnouncements = announcements.slice(0, 3);

    // Calculate stats
    const averageScore = result?.average || 0;
    const position = result?.position || 0;
    const totalSubjects = result?.results?.length || 0;

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="card p-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, {studentData.name.split(' ')[0]}! 👋</h1>
                        <p className="text-primary-100 mt-1">
                            {studentData.class} • {studentData.regNumber}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a href="/student/results" className="btn bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                            View Results
                        </a>
                        <a href="/student/timetable" className="btn bg-white text-primary-700 hover:bg-primary-50">
                            Today's Schedule
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat
                    label="Average Score"
                    value={`${averageScore.toFixed(1)}%`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                    iconBg="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                />
                <Stat
                    label="Class Position"
                    value={`${position}${position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th'}`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    }
                    iconBg="bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"
                />
                <Stat
                    label="Subjects"
                    value={totalSubjects}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    }
                    iconBg="bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400"
                />
                <Stat
                    label="Fee Status"
                    value={payment?.status || 'N/A'}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    }
                    iconBg={payment?.status === 'Paid'
                        ? 'bg-success-50 text-success-600 dark:bg-success-600/20 dark:text-success-500'
                        : 'bg-warning-50 text-warning-600 dark:bg-warning-600/20 dark:text-warning-500'
                    }
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Results */}
                <div className="lg:col-span-2">
                    <Card
                        title="Recent Results"
                        subtitle="First Term 2025/2026"
                        action={
                            <a href="/student/results" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </a>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th className="text-center">CA</th>
                                        <th className="text-center">Exam</th>
                                        <th className="text-center">Total</th>
                                        <th className="text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result?.results?.slice(0, 5).map((r, idx) => (
                                        <tr key={idx}>
                                            <td className="font-medium">{r.subject}</td>
                                            <td className="text-center">{r.ca1 + r.ca2}/40</td>
                                            <td className="text-center">{r.exam}/60</td>
                                            <td className="text-center font-semibold">{r.total}</td>
                                            <td className={`text-center ${getGradeColor(r.grade)}`}>{r.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Today's Schedule */}
                <div>
                    <Card
                        title="Today's Schedule"
                        subtitle="Monday"
                        action={
                            <a href="/student/timetable" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                Full Timetable →
                            </a>
                        }
                    >
                        <div className="space-y-3">
                            {todaySchedule.slice(0, 5).map((period, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-3 rounded-xl ${period.subject === 'Break' || period.subject === 'Lunch Break'
                                            ? 'bg-neutral-100 dark:bg-neutral-800'
                                            : 'bg-primary-50 dark:bg-primary-900/20'
                                        }`}
                                >
                                    <div className="text-xs text-neutral-500 w-20">{period.time.split(' - ')[0]}</div>
                                    <div className="flex-1">
                                        <p className="font-medium text-neutral-900 dark:text-white text-sm">{period.subject}</p>
                                        {period.teacher && (
                                            <p className="text-xs text-neutral-500">{period.teacher}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Announcements */}
            <Card
                title="Recent Announcements"
                action={
                    <a href="/student/announcements" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View All →
                    </a>
                }
            >
                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {recentAnnouncements.map((announcement) => (
                        <div key={announcement.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${announcement.priority === 'high'
                                        ? 'bg-danger-100 text-danger-600 dark:bg-danger-600/20 dark:text-danger-400'
                                        : 'bg-accent-100 text-accent-600 dark:bg-accent-600/20 dark:text-accent-400'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-neutral-900 dark:text-white">{announcement.title}</h4>
                                        {announcement.priority === 'high' && (
                                            <Badge variant="danger">Important</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                        {announcement.content}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-2">
                                        {formatDate(announcement.date)} • {announcement.author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
