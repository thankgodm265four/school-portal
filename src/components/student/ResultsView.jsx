import React, { useState } from 'react';
import { Card, Select, Badge, Button } from '../ui/Components';
import { studentResults, academicSessions, terms, schoolInfo, gradingSystem } from '../../data/mockData';
import { getGradeColor, formatPosition } from '../../utils/helpers';

export default function ResultsView() {
    const [selectedSession, setSelectedSession] = useState('2025/2026');
    const [selectedTerm, setSelectedTerm] = useState('First Term');

    const result = studentResults[0]; // In real app, fetch based on filters

    const sessionOptions = academicSessions.map(s => ({ value: s.name, label: s.name }));
    const termOptions = terms.map(t => ({ value: t.name, label: t.name }));

    const handleDownloadPDF = () => {
        // In real app, generate and download PDF
        alert('PDF download feature would be implemented with a backend API');
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Academic Results</h1>
                    <p className="text-neutral-500 mt-1">View your academic performance</p>
                </div>
                <Button onClick={handleDownloadPDF} variant="primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Result Slip
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                        label="Academic Session"
                        options={sessionOptions}
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                    />
                    <Select
                        label="Term"
                        options={termOptions}
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                    />
                </div>
            </Card>

            {/* Result Summary */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <p className="text-neutral-500 text-sm">Total Score</p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">{result.totalScore}</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-neutral-500 text-sm">Average</p>
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">{result.average.toFixed(1)}%</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-neutral-500 text-sm">Position</p>
                    <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mt-1">{formatPosition(result.position)}</p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-neutral-500 text-sm">Out of</p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">{result.classSize} students</p>
                </div>
            </div>

            {/* Results Table */}
            <Card title="Subject Results" subtitle={`${selectedSession} • ${selectedTerm}`}>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th className="text-center">CA1 (20)</th>
                                <th className="text-center">CA2 (20)</th>
                                <th className="text-center">Exam (60)</th>
                                <th className="text-center">Total (100)</th>
                                <th className="text-center">Grade</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.results.map((r, idx) => (
                                <tr key={idx}>
                                    <td className="font-medium">{r.subject}</td>
                                    <td className="text-center">{r.ca1}</td>
                                    <td className="text-center">{r.ca2}</td>
                                    <td className="text-center">{r.exam}</td>
                                    <td className="text-center font-bold">{r.total}</td>
                                    <td className={`text-center font-bold ${getGradeColor(r.grade)}`}>{r.grade}</td>
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

            {/* Remarks Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Teacher's Remark">
                    <p className="text-neutral-600 dark:text-neutral-400 italic">
                        "{result.teacherRemark}"
                    </p>
                </Card>
                <Card title="Principal's Remark">
                    <p className="text-neutral-600 dark:text-neutral-400 italic">
                        "{result.principalRemark}"
                    </p>
                </Card>
            </div>

            {/* Grading Key */}
            <Card title="Grading System" subtitle="WAEC/NECO Style">
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                    {gradingSystem.grades.map((g) => (
                        <div key={g.grade} className="text-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                            <span className={`text-lg font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span>
                            <p className="text-xs text-neutral-500 mt-1">{g.minScore}-{g.maxScore}%</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
