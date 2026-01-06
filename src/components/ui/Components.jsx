import React from 'react';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        danger: 'btn-danger',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span>{icon}</span>}
                    {children}
                    {icon && iconPosition === 'right' && <span>{icon}</span>}
                </>
            )}
        </button>
    );
}

export function Input({
    label,
    error,
    icon,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && <label className="label">{label}</label>}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        {icon}
                    </span>
                )}
                <input
                    className={`input ${icon ? 'pl-10' : ''} ${error ? 'border-danger-500 focus:ring-danger-500' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
        </div>
    );
}

export function Select({
    label,
    options = [],
    error,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && <label className="label">{label}</label>}
            <select
                className={`input appearance-none cursor-pointer ${error ? 'border-danger-500 focus:ring-danger-500' : ''} ${className}`}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
        </div>
    );
}

export function Textarea({
    label,
    error,
    rows = 4,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && <label className="label">{label}</label>}
            <textarea
                rows={rows}
                className={`input resize-none ${error ? 'border-danger-500 focus:ring-danger-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
        </div>
    );
}

export function Card({
    children,
    title,
    subtitle,
    action,
    padding = true,
    hover = false,
    className = '',
    ...props
}) {
    return (
        <div
            className={`card ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
            {...props}
        >
            {(title || action) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div>
                        {title && <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>}
                        {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            <div className={padding ? 'p-6' : ''}>
                {children}
            </div>
        </div>
    );
}

export function Badge({
    children,
    variant = 'info',
    className = '',
}) {
    const variants = {
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        info: 'badge-info',
    };

    return (
        <span className={`${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}

export function Avatar({
    src,
    name,
    size = 'md',
    className = '',
}) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`${sizes[size]} rounded-xl object-cover ${className}`}
            />
        );
    }

    return (
        <div className={`${sizes[size]} rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium ${className}`}>
            {getInitials(name)}
        </div>
    );
}

export function Alert({
    children,
    variant = 'info',
    title,
    onClose,
    className = '',
}) {
    const variants = {
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger',
        info: 'alert-info',
    };

    const icons = {
        success: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        danger: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div className={`${variants[variant]} ${className}`}>
            {icons[variant]}
            <div className="flex-1">
                {title && <p className="font-semibold mb-1">{title}</p>}
                {children}
            </div>
            {onClose && (
                <button onClick={onClose} className="flex-shrink-0 opacity-70 hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export function LoadingSkeleton({
    className = '',
    variant = 'text',
}) {
    const variants = {
        text: 'h-4 w-full',
        title: 'h-6 w-3/4',
        avatar: 'h-10 w-10 rounded-xl',
        card: 'h-32 w-full rounded-2xl',
        button: 'h-10 w-24 rounded-xl',
    };

    return (
        <div className={`skeleton ${variants[variant]} ${className}`} />
    );
}

export function EmptyState({
    title = "No data found",
    description = "There's nothing to display here yet.",
    icon,
    action,
}) {
    return (
        <div className="empty-state">
            {icon ? (
                <div className="empty-state-icon">{icon}</div>
            ) : (
                <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            )}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">{description}</p>
            {action}
        </div>
    );
}

export function Stat({
    label,
    value,
    icon,
    trend,
    trendValue,
    iconBg = 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
}) {
    return (
        <div className="stat-card">
            <div className={`stat-icon ${iconBg}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
                {trend && (
                    <p className={`text-xs mt-1 ${trend === 'up' ? 'text-success-500' : 'text-danger-500'}`}>
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </p>
                )}
            </div>
        </div>
    );
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className = '',
}) {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Panel */}
            <div className={`relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full ${sizes[size]} ${className} animate-scale-up`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary',
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {message}
            </p>
            <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant={variant} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}

import Tilt from 'react-parallax-tilt';

export function TiltCard({ children, className = '', ...props }) {
    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            scale={1.02}
            transitionSpeed={1000}
            className={`h-full ${className}`}
        >
            <div className={`h-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`} {...props}>
                {children}
            </div>
        </Tilt>
    );
}
