ALTER TABLE "color_palettes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "color_palettes" ALTER COLUMN "colors" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "color_palettes" ADD COLUMN "base_color" text NOT NULL;--> statement-breakpoint
DROP POLICY "delete own color palettes" ON "color_palettes" CASCADE;--> statement-breakpoint
DROP POLICY "update own color palettes" ON "color_palettes" CASCADE;--> statement-breakpoint
DROP POLICY "insert own color palettes" ON "color_palettes" CASCADE;--> statement-breakpoint
DROP POLICY "select own color palettes" ON "color_palettes" CASCADE;