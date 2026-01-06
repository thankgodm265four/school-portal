import React from 'react';
import { Card, Badge, Stat, Button } from '../ui/Components';
import { dashboardStats, announcements, schoolInfo } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function AdminDashboard() {
    const stats = dashboardStats.admin;
    const recentAnnouncements = announcements.slice(0, 3);

    const quickStats = [
        { label: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: '👨‍🎓', color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' },
        { label: 'Total Teachers', value: stats.totalTeachers, icon: '👨‍🏫', color: 'bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' },
        { label: 'Total Classes', value: stats.totalClasses, icon: '🏫', color: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400' },
        { label: 'Pending Results', value: stats.pendingResults, icon: '📋', color: 'bg-warning-50 text-warning-600 dark:bg-warning-600/20 dark:text-warning-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="card p-6 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard 🎓</h1>
                        <p className="text-neutral-300 mt-1">
                            {schoolInfo.name} • {schoolInfo.currentSession} • {schoolInfo.currentTerm}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a href="/admin/users" className="btn bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                            Manage Users
                        </a>
                        <a href="/admin/settings" className="btn bg-white text-neutral-800 hover:bg-neutral-100">
                            Settings
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, idx) => (
                    <div key={idx} className="card p-6 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Financial Overview */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Revenue Overview" subtitle={schoolInfo.currentTerm}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-success-50 dark:bg-success-600/10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-success-100 dark:bg-success-600/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-success-700 dark:text-success-400">Fees Collected</p>
                                    <p className="text-xl font-bold text-success-600">{formatCurrency(stats.feesCollected)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-danger-50 dark:bg-danger-600/10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-danger-100 dark:bg-danger-600/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-danger-700 dark:text-danger-400">Outstanding Fees</p>
                                    <p className="text-xl font-bold text-danger-600">{formatCurrency(stats.outstandingFees)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600 dark:text-neutral-400">Collection Rate</span>
                                <span className="text-xl font-bold text-primary-600">
                                    {((stats.feesCollected / (stats.feesCollected + stats.outstandingFees)) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-primary-600 rounded-full"
                                    style={{ width: `${(stats.feesCollected / (stats.feesCollected + stats.outstandingFees)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Pending Actions */}
                <Card title="Pending Actions">
                    <div className="space-y-3">
                        <a href="/admin/results" className="flex items-center justify-between p-4 rounded-xl bg-warning-50 dark:bg-warning-600/10 hover:bg-warning-100 dark:hover:bg-warning-600/20 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-warning-100 dark:bg-warning-600/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">Results Pending Approval</p>
                                    <p className="text-sm text-neutral-500">{stats.pendingResults} results awaiting review</p>
                                </div>
                            </div>
                            <Badge variant="warning">{stats.pendingResults}</Badge>
                        </a>

                        <a href="/admin/users" className="flex items-center justify-between p-4 rounded-xl bg-accent-50 dark:bg-accent-600/10 hover:bg-accent-100 dark:hover:bg-accent-600/20 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-600/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">New Registrations</p>
                                    <p className="text-sm text-neutral-500">5 new student registrations</p>
                                </div>
                            </div>
                            <Badge variant="info">5</Badge>
                        </a>

                        <a href="/admin/announcements" className="flex items-center justify-between p-4 rounded-xl bg-primary-50 dark:bg-primary-600/10 hover:bg-primary-100 dark:hover:bg-primary-600/20 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-600/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">Post Announcement</p>
                                    <p className="text-sm text-neutral-500">Share news with the school</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </Card>
            </div>

            {/* Quick Links & Recent Announcements */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick Links */}
                <div className="lg:col-span-1">
                    <Card title="Quick Actions">
                        <div className="grid grid-cols-2 gap-3">
                            <a href="/admin/users" className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="text-sm font-medium">Users</span>
                            </a>
                            <a href="/admin/classes" className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-sm font-medium">Classes</span>
                            </a>
                            <a href="/admin/subjects" className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-sm font-medium">Subjects</span>
                            </a>
                            <a href="/admin/settings" className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium">Settings</span>
                            </a>
                        </div>
                    </Card>
                </div>

                {/* Recent Announcements */}
                <div className="lg:col-span-2">
                    <Card
                        title="Recent Announcements"
                        action={
                            <a href="/admin/announcements" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                Manage →
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
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                                                {announcement.content}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-1">
                                                {formatDate(announcement.date)} • {announcement.author}
                                            </p>
                                        </div>
                                        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
