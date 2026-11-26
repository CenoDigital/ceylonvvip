import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_forms_details_type" AS ENUM('text', 'email', 'tel', 'number', 'textarea');
  CREATE TYPE "public"."enum_forms_details_width" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'contacted', 'confirmed', 'closed');
  CREATE TABLE "forms_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_forms_details_type" DEFAULT 'text' NOT NULL,
  	"placeholder" varchar,
  	"required" boolean,
  	"width" "enum_forms_details_width" DEFAULT 'full'
  );
  
  CREATE TABLE "forms_notify" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"service_label" varchar DEFAULT 'Service' NOT NULL,
  	"vehicle_label" varchar DEFAULT 'Vehicle',
  	"no_preference_label" varchar,
  	"no_preference_detail" varchar,
  	"date_label" varchar DEFAULT 'Date' NOT NULL,
  	"time_label" varchar DEFAULT 'Time',
  	"date_time_label" varchar,
  	"adults_label" varchar DEFAULT 'Adults' NOT NULL,
  	"adults_hint" varchar,
  	"children_label" varchar,
  	"children_hint" varchar,
  	"submit_label" varchar DEFAULT 'Continue on WhatsApp' NOT NULL,
  	"details_toggle_label" varchar,
  	"note" varchar,
  	"consent_label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"form_id" integer,
  	"service_id" integer,
  	"vehicle_id" integer,
  	"date" varchar,
  	"time" varchar,
  	"adults" numeric,
  	"children" numeric,
  	"details" jsonb,
  	"message" varchar,
  	"page" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_form" ADD COLUMN "form_id" integer;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "form_id" integer;
  ALTER TABLE "services_blocks_form" ADD COLUMN "form_id" integer;
  ALTER TABLE "services" ADD COLUMN "short_label" varchar;
  ALTER TABLE "_services_v_blocks_form" ADD COLUMN "form_id" integer;
  ALTER TABLE "_services_v" ADD COLUMN "version_short_label" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  ALTER TABLE "forms_details" ADD CONSTRAINT "forms_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_notify" ADD CONSTRAINT "forms_notify_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "forms_details_order_idx" ON "forms_details" USING btree ("_order");
  CREATE INDEX "forms_details_parent_id_idx" ON "forms_details" USING btree ("_parent_id");
  CREATE INDEX "forms_notify_order_idx" ON "forms_notify" USING btree ("_order");
  CREATE INDEX "forms_notify_parent_id_idx" ON "forms_notify" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_services_id_idx" ON "forms_rels" USING btree ("services_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_service_idx" ON "form_submissions" USING btree ("service_id");
  CREATE INDEX "form_submissions_vehicle_idx" ON "form_submissions" USING btree ("vehicle_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_form" ADD CONSTRAINT "services_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form" ADD CONSTRAINT "_services_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_form_idx" ON "pages_blocks_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_form_form_idx" ON "_pages_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "services_blocks_form_form_idx" ON "services_blocks_form" USING btree ("form_id");
  CREATE INDEX "_services_v_blocks_form_form_idx" ON "_services_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forms_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_notify" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "forms_details" CASCADE;
  DROP TABLE "forms_notify" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  ALTER TABLE "pages_blocks_form" DROP CONSTRAINT "pages_blocks_form_form_id_forms_id_fk";
  
  ALTER TABLE "_pages_v_blocks_form" DROP CONSTRAINT "_pages_v_blocks_form_form_id_forms_id_fk";
  
  ALTER TABLE "services_blocks_form" DROP CONSTRAINT "services_blocks_form_form_id_forms_id_fk";
  
  ALTER TABLE "_services_v_blocks_form" DROP CONSTRAINT "_services_v_blocks_form_form_id_forms_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  DROP INDEX "pages_blocks_form_form_idx";
  DROP INDEX "_pages_v_blocks_form_form_idx";
  DROP INDEX "services_blocks_form_form_idx";
  DROP INDEX "_services_v_blocks_form_form_idx";
  DROP INDEX "payload_locked_documents_rels_forms_id_idx";
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "form_id";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "form_id";
  ALTER TABLE "services_blocks_form" DROP COLUMN "form_id";
  ALTER TABLE "services" DROP COLUMN "short_label";
  ALTER TABLE "_services_v_blocks_form" DROP COLUMN "form_id";
  ALTER TABLE "_services_v" DROP COLUMN "version_short_label";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "forms_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  DROP TYPE "public"."enum_forms_details_type";
  DROP TYPE "public"."enum_forms_details_width";
  DROP TYPE "public"."enum_form_submissions_status";`)
}
