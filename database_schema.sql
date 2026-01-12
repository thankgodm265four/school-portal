-- School Portal Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/YOUR_PROJECT/sql

-- =============================================================================
-- STUDENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reg_number VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(10),
    date_of_birth DATE,
    class VARCHAR(50) NOT NULL,
    arm VARCHAR(50) NOT NULL,
    parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
    avatar TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    enrollment_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TEACHERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(10),
    subjects TEXT[], -- Array of subjects
    classes TEXT[], -- Array of classes
    avatar TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    qualification VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- PARENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(20),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    occupation VARCHAR(200),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
    BEFORE UPDATE ON teachers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_parents_updated_at ON parents;
CREATE TRIGGER update_parents_updated_at
    BEFORE UPDATE ON parents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Note: For development, we'll allow all operations. 
-- In production, you should restrict based on user roles and authentication.

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (you can refine these later based on your auth setup)
CREATE POLICY "Allow all operations on students" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on teachers" ON teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on parents" ON parents FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================================================
-- Uncomment these if you want some initial test data

/*
INSERT INTO parents (id, title, first_name, last_name, email, phone, occupation, address) VALUES
('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', 'Chief', 'Obiora', 'Okonkwo', 'obiora.okonkwo@email.com', '+234 805 678 9012', 'Business Executive', '45 Marina Road, Lagos');

INSERT INTO students (reg_number, first_name, last_name, email, phone, gender, date_of_birth, class, arm, parent_id, status) VALUES
('USS/2024/001', 'Adaeze', 'Okonkwo', 'adaeze.o@student.unityschool.edu.ng', '+234 801 234 5678', 'Female', '2010-03-15', 'SS 2', 'Science', 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', 'Active');

INSERT INTO teachers (staff_id, first_name, last_name, email, phone, gender, subjects, classes, qualification, status) VALUES
('TCH/2020/001', 'Ngozi', 'Eze', 'ngozi.eze@unityschool.edu.ng', '+234 802 345 6789', 'Female', ARRAY['Physics', 'Mathematics'], ARRAY['SS 1 Science', 'SS 2 Science', 'SS 3 Science'], 'Ph.D Physics', 'Active');
*/
