
-- Enable Row Level Security on the analyses table
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Add a policy to allow users to view their own analyses
CREATE POLICY "Users can view their own analyses"
ON public.analyses
FOR SELECT
USING (auth.uid() = user_id);

-- Add a policy to allow users to create their own analyses
CREATE POLICY "Users can create their own analyses"
ON public.analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add a policy to allow users to update their own analyses
CREATE POLICY "Users can update their own analyses"
ON public.analyses
FOR UPDATE
USING (auth.uid() = user_id);

-- Add a policy to allow users to delete their own analyses
CREATE POLICY "Users can delete their own analyses"
ON public.analyses
FOR DELETE
USING (auth.uid() = user_id);
