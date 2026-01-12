import React, { useState } from 'react';
import { Button, Input, Select, Alert } from '../ui/Components';
import { authenticateStudent, authenticateTeacher, authenticateParent, authenticateAdmin } from '../../utils/api';
import { login, redirectToDashboard } from '../../utils/auth';

export default function LoginForm() {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        firstName: '',
        regNumber: '',
        staffId: '',
        email: '',
        password: '',
        username: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const roleOptions = [
        { value: 'student', label: '🎓 Student' },
        { value: 'teacher', label: '👨‍🏫 Teacher' },
        { value: 'parent', label: '👨‍👩‍👧 Parent / Guardian' },
        { value: 'admin', label: '🔐 Administrator' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let userData;

            // Authenticate based on role
            if (role === 'student') {
                if (!formData.firstName || !formData.regNumber) {
                    throw new Error('Please enter your first name and registration number');
                }
                userData = await authenticateStudent(formData.firstName.trim(), formData.regNumber.trim());
            } else if (role === 'teacher') {
                if (!formData.firstName || !formData.staffId) {
                    throw new Error('Please enter your first name and staff ID');
                }
                userData = await authenticateTeacher(formData.firstName.trim(), formData.staffId.trim());
            } else if (role === 'parent') {
                if (!formData.email || !formData.password) {
                    throw new Error('Please enter your email and password');
                }
                userData = await authenticateParent(formData.email.trim(), formData.password);
            } else if (role === 'admin') {
                if (!formData.username || !formData.password) {
                    throw new Error('Please enter your username and password');
                }
                userData = await authenticateAdmin(formData.username.trim(), formData.password);
            }

            // Store session
            login(userData, role);

            // Redirect to dashboard
            redirectToDashboard();

        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials and try again.');
            setLoading(false);
        }
    };

    // Get field labels based on role
    const getFieldConfig = () => {
        switch (role) {
            case 'student':
                return {
                    field1: { label: 'First Name', placeholder: 'Enter your first name', type: 'text', value: formData.firstName, onChange: (v) => handleInputChange('firstName', v) },
                    field2: { label: 'Registration Number', placeholder: 'e.g., USS/2024/001', type: 'text', value: formData.regNumber, onChange: (v) => handleInputChange('regNumber', v) }
                };
            case 'teacher':
                return {
                    field1: { label: 'First Name', placeholder: 'Enter your first name', type: 'text', value: formData.firstName, onChange: (v) => handleInputChange('firstName', v) },
                    field2: { label: 'Staff ID', placeholder: 'e.g., TCH/2020/001', type: 'text', value: formData.staffId, onChange: (v) => handleInputChange('staffId', v) }
                };
            case 'parent':
                return {
                    field1: { label: 'Email Address', placeholder: 'Enter your email', type: 'email', value: formData.email, onChange: (v) => handleInputChange('email', v) },
                    field2: { label: 'Password', placeholder: 'Enter your password', type: 'password', value: formData.password, onChange: (v) => handleInputChange('password', v) }
                };
            case 'admin':
                return {
                    field1: { label: 'Username', placeholder: 'Enter admin username', type: 'text', value: formData.username, onChange: (v) => handleInputChange('username', v) },
                    field2: { label: 'Password', placeholder: 'Enter admin password', type: 'password', value: formData.password, onChange: (v) => handleInputChange('password', v) }
                };
            default:
                return {};
        }
    };

    const fieldConfig = getFieldConfig();

    // Demo fill function
    const fillDemoCredentials = () => {
        if (role === 'student') {
            setFormData(prev => ({ ...prev, firstName: 'Adaeze', regNumber: 'USS/2024/001' }));
        } else if (role === 'teacher') {
            setFormData(prev => ({ ...prev, firstName: 'Ngozi', staffId: 'TCH/2020/001' }));
        } else if (role === 'admin') {
            setFormData(prev => ({ ...prev, username: 'admin', password: 'admin123' }));
        }
    };

    return (
        <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <Alert variant="danger" onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {/* Role Selection */}
                <Select
                    label="Login as"
                    options={roleOptions}
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                        setError('');
                        setFormData({
                            firstName: '',
                            regNumber: '',
                            staffId: '',
                            email: '',
                            password: '',
                            username: ''
                        });
                    }}
                />

                {/* Field 1 */}
                <Input
                    label={fieldConfig.field1.label}
                    type={fieldConfig.field1.type}
                    placeholder={fieldConfig.field1.placeholder}
                    value={fieldConfig.field1.value}
                    onChange={(e) => fieldConfig.field1.onChange(e.target.value)}
                    icon={
                        fieldConfig.field1.type === 'email' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )
                    }
                />

                {/* Field 2 */}
                <div className="relative">
                    <Input
                        label={fieldConfig.field2.label}
                        type={fieldConfig.field2.type === 'password' && showPassword ? 'text' : fieldConfig.field2.type}
                        placeholder={fieldConfig.field2.placeholder}
                        value={fieldConfig.field2.value}
                        onChange={(e) => fieldConfig.field2.onChange(e.target.value)}
                        icon={
                            fieldConfig.field2.type === 'password' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )
                        }
                    />
                    {fieldConfig.field2.type === 'password' && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>

                {/* Remember me & Forgot password */}
                {(role === 'parent' || role === 'admin') && (
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
                        </label>
                        <a
                            href="/forgot-password"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Forgot password?
                        </a>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Demo Credentials */}
                {(role === 'student' || role === 'teacher' || role === 'admin') && (
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-xs text-neutral-500 text-center mb-3">
                            For demo purposes, use the button below to fill credentials:
                        </p>
                        <button
                            type="button"
                            onClick={fillDemoCredentials}
                            className="w-full py-2.5 px-4 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                        >
                            Use Demo {role.charAt(0).toUpperCase() + role.slice(1)} Credentials
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
