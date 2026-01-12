// Authentication utility for managing user sessions
// Handles login, logout, and session persistence

/**
 * Store user session in localStorage
 * @param {Object} user - User object with id, name, email, etc.
 * @param {string} role - User role: 'student', 'teacher', 'parent', or 'admin'
 */
export function login(user, role) {
    const session = {
        user,
        role,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('school_portal_session', JSON.stringify(session));
    localStorage.setItem('school_portal_role', role);
}

/**
 * Clear user session from localStorage
 */
export function logout() {
    localStorage.removeItem('school_portal_session');
    localStorage.removeItem('school_portal_role');
}

/**
 * Get current logged-in user
 * @returns {Object|null} User object or null if not logged in
 */
export function getCurrentUser() {
    const sessionData = localStorage.getItem('school_portal_session');

    if (!sessionData) {
        return null;
    }

    try {
        const session = JSON.parse(sessionData);
        return session.user;
    } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
    }
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export function isAuthenticated() {
    return localStorage.getItem('school_portal_session') !== null;
}

/**
 * Get current user's role
 * @returns {string|null} Role string or null if not logged in
 */
export function getUserRole() {
    return localStorage.getItem('school_portal_role');
}

/**
 * Get full session data
 * @returns {Object|null} Session object or null
 */
export function getSession() {
    const sessionData = localStorage.getItem('school_portal_session');

    if (!sessionData) {
        return null;
    }

    try {
        return JSON.parse(sessionData);
    } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
    }
}

/**
 * Check if current user has specific role
 * @param {string} requiredRole - Role to check
 * @returns {boolean} True if user has the required role
 */
export function hasRole(requiredRole) {
    const role = getUserRole();
    return role === requiredRole;
}

/**
 * Redirect to login page if not authenticated
 * @param {string} currentPath - Current page path for redirect after login
 */
export function requireAuth(currentPath = '/') {
    if (!isAuthenticated()) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

/**
 * Redirect to appropriate dashboard based on role
 */
export function redirectToDashboard() {
    const role = getUserRole();

    const dashboardRoutes = {
        'student': '/student',
        'teacher': '/teacher',
        'parent': '/parent',
        'admin': '/admin'
    };

    const route = dashboardRoutes[role] || '/login';
    window.location.href = route;
}
