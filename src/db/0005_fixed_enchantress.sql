CREATE TYPE "public"."palette_visibility" AS ENUM('public', 'unlisted', 'private');--> statement-breakpoint
ALTER TABLE "color_palettes" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "color_palettes" ADD COLUMN "visibility" "palette_visibility" DEFAULT 'private' NOT NULL;