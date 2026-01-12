import { supabase, isSupabaseConfigured } from './supabaseClient.js';

// =============================================================================
// STUDENT OPERATIONS
// =============================================================================

/**
 * Fetch all students from Supabase
 * @returns {Promise<Array>} Array of student objects
 */
export async function getStudents() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Please add credentials to .env file.');
        return [];
    }

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching students:', error);
        throw new Error(`Failed to fetch students: ${error.message}`);
    }

    return data || [];
}

/**
 * Fetch a single student by ID
 * @param {string} id - Student UUID
 * @returns {Promise<Object>} Student object
 */
export async function getStudent(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching student:', error);
        throw new Error(`Failed to fetch student: ${error.message}`);
    }

    return data;
}

/**
 * Create a new student
 * @param {Object} studentData - Student data object
 * @returns {Promise<Object>} Created student object
 */
export async function createStudent(studentData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

    if (error) {
        console.error('Error creating student:', error);
        throw new Error(`Failed to create student: ${error.message}`);
    }

    return data;
}

/**
 * Update an existing student
 * @param {string} id - Student UUID
 * @param {Object} studentData - Updated student data
 * @returns {Promise<Object>} Updated student object
 */
export async function updateStudent(id, studentData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('students')
        .update(studentData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating student:', error);
        throw new Error(`Failed to update student: ${error.message}`);
    }

    return data;
}

/**
 * Delete a student
 * @param {string} id - Student UUID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteStudent(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting student:', error);
        throw new Error(`Failed to delete student: ${error.message}`);
    }

    return true;
}

// =============================================================================
// TEACHER OPERATIONS
// =============================================================================

/**
 * Fetch all teachers from Supabase
 * @returns {Promise<Array>} Array of teacher objects
 */
export async function getTeachers() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Please add credentials to .env file.');
        return [];
    }

    const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching teachers:', error);
        throw new Error(`Failed to fetch teachers: ${error.message}`);
    }

    return data || [];
}

/**
 * Fetch a single teacher by ID
 * @param {string} id - Teacher UUID
 * @returns {Promise<Object>} Teacher object
 */
export async function getTeacher(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching teacher:', error);
        throw new Error(`Failed to fetch teacher: ${error.message}`);
    }

    return data;
}

/**
 * Create a new teacher
 * @param {Object} teacherData - Teacher data object
 * @returns {Promise<Object>} Created teacher object
 */
export async function createTeacher(teacherData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('teachers')
        .insert([teacherData])
        .select()
        .single();

    if (error) {
        console.error('Error creating teacher:', error);
        throw new Error(`Failed to create teacher: ${error.message}`);
    }

    return data;
}

/**
 * Update an existing teacher
 * @param {string} id - Teacher UUID
 * @param {Object} teacherData - Updated teacher data
 * @returns {Promise<Object>} Updated teacher object
 */
export async function updateTeacher(id, teacherData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('teachers')
        .update(teacherData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating teacher:', error);
        throw new Error(`Failed to update teacher: ${error.message}`);
    }

    return data;
}

/**
 * Delete a teacher
 * @param {string} id - Teacher UUID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteTeacher(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting teacher:', error);
        throw new Error(`Failed to delete teacher: ${error.message}`);
    }

    return true;
}

// =============================================================================
// PARENT OPERATIONS
// =============================================================================

/**
 * Fetch all parents from Supabase
 * @returns {Promise<Array>} Array of parent objects
 */
export async function getParents() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Please add credentials to .env file.');
        return [];
    }

    const { data, error } = await supabase
        .from('parents')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching parents:', error);
        throw new Error(`Failed to fetch parents: ${error.message}`);
    }

    return data || [];
}

/**
 * Create a new parent
 * @param {Object} parentData - Parent data object
 * @returns {Promise<Object>} Created parent object
 */
export async function createParent(parentData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('parents')
        .insert([parentData])
        .select()
        .single();

    if (error) {
        console.error('Error creating parent:', error);
        throw new Error(`Failed to create parent: ${error.message}`);
    }

    return data;
}

/**
 * Update an existing parent
 * @param {string} id - Parent UUID
 * @param {Object} parentData - Updated parent data
 * @returns {Promise<Object>} Updated parent object
 */
export async function updateParent(id, parentData) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
        .from('parents')
        .update(parentData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating parent:', error);
        throw new Error(`Failed to update parent: ${error.message}`);
    }

    return data;
}

/**
 * Delete a parent
 * @param {string} id - Parent UUID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteParent(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    const { error } = await supabase
        .from('parents')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting parent:', error);
        throw new Error(`Failed to delete parent: ${error.message}`);
    }

    return true;
}

// =============================================================================
// SETTINGS OPERATIONS
// =============================================================================

/**
 * Fetch all settings from Supabase
 * @returns {Promise<Object>} Settings object with key-value pairs
 */
export async function getSettings() {
    if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured. Please add credentials to .env file.');
        return {};
    }

    const { data, error } = await supabase
        .from('settings')
        .select('*');

    if (error) {
        console.error('Error fetching settings:', error);
        throw new Error(`Failed to fetch settings: ${error.message}`);
    }

    // Convert array to object with key-value pairs
    const settingsObj = {};
    data.forEach(setting => {
        try {
            // Parse JSONB value
            settingsObj[setting.key] = typeof setting.value === 'string'
                ? JSON.parse(setting.value)
                : setting.value;
        } catch (e) {
            settingsObj[setting.key] = setting.value;
        }
    });

    return settingsObj;
}

/**
 * Update a setting value
 * @param {string} key - Setting key
 * @param {any} value - New value (will be JSON stringified)
 * @returns {Promise<Object>} Updated setting
 */
export async function updateSetting(key, value) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    // Convert value to JSONB
    const jsonValue = JSON.stringify(value);

    const { data, error } = await supabase
        .from('settings')
        .update({ value: jsonValue })
        .eq('key', key)
        .select()
        .single();

    if (error) {
        console.error('Error updating setting:', error);
        throw new Error(`Failed to update setting: ${error.message}`);
    }

    return data;
}

/**
 * Update multiple settings at once
 * @param {Object} settings - Object with key-value pairs to update
 * @returns {Promise<boolean>} Success status
 */
export async function updateSettings(settings) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
    }

    try {
        // Update each setting
        const updates = Object.entries(settings).map(([key, value]) =>
            updateSetting(key, value)
        );

        await Promise.all(updates);
        return true;
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
}
