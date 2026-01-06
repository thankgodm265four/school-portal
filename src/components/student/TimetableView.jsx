import React, { useState } from 'react';
import { Card } from '../ui/Components';
import { timetable } from '../../data/mockData';

export default function TimetableView() {
    const [selectedDay, setSelectedDay] = useState('Monday');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const todaySchedule = timetable.find(t => t.day === selectedDay)?.periods || [];

    const getSubjectColor = (subject) => {
        if (subject === 'Break' || subject === 'Lunch Break') return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500';
        if (subject.includes('Mathematics')) return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400';
        if (subject.includes('English')) return 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400';
        if (subject.includes('Physics') || subject.includes('Chemistry') || subject.includes('Biology')) return 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400';
        if (subject.includes('Computer')) return 'bg-success-50 dark:bg-success-600/20 text-success-600 dark:text-success-500';
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300';
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Class Timetable</h1>
                <p className="text-neutral-500 mt-1">SS 2 Science • First Term 2025/2026</p>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${selectedDay === day
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Schedule Grid */}
            <Card title={selectedDay} subtitle="Class Schedule">
                <div className="space-y-3">
                    {todaySchedule.map((period, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-4 p-4 rounded-xl ${getSubjectColor(period.subject)}`}
                        >
                            <div className="text-center min-w-[80px]">
                                <p className="text-sm font-medium">{period.time.split(' - ')[0]}</p>
                                <p className="text-xs opacity-70">{period.time.split(' - ')[1]}</p>
                            </div>
                            <div className="w-px h-12 bg-current opacity-20"></div>
                            <div className="flex-1">
                                <p className="font-semibold">{period.subject}</p>
                                {period.teacher && (
                                    <p className="text-sm opacity-70">{period.teacher}</p>
                                )}
                            </div>
                            {period.subject !== 'Break' && period.subject !== 'Lunch Break' && (
                                <div className="hidden sm:block">
                                    <span className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                                        45 mins
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Full Week Overview */}
            <Card title="Weekly Overview" padding={false}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-400">Time</th>
                                {days.map(day => (
                                    <th key={day} className="px-4 py-3 text-left font-semibold text-neutral-600 dark:text-neutral-400">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timetable[0].periods.map((_, periodIdx) => (
                                <tr key={periodIdx} className="border-t border-neutral-200 dark:border-neutral-700">
                                    <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap">
                                        {timetable[0].periods[periodIdx].time}
                                    </td>
                                    {days.map(day => {
                                        const daySchedule = timetable.find(t => t.day === day);
                                        const period = daySchedule?.periods[periodIdx];
                                        const isBreak = period?.subject === 'Break' || period?.subject === 'Lunch Break';
                                        return (
                                            <td key={day} className="px-4 py-3">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${isBreak
                                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                                                        : 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                                    }`}>
                                                    {period?.subject || '-'}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
