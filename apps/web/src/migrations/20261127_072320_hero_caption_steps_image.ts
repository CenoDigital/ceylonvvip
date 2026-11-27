import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_process_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "services_blocks_hero" ADD COLUMN "caption" varchar;
  ALTER TABLE "services_blocks_process_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "_services_v_blocks_hero" ADD COLUMN "caption" varchar;
  ALTER TABLE "_services_v_blocks_process_steps" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_process_steps_image_idx" ON "pages_blocks_process_steps" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_process_steps_image_idx" ON "_pages_v_blocks_process_steps" USING btree ("image_id");
  CREATE INDEX "services_blocks_process_steps_image_idx" ON "services_blocks_process_steps" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_process_steps_image_idx" ON "_services_v_blocks_process_steps" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_process_steps" DROP CONSTRAINT "pages_blocks_process_steps_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_process_steps" DROP CONSTRAINT "_pages_v_blocks_process_steps_image_id_media_id_fk";
  
  ALTER TABLE "services_blocks_process_steps" DROP CONSTRAINT "services_blocks_process_steps_image_id_media_id_fk";
  
  ALTER TABLE "_services_v_blocks_process_steps" DROP CONSTRAINT "_services_v_blocks_process_steps_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_process_steps_image_idx";
  DROP INDEX "_pages_v_blocks_process_steps_image_idx";
  DROP INDEX "services_blocks_process_steps_image_idx";
  DROP INDEX "_services_v_blocks_process_steps_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_process_steps" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "caption";
  ALTER TABLE "_pages_v_blocks_process_steps" DROP COLUMN "image_id";
  ALTER TABLE "services_blocks_hero" DROP COLUMN "caption";
  ALTER TABLE "services_blocks_process_steps" DROP COLUMN "image_id";
  ALTER TABLE "_services_v_blocks_hero" DROP COLUMN "caption";
  ALTER TABLE "_services_v_blocks_process_steps" DROP COLUMN "image_id";`)
}
