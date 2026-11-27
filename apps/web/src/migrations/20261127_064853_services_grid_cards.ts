import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_services_grid_variant" ADD VALUE 'cards';
  ALTER TYPE "public"."enum__pages_v_blocks_services_grid_variant" ADD VALUE 'cards';
  ALTER TYPE "public"."enum_services_blocks_services_grid_variant" ADD VALUE 'cards';
  ALTER TYPE "public"."enum__services_v_blocks_services_grid_variant" ADD VALUE 'cards';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  UPDATE "pages_blocks_services_grid" SET "variant" = 'index' WHERE "variant" = 'cards';
  UPDATE "_pages_v_blocks_services_grid" SET "variant" = 'index' WHERE "variant" = 'cards';
  UPDATE "services_blocks_services_grid" SET "variant" = 'index' WHERE "variant" = 'cards';
  UPDATE "_services_v_blocks_services_grid" SET "variant" = 'index' WHERE "variant" = 'cards';
   ALTER TABLE "pages_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::text;
  DROP TYPE "public"."enum_pages_blocks_services_grid_variant";
  CREATE TYPE "public"."enum_pages_blocks_services_grid_variant" AS ENUM('index');
  ALTER TABLE "pages_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::"public"."enum_pages_blocks_services_grid_variant";
  ALTER TABLE "pages_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_services_grid_variant" USING "variant"::"public"."enum_pages_blocks_services_grid_variant";
  ALTER TABLE "_pages_v_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::text;
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_variant" AS ENUM('index');
  ALTER TABLE "_pages_v_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::"public"."enum__pages_v_blocks_services_grid_variant";
  ALTER TABLE "_pages_v_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_services_grid_variant" USING "variant"::"public"."enum__pages_v_blocks_services_grid_variant";
  ALTER TABLE "services_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "services_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::text;
  DROP TYPE "public"."enum_services_blocks_services_grid_variant";
  CREATE TYPE "public"."enum_services_blocks_services_grid_variant" AS ENUM('index');
  ALTER TABLE "services_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::"public"."enum_services_blocks_services_grid_variant";
  ALTER TABLE "services_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_services_grid_variant" USING "variant"::"public"."enum_services_blocks_services_grid_variant";
  ALTER TABLE "_services_v_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::text;
  DROP TYPE "public"."enum__services_v_blocks_services_grid_variant";
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_variant" AS ENUM('index');
  ALTER TABLE "_services_v_blocks_services_grid" ALTER COLUMN "variant" SET DEFAULT 'index'::"public"."enum__services_v_blocks_services_grid_variant";
  ALTER TABLE "_services_v_blocks_services_grid" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_services_grid_variant" USING "variant"::"public"."enum__services_v_blocks_services_grid_variant";`)
}
