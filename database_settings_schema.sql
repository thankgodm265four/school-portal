-- Settings table for school portal configuration
-- Run this in Supabase SQL Editor to add settings functionality

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value, category, description) VALUES
('school_name', '"Unity Secondary School"', 'school_info', 'Official school name'),
('school_motto', '"Knowledge, Integrity, Excellence"', 'school_info', 'School motto'),
('school_address', '"23 Education Avenue, Victoria Island, Lagos, Nigeria"', 'school_info', 'School physical address'),
('school_phone', '"+234 801 234 5678"', 'school_info', 'School contact phone'),
('school_email', '"info@unityschool.edu.ng"', 'school_info', 'School contact email'),
('current_session', '"2025/2026"', 'academic', 'Current academic session'),
('current_term', '"First Term"', 'academic', 'Current academic term'),
('term_start_date', '"2025-09-09"', 'academic', 'Current term start date'),
('term_end_date', '"2025-12-15"', 'academic', 'Current term end date'),
('email_notifications', 'true', 'system', 'Enable email notifications'),
('sms_notifications', 'false', 'system', 'Enable SMS notifications'),
('auto_backup', 'true', 'system', 'Enable automatic backups'),
('maintenance_mode', 'false', 'system', 'Enable maintenance mode')
ON CONFLICT (key) DO NOTHING;
