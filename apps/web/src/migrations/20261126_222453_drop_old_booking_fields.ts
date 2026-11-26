import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "booking_settings_visible_fields" CASCADE;
  DROP TABLE "booking_settings_required_fields" CASCADE;
  DROP TYPE "public"."enum_booking_settings_visible_fields";
  DROP TYPE "public"."enum_booking_settings_required_fields";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_booking_settings_visible_fields" AS ENUM('service', 'vehicle', 'date', 'time', 'pickup', 'dropoff', 'passengers', 'luggage', 'flightNumber', 'name', 'email', 'phone', 'notes');
  CREATE TYPE "public"."enum_booking_settings_required_fields" AS ENUM('service', 'vehicle', 'date', 'time', 'pickup', 'dropoff', 'passengers', 'luggage', 'flightNumber', 'name', 'email', 'phone', 'notes');
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
  
  ALTER TABLE "booking_settings_visible_fields" ADD CONSTRAINT "booking_settings_visible_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."booking_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "booking_settings_required_fields" ADD CONSTRAINT "booking_settings_required_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."booking_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "booking_settings_visible_fields_order_idx" ON "booking_settings_visible_fields" USING btree ("order");
  CREATE INDEX "booking_settings_visible_fields_parent_idx" ON "booking_settings_visible_fields" USING btree ("parent_id");
  CREATE INDEX "booking_settings_required_fields_order_idx" ON "booking_settings_required_fields" USING btree ("order");
  CREATE INDEX "booking_settings_required_fields_parent_idx" ON "booking_settings_required_fields" USING btree ("parent_id");`)
}
