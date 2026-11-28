import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_service_id_services_id_fk";
  
  DROP INDEX "form_submissions_service_idx";
  ALTER TABLE "forms_details" ADD COLUMN "upfront" boolean;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_services_id_idx" ON "form_submissions_rels" USING btree ("services_id");
  -- Task 174: keep each earlier request's service, now as the first of its services.
  INSERT INTO "form_submissions_rels" ("order", "parent_id", "path", "services_id")
    SELECT 1, "id", 'services', "service_id" FROM "form_submissions" WHERE "service_id" IS NOT NULL;
  ALTER TABLE "form_submissions" DROP COLUMN "service_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "form_submissions_rels" CASCADE;
  ALTER TABLE "form_submissions" ADD COLUMN "service_id" integer;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "form_submissions_service_idx" ON "form_submissions" USING btree ("service_id");
  ALTER TABLE "forms_details" DROP COLUMN "upfront";`)
}
