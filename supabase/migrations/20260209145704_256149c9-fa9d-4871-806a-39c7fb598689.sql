
-- Create guest_codes table for tarot party reveal
CREATE TABLE public.guest_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  card_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  missions TEXT[] NOT NULL DEFAULT '{}',
  card_suit TEXT NOT NULL DEFAULT 'hearts',
  card_color TEXT NOT NULL DEFAULT '#e74c3c',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read for code lookup, no write from client)
ALTER TABLE public.guest_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (guests don't need auth to look up their code)
CREATE POLICY "Anyone can look up guest codes"
  ON public.guest_codes
  FOR SELECT
  USING (true);
