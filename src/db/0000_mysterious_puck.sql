-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."token_category" AS ENUM('primitive', 'semantic', 'component');--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"is_private" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "design_tokens" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" serial NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"category" "token_category" NOT NULL,
	"group_name" text NOT NULL,
	"alias_of" uuid,
	"value" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "design_tokens_project_id_name_key" UNIQUE("project_id","name")
);
--> statement-breakpoint
ALTER TABLE "design_tokens" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_tokens" ADD CONSTRAINT "design_tokens_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_tokens" ADD CONSTRAINT "design_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_tokens" ADD CONSTRAINT "design_tokens_alias_of_fkey" FOREIGN KEY ("alias_of") REFERENCES "public"."design_tokens"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier" text_ops);--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE POLICY "select own projects" ON "projects" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own projects" ON "projects" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "delete own projects" ON "projects" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
CREATE POLICY "update own projects" ON "projects" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "update own design tokens" ON "design_tokens" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "delete own design tokens" ON "design_tokens" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
CREATE POLICY "insert own design tokens" ON "design_tokens" AS PERMISSIVE FOR INSERT TO public;
*/