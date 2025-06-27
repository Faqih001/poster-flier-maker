
-- Create subscriptions table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'subscriptions') THEN
        CREATE TABLE public.subscriptions (
          id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
          plan_type TEXT NOT NULL CHECK (plan_type IN ('pay_per_design', 'monthly_unlimited')),
          status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          expires_at TIMESTAMP WITH TIME ZONE,
          designs_remaining INTEGER DEFAULT NULL
        );
    END IF;
END $$;

-- Enable RLS on subscriptions if not already enabled
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions (will be created only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscriptions' AND policyname = 'Users can view own subscriptions') THEN
        CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscriptions' AND policyname = 'Users can insert own subscriptions') THEN
        CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Enable RLS on designs if not already enabled
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;

-- Create missing policies for designs
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'designs' AND policyname = 'Users can view own designs') THEN
        CREATE POLICY "Users can view own designs" ON public.designs
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'designs' AND policyname = 'Users can insert own designs') THEN
        CREATE POLICY "Users can insert own designs" ON public.designs
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'designs' AND policyname = 'Users can update own designs') THEN
        CREATE POLICY "Users can update own designs" ON public.designs
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'designs' AND policyname = 'Users can delete own designs') THEN
        CREATE POLICY "Users can delete own designs" ON public.designs
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Enable RLS on profiles if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create missing policies for profiles
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
        CREATE POLICY "Users can view own profile" ON public.profiles
          FOR SELECT USING (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
        CREATE POLICY "Users can insert own profile" ON public.profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON public.profiles
          FOR UPDATE USING (auth.uid() = id);
    END IF;
END $$;

-- Create or replace the function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;
