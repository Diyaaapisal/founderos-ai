-- Run this in your Supabase SQL Editor to add Audit IDs to your schema

ALTER TABLE public.expenses 
ADD COLUMN audit_id TEXT;

ALTER TABLE public.settlements 
ADD COLUMN audit_id TEXT;
