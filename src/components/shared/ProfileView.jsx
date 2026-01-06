import React, { useState } from 'react';
import { Card, Input, Button, Alert, Avatar } from '../ui/Components';
import { students, teachers, parents } from '../../data/mockData';

export default function ProfileView({ role }) {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Get appropriate user data based on role
    const userData = role === 'student' ? students[0]
        : role === 'teacher' ? teachers[0]
            : parents[0];

    const [formData, setFormData] = useState({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
    });

    const handleSave = () => {
        // Simulate save
        setShowSuccess(true);
        setIsEditing(false);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Profile Settings</h1>
                    <p className="text-neutral-500 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                    </Button>
                )}
            </div>

            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)}>
                    Profile updated successfully!
                </Alert>
            )}

            {/* Profile Card */}
            <Card>
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    <div className="relative">
                        <Avatar
                            name={`${userData.firstName} ${userData.lastName}`}
                            size="xl"
                            src={userData.avatar}
                        />
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {userData.firstName} {userData.lastName}
                        </h2>
                        <p className="text-neutral-500 capitalize">{role}</p>
                        {role === 'student' && (
                            <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                                {userData.regNumber} • {userData.class} {userData.arm}
                            </p>
                        )}
                        {role === 'teacher' && (
                            <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                                {userData.staffId} • {userData.qualification}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                    />
                </div>

                {isEditing && (
                    <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </div>
                )}
            </Card>

            {/* Additional Info */}
            {role === 'student' && (
                <Card title="Academic Information">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Class</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.class} {userData.arm}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Registration Number</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.regNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Enrollment Date</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.enrollmentDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Status</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-600/20 dark:text-success-500">
                                {userData.status}
                            </span>
                        </div>
                    </div>
                </Card>
            )}

            {role === 'teacher' && (
                <Card title="Professional Information">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Staff ID</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.staffId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Qualification</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.qualification}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Subjects</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.subjects?.join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Classes</p>
                            <p className="font-medium text-neutral-900 dark:text-white">{userData.classes?.join(', ')}</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Security Section */}
            <Card title="Security">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-white">Change Password</p>
                            <p className="text-sm text-neutral-500">Update your password regularly for security</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Change
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-white">Two-Factor Authentication</p>
                            <p className="text-sm text-neutral-500">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Enable
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
