# Supabase Setup Guide

Follow these steps to complete the Supabase integration for your school portal.

## Step 1: Create a Supabase Account and Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (or log in if you already have one)
3. Click "New Project"
4. Fill in the project details:
   - **Project Name**: School Portal (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to you
5. Click "Create new project" and wait for it to initialize (takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. Once your project is ready, go to **Settings** → **API** (in the left sidebar)
2. You'll see two important values:
   - **Project URL** - looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key** - a long string starting with `eyJ...`
3. Copy these values - you'll need them in the next step

## Step 3: Configure Environment Variables

1. Open the file `.env` in your project root
2. Replace the placeholder values with your actual credentials:

```env
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

3. Save the file

> **Important**: The `.env` file is already in your `.gitignore`, so your credentials won't be committed to Git.

## Step 4: Create the Database Tables

1. In your Supabase project dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `database_schema.sql` in your project root
4. Copy **all** the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see a success message. This creates:
   - `students` table
   - `teachers` table
   - `parents` table
   - Proper indexes and triggers
   - Row Level Security policies

## Step 5: Verify the Setup

1. In Supabase, click **Table Editor** in the left sidebar
2. You should see three new tables: `students`, `teachers`, and `parents`
3. Initially, they will be empty

## Step 6: Run the Development Server

```powershell
npm run dev
```

Wait for the message "Server ready" and then open your browser to the URL shown (usually http://localhost:4321).

## Step 7: Test the Integration

1. Navigate to `/admin/users` in your browser
2. The page should load (initially with no data)
3. Click "Add New Student" button
4. Fill in the form:
   - First Name: Test
   - Last Name: Student
   - Email: test@example.com
   - Phone: +234 800 000 0000
   - Class: SS 1
   - Arm: Science
5. Click "Save Changes"
6. The student should appear in the table
7. Check your Supabase dashboard → Table Editor → students to confirm the data was saved

## Troubleshooting

### "Failed to fetch data. Please check your Supabase configuration"

- Double-check your `.env` file has the correct credentials
- Make sure you copied the **full** URL and anon key (they're long!)
- Restart your development server after editing `.env`

### "Failed to create student: [some error]"

- Make sure you ran the SQL schema in Supabase (Step 4)
- Check that all three tables exist in the Table Editor
- Verify the RLS policies were created (Settings → Policies)

### Tables are missing in Supabase

- Go back to Step 4 and run the SQL schema again
- Make sure you copied the complete SQL file

## Next Steps

Once everything is working:

1. **Add more test data** - Create a few students and teachers to test the system
2. **Test editing** - Click the edit button and modify a record
3. **Test deleting** - Click the delete button to remove a test record
4. **Optional: Add sample data** - Uncomment the sample data at the bottom of `database_schema.sql` and run it in Supabase SQL Editor

## Need Help?

If you encounter any issues, you can:
1. Check the browser console (F12) for error messages
2. Check the Supabase logs (Logs & Analytics section)
3. Verify your environment variables are loaded correctly
