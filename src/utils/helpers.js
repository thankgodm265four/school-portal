// Utility functions for the African School Portal

import { gradingSystem } from '../data/mockData';

/**
 * Calculate grade based on score using WAEC/NECO grading system
 * @param {number} score - The total score (0-100)
 * @returns {object} - Grade object with grade, points, and remark
 */
export function calculateGrade(score) {
    const grades = gradingSystem.grades;
    for (const gradeInfo of grades) {
        if (score >= gradeInfo.minScore && score <= gradeInfo.maxScore) {
            return {
                grade: gradeInfo.grade,
                points: gradeInfo.points,
                remark: gradeInfo.remark,
            };
        }
    }
    return { grade: 'F9', points: 9, remark: 'Fail' };
}

/**
 * Calculate total score from CA and Exam
 * @param {number} ca1 - First Continuous Assessment (max 20)
 * @param {number} ca2 - Second Continuous Assessment (max 20)
 * @param {number} exam - Examination score (max 60)
 * @returns {number} - Total score
 */
export function calculateTotalScore(ca1, ca2, exam) {
    return Math.min(ca1, 20) + Math.min(ca2, 20) + Math.min(exam, 60);
}

/**
 * Calculate class average
 * @param {Array<number>} scores - Array of student scores
 * @returns {number} - Average score rounded to 2 decimal places
 */
export function calculateAverage(scores) {
    if (!scores || scores.length === 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round((sum / scores.length) * 100) / 100;
}

/**
 * Format currency in Nigerian Naira
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @param {string} format - Format type: 'short', 'long', 'relative'
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString, format = 'short') {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (format === 'short') {
        return date.toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    if (format === 'long') {
        return date.toLocaleDateString('en-NG', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    if (format === 'relative') {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
    }

    return dateString;
}

/**
 * Get initials from name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} - Initials (e.g., "AO")
 */
export function getInitials(firstName, lastName) {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
}

/**
 * Get grade color class based on grade
 * @param {string} grade - Grade (e.g., "A1", "B2", "F9")
 * @returns {string} - Tailwind color class
 */
export function getGradeColor(grade) {
    if (!grade) return 'text-neutral-500';

    const letter = grade.charAt(0).toUpperCase();

    switch (letter) {
        case 'A':
            return 'grade-a';
        case 'B':
            return 'grade-b';
        case 'C':
            return 'grade-c';
        case 'D':
            return 'grade-d';
        case 'E':
            return 'grade-e';
        case 'F':
            return 'grade-f';
        default:
            return 'text-neutral-500';
    }
}

/**
 * Get fee status badge class
 * @param {string} status - Payment status ('Paid', 'Partial', 'Unpaid')
 * @returns {string} - Badge class
 */
export function getFeeStatusBadge(status) {
    switch (status?.toLowerCase()) {
        case 'paid':
            return 'badge-success';
        case 'partial':
            return 'badge-warning';
        case 'unpaid':
            return 'badge-danger';
        default:
            return 'badge-info';
    }
}

/**
 * Calculate fee payment percentage
 * @param {number} paid - Amount paid
 * @param {number} total - Total amount due
 * @returns {number} - Percentage (0-100)
 */
export function calculatePaymentPercentage(paid, total) {
    if (!total || total === 0) return 0;
    return Math.round((paid / total) * 100);
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get priority badge class
 * @param {string} priority - Priority level ('high', 'normal', 'low')
 * @returns {string} - Badge class
 */
export function getPriorityBadge(priority) {
    switch (priority?.toLowerCase()) {
        case 'high':
            return 'badge-danger';
        case 'normal':
            return 'badge-info';
        case 'low':
            return 'badge-success';
        default:
            return 'badge-info';
    }
}

/**
 * Generate ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 * @param {number} num - Number to format
 * @returns {string} - Number with ordinal suffix
 */
export function getOrdinal(num) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Calculate position suffix
 * @param {number} position - Class position
 * @returns {string} - Position with ordinal
 */
export function formatPosition(position) {
    return getOrdinal(position);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Generate a random color for avatars
 * @param {string} name - Name to generate color from
 * @returns {string} - HSL color string
 */
export function generateAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 65%, 50%)`;
}

/**
 * Group items by a key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} - Grouped object
 */
export function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Sort students by position
 * @param {Array} students - Array of students with scores
 * @returns {Array} - Sorted array with positions
 */
export function rankStudents(students) {
    const sorted = [...students].sort((a, b) => b.average - a.average);
    return sorted.map((student, index) => ({
        ...student,
        position: index + 1,
    }));
}

/**
 * Check if a date is in the current term
 * @param {string} dateString - Date to check
 * @param {Object} term - Term object with startDate and endDate
 * @returns {boolean}
 */
export function isInCurrentTerm(dateString, term) {
    const date = new Date(dateString);
    const start = new Date(term.startDate);
    const end = new Date(term.endDate);
    return date >= start && date <= end;
}

/**
 * Local storage helpers for auth simulation
 */
export const storage = {
    get: (key) => {
        if (typeof window === 'undefined') return null;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    },

    set: (key, value) => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.error('Error saving to localStorage');
        }
    },

    remove: (key) => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch {
            console.error('Error removing from localStorage');
        }
    },
};
