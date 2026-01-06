import React, { useState } from 'react';
import { Button, Input, Select, Alert } from '../ui/Components';

// Demo credentials for testing
const demoUsers = {
    student: { email: 'student@demo.com', password: 'demo123', name: 'Adaeze Okonkwo' },
    teacher: { email: 'teacher@demo.com', password: 'demo123', name: 'Dr. Ngozi Eze' },
    parent: { email: 'parent@demo.com', password: 'demo123', name: 'Chief Obiora Okonkwo' },
    admin: { email: 'admin@demo.com', password: 'demo123', name: 'Admin User' },
};

export default function LoginForm() {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo login logic - accepts demo credentials or any input for testing
        const demoUser = demoUsers[role];

        if (email === demoUser.email && password === demoUser.password) {
            // Store user info
            localStorage.setItem('user', JSON.stringify({
                role,
                name: demoUser.name,
                email: demoUser.email,
            }));
            localStorage.setItem('role', role);

            // Redirect to dashboard
            window.location.href = `/${role}`;
        } else if (email && password) {
            // For demo purposes, allow any login
            localStorage.setItem('user', JSON.stringify({
                role,
                name: role === 'student' ? 'Demo Student' :
                    role === 'teacher' ? 'Demo Teacher' :
                        role === 'parent' ? 'Demo Parent' : 'Demo Admin',
                email,
            }));
            localStorage.setItem('role', role);
            window.location.href = `/${role}`;
        } else {
            setError('Please enter your email and password');
            setLoading(false);
        }
    };

    const fillDemoCredentials = () => {
        const demoUser = demoUsers[role];
        setEmail(demoUser.email);
        setPassword(demoUser.password);
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
                    onChange={(e) => setRole(e.target.value)}
                />

                {/* Email */}
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    }
                />

                {/* Password */}
                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                    />
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
                </div>

                {/* Remember me & Forgot password */}
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
            </form>
        </div>
    );
}
