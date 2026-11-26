import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_destinations_variant" AS ENUM('columns');
  CREATE TYPE "public"."enum_pages_blocks_destinations_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_destinations_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_destinations_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_destinations_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_destinations_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_destinations_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_destinations_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_variant" AS ENUM('columns');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_destinations_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_destinations_variant" AS ENUM('columns');
  CREATE TYPE "public"."enum_services_blocks_destinations_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_destinations_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_destinations_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_destinations_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_destinations_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_destinations_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_destinations_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_variant" AS ENUM('columns');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_destinations_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_header_navigation_side" AS ENUM('left', 'right');
  CREATE TABLE "pages_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_destinations_variant" DEFAULT 'columns',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_destinations_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_destinations_cta_icon",
  	"cta_link_type" "enum_pages_blocks_destinations_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_pages_blocks_destinations_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_destinations_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_destinations_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_destinations_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_destinations_variant" DEFAULT 'columns',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_destinations_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_destinations_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_destinations_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__pages_v_blocks_destinations_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_destinations_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_destinations_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_destinations_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "services_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_destinations_variant" DEFAULT 'columns',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_destinations_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_destinations_cta_icon",
  	"cta_link_type" "enum_services_blocks_destinations_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_services_blocks_destinations_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_destinations_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_destinations_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_destinations_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_destinations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_destinations_variant" DEFAULT 'columns',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_destinations_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_destinations_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_destinations_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__services_v_blocks_destinations_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_destinations_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_destinations_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_destinations_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "services_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "contact_business" ADD COLUMN "availability" varchar;
  ALTER TABLE "header_navigation" ADD COLUMN "side" "enum_header_navigation_side" DEFAULT 'left';
  ALTER TABLE "footer" ADD COLUMN "tagline" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_heading" varchar DEFAULT 'Contact';
  ALTER TABLE "footer" ADD COLUMN "credit_label" varchar DEFAULT 'Designed and developed by CenoDigital';
  ALTER TABLE "footer" ADD COLUMN "credit_url" varchar DEFAULT 'https://cenodigital.com';
  ALTER TABLE "pages_blocks_destinations_items" ADD CONSTRAINT "pages_blocks_destinations_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_items" ADD CONSTRAINT "pages_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations" ADD CONSTRAINT "pages_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_items" ADD CONSTRAINT "_pages_v_blocks_destinations_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations_items" ADD CONSTRAINT "_pages_v_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destinations" ADD CONSTRAINT "_pages_v_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_destinations_items" ADD CONSTRAINT "services_blocks_destinations_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_destinations_items" ADD CONSTRAINT "services_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_destinations" ADD CONSTRAINT "services_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_destinations_items" ADD CONSTRAINT "_services_v_blocks_destinations_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_destinations_items" ADD CONSTRAINT "_services_v_blocks_destinations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_destinations" ADD CONSTRAINT "_services_v_blocks_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_destinations_items_order_idx" ON "pages_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_items_parent_id_idx" ON "pages_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_items_photo_idx" ON "pages_blocks_destinations_items" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_destinations_order_idx" ON "pages_blocks_destinations" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_parent_id_idx" ON "pages_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_path_idx" ON "pages_blocks_destinations" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_destinations_items_order_idx" ON "_pages_v_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_items_parent_id_idx" ON "_pages_v_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_items_photo_idx" ON "_pages_v_blocks_destinations_items" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_destinations_order_idx" ON "_pages_v_blocks_destinations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destinations_parent_id_idx" ON "_pages_v_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destinations_path_idx" ON "_pages_v_blocks_destinations" USING btree ("_path");
  CREATE INDEX "services_blocks_destinations_items_order_idx" ON "services_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "services_blocks_destinations_items_parent_id_idx" ON "services_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_destinations_items_photo_idx" ON "services_blocks_destinations_items" USING btree ("photo_id");
  CREATE INDEX "services_blocks_destinations_order_idx" ON "services_blocks_destinations" USING btree ("_order");
  CREATE INDEX "services_blocks_destinations_parent_id_idx" ON "services_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_destinations_path_idx" ON "services_blocks_destinations" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_destinations_items_order_idx" ON "_services_v_blocks_destinations_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_destinations_items_parent_id_idx" ON "_services_v_blocks_destinations_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_destinations_items_photo_idx" ON "_services_v_blocks_destinations_items" USING btree ("photo_id");
  CREATE INDEX "_services_v_blocks_destinations_order_idx" ON "_services_v_blocks_destinations" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_destinations_parent_id_idx" ON "_services_v_blocks_destinations" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_destinations_path_idx" ON "_services_v_blocks_destinations" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_destinations_items" CASCADE;
  DROP TABLE "pages_blocks_destinations" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations_items" CASCADE;
  DROP TABLE "_pages_v_blocks_destinations" CASCADE;
  DROP TABLE "services_blocks_destinations_items" CASCADE;
  DROP TABLE "services_blocks_destinations" CASCADE;
  DROP TABLE "_services_v_blocks_destinations_items" CASCADE;
  DROP TABLE "_services_v_blocks_destinations" CASCADE;
  ALTER TABLE "pages_blocks_feature_list_items" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_feature_list_items" DROP COLUMN "label";
  ALTER TABLE "services_blocks_feature_list_items" DROP COLUMN "label";
  ALTER TABLE "_services_v_blocks_feature_list_items" DROP COLUMN "label";
  ALTER TABLE "contact_business" DROP COLUMN "availability";
  ALTER TABLE "header_navigation" DROP COLUMN "side";
  ALTER TABLE "footer" DROP COLUMN "tagline";
  ALTER TABLE "footer" DROP COLUMN "contact_heading";
  ALTER TABLE "footer" DROP COLUMN "credit_label";
  ALTER TABLE "footer" DROP COLUMN "credit_url";
  DROP TYPE "public"."enum_pages_blocks_destinations_variant";
  DROP TYPE "public"."enum_pages_blocks_destinations_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_destinations_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_destinations_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_destinations_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_destinations_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_destinations_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_destinations_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_variant";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_destinations_settings_anim";
  DROP TYPE "public"."enum_services_blocks_destinations_variant";
  DROP TYPE "public"."enum_services_blocks_destinations_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_destinations_cta_icon";
  DROP TYPE "public"."enum_services_blocks_destinations_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_destinations_settings_bg";
  DROP TYPE "public"."enum_services_blocks_destinations_settings_pt";
  DROP TYPE "public"."enum_services_blocks_destinations_settings_pb";
  DROP TYPE "public"."enum_services_blocks_destinations_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_destinations_variant";
  DROP TYPE "public"."enum__services_v_blocks_destinations_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_destinations_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_destinations_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_destinations_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_destinations_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_destinations_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_destinations_settings_anim";
  DROP TYPE "public"."enum_header_navigation_side";`)
}
