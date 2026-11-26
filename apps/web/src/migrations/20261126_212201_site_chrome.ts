import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_navigation_side" AS ENUM('left', 'right');
  ALTER TABLE "pages_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "services_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD COLUMN "label" varchar;
  ALTER TABLE "contact_business" ADD COLUMN "availability" varchar;
  ALTER TABLE "header_navigation" ADD COLUMN "side" "enum_header_navigation_side" DEFAULT 'left';
  ALTER TABLE "footer" ADD COLUMN "tagline" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_heading" varchar DEFAULT 'Contact';
  ALTER TABLE "footer" ADD COLUMN "credit_label" varchar DEFAULT 'Designed and developed by CenoDigital';
  ALTER TABLE "footer" ADD COLUMN "credit_url" varchar DEFAULT 'https://cenodigital.com';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  DROP TYPE "public"."enum_header_navigation_side";`)
}
