import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_route_list_variant" AS ENUM('rows');
  CREATE TYPE "public"."enum_pages_blocks_route_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_route_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_route_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_route_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_route_list_variant" AS ENUM('rows');
  CREATE TYPE "public"."enum__pages_v_blocks_route_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_route_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_route_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_route_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_route_list_variant" AS ENUM('rows');
  CREATE TYPE "public"."enum_services_blocks_route_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_route_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_route_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_route_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_route_list_variant" AS ENUM('rows');
  CREATE TYPE "public"."enum__services_v_blocks_route_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_route_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_route_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_route_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TABLE "pages_blocks_image_text_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_route_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_route_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_route_list_variant" DEFAULT 'rows',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"footnote" varchar,
  	"settings_bg" "enum_pages_blocks_route_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_route_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_route_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_route_list_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_route_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_route_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_route_list_variant" DEFAULT 'rows',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"footnote" varchar,
  	"settings_bg" "enum__pages_v_blocks_route_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_route_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_route_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_route_list_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_text_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_route_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "services_blocks_route_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_route_list_variant" DEFAULT 'rows',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"footnote" varchar,
  	"settings_bg" "enum_services_blocks_route_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_route_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_route_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_route_list_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_image_text_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_route_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_route_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_route_list_variant" DEFAULT 'rows',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"footnote" varchar,
  	"settings_bg" "enum__services_v_blocks_route_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_route_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_route_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_route_list_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  UPDATE "pages_blocks_image_text" SET "variant" = 'bleed' WHERE "variant" NOT IN ('bleed', 'inset');
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::text;
  DROP TYPE "public"."enum_pages_blocks_image_text_variant";
  CREATE TYPE "public"."enum_pages_blocks_image_text_variant" AS ENUM('bleed', 'inset');
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::"public"."enum_pages_blocks_image_text_variant";
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_image_text_variant" USING "variant"::"public"."enum_pages_blocks_image_text_variant";
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  UPDATE "_pages_v_blocks_image_text" SET "variant" = 'bleed' WHERE "variant" NOT IN ('bleed', 'inset');
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::text;
  DROP TYPE "public"."enum__pages_v_blocks_image_text_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_variant" AS ENUM('bleed', 'inset');
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::"public"."enum__pages_v_blocks_image_text_variant";
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_image_text_variant" USING "variant"::"public"."enum__pages_v_blocks_image_text_variant";
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  UPDATE "services_blocks_image_text" SET "variant" = 'bleed' WHERE "variant" NOT IN ('bleed', 'inset');
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::text;
  DROP TYPE "public"."enum_services_blocks_image_text_variant";
  CREATE TYPE "public"."enum_services_blocks_image_text_variant" AS ENUM('bleed', 'inset');
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::"public"."enum_services_blocks_image_text_variant";
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_image_text_variant" USING "variant"::"public"."enum_services_blocks_image_text_variant";
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  UPDATE "_services_v_blocks_image_text" SET "variant" = 'bleed' WHERE "variant" NOT IN ('bleed', 'inset');
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::text;
  DROP TYPE "public"."enum__services_v_blocks_image_text_variant";
  CREATE TYPE "public"."enum__services_v_blocks_image_text_variant" AS ENUM('bleed', 'inset');
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'bleed'::"public"."enum__services_v_blocks_image_text_variant";
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_image_text_variant" USING "variant"::"public"."enum__services_v_blocks_image_text_variant";
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "faq_label" varchar;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "faq_label" varchar;
  ALTER TABLE "services_blocks_rich_text" ADD COLUMN "faq_label" varchar;
  ALTER TABLE "_services_v_blocks_rich_text" ADD COLUMN "faq_label" varchar;
  ALTER TABLE "vehicles" ADD COLUMN "specs_best_for" varchar;
  ALTER TABLE "vehicles" ADD COLUMN "specs_guests" varchar;
  ALTER TABLE "vehicles" ADD COLUMN "specs_luggage" varchar;
  ALTER TABLE "vehicles" ADD COLUMN "specs_colours" varchar;
  ALTER TABLE "_vehicles_v" ADD COLUMN "version_specs_best_for" varchar;
  ALTER TABLE "_vehicles_v" ADD COLUMN "version_specs_guests" varchar;
  ALTER TABLE "_vehicles_v" ADD COLUMN "version_specs_luggage" varchar;
  ALTER TABLE "_vehicles_v" ADD COLUMN "version_specs_colours" varchar;
  ALTER TABLE "pages_blocks_image_text_details" ADD CONSTRAINT "pages_blocks_image_text_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_route_list_items" ADD CONSTRAINT "pages_blocks_route_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_route_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_route_list" ADD CONSTRAINT "pages_blocks_route_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_details" ADD CONSTRAINT "_pages_v_blocks_image_text_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_route_list_items" ADD CONSTRAINT "_pages_v_blocks_route_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_route_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_route_list" ADD CONSTRAINT "_pages_v_blocks_route_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text_details" ADD CONSTRAINT "services_blocks_image_text_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_route_list_items" ADD CONSTRAINT "services_blocks_route_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_route_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_route_list" ADD CONSTRAINT "services_blocks_route_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text_details" ADD CONSTRAINT "_services_v_blocks_image_text_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_route_list_items" ADD CONSTRAINT "_services_v_blocks_route_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_route_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_route_list" ADD CONSTRAINT "_services_v_blocks_route_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_text_details_order_idx" ON "pages_blocks_image_text_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_details_parent_id_idx" ON "pages_blocks_image_text_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_route_list_items_order_idx" ON "pages_blocks_route_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_route_list_items_parent_id_idx" ON "pages_blocks_route_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_route_list_order_idx" ON "pages_blocks_route_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_route_list_parent_id_idx" ON "pages_blocks_route_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_route_list_path_idx" ON "pages_blocks_route_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_details_order_idx" ON "_pages_v_blocks_image_text_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_details_parent_id_idx" ON "_pages_v_blocks_image_text_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_route_list_items_order_idx" ON "_pages_v_blocks_route_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_route_list_items_parent_id_idx" ON "_pages_v_blocks_route_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_route_list_order_idx" ON "_pages_v_blocks_route_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_route_list_parent_id_idx" ON "_pages_v_blocks_route_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_route_list_path_idx" ON "_pages_v_blocks_route_list" USING btree ("_path");
  CREATE INDEX "services_blocks_image_text_details_order_idx" ON "services_blocks_image_text_details" USING btree ("_order");
  CREATE INDEX "services_blocks_image_text_details_parent_id_idx" ON "services_blocks_image_text_details" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_route_list_items_order_idx" ON "services_blocks_route_list_items" USING btree ("_order");
  CREATE INDEX "services_blocks_route_list_items_parent_id_idx" ON "services_blocks_route_list_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_route_list_order_idx" ON "services_blocks_route_list" USING btree ("_order");
  CREATE INDEX "services_blocks_route_list_parent_id_idx" ON "services_blocks_route_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_route_list_path_idx" ON "services_blocks_route_list" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_text_details_order_idx" ON "_services_v_blocks_image_text_details" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_text_details_parent_id_idx" ON "_services_v_blocks_image_text_details" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_route_list_items_order_idx" ON "_services_v_blocks_route_list_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_route_list_items_parent_id_idx" ON "_services_v_blocks_route_list_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_route_list_order_idx" ON "_services_v_blocks_route_list" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_route_list_parent_id_idx" ON "_services_v_blocks_route_list" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_route_list_path_idx" ON "_services_v_blocks_route_list" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image_text_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_route_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_route_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_route_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_route_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_image_text_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_route_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_route_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_image_text_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_route_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_route_list" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_image_text_details" CASCADE;
  DROP TABLE "pages_blocks_route_list_items" CASCADE;
  DROP TABLE "pages_blocks_route_list" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_details" CASCADE;
  DROP TABLE "_pages_v_blocks_route_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_route_list" CASCADE;
  DROP TABLE "services_blocks_image_text_details" CASCADE;
  DROP TABLE "services_blocks_route_list_items" CASCADE;
  DROP TABLE "services_blocks_route_list" CASCADE;
  DROP TABLE "_services_v_blocks_image_text_details" CASCADE;
  DROP TABLE "_services_v_blocks_route_list_items" CASCADE;
  DROP TABLE "_services_v_blocks_route_list" CASCADE;
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_image_text_variant";
  CREATE TYPE "public"."enum_pages_blocks_image_text_variant" AS ENUM('default');
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum_pages_blocks_image_text_variant";
  ALTER TABLE "pages_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_image_text_variant" USING "variant"::"public"."enum_pages_blocks_image_text_variant";
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_image_text_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_variant" AS ENUM('default');
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_image_text_variant";
  ALTER TABLE "_pages_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_image_text_variant" USING "variant"::"public"."enum__pages_v_blocks_image_text_variant";
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_services_blocks_image_text_variant";
  CREATE TYPE "public"."enum_services_blocks_image_text_variant" AS ENUM('default');
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum_services_blocks_image_text_variant";
  ALTER TABLE "services_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_image_text_variant" USING "variant"::"public"."enum_services_blocks_image_text_variant";
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__services_v_blocks_image_text_variant";
  CREATE TYPE "public"."enum__services_v_blocks_image_text_variant" AS ENUM('default');
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DEFAULT 'default'::"public"."enum__services_v_blocks_image_text_variant";
  ALTER TABLE "_services_v_blocks_image_text" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_image_text_variant" USING "variant"::"public"."enum__services_v_blocks_image_text_variant";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "faq_label";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "faq_label";
  ALTER TABLE "services_blocks_rich_text" DROP COLUMN "faq_label";
  ALTER TABLE "_services_v_blocks_rich_text" DROP COLUMN "faq_label";
  ALTER TABLE "vehicles" DROP COLUMN "specs_best_for";
  ALTER TABLE "vehicles" DROP COLUMN "specs_guests";
  ALTER TABLE "vehicles" DROP COLUMN "specs_luggage";
  ALTER TABLE "vehicles" DROP COLUMN "specs_colours";
  ALTER TABLE "_vehicles_v" DROP COLUMN "version_specs_best_for";
  ALTER TABLE "_vehicles_v" DROP COLUMN "version_specs_guests";
  ALTER TABLE "_vehicles_v" DROP COLUMN "version_specs_luggage";
  ALTER TABLE "_vehicles_v" DROP COLUMN "version_specs_colours";
  DROP TYPE "public"."enum_pages_blocks_route_list_variant";
  DROP TYPE "public"."enum_pages_blocks_route_list_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_route_list_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_route_list_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_route_list_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_route_list_variant";
  DROP TYPE "public"."enum__pages_v_blocks_route_list_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_route_list_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_route_list_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_route_list_settings_anim";
  DROP TYPE "public"."enum_services_blocks_route_list_variant";
  DROP TYPE "public"."enum_services_blocks_route_list_settings_bg";
  DROP TYPE "public"."enum_services_blocks_route_list_settings_pt";
  DROP TYPE "public"."enum_services_blocks_route_list_settings_pb";
  DROP TYPE "public"."enum_services_blocks_route_list_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_route_list_variant";
  DROP TYPE "public"."enum__services_v_blocks_route_list_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_route_list_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_route_list_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_route_list_settings_anim";`)
}
