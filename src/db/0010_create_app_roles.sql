-- Custom SQL migration file, put your code below! --

-- Create the three application RLS roles. Idempotent: `anonymous`/`authenticated`
-- may already exist from 0008. These are SET ROLE targets (NOLOGIN); the app keeps
-- connecting via DATABASE_URL and switches into them per transaction.
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anonymous') THEN CREATE ROLE anonymous NOLOGIN; END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN CREATE ROLE admin NOLOGIN; END IF;
END $$;--> statement-breakpoint

-- Let the connecting role SET ROLE into each (PG16 CREATE ROLE defaults set_option=false).
GRANT anonymous TO CURRENT_USER WITH SET TRUE;--> statement-breakpoint
GRANT authenticated TO CURRENT_USER WITH SET TRUE;--> statement-breakpoint
GRANT admin TO CURRENT_USER WITH SET TRUE;--> statement-breakpoint

-- Schema + table privileges. RLS policies still constrain which rows each role sees/writes.
GRANT USAGE ON SCHEMA public TO anonymous, authenticated, admin;--> statement-breakpoint
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anonymous;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated, admin;--> statement-breakpoint

-- Same privileges for future tables created by the migration role.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anonymous;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated, admin;