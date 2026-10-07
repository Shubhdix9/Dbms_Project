-- ==============================================================================================
-- UNINEST SUPABASE AUTHENTICATION MIGRATION
-- Run this in your Supabase SQL Editor
-- ==============================================================================================

-- 1. Add auth_user_id to core tables
ALTER TABLE STUDENT ADD COLUMN auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE LANDLORD ADD COLUMN auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Create the Trigger Function to automatically link profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'role' = 'student' THEN
    INSERT INTO public.student (
      auth_user_id, 
      name, 
      college_name, 
      college_email, 
      phone, 
      course, 
      year, 
      gender, 
      verification_status
    )
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'college_name',
      NEW.email,
      NEW.raw_user_meta_data->>'phone',
      NEW.raw_user_meta_data->>'course',
      COALESCE((NEW.raw_user_meta_data->>'year')::int, 1),
      COALESCE(NEW.raw_user_meta_data->>'gender', 'MALE'),
      'PENDING'
    );
  ELSIF NEW.raw_user_meta_data->>'role' = 'landlord' THEN
    INSERT INTO public.landlord (
      auth_user_id, 
      name, 
      phone, 
      email, 
      verification_status
    )
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'phone',
      NEW.email,
      'PENDING'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach the trigger to the auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. ENABLE RLS
ALTER TABLE STUDENT ENABLE ROW LEVEL SECURITY;
ALTER TABLE LANDLORD ENABLE ROW LEVEL SECURITY;
ALTER TABLE PROPERTY ENABLE ROW LEVEL SECURITY;
ALTER TABLE STUDENT_PREFERENCE ENABLE ROW LEVEL SECURITY;
ALTER TABLE ROOMMATE_MATCH ENABLE ROW LEVEL SECURITY;
ALTER TABLE BOOKING ENABLE ROW LEVEL SECURITY;
ALTER TABLE LEASE ENABLE ROW LEVEL SECURITY;
ALTER TABLE REVIEW ENABLE ROW LEVEL SECURITY;

-- 5. Basic Policies

-- Student Policies
CREATE POLICY "Students can view their own profile" 
ON STUDENT FOR SELECT 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Students can update their own profile" 
ON STUDENT FOR UPDATE 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Anyone can view properties" 
ON PROPERTY FOR SELECT 
TO public
USING (true);

-- Landlord Policies
CREATE POLICY "Landlords can view their own profile" 
ON LANDLORD FOR SELECT 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Landlords can update their own profile" 
ON LANDLORD FOR UPDATE 
USING (auth.uid() = auth_user_id);

CREATE POLICY "Landlords can manage their own properties" 
ON PROPERTY FOR ALL 
USING (
  landlord_id IN (
    SELECT landlord_id FROM LANDLORD WHERE auth_user_id = auth.uid()
  )
);

-- Note: In a production app, you would add many more granular policies for matches, bookings, and leases.
