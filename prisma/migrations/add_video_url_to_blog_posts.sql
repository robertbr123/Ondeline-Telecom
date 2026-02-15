-- Migration: Add video_url column to blog_posts table
-- Date: 2025-02-15
-- Description: Adds support for video content in blog posts

-- Check if column exists before adding (for compatibility)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='blog_posts' 
        AND column_name='video_url'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN video_url TEXT DEFAULT '';
    END IF;
END $$;

-- Add index for better performance if needed
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

COMMENT ON COLUMN blog_posts.video_url IS 'URL do vídeo associado ao post do blog (opcional)';