CREATE TABLE "color_palette_saves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"color_palette_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "color_palette_saves_user_id_palette_id_key" UNIQUE("user_id","color_palette_id")
);
--> statement-breakpoint
ALTER TABLE "color_palette_saves" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "typography_board_saves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"typography_board_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "typography_board_saves_user_id_board_id_key" UNIQUE("user_id","typography_board_id")
);
--> statement-breakpoint
ALTER TABLE "typography_board_saves" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "color_palette_saves" ADD CONSTRAINT "color_palette_saves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "color_palette_saves" ADD CONSTRAINT "color_palette_saves_palette_id_fkey" FOREIGN KEY ("color_palette_id") REFERENCES "public"."color_palettes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "typography_board_saves" ADD CONSTRAINT "typography_board_saves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "typography_board_saves" ADD CONSTRAINT "typography_board_saves_board_id_fkey" FOREIGN KEY ("typography_board_id") REFERENCES "public"."typography_boards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "color_palette_saves_palette_id_idx" ON "color_palette_saves" USING btree ("color_palette_id");--> statement-breakpoint
CREATE INDEX "typography_board_saves_board_id_idx" ON "typography_board_saves" USING btree ("typography_board_id");--> statement-breakpoint
ALTER TABLE "color_palettes" DROP COLUMN "likes";--> statement-breakpoint
CREATE POLICY "select saves" ON "color_palette_saves" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own saves" ON "color_palette_saves" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "delete own saves" ON "color_palette_saves" AS PERMISSIVE FOR DELETE TO public;--> statement-breakpoint
CREATE POLICY "select saves" ON "typography_board_saves" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "insert own saves" ON "typography_board_saves" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "delete own saves" ON "typography_board_saves" AS PERMISSIVE FOR DELETE TO public;