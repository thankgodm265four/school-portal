import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Badge, Avatar, Modal, ConfirmModal } from '../ui/Components';
import DataTable from '../ui/DataTable';
import { getStudents, createStudent, updateStudent, deleteStudent, getTeachers, createTeacher, updateTeacher, deleteTeacher, getParents } from '../../utils/api';

export default function UserManagementView() {
    const [activeTab, setActiveTab] = useState('students');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Data state
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [parents, setParents] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({});

    const tabs = [
        { id: 'students', label: 'Students' },
        { id: 'teachers', label: 'Teachers' },
        { id: 'parents', label: 'Parents' },
    ];

    // Fetch data on component mount and tab change
    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === 'students') {
                const data = await getStudents();
                setStudents(transformStudentsData(data));
            } else if (activeTab === 'teachers') {
                const data = await getTeachers();
                setTeachers(transformTeachersData(data));
            } else if (activeTab === 'parents') {
                const data = await getParents();
                setParents(data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Failed to fetch data. Please check your Supabase configuration.');
        } finally {
            setLoading(false);
        }
    };

    // Transform Supabase data to match component's expected format
    const transformStudentsData = (data) => {
        console.log('Raw student data from Supabase:', data); // Debug log
        return data.map(student => ({
            ...student,
            firstName: student.first_name || student.firstName,
            lastName: student.last_name || student.lastName,
            regNumber: student.reg_number || student.regNumber,
            parentId: student.parent_id || student.parentId,
            dateOfBirth: student.date_of_birth || student.dateOfBirth,
            enrollmentDate: student.enrollment_date || student.enrollmentDate
        }));
    };

    const transformTeachersData = (data) => {
        return data.map(teacher => ({
            ...teacher,
            firstName: teacher.first_name,
            lastName: teacher.last_name,
            staffId: teacher.staff_id
        }));
    };

    // Transform form data back to Supabase format
    const transformToSupabaseFormat = (data, type) => {
        const base = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
        };

        if (type === 'student') {
            return {
                ...base,
                reg_number: data.regNumber || `USS/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                gender: data.gender || '',
                date_of_birth: data.dateOfBirth || null,
                class: data.class,
                arm: data.arm,
                status: data.status || 'Active'
            };
        } else if (type === 'teacher') {
            return {
                ...base,
                staff_id: data.staffId || `TCH/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                gender: data.gender || '',
                subjects: data.subjects || [],
                classes: data.classes || [],
                qualification: data.qualification || '',
                status: data.status || 'Active'
            };
        } else if (type === 'parent') {
            return {
                ...base,
                title: data.title || '',
                occupation: data.occupation || '',
                address: data.address || ''
            };
        }
        return base;
    };

    const getData = () => {
        switch (activeTab) {
            case 'students': return students;
            case 'teachers': return teachers;
            case 'parents': return parents;
            default: return [];
        }
    };

    const getColumns = () => {
        const common = [
            {
                key: 'name',
                header: 'Name',
                render: (_, row) => (
                    <div className="flex items-center gap-3">
                        <Avatar name={`${row.firstName} ${row.lastName}`} src={row.avatar} size="sm" />
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-white">{row.firstName} {row.lastName}</p>
                            <p className="text-xs text-neutral-500">{row.email}</p>
                        </div>
                    </div>
                )
            },
            { key: 'phone', header: 'Phone' },
        ];

        if (activeTab === 'students') {
            return [
                ...common,
                { key: 'regNumber', header: 'Reg Number', render: (val) => <span className="font-mono text-xs">{val}</span> },
                { key: 'class', header: 'Class', render: (val, row) => `${val} ${row.arm}` },
                {
                    key: 'loginCredentials',
                    header: 'Login Credentials',
                    render: (_, row) => (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">Username:</span>
                                <span className="text-xs font-medium font-mono">{row.firstName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">Password:</span>
                                <span className="text-xs font-medium font-mono">{row.regNumber}</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(row.regNumber);
                                    }}
                                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                                    title="Copy password"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                },
                {
                    key: 'status',
                    header: 'Status',
                    render: (val) => <Badge variant={val === 'Active' ? 'success' : 'danger'}>{val}</Badge>
                }
            ];
        } else if (activeTab === 'teachers') {
            return [
                ...common,
                { key: 'staffId', header: 'Staff ID', render: (val) => <span className="font-mono text-xs">{val}</span> },
                { key: 'subjects', header: 'Subjects', render: (val) => <span className="text-xs">{Array.isArray(val) ? val.join(', ') : val}</span> },
                {
                    key: 'loginCredentials',
                    header: 'Login Credentials',
                    render: (_, row) => (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">Username:</span>
                                <span className="text-xs font-medium font-mono">{row.firstName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">Password:</span>
                                <span className="text-xs font-medium font-mono">{row.staffId}</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(row.staffId);
                                    }}
                                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                                    title="Copy password"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }
            ];
        } else {
            return [
                ...common,
                { key: 'title', header: 'Title' },
                { key: 'occupation', header: 'Occupation' },
                { key: 'address', header: 'Address', render: (val) => <span className="truncate max-w-[200px] block" title={val}>{val}</span> }
            ];
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;

        setSaveLoading(true);
        try {
            if (activeTab === 'students') {
                await deleteStudent(selectedUser.id);
            } else if (activeTab === 'teachers') {
                await deleteTeacher(selectedUser.id);
            }

            // Refresh data
            await fetchData();
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (err) {
            console.error('Error deleting:', err);
            setError(err.message || 'Failed to delete. Please try again.');
        } finally {
            setSaveLoading(false);
        }
    };

    const handleSave = async () => {
        setSaveLoading(true);
        setError(null);

        try {
            const supabaseData = transformToSupabaseFormat(formData, activeTab.slice(0, -1));

            if (selectedUser) {
                // Update existing
                if (activeTab === 'students') {
                    await updateStudent(selectedUser.id, supabaseData);
                } else if (activeTab === 'teachers') {
                    await updateTeacher(selectedUser.id, supabaseData);
                }
            } else {
                // Create new
                if (activeTab === 'students') {
                    await createStudent(supabaseData);
                } else if (activeTab === 'teachers') {
                    await createTeacher(supabaseData);
                }
            }

            // Refresh data
            await fetchData();
            setIsModalOpen(false);
            setSelectedUser(null);
            setFormData({});
        } catch (err) {
            console.error('Error saving:', err);
            setError(err.message || 'Failed to save. Please try again.');
        } finally {
            setSaveLoading(false);
        }
    };

    const handleOpenModal = () => {
        setSelectedUser(null);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">User Management</h1>
                    <p className="text-neutral-500 mt-1">Manage students, teachers, and parents accounts</p>
                </div>
                <Button onClick={handleOpenModal} disabled={loading}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New {activeTab.slice(0, -1)}
                </Button>
            </div>

            <Card padding={false}>
                {/* Tabs */}
                <div className="border-b border-neutral-200 dark:border-neutral-700 px-6 pt-4">
                    <div className="flex gap-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                disabled={loading}
                                className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                            <span className="ml-3 text-neutral-600 dark:text-neutral-400">Loading...</span>
                        </div>
                    ) : (
                        <DataTable
                            columns={[
                                ...getColumns(),
                                {
                                    key: 'actions',
                                    header: '',
                                    render: (_, row) => (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(row)}
                                                className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row)}
                                                className="p-1 text-neutral-400 hover:text-danger-600 transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                }
                            ]}
                            data={getData()}
                            searchPlaceholder={`Search ${activeTab}...`}
                        />
                    )}
                </div>
            </Card>

            {/* Edit/Add Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${selectedUser ? 'Edit' : 'Add New'} ${activeTab.slice(0, -1)}`}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            value={formData.firstName || ''}
                            onChange={(e) => handleFormChange('firstName', e.target.value)}
                        />
                        <Input
                            label="Last Name"
                            value={formData.lastName || ''}
                            onChange={(e) => handleFormChange('lastName', e.target.value)}
                        />
                    </div>
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                    />

                    {activeTab === 'students' && (
                        <>
                            <Input
                                label="Registration Number"
                                value={formData.regNumber || ''}
                                onChange={(e) => handleFormChange('regNumber', e.target.value)}
                                placeholder="Auto-generated if left blank (e.g. USS/2024/001)"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    label="Class"
                                    options={['SS 1', 'SS 2', 'SS 3', 'JSS 1', 'JSS 2', 'JSS 3'].map(c => ({ value: c, label: c }))}
                                    value={formData.class || ''}
                                    onChange={(e) => handleFormChange('class', e.target.value)}
                                />
                                <Select
                                    label="Arm"
                                    options={['A', 'B', 'C', 'Science', 'Arts', 'Commercial'].map(a => ({ value: a, label: a }))}
                                    value={formData.arm || ''}
                                    onChange={(e) => handleFormChange('arm', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'teachers' && (
                        <>
                            <Input
                                label="Staff ID"
                                value={formData.staffId || ''}
                                onChange={(e) => handleFormChange('staffId', e.target.value)}
                                placeholder="Auto-generated if left blank (e.g. TCH/2024/001)"
                            />
                            <Input
                                label="Qualification"
                                value={formData.qualification || ''}
                                onChange={(e) => handleFormChange('qualification', e.target.value)}
                                placeholder="e.g., B.Sc Mathematics"
                            />
                        </>
                    )}
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={saveLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saveLoading}>
                        {saveLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
                confirmText={saveLoading ? 'Deleting...' : 'Delete User'}
                variant="danger"
            />
        </div>
    );
}
