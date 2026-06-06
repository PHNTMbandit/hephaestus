CREATE TABLE "colour_palettes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"data_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "colour_palettes_user_id_name_key" UNIQUE("user_id","name")
);
--> statement-breakpoint
ALTER TABLE "colour_palettes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "design_systems" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"colour_palette_id" uuid,
	"typography_board_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "design_systems_user_id_name_key" UNIQUE("user_id","name")
);
--> statement-breakpoint
ALTER TABLE "design_systems" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "typography_boards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"data_json" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "typography_boards_user_id_name_key" UNIQUE("user_id","name")
);
--> statement-breakpoint
ALTER TABLE "typography_boards" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY "update own design tokens" ON "design_tokens" CASCADE;--> statement-breakpoint
DROP POLICY "delete own design tokens" ON "design_tokens" CASCADE;--> statement-breakpoint
DROP POLICY "insert own design tokens" ON "design_tokens" CASCADE;--> statement-breakpoint
DROP TABLE "design_tokens" CASCADE;--> statement-breakpoint
DROP POLICY "select own projects" ON "projects" CASCADE;--> statement-breakpoint
DROP POLICY "insert own projects" ON "projects" CASCADE;--> statement-breakpoint
DROP POLICY "delete own projects" ON "projects" CASCADE;--> statement-breakpoint
DROP POLICY "update own projects" ON "projects" CASCADE;--> statement-breakpoint
DROP TABLE "projects" CASCADE;--> statement-breakpoint
ALTER TABLE "colour_palettes" ADD CONSTRAINT "colour_palettes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_systems" ADD CONSTRAINT "design_systems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_systems" ADD CONSTRAINT "design_systems_colour_palette_id_fkey" FOREIGN KEY ("colour_palette_id") REFERENCES "public"."colour_palettes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_systems" ADD CONSTRAINT "design_systems_typography_board_id_fkey" FOREIGN KEY ("typography_board_id") REFERENCES "public"."typography_boards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "typography_boards" ADD CONSTRAINT "typography_boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "colour_palettes_user_id_idx" ON "colour_palettes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "design_systems_user_id_idx" ON "design_systems" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "typography_boards_user_id_idx" ON "typography_boards" USING btree ("user_id");--> statement-breakpoint
CREATE POLICY "select own colour palettes" ON "colour_palettes" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own colour palettes" ON "colour_palettes" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "update own colour palettes" ON "colour_palettes" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "delete own colour palettes" ON "colour_palettes" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
CREATE POLICY "select own design systems" ON "design_systems" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own design systems" ON "design_systems" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "update own design systems" ON "design_systems" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "delete own design systems" ON "design_systems" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
CREATE POLICY "select own typography boards" ON "typography_boards" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own typography boards" ON "typography_boards" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "update own typography boards" ON "typography_boards" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "delete own typography boards" ON "typography_boards" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
DROP TYPE "public"."token_category";