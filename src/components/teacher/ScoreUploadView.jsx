import React, { useState } from 'react';
import { Card, Button, Input, Select, Badge, Alert } from '../ui/Components';
import { students, classes, subjects } from '../../data/mockData';

export default function ScoreUploadView() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [scores, setScores] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Filter students based on selected class (mock logic)
    const classStudents = selectedClass ? students.filter(s => s.class === selectedClass.split(' ')[0]) : [];

    const handleScoreChange = (studentId, field, value) => {
        const numValue = Math.min(Math.max(0, Number(value) || 0), field === 'exam' ? 70 : 30);

        setScores(prev => {
            const studentScores = prev[studentId] || { ca: 0, exam: 0 };
            const newScores = { ...studentScores, [field]: numValue };
            return { ...prev, [studentId]: newScores };
        });
    };

    const handleSubmit = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const calculateTotal = (studentId) => {
        const s = scores[studentId] || { ca: 0, exam: 0 };
        return s.ca + s.exam;
    };

    const getGrade = (total) => {
        if (total >= 70) return 'A';
        if (total >= 60) return 'B';
        if (total >= 50) return 'C';
        if (total >= 45) return 'D';
        if (total >= 40) return 'E';
        return 'F';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Upload Scores</h1>
                    <p className="text-neutral-500 mt-1">Enter continuous assessment and exam scores</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Import Excel
                    </Button>
                    <Button variant="outline">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Template
                    </Button>
                </div>
            </div>

            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)}>
                    Scores uploaded successfully! Results are now pending approval.
                </Alert>
            )}

            <Card>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Select
                        label="Class"
                        options={classes.map(c => ({ value: c.name, label: c.name }))}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        placeholder="Select Class"
                    />
                    <Select
                        label="Subject"
                        options={subjects.map(s => ({ value: s.code, label: s.name }))}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        placeholder="Select Subject"
                    />
                    <Select
                        label="Term"
                        options={[
                            { value: '1', label: 'First Term' },
                            { value: '2', label: 'Second Term' },
                            { value: '3', label: 'Third Term' },
                        ]}
                        defaultValue="1"
                    />
                </div>

                {selectedClass && selectedSubject ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-neutral-500 uppercase bg-neutral-50 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-4 py-3">Student Name</th>
                                    <th className="px-4 py-3">Reg Number</th>
                                    <th className="px-4 py-3 w-32">CA (30)</th>
                                    <th className="px-4 py-3 w-32">Exam (70)</th>
                                    <th className="px-4 py-3 w-24">Total</th>
                                    <th className="px-4 py-3 w-24">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {classStudents.map((student) => {
                                    const total = calculateTotal(student.id);
                                    const grade = getGrade(total);
                                    return (
                                        <tr key={student.id} className="bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                            <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">
                                                {student.firstName} {student.lastName}
                                            </td>
                                            <td className="px-4 py-3 text-neutral-500 font-mono">
                                                {student.regNumber}
                                            </td>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="30"
                                                    className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-500"
                                                    value={scores[student.id]?.ca || ''}
                                                    onChange={(e) => handleScoreChange(student.id, 'ca', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="70"
                                                    className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-primary-500"
                                                    value={scores[student.id]?.exam || ''}
                                                    onChange={(e) => handleScoreChange(student.id, 'exam', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-bold text-neutral-900 dark:text-white">
                                                {total}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant={
                                                    grade === 'A' ? 'success' :
                                                        grade === 'B' ? 'info' :
                                                            grade === 'C' ? 'warning' :
                                                                grade === 'F' ? 'danger' : 'neutral'
                                                }>
                                                    {grade}
                                                </Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="ghost">Save Draft</Button>
                            <Button onClick={handleSubmit}>Submit Scores</Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-neutral-500">
                        <svg className="w-12 h-12 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p>Please select a class and subject to start entering scores</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
