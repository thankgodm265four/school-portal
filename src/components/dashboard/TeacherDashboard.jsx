import React from 'react';
import { Card, Badge, Stat } from '../ui/Components';
import { teachers, students, classes, announcements, timetable, dashboardStats } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

export default function TeacherDashboard() {
    const teacher = teachers[0];
    const stats = dashboardStats.teacher;
    const todaySchedule = timetable[0]?.periods.filter(p => p.teacher === `${teacher.firstName} ${teacher.lastName}`) || [];
    const recentAnnouncements = announcements.slice(0, 2);

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="card p-6 bg-gradient-to-r from-accent-600 to-accent-800 text-white border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, {teacher.firstName}! 👋</h1>
                        <p className="text-accent-100 mt-1">
                            {teacher.subjects?.join(' & ')} Teacher • {teacher.staffId}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a href="/teacher/scores" className="btn bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                            Upload Scores
                        </a>
                        <a href="/teacher/classes" className="btn bg-white text-accent-700 hover:bg-accent-50">
                            My Classes
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat
                    label="Assigned Classes"
                    value={stats.assignedClasses}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                    iconBg="bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400"
                />
                <Stat
                    label="Total Students"
                    value={stats.totalStudents}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                    iconBg="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                />
                <Stat
                    label="Pending Scores"
                    value={stats.pendingScores}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    }
                    iconBg="bg-warning-50 text-warning-600 dark:bg-warning-600/20 dark:text-warning-500"
                />
                <Stat
                    label="Classes Today"
                    value={stats.upcomingClasses}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                    iconBg="bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"
                />
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Assigned Classes */}
                <div className="lg:col-span-2">
                    <Card
                        title="My Classes"
                        action={
                            <a href="/teacher/classes" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </a>
                        }
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            {teacher.classes?.map((className, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-bold">
                                            {className.split(' ')[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-neutral-900 dark:text-white">{className}</h4>
                                            <p className="text-sm text-neutral-500">45 Students</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Badge variant="info">Physics</Badge>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Today's Schedule */}
                <div>
                    <Card
                        title="Today's Classes"
                        subtitle="Monday"
                        action={
                            <a href="/teacher/timetable" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                Full Schedule →
                            </a>
                        }
                    >
                        <div className="space-y-3">
                            {timetable[0].periods.slice(0, 5).map((period, idx) => {
                                const isMyClass = period.teacher?.includes(teacher.lastName);
                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-3 p-3 rounded-xl ${isMyClass
                                                ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                                                : 'bg-neutral-50 dark:bg-neutral-800'
                                            }`}
                                    >
                                        <div className="text-xs text-neutral-500 w-16">{period.time.split(' - ')[0]}</div>
                                        <div className="flex-1">
                                            <p className={`font-medium text-sm ${isMyClass ? 'text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                                {period.subject}
                                            </p>
                                            {isMyClass && <p className="text-xs text-primary-600">Your class</p>}
                                        </div>
                                        {isMyClass && (
                                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Quick Actions & Announcements */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card title="Quick Actions">
                    <div className="grid grid-cols-2 gap-3">
                        <a href="/teacher/scores" className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="font-medium">Upload Scores</span>
                        </a>
                        <a href="/teacher/students" className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">View Students</span>
                        </a>
                        <a href="/teacher/results" className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-medium">Submit Results</span>
                        </a>
                        <a href="/teacher/announcements" className="p-4 rounded-xl bg-warning-50 dark:bg-warning-600/10 text-warning-700 dark:text-warning-500 hover:bg-warning-100 dark:hover:bg-warning-600/20 transition-colors text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                            <span className="font-medium">Announcements</span>
                        </a>
                    </div>
                </Card>

                {/* Recent Announcements */}
                <Card
                    title="Recent Announcements"
                    action={
                        <a href="/teacher/announcements" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            View All →
                        </a>
                    }
                >
                    <div className="space-y-4">
                        {recentAnnouncements.map((announcement) => (
                            <div key={announcement.id} className="flex gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${announcement.priority === 'high'
                                        ? 'bg-danger-100 text-danger-600 dark:bg-danger-600/20 dark:text-danger-400'
                                        : 'bg-accent-100 text-accent-600 dark:bg-accent-600/20 dark:text-accent-400'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-neutral-900 dark:text-white text-sm">{announcement.title}</h4>
                                    <p className="text-xs text-neutral-500 mt-1">{formatDate(announcement.date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
