import React, { useState } from 'react';

export default function Topbar({ userName, userAvatar, role }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "New announcement posted", time: "5 min ago", unread: true },
        { id: 2, text: "Results have been published", time: "1 hour ago", unread: true },
        { id: 3, text: "Fee payment reminder", time: "2 hours ago", unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const toggleTheme = () => {
        if (typeof window !== 'undefined' && window.toggleTheme) {
            window.toggleTheme();
        }
    };

    const toggleSidebar = () => {
        if (typeof window !== 'undefined' && window.toggleSidebar) {
            window.toggleSidebar();
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-30 h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between h-full px-4 md:px-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Page title - hidden on mobile */}
                    <div className="hidden md:block">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white capitalize">
                            {role} Dashboard
                        </h2>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Search button - desktop only */}
                    <button className="hidden md:flex p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                        title="Toggle theme"
                    >
                        {/* Sun icon for dark mode */}
                        <svg className="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {/* Moon icon for light mode */}
                        <svg className="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="dropdown-menu w-80 right-0">
                                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                                    <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer ${notification.unread ? 'bg-primary-50/50 dark:bg-primary-950/20' : ''}`}
                                        >
                                            <p className="text-sm text-neutral-900 dark:text-neutral-100">{notification.text}</p>
                                            <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-neutral-200 dark:border-neutral-700">
                                    <a href={`/${role}/announcements`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        View all notifications
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-8 h-8 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-medium">
                                    {getInitials(userName)}
                                </div>
                            )}
                            <span className="hidden md:block text-sm font-medium text-neutral-900 dark:text-white">
                                {userName}
                            </span>
                            <svg className="hidden md:block w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* User dropdown */}
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
                                    <p className="font-medium text-neutral-900 dark:text-white">{userName}</p>
                                    <p className="text-xs text-neutral-500 capitalize">{role}</p>
                                </div>
                                <div className="py-2">
                                    <a href={`/${role}/profile`} className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile Settings
                                    </a>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            localStorage.removeItem('role');
                                            window.location.href = '/login';
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {(showDropdown || showNotifications) && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => {
                        setShowDropdown(false);
                        setShowNotifications(false);
                    }}
                />
            )}
        </header>
    );
}
