import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_translate_languages" AS ENUM('de', 'fr', 'it', 'es', 'ru', 'zh-CN', 'ja', 'ar', 'hi', 'nl');
  CREATE TYPE "public"."enum_contact_business_opening_hours_days" AS ENUM('Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su');
  CREATE TYPE "public"."enum_contact_business_social_platform" AS ENUM('instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'tripadvisor', 'x');
  CREATE TYPE "public"."enum_header_navigation_children_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_header_navigation_kind" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_header_navigation_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_header_ctas_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_header_ctas_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_header_ctas_cta_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_header_announcement_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_mobile_action_bar_buttons_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_mobile_action_bar_buttons_action" AS ENUM('link', 'menu');
  CREATE TYPE "public"."enum_mobile_action_bar_buttons_link_type" AS ENUM('url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_booking_settings_visible_fields" AS ENUM('service', 'vehicle', 'date', 'time', 'pickup', 'dropoff', 'passengers', 'luggage', 'flightNumber', 'name', 'email', 'phone', 'notes');
  CREATE TYPE "public"."enum_booking_settings_required_fields" AS ENUM('service', 'vehicle', 'date', 'time', 'pickup', 'dropoff', 'passengers', 'luggage', 'flightNumber', 'name', 'email', 'phone', 'notes');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_wide_url" varchar,
  	"sizes_wide_width" numeric,
  	"sizes_wide_height" numeric,
  	"sizes_wide_mime_type" varchar,
  	"sizes_wide_filesize" numeric,
  	"sizes_wide_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "site_settings_translate_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_site_settings_translate_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'CeylonVVIP' NOT NULL,
  	"logos_light_id" integer,
  	"logos_dark_id" integer,
  	"logos_mobile_id" integer,
  	"icons_favicon_id" integer,
  	"icons_apple_touch_icon_id" integer,
  	"og_default_id" integer,
  	"brand_colour" varchar,
  	"translate_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_business_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "contact_business_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "contact_business_opening_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_contact_business_opening_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_business_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar,
  	"closes" varchar,
  	"all_day" boolean
  );
  
  CREATE TABLE "contact_business_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_contact_business_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_business" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"address_street" varchar,
  	"address_city" varchar,
  	"address_region" varchar,
  	"address_postcode" varchar,
  	"address_country" varchar DEFAULT 'Sri Lanka',
  	"map_pin_latitude" numeric,
  	"map_pin_longitude" numeric,
  	"registered_name" varchar DEFAULT 'Gainbuild (Pvt) Ltd',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_navigation_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_header_navigation_children_link_type" DEFAULT 'url',
  	"link_url" varchar,
  	"link_phone" varchar,
  	"link_message" varchar,
  	"link_email" varchar,
  	"link_new_tab" boolean,
  	"description" varchar
  );
  
  CREATE TABLE "header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_header_navigation_kind" DEFAULT 'link',
  	"label" varchar NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_header_navigation_link_type" DEFAULT 'url',
  	"link_url" varchar,
  	"link_phone" varchar,
  	"link_message" varchar,
  	"link_email" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "header_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_appearance" "enum_header_ctas_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_header_ctas_cta_icon",
  	"cta_link_type" "enum_header_ctas_cta_link_type" DEFAULT 'url' NOT NULL,
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"announcement_enabled" boolean,
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"announcement_link_type" "enum_header_announcement_link_type" DEFAULT 'url',
  	"announcement_link_url" varchar,
  	"announcement_link_phone" varchar,
  	"announcement_link_message" varchar,
  	"announcement_link_email" varchar,
  	"announcement_link_new_tab" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'url' NOT NULL,
  	"link_url" varchar,
  	"link_phone" varchar,
  	"link_message" varchar,
  	"link_email" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'url' NOT NULL,
  	"link_url" varchar,
  	"link_phone" varchar,
  	"link_message" varchar,
  	"link_email" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_text" varchar,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mobile_action_bar_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_mobile_action_bar_buttons_icon",
  	"action" "enum_mobile_action_bar_buttons_action" DEFAULT 'link',
  	"link_label" varchar,
  	"link_type" "enum_mobile_action_bar_buttons_link_type" DEFAULT 'url',
  	"link_url" varchar,
  	"link_phone" varchar,
  	"link_message" varchar,
  	"link_email" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "mobile_action_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_template" varchar DEFAULT '%s | CeylonVVIP' NOT NULL,
  	"default_description" varchar,
  	"organisation_legal_name" varchar,
  	"organisation_business_type" varchar DEFAULT 'TravelAgency',
  	"organisation_price_range" varchar,
  	"verification_google" varchar,
  	"verification_bing" varchar,
  	"analytics_ga4" varchar,
  	"analytics_meta_pixel" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "booking_settings_visible_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_booking_settings_visible_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "booking_settings_required_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_booking_settings_required_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "booking_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp_template" varchar,
  	"success_message" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "site_settings_translate_languages" ADD CONSTRAINT "site_settings_translate_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logos_light_id_media_id_fk" FOREIGN KEY ("logos_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logos_dark_id_media_id_fk" FOREIGN KEY ("logos_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logos_mobile_id_media_id_fk" FOREIGN KEY ("logos_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_icons_favicon_id_media_id_fk" FOREIGN KEY ("icons_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_icons_apple_touch_icon_id_media_id_fk" FOREIGN KEY ("icons_apple_touch_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_default_id_media_id_fk" FOREIGN KEY ("og_default_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_business_phones" ADD CONSTRAINT "contact_business_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_business_emails" ADD CONSTRAINT "contact_business_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_business_opening_hours_days" ADD CONSTRAINT "contact_business_opening_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_business_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_business_opening_hours" ADD CONSTRAINT "contact_business_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_business_social" ADD CONSTRAINT "contact_business_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_business"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_children" ADD CONSTRAINT "header_navigation_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ctas" ADD CONSTRAINT "header_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mobile_action_bar_buttons" ADD CONSTRAINT "mobile_action_bar_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mobile_action_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "booking_settings_visible_fields" ADD CONSTRAINT "booking_settings_visible_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."booking_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "booking_settings_required_fields" ADD CONSTRAINT "booking_settings_required_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."booking_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "site_settings_translate_languages_order_idx" ON "site_settings_translate_languages" USING btree ("order");
  CREATE INDEX "site_settings_translate_languages_parent_idx" ON "site_settings_translate_languages" USING btree ("parent_id");
  CREATE INDEX "site_settings_logos_logos_light_idx" ON "site_settings" USING btree ("logos_light_id");
  CREATE INDEX "site_settings_logos_logos_dark_idx" ON "site_settings" USING btree ("logos_dark_id");
  CREATE INDEX "site_settings_logos_logos_mobile_idx" ON "site_settings" USING btree ("logos_mobile_id");
  CREATE INDEX "site_settings_icons_icons_favicon_idx" ON "site_settings" USING btree ("icons_favicon_id");
  CREATE INDEX "site_settings_icons_icons_apple_touch_icon_idx" ON "site_settings" USING btree ("icons_apple_touch_icon_id");
  CREATE INDEX "site_settings_og_default_idx" ON "site_settings" USING btree ("og_default_id");
  CREATE INDEX "contact_business_phones_order_idx" ON "contact_business_phones" USING btree ("_order");
  CREATE INDEX "contact_business_phones_parent_id_idx" ON "contact_business_phones" USING btree ("_parent_id");
  CREATE INDEX "contact_business_emails_order_idx" ON "contact_business_emails" USING btree ("_order");
  CREATE INDEX "contact_business_emails_parent_id_idx" ON "contact_business_emails" USING btree ("_parent_id");
  CREATE INDEX "contact_business_opening_hours_days_order_idx" ON "contact_business_opening_hours_days" USING btree ("order");
  CREATE INDEX "contact_business_opening_hours_days_parent_idx" ON "contact_business_opening_hours_days" USING btree ("parent_id");
  CREATE INDEX "contact_business_opening_hours_order_idx" ON "contact_business_opening_hours" USING btree ("_order");
  CREATE INDEX "contact_business_opening_hours_parent_id_idx" ON "contact_business_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "contact_business_social_order_idx" ON "contact_business_social" USING btree ("_order");
  CREATE INDEX "contact_business_social_parent_id_idx" ON "contact_business_social" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_children_order_idx" ON "header_navigation_children" USING btree ("_order");
  CREATE INDEX "header_navigation_children_parent_id_idx" ON "header_navigation_children" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_order_idx" ON "header_navigation" USING btree ("_order");
  CREATE INDEX "header_navigation_parent_id_idx" ON "header_navigation" USING btree ("_parent_id");
  CREATE INDEX "header_ctas_order_idx" ON "header_ctas" USING btree ("_order");
  CREATE INDEX "header_ctas_parent_id_idx" ON "header_ctas" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "mobile_action_bar_buttons_order_idx" ON "mobile_action_bar_buttons" USING btree ("_order");
  CREATE INDEX "mobile_action_bar_buttons_parent_id_idx" ON "mobile_action_bar_buttons" USING btree ("_parent_id");
  CREATE INDEX "booking_settings_visible_fields_order_idx" ON "booking_settings_visible_fields" USING btree ("order");
  CREATE INDEX "booking_settings_visible_fields_parent_idx" ON "booking_settings_visible_fields" USING btree ("parent_id");
  CREATE INDEX "booking_settings_required_fields_order_idx" ON "booking_settings_required_fields" USING btree ("order");
  CREATE INDEX "booking_settings_required_fields_parent_idx" ON "booking_settings_required_fields" USING btree ("parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_translate_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business_phones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business_opening_hours_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business_opening_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_business" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mobile_action_bar_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mobile_action_bar" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_defaults" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "booking_settings_visible_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "booking_settings_required_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "booking_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  DROP TABLE "site_settings_translate_languages" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "contact_business_phones" CASCADE;
  DROP TABLE "contact_business_emails" CASCADE;
  DROP TABLE "contact_business_opening_hours_days" CASCADE;
  DROP TABLE "contact_business_opening_hours" CASCADE;
  DROP TABLE "contact_business_social" CASCADE;
  DROP TABLE "contact_business" CASCADE;
  DROP TABLE "header_navigation_children" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "header_ctas" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "mobile_action_bar_buttons" CASCADE;
  DROP TABLE "mobile_action_bar" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "booking_settings_visible_fields" CASCADE;
  DROP TABLE "booking_settings_required_fields" CASCADE;
  DROP TABLE "booking_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_site_settings_translate_languages";
  DROP TYPE "public"."enum_contact_business_opening_hours_days";
  DROP TYPE "public"."enum_contact_business_social_platform";
  DROP TYPE "public"."enum_header_navigation_children_link_type";
  DROP TYPE "public"."enum_header_navigation_kind";
  DROP TYPE "public"."enum_header_navigation_link_type";
  DROP TYPE "public"."enum_header_ctas_cta_appearance";
  DROP TYPE "public"."enum_header_ctas_cta_icon";
  DROP TYPE "public"."enum_header_ctas_cta_link_type";
  DROP TYPE "public"."enum_header_announcement_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_mobile_action_bar_buttons_icon";
  DROP TYPE "public"."enum_mobile_action_bar_buttons_action";
  DROP TYPE "public"."enum_mobile_action_bar_buttons_link_type";
  DROP TYPE "public"."enum_booking_settings_visible_fields";
  DROP TYPE "public"."enum_booking_settings_required_fields";`)
}
