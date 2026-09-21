-- FounderOS AI Supabase Schema
-- Run this in your Supabase SQL Editor

-- Create Groups Table
CREATE TABLE public.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    members JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Expenses Table
CREATE TABLE public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paid_by TEXT NOT NULL,
    splits JSONB NOT NULL DEFAULT '[]'::jsonb,
    category TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_voice_logged BOOLEAN DEFAULT false,
    ocr_data JSONB
);

-- Create Settlements Table
CREATE TABLE public.settlements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    payer TEXT NOT NULL,
    payee TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed')),
    upi_tx_id TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

-- Note: For a real production app, you would want to tie RLS to auth.uid()
-- For this prototype, we'll allow all access for demonstration purposes
CREATE POLICY "Enable read access for all users" ON public.groups FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.groups FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.groups FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.expenses FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.expenses FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.settlements FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.settlements FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.settlements FOR UPDATE USING (true);
