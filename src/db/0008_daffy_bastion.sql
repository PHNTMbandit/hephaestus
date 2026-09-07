CREATE ROLE "anonymous";--> statement-breakpoint
CREATE ROLE "authenticated";--> statement-breakpoint
ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "color_palettes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "session" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verification" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "design_systems" ADD COLUMN "visibility" "palette_visibility" DEFAULT 'private' NOT NULL;--> statement-breakpoint
ALTER TABLE "typography_boards" ADD COLUMN "visibility" "palette_visibility" DEFAULT 'private' NOT NULL;--> statement-breakpoint
CREATE VIEW "public"."user_public" AS (select "id", "name", "username", "image", "created_at" from "user");--> statement-breakpoint
DROP POLICY "select saves" ON "color_palette_saves" CASCADE;--> statement-breakpoint
DROP POLICY "insert own saves" ON "color_palette_saves" CASCADE;--> statement-breakpoint
DROP POLICY "delete own saves" ON "color_palette_saves" CASCADE;--> statement-breakpoint
DROP POLICY "select own design systems" ON "design_systems" CASCADE;--> statement-breakpoint
DROP POLICY "insert own design systems" ON "design_systems" CASCADE;--> statement-breakpoint
DROP POLICY "update own design systems" ON "design_systems" CASCADE;--> statement-breakpoint
DROP POLICY "delete own design systems" ON "design_systems" CASCADE;--> statement-breakpoint
DROP POLICY "select saves" ON "typography_board_saves" CASCADE;--> statement-breakpoint
DROP POLICY "insert own saves" ON "typography_board_saves" CASCADE;--> statement-breakpoint
DROP POLICY "delete own saves" ON "typography_board_saves" CASCADE;--> statement-breakpoint
DROP POLICY "select own typography boards" ON "typography_boards" CASCADE;--> statement-breakpoint
DROP POLICY "insert own typography boards" ON "typography_boards" CASCADE;--> statement-breakpoint
DROP POLICY "update own typography boards" ON "typography_boards" CASCADE;--> statement-breakpoint
DROP POLICY "delete own typography boards" ON "typography_boards" CASCADE;--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "account" AS PERMISSIVE FOR SELECT TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "account" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "account" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "account" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "account" AS PERMISSIVE FOR SELECT TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "account" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "account" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "account" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "color_palette_saves" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "color_palette_saves" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "color_palette_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "color_palette_saves" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "color_palette_saves"."user_id")) WITH CHECK ((select current_setting('app.user_id', true) = "color_palette_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "color_palette_saves" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "color_palette_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "color_palette_saves" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "color_palette_saves" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "color_palette_saves" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "color_palette_saves" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "color_palettes" AS PERMISSIVE FOR SELECT TO "authenticated" USING (("color_palettes"."visibility" <> 'private' or (select current_setting('app.user_id', true) = "color_palettes"."user_id")));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "color_palettes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "color_palettes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "color_palettes" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "color_palettes"."user_id")) WITH CHECK ((select current_setting('app.user_id', true) = "color_palettes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "color_palettes" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "color_palettes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "color_palettes" AS PERMISSIVE FOR SELECT TO "anonymous" USING ("color_palettes"."visibility" <> 'private');--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "color_palettes" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "color_palettes" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "color_palettes" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "design_systems" AS PERMISSIVE FOR SELECT TO "authenticated" USING (("design_systems"."visibility" <> 'private' or (select current_setting('app.user_id', true) = "design_systems"."user_id")));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "design_systems" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "design_systems"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "design_systems" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "design_systems"."user_id")) WITH CHECK ((select current_setting('app.user_id', true) = "design_systems"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "design_systems" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "design_systems"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "design_systems" AS PERMISSIVE FOR SELECT TO "anonymous" USING ("design_systems"."visibility" <> 'private');--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "design_systems" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "design_systems" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "design_systems" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "session" AS PERMISSIVE FOR SELECT TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "session" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "session" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "session" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "session" AS PERMISSIVE FOR SELECT TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "session" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "session" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "session" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "typography_board_saves" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "typography_board_saves" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "typography_board_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "typography_board_saves" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "typography_board_saves"."user_id")) WITH CHECK ((select current_setting('app.user_id', true) = "typography_board_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "typography_board_saves" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "typography_board_saves"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "typography_board_saves" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "typography_board_saves" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "typography_board_saves" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "typography_board_saves" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "typography_boards" AS PERMISSIVE FOR SELECT TO "authenticated" USING (("typography_boards"."visibility" <> 'private' or (select current_setting('app.user_id', true) = "typography_boards"."user_id")));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "typography_boards" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "typography_boards"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "typography_boards" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "typography_boards"."user_id")) WITH CHECK ((select current_setting('app.user_id', true) = "typography_boards"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "typography_boards" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "typography_boards"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "typography_boards" AS PERMISSIVE FOR SELECT TO "anonymous" USING ("typography_boards"."visibility" <> 'private');--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "typography_boards" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "typography_boards" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "typography_boards" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "user" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select current_setting('app.user_id', true) = "user"."id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "user" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select current_setting('app.user_id', true) = "user"."id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "user" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select current_setting('app.user_id', true) = "user"."id")) WITH CHECK ((select current_setting('app.user_id', true) = "user"."id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "user" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select current_setting('app.user_id', true) = "user"."id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "user" AS PERMISSIVE FOR SELECT TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "user" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "user" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "user" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "verification" AS PERMISSIVE FOR SELECT TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "verification" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "verification" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "verification" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "verification" AS PERMISSIVE FOR SELECT TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "verification" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "verification" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "verification" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);