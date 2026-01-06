import React from 'react';
import { Card, Badge } from '../ui/Components';
import { subjects, teachers } from '../../data/mockData';

export default function SubjectsView() {
    // Subjects for SS2 Science student
    const mySubjects = [
        { ...subjects[0], teacher: teachers[0] }, // Mathematics
        { ...subjects[1], teacher: teachers[1] }, // English
        { ...subjects[2], teacher: teachers[0] }, // Physics  
        { ...subjects[3], teacher: { firstName: 'Mrs. Amaka', lastName: 'Okoli' } }, // Chemistry
        { ...subjects[4], teacher: { firstName: 'Mr. Taiwo', lastName: 'Adeleke' } }, // Biology
        { ...subjects[8], teacher: { firstName: 'Mrs. Grace', lastName: 'Obi' } }, // Civic Education
        { ...subjects[9], teacher: { firstName: 'Mr. Chidi', lastName: 'Uzoma' } }, // Computer Studies
    ];

    const getSubjectColor = (category) => {
        switch (category) {
            case 'Core': return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400';
            case 'Science': return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400';
            case 'Arts': return 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400';
            case 'Commercial': return 'bg-warning-50 text-warning-700 dark:bg-warning-600/20 dark:text-warning-500';
            default: return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Subjects</h1>
                <p className="text-neutral-500 mt-1">SS 2 Science • {mySubjects.length} subjects enrolled</p>
            </div>

            {/* Subjects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mySubjects.map((subject, idx) => (
                    <Card key={idx} hover className="cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl ${getSubjectColor(subject.category)} flex items-center justify-center font-bold text-lg`}>
                                {subject.code}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">{subject.name}</h3>
                                <p className="text-sm text-neutral-500 mt-1">
                                    {subject.teacher.firstName} {subject.teacher.lastName}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="info">{subject.category}</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Teachers List */}
            <Card title="Subject Teachers">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Teacher</th>
                                <th>Category</th>
                                <th className="text-center">Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mySubjects.map((subject, idx) => (
                                <tr key={idx}>
                                    <td className="font-medium">{subject.name}</td>
                                    <td>{subject.teacher.firstName} {subject.teacher.lastName}</td>
                                    <td>
                                        <Badge variant={subject.category === 'Science' ? 'warning' : 'info'}>
                                            {subject.category}
                                        </Badge>
                                    </td>
                                    <td className="text-center font-mono">{subject.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
