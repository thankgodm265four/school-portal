import React, { useState } from 'react';
import { Card, Button, Input, Select, Badge, Avatar, Modal, ConfirmModal } from '../ui/Components';
import DataTable from '../ui/DataTable';
import { students, teachers, parents } from '../../data/mockData';

export default function UserManagementView() {
    const [activeTab, setActiveTab] = useState('students');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const tabs = [
        { id: 'students', label: 'Students' },
        { id: 'teachers', label: 'Teachers' },
        { id: 'parents', label: 'Parents' },
    ];

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
                    key: 'status',
                    header: 'Status',
                    render: (val) => <Badge variant={val === 'Active' ? 'success' : 'danger'}>{val}</Badge>
                }
            ];
        } else if (activeTab === 'teachers') {
            return [
                ...common,
                { key: 'staffId', header: 'Staff ID', render: (val) => <span className="font-mono text-xs">{val}</span> },
                { key: 'subjects', header: 'Subjects', render: (val) => <span className="text-xs">{val.join(', ')}</span> },
                { key: 'qualification', header: 'Qualification' }
            ];
        } else {
            return [
                ...common,
                { key: 'children', header: 'Children', render: (val) => <Badge variant="info">{val.length} Children</Badge> },
                { key: 'address', header: 'Address', render: (val) => <span className="truncate max-w-[200px] block" title={val}>{val}</span> }
            ];
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        // Mock delete logic
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">User Management</h1>
                    <p className="text-neutral-500 mt-1">Manage students, teachers, and parents accounts</p>
                </div>
                <Button onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}>
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
                        <Input label="First Name" defaultValue={selectedUser?.firstName} />
                        <Input label="Last Name" defaultValue={selectedUser?.lastName} />
                    </div>
                    <Input label="Email" type="email" defaultValue={selectedUser?.email} />
                    <Input label="Phone" type="tel" defaultValue={selectedUser?.phone} />

                    {activeTab === 'students' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Class"
                                options={['SS 1', 'SS 2', 'SS 3'].map(c => ({ value: c, label: c }))}
                                defaultValue={selectedUser?.class}
                            />
                            <Select
                                label="Arm"
                                options={['A', 'B', 'C', 'D'].map(a => ({ value: a, label: a }))}
                                defaultValue={selectedUser?.arm}
                            />
                        </div>
                    )}
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
                confirmText="Delete User"
                variant="danger"
            />
        </div>
    );
}
