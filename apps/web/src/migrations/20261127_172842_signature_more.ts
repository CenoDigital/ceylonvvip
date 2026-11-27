import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_list_items" ADD COLUMN "more_heading" varchar;
  ALTER TABLE "pages_blocks_feature_list_items" ADD COLUMN "more_text" varchar;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD COLUMN "more_heading" varchar;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD COLUMN "more_text" varchar;
  ALTER TABLE "services_blocks_feature_list_items" ADD COLUMN "more_heading" varchar;
  ALTER TABLE "services_blocks_feature_list_items" ADD COLUMN "more_text" varchar;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD COLUMN "more_heading" varchar;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD COLUMN "more_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_feature_list_items" DROP COLUMN "more_heading";
  ALTER TABLE "pages_blocks_feature_list_items" DROP COLUMN "more_text";
  ALTER TABLE "_pages_v_blocks_feature_list_items" DROP COLUMN "more_heading";
  ALTER TABLE "_pages_v_blocks_feature_list_items" DROP COLUMN "more_text";
  ALTER TABLE "services_blocks_feature_list_items" DROP COLUMN "more_heading";
  ALTER TABLE "services_blocks_feature_list_items" DROP COLUMN "more_text";
  ALTER TABLE "_services_v_blocks_feature_list_items" DROP COLUMN "more_heading";
  ALTER TABLE "_services_v_blocks_feature_list_items" DROP COLUMN "more_text";`)
}
