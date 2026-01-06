import React, { useState } from 'react';
import { Card, Badge, Stat, Avatar, Select } from '../ui/Components';
import { parents, students, studentResults, feePayments, announcements, dashboardStats } from '../../data/mockData';
import { formatCurrency, formatDate, getGradeColor } from '../../utils/helpers';

export default function ParentDashboard() {
    const parent = parents[0];
    const [selectedChildId, setSelectedChildId] = useState(parent.children[0]);

    // Get child's data
    const child = students.find(s => s.id === selectedChildId) || students[0];
    const childResult = studentResults.find(r => r.studentId === selectedChildId) || studentResults[0];
    const childPayment = feePayments.find(p => p.studentId === selectedChildId) || feePayments[0];

    const stats = dashboardStats.parent;
    const recentAnnouncements = announcements.slice(0, 3);

    const childOptions = parent.children.map(id => {
        const student = students.find(s => s.id === id);
        return { value: id, label: student ? `${student.firstName} ${student.lastName}` : `Child ${id}` };
    });

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="card p-6 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome, {parent.title} {parent.lastName}! 👋</h1>
                        <p className="text-secondary-100 mt-1">
                            Monitor your child's academic progress
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {childOptions.length > 1 && (
                            <select
                                value={selectedChildId}
                                onChange={(e) => setSelectedChildId(Number(e.target.value))}
                                className="bg-white/20 border-0 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-white/50"
                            >
                                {childOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} className="text-neutral-900">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {/* Child Info Card */}
            <Card>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar name={`${child.firstName} ${child.lastName}`} size="xl" />
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {child.firstName} {child.lastName}
                        </h2>
                        <p className="text-neutral-500">{child.class} {child.arm}</p>
                        <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                            <Badge variant="info">{child.regNumber}</Badge>
                            <Badge variant="success">{child.status}</Badge>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <a href="/parent/results" className="btn-primary">View Results</a>
                        <a href="/parent/fees" className="btn-outline">Check Fees</a>
                    </div>
                </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat
                    label="Average Score"
                    value={`${childResult?.average?.toFixed(1) || 0}%`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                    iconBg="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                />
                <Stat
                    label="Class Position"
                    value={`${childResult?.position || '-'}/${childResult?.classSize || '-'}`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    }
                    iconBg="bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"
                />
                <Stat
                    label="Attendance"
                    value="95%"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    iconBg="bg-success-50 text-success-600 dark:bg-success-600/20 dark:text-success-500"
                />
                <Stat
                    label="Fee Status"
                    value={childPayment?.status || 'N/A'}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    }
                    iconBg={childPayment?.status === 'Paid'
                        ? 'bg-success-50 text-success-600 dark:bg-success-600/20 dark:text-success-500'
                        : 'bg-warning-50 text-warning-600 dark:bg-warning-600/20 dark:text-warning-500'
                    }
                />
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Results */}
                <div className="lg:col-span-2">
                    <Card
                        title="Recent Results"
                        subtitle="First Term 2025/2026"
                        action={
                            <a href="/parent/results" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </a>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th className="text-center">Score</th>
                                        <th className="text-center">Grade</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {childResult?.results?.slice(0, 5).map((r, idx) => (
                                        <tr key={idx}>
                                            <td className="font-medium">{r.subject}</td>
                                            <td className="text-center font-semibold">{r.total}/100</td>
                                            <td className={`text-center ${getGradeColor(r.grade)}`}>{r.grade}</td>
                                            <td>
                                                <Badge variant={r.total >= 70 ? 'success' : r.total >= 50 ? 'info' : 'danger'}>
                                                    {r.remark}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Fee Summary */}
                <div>
                    <Card
                        title="Fee Summary"
                        action={
                            <a href="/parent/fees" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                Details →
                            </a>
                        }
                    >
                        <div className="text-center mb-4">
                            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                                {formatCurrency(childPayment?.amountPaid || 0)}
                            </p>
                            <p className="text-neutral-500 text-sm">Paid of {formatCurrency(220000)}</p>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-4">
                            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${childPayment?.status === 'Paid' ? 'bg-success-500' : 'bg-warning-500'
                                        }`}
                                    style={{ width: `${(childPayment?.amountPaid / 220000) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-success-600">Paid: {formatCurrency(childPayment?.amountPaid || 0)}</span>
                            <span className="text-danger-600">Due: {formatCurrency(childPayment?.amountDue || 0)}</span>
                        </div>

                        <div className={`mt-4 p-3 rounded-xl text-center ${childPayment?.status === 'Paid'
                                ? 'bg-success-50 dark:bg-success-600/10 text-success-700 dark:text-success-400'
                                : 'bg-warning-50 dark:bg-warning-600/10 text-warning-700 dark:text-warning-400'
                            }`}>
                            <Badge variant={childPayment?.status === 'Paid' ? 'success' : 'warning'}>
                                {childPayment?.status}
                            </Badge>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Announcements */}
            <Card
                title="School Announcements"
                action={
                    <a href="/parent/announcements" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
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
