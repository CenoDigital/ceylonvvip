import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "translations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" varchar NOT NULL,
  	"de" varchar,
  	"fr" varchar,
  	"ru" varchar,
  	"ar" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "translations_id" integer;
  CREATE UNIQUE INDEX "translations_source_idx" ON "translations" USING btree ("source");
  CREATE INDEX "translations_updated_at_idx" ON "translations" USING btree ("updated_at");
  CREATE INDEX "translations_created_at_idx" ON "translations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_translations_fk" FOREIGN KEY ("translations_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_translations_id_idx" ON "payload_locked_documents_rels" USING btree ("translations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "translations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "translations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_translations_fk";
  
  DROP INDEX "payload_locked_documents_rels_translations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "translations_id";`)
}
