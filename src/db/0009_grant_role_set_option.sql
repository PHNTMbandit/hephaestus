-- Custom SQL migration file, put your code below! --

-- 0008 created the `authenticated`/`anonymous` roles, but in PostgreSQL 16+ a
-- CREATE ROLE grant carries set_option=false, so the app's connecting role cannot
-- `SET ROLE` into them (runtime: "permission denied to set role"). Grant the SET
-- privilege to the role that runs migrations, which is the same role the app
-- connects as at runtime. Idempotent: re-granting only updates the option.
GRANT "authenticated" TO CURRENT_USER WITH SET TRUE;--> statement-breakpoint
GRANT "anonymous" TO CURRENT_USER WITH SET TRUE;