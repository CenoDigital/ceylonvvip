import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_ctas_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('page', 'home');
  CREATE TYPE "public"."enum_pages_blocks_hero_media_type" AS ENUM('image', 'video', 'slider', 'none');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw', 'hero-intro');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_variant" AS ENUM('detail', 'statement', 'story');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_variant" AS ENUM('index');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_variant" AS ENUM('specs', 'teaser');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_compare" AS ENUM('class', 'seats', 'luggage', 'features');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_fleet_comparison_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_items_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_items_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_items_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_items_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_variant" AS ENUM('large', 'small', 'signature', 'title');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_stats_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_image_text_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_image_text_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_image_text_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_image_text_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_image_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_image_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_image_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_image_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_gallery_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_gallery_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_faq_variant" AS ENUM('list');
  CREATE TYPE "public"."enum_pages_blocks_faq_source" AS ENUM('topic', 'chosen');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_faq_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_variant" AS ENUM('steps');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_variant" AS ENUM('enquiry', 'next');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_next_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_form_variant" AS ENUM('booking');
  CREATE TYPE "public"."enum_pages_blocks_form_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_form_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_form_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_form_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_map_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_map_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_map_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_map_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_map_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_pages_blocks_spacer_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('page', 'home');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_media_type" AS ENUM('image', 'video', 'slider', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw', 'hero-intro');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_variant" AS ENUM('detail', 'statement', 'story');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_variant" AS ENUM('index');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_variant" AS ENUM('specs', 'teaser');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_compare" AS ENUM('class', 'seats', 'luggage', 'features');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_items_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_variant" AS ENUM('large', 'small', 'signature', 'title');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_variant" AS ENUM('list');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_source" AS ENUM('topic', 'chosen');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_variant" AS ENUM('steps');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_variant" AS ENUM('enquiry', 'next');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_next_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_form_variant" AS ENUM('booking');
  CREATE TYPE "public"."enum__pages_v_blocks_form_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_form_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_form_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_form_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_map_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_map_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_map_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_map_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_map_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_hero_ctas_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('page', 'home');
  CREATE TYPE "public"."enum_services_blocks_hero_media_type" AS ENUM('image', 'video', 'slider', 'none');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_hero_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw', 'hero-intro');
  CREATE TYPE "public"."enum_services_blocks_rich_text_variant" AS ENUM('detail', 'statement', 'story');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_rich_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_services_grid_variant" AS ENUM('index');
  CREATE TYPE "public"."enum_services_blocks_services_grid_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_services_blocks_services_grid_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_services_grid_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_services_grid_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_services_grid_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_variant" AS ENUM('specs', 'teaser');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_vehicle_showcase_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_compare" AS ENUM('class', 'seats', 'luggage', 'features');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_fleet_comparison_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_feature_list_items_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_feature_list_items_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_feature_list_items_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_feature_list_items_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_feature_list_variant" AS ENUM('large', 'small', 'signature', 'title');
  CREATE TYPE "public"."enum_services_blocks_feature_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_feature_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_feature_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_feature_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_stats_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_stats_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_image_text_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_services_blocks_image_text_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_image_text_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_image_text_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_image_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_image_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_image_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_image_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_gallery_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_gallery_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_gallery_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_gallery_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_gallery_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_testimonials_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_testimonials_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_testimonials_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_faq_variant" AS ENUM('list');
  CREATE TYPE "public"."enum_services_blocks_faq_source" AS ENUM('topic', 'chosen');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_faq_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_process_steps_variant" AS ENUM('steps');
  CREATE TYPE "public"."enum_services_blocks_process_steps_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_process_steps_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_process_steps_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_process_steps_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_variant" AS ENUM('enquiry', 'next');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_next_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_cta_banner_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_form_variant" AS ENUM('booking');
  CREATE TYPE "public"."enum_services_blocks_form_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_form_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_form_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_form_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_map_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_map_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_map_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_map_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_map_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_logo_strip_variant" AS ENUM('default');
  CREATE TYPE "public"."enum_services_blocks_logo_strip_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum_services_blocks_logo_strip_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_logo_strip_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_services_blocks_logo_strip_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum_services_blocks_spacer_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_hero_ctas_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('page', 'home');
  CREATE TYPE "public"."enum__services_v_blocks_hero_media_type" AS ENUM('image', 'video', 'slider', 'none');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_hero_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw', 'hero-intro');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_variant" AS ENUM('detail', 'statement', 'story');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_variant" AS ENUM('index');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_services_grid_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_variant" AS ENUM('specs', 'teaser');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_compare" AS ENUM('class', 'seats', 'luggage', 'features');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_items_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_items_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_items_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_items_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_variant" AS ENUM('large', 'small', 'signature', 'title');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_feature_list_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_stats_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_stats_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_image_text_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_gallery_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_source" AS ENUM('all', 'chosen');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_testimonials_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_faq_variant" AS ENUM('list');
  CREATE TYPE "public"."enum__services_v_blocks_faq_source" AS ENUM('topic', 'chosen');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_faq_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_variant" AS ENUM('steps');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_process_steps_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_variant" AS ENUM('enquiry', 'next');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_cta_appearance" AS ENUM('button', 'link');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_cta_icon" AS ENUM('arrow-left', 'arrow-right', 'arrow-up-right', 'bed', 'calendar', 'car', 'check', 'chevron-down', 'clock', 'compass', 'droplet', 'gem', 'glass-water', 'globe', 'heart', 'home', 'map-pin', 'menu', 'phone', 'plane', 'shield', 'square', 'square-check', 'whatsapp', 'wifi', 'x');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_cta_link_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_next_type" AS ENUM('internal', 'url', 'phone', 'whatsapp', 'email');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_cta_banner_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_form_variant" AS ENUM('booking');
  CREATE TYPE "public"."enum__services_v_blocks_form_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_form_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_form_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_form_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_map_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_map_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_map_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_map_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_map_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_logo_strip_variant" AS ENUM('default');
  CREATE TYPE "public"."enum__services_v_blocks_logo_strip_settings_bg" AS ENUM('default', 'card');
  CREATE TYPE "public"."enum__services_v_blocks_logo_strip_settings_pt" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_logo_strip_settings_pb" AS ENUM('none', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__services_v_blocks_logo_strip_settings_anim" AS ENUM('none', 'fade-up', 'stagger-children', 'reveal-mask', 'image-parallax', 'counter', 'line-draw');
  CREATE TYPE "public"."enum__services_v_blocks_spacer_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_hero_ctas_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_hero_ctas_cta_icon",
  	"cta_link_type" "enum_pages_blocks_hero_ctas_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"media_type" "enum_pages_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"settings_bg" "enum_pages_blocks_hero_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_hero_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_hero_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_hero_settings_anim" DEFAULT 'hero-intro',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_rich_text_variant" DEFAULT 'detail',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"settings_bg" "enum_pages_blocks_rich_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_rich_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_rich_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_rich_text_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_services_grid_variant" DEFAULT 'index',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_pages_blocks_services_grid_source" DEFAULT 'all',
  	"settings_bg" "enum_pages_blocks_services_grid_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_services_grid_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_services_grid_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_services_grid_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vehicle_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_vehicle_showcase_variant" DEFAULT 'specs',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_pages_blocks_vehicle_showcase_source" DEFAULT 'all',
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_vehicle_showcase_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_vehicle_showcase_cta_icon",
  	"cta_link_type" "enum_pages_blocks_vehicle_showcase_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_pages_blocks_vehicle_showcase_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_vehicle_showcase_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_vehicle_showcase_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_vehicle_showcase_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_fleet_comparison_compare" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_fleet_comparison_compare",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_fleet_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_fleet_comparison_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_pages_blocks_fleet_comparison_source" DEFAULT 'all',
  	"settings_bg" "enum_pages_blocks_fleet_comparison_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_fleet_comparison_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_fleet_comparison_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_fleet_comparison_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon" "enum_pages_blocks_feature_list_items_icon",
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_feature_list_items_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_feature_list_items_cta_icon",
  	"cta_link_type" "enum_pages_blocks_feature_list_items_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_feature_list_variant" DEFAULT 'large',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_feature_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_feature_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_feature_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_feature_list_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_stats_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_stats_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_stats_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_stats_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_stats_settings_anim" DEFAULT 'counter',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_image_text_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_image_text_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_image_text_cta_icon",
  	"cta_link_type" "enum_pages_blocks_image_text_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_pages_blocks_image_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_image_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_image_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_image_text_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_gallery_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_gallery_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_gallery_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_gallery_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_gallery_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_testimonials_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_pages_blocks_testimonials_source" DEFAULT 'all',
  	"settings_bg" "enum_pages_blocks_testimonials_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_testimonials_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_testimonials_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_testimonials_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_faq_variant" DEFAULT 'list',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_pages_blocks_faq_source" DEFAULT 'topic',
  	"topic" varchar,
  	"settings_bg" "enum_pages_blocks_faq_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_faq_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_faq_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_faq_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_pricing_table_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_pricing_table_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_pricing_table_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_pricing_table_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_pricing_table_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_process_steps_variant" DEFAULT 'steps',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_process_steps_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_process_steps_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_process_steps_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_process_steps_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_cta_banner_variant" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_pages_blocks_cta_banner_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_pages_blocks_cta_banner_cta_icon",
  	"cta_link_type" "enum_pages_blocks_cta_banner_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"show_phone" boolean DEFAULT true,
  	"next_type" "enum_pages_blocks_cta_banner_next_type" DEFAULT 'internal',
  	"next_url" varchar,
  	"next_phone" varchar,
  	"next_message" varchar,
  	"next_email" varchar,
  	"next_new_tab" boolean,
  	"settings_bg" "enum_pages_blocks_cta_banner_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_cta_banner_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_cta_banner_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_cta_banner_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_form_variant" DEFAULT 'booking',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"service_id" integer,
  	"settings_bg" "enum_pages_blocks_form_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_form_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_form_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_form_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_map_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"use_business_address" boolean DEFAULT true,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 14,
  	"settings_bg" "enum_pages_blocks_map_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_map_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_map_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_map_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_logo_strip_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_pages_blocks_logo_strip_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_pages_blocks_logo_strip_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_pages_blocks_logo_strip_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_pages_blocks_logo_strip_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_spacer_size" DEFAULT 'md',
  	"divider" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"vehicles_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"pricing_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_hero_ctas_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_hero_ctas_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_hero_ctas_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"media_type" "enum__pages_v_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"settings_bg" "enum__pages_v_blocks_hero_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_hero_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_hero_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_hero_settings_anim" DEFAULT 'hero-intro',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_rich_text_variant" DEFAULT 'detail',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"settings_bg" "enum__pages_v_blocks_rich_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_rich_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_rich_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_rich_text_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_services_grid_variant" DEFAULT 'index',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__pages_v_blocks_services_grid_source" DEFAULT 'all',
  	"settings_bg" "enum__pages_v_blocks_services_grid_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_services_grid_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_services_grid_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_services_grid_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vehicle_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_vehicle_showcase_variant" DEFAULT 'specs',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__pages_v_blocks_vehicle_showcase_source" DEFAULT 'all',
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_vehicle_showcase_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_vehicle_showcase_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_vehicle_showcase_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__pages_v_blocks_vehicle_showcase_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_vehicle_showcase_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_vehicle_showcase_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_vehicle_showcase_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_fleet_comparison_compare" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_fleet_comparison_compare",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_fleet_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_fleet_comparison_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__pages_v_blocks_fleet_comparison_source" DEFAULT 'all',
  	"settings_bg" "enum__pages_v_blocks_fleet_comparison_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_fleet_comparison_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_fleet_comparison_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_fleet_comparison_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon" "enum__pages_v_blocks_feature_list_items_icon",
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_feature_list_items_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_feature_list_items_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_feature_list_items_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_feature_list_variant" DEFAULT 'large',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_feature_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_feature_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_feature_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_feature_list_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_stats_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_stats_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_stats_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_stats_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_stats_settings_anim" DEFAULT 'counter',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_image_text_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_image_text_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_image_text_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_image_text_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__pages_v_blocks_image_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_image_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_image_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_image_text_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_gallery_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_gallery_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_gallery_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_gallery_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_gallery_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_testimonials_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__pages_v_blocks_testimonials_source" DEFAULT 'all',
  	"settings_bg" "enum__pages_v_blocks_testimonials_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_testimonials_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_testimonials_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_testimonials_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_faq_variant" DEFAULT 'list',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__pages_v_blocks_faq_source" DEFAULT 'topic',
  	"topic" varchar,
  	"settings_bg" "enum__pages_v_blocks_faq_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_faq_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_faq_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_faq_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_pricing_table_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_pricing_table_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_pricing_table_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_pricing_table_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_pricing_table_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_process_steps_variant" DEFAULT 'steps',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_process_steps_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_process_steps_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_process_steps_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_process_steps_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_cta_banner_variant" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__pages_v_blocks_cta_banner_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__pages_v_blocks_cta_banner_cta_icon",
  	"cta_link_type" "enum__pages_v_blocks_cta_banner_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"show_phone" boolean DEFAULT true,
  	"next_type" "enum__pages_v_blocks_cta_banner_next_type" DEFAULT 'internal',
  	"next_url" varchar,
  	"next_phone" varchar,
  	"next_message" varchar,
  	"next_email" varchar,
  	"next_new_tab" boolean,
  	"settings_bg" "enum__pages_v_blocks_cta_banner_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_cta_banner_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_cta_banner_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_cta_banner_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_form_variant" DEFAULT 'booking',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"service_id" integer,
  	"settings_bg" "enum__pages_v_blocks_form_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_form_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_form_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_form_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_map_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"use_business_address" boolean DEFAULT true,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 14,
  	"settings_bg" "enum__pages_v_blocks_map_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_map_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_map_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_map_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_logo_strip_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__pages_v_blocks_logo_strip_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__pages_v_blocks_logo_strip_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__pages_v_blocks_logo_strip_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__pages_v_blocks_logo_strip_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_spacer_size" DEFAULT 'md',
  	"divider" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"vehicles_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"pricing_id" integer
  );
  
  CREATE TABLE "services_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_hero_ctas_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_hero_ctas_cta_icon",
  	"cta_link_type" "enum_services_blocks_hero_ctas_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"media_type" "enum_services_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"settings_bg" "enum_services_blocks_hero_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_hero_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_hero_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_hero_settings_anim" DEFAULT 'hero-intro',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_rich_text_variant" DEFAULT 'detail',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"settings_bg" "enum_services_blocks_rich_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_rich_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_rich_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_rich_text_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_services_grid_variant" DEFAULT 'index',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_services_blocks_services_grid_source" DEFAULT 'all',
  	"settings_bg" "enum_services_blocks_services_grid_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_services_grid_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_services_grid_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_services_grid_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_vehicle_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_vehicle_showcase_variant" DEFAULT 'specs',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_services_blocks_vehicle_showcase_source" DEFAULT 'all',
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_vehicle_showcase_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_vehicle_showcase_cta_icon",
  	"cta_link_type" "enum_services_blocks_vehicle_showcase_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_services_blocks_vehicle_showcase_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_vehicle_showcase_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_vehicle_showcase_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_vehicle_showcase_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_fleet_comparison_compare" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_services_blocks_fleet_comparison_compare",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_blocks_fleet_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_fleet_comparison_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_services_blocks_fleet_comparison_source" DEFAULT 'all',
  	"settings_bg" "enum_services_blocks_fleet_comparison_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_fleet_comparison_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_fleet_comparison_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_fleet_comparison_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon" "enum_services_blocks_feature_list_items_icon",
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_feature_list_items_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_feature_list_items_cta_icon",
  	"cta_link_type" "enum_services_blocks_feature_list_items_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean
  );
  
  CREATE TABLE "services_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_feature_list_variant" DEFAULT 'large',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_feature_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_feature_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_feature_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_feature_list_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_stats_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_stats_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_stats_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_stats_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_stats_settings_anim" DEFAULT 'counter',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_image_text_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_services_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_image_text_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_image_text_cta_icon",
  	"cta_link_type" "enum_services_blocks_image_text_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum_services_blocks_image_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_image_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_image_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_image_text_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_gallery_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_gallery_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_gallery_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_gallery_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_gallery_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_testimonials_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_services_blocks_testimonials_source" DEFAULT 'all',
  	"settings_bg" "enum_services_blocks_testimonials_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_testimonials_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_testimonials_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_testimonials_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_faq_variant" DEFAULT 'list',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum_services_blocks_faq_source" DEFAULT 'topic',
  	"topic" varchar,
  	"settings_bg" "enum_services_blocks_faq_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_faq_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_faq_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_faq_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_pricing_table_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_pricing_table_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_pricing_table_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_pricing_table_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_pricing_table_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_process_steps_variant" DEFAULT 'steps',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_process_steps_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_process_steps_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_process_steps_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_process_steps_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_cta_banner_variant" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum_services_blocks_cta_banner_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum_services_blocks_cta_banner_cta_icon",
  	"cta_link_type" "enum_services_blocks_cta_banner_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"show_phone" boolean DEFAULT true,
  	"next_type" "enum_services_blocks_cta_banner_next_type" DEFAULT 'internal',
  	"next_url" varchar,
  	"next_phone" varchar,
  	"next_message" varchar,
  	"next_email" varchar,
  	"next_new_tab" boolean,
  	"settings_bg" "enum_services_blocks_cta_banner_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_cta_banner_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_cta_banner_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_cta_banner_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_form_variant" DEFAULT 'booking',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"service_id" integer,
  	"settings_bg" "enum_services_blocks_form_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_form_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_form_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_form_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_map_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"use_business_address" boolean DEFAULT true,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 14,
  	"settings_bg" "enum_services_blocks_map_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_map_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_map_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_map_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "services_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_logo_strip_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum_services_blocks_logo_strip_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum_services_blocks_logo_strip_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum_services_blocks_logo_strip_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum_services_blocks_logo_strip_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_services_blocks_spacer_size" DEFAULT 'md',
  	"divider" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_hero_ctas_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_hero_ctas_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_hero_ctas_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'page',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"media_type" "enum__services_v_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"settings_bg" "enum__services_v_blocks_hero_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_hero_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_hero_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_hero_settings_anim" DEFAULT 'hero-intro',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_rich_text_variant" DEFAULT 'detail',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"settings_bg" "enum__services_v_blocks_rich_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_rich_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_rich_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_rich_text_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_services_grid_variant" DEFAULT 'index',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__services_v_blocks_services_grid_source" DEFAULT 'all',
  	"settings_bg" "enum__services_v_blocks_services_grid_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_services_grid_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_services_grid_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_services_grid_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_vehicle_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_vehicle_showcase_variant" DEFAULT 'specs',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__services_v_blocks_vehicle_showcase_source" DEFAULT 'all',
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_vehicle_showcase_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_vehicle_showcase_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_vehicle_showcase_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__services_v_blocks_vehicle_showcase_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_vehicle_showcase_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_vehicle_showcase_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_vehicle_showcase_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_fleet_comparison_compare" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__services_v_blocks_fleet_comparison_compare",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_services_v_blocks_fleet_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_fleet_comparison_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__services_v_blocks_fleet_comparison_source" DEFAULT 'all',
  	"settings_bg" "enum__services_v_blocks_fleet_comparison_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_fleet_comparison_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_fleet_comparison_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_fleet_comparison_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"icon" "enum__services_v_blocks_feature_list_items_icon",
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_feature_list_items_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_feature_list_items_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_feature_list_items_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_feature_list_variant" DEFAULT 'large',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_feature_list_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_feature_list_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_feature_list_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_feature_list_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_stats_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_stats_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_stats_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_stats_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_stats_settings_anim" DEFAULT 'counter',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_image_text_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__services_v_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_image_text_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_image_text_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_image_text_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"settings_bg" "enum__services_v_blocks_image_text_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_image_text_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_image_text_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_image_text_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_gallery_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_gallery_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_gallery_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_gallery_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_gallery_settings_anim" DEFAULT 'reveal-mask',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_testimonials_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__services_v_blocks_testimonials_source" DEFAULT 'all',
  	"settings_bg" "enum__services_v_blocks_testimonials_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_testimonials_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_testimonials_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_testimonials_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_faq_variant" DEFAULT 'list',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"source" "enum__services_v_blocks_faq_source" DEFAULT 'topic',
  	"topic" varchar,
  	"settings_bg" "enum__services_v_blocks_faq_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_faq_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_faq_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_faq_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_pricing_table_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_pricing_table_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_pricing_table_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_pricing_table_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_pricing_table_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_process_steps_variant" DEFAULT 'steps',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_process_steps_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_process_steps_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_process_steps_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_process_steps_settings_anim" DEFAULT 'stagger-children',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_cta_banner_variant" DEFAULT 'enquiry',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_appearance" "enum__services_v_blocks_cta_banner_cta_appearance" DEFAULT 'button',
  	"cta_icon" "enum__services_v_blocks_cta_banner_cta_icon",
  	"cta_link_type" "enum__services_v_blocks_cta_banner_cta_link_type" DEFAULT 'internal',
  	"cta_link_url" varchar,
  	"cta_link_phone" varchar,
  	"cta_link_message" varchar,
  	"cta_link_email" varchar,
  	"cta_link_new_tab" boolean,
  	"show_phone" boolean DEFAULT true,
  	"next_type" "enum__services_v_blocks_cta_banner_next_type" DEFAULT 'internal',
  	"next_url" varchar,
  	"next_phone" varchar,
  	"next_message" varchar,
  	"next_email" varchar,
  	"next_new_tab" boolean,
  	"settings_bg" "enum__services_v_blocks_cta_banner_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_cta_banner_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_cta_banner_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_cta_banner_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_form_variant" DEFAULT 'booking',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"service_id" integer,
  	"settings_bg" "enum__services_v_blocks_form_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_form_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_form_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_form_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_map_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"use_business_address" boolean DEFAULT true,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 14,
  	"settings_bg" "enum__services_v_blocks_map_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_map_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_map_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_map_settings_anim" DEFAULT 'none',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_logo_strip_variant" DEFAULT 'default',
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_intro" varchar,
  	"settings_bg" "enum__services_v_blocks_logo_strip_settings_bg" DEFAULT 'default',
  	"settings_pt" "enum__services_v_blocks_logo_strip_settings_pt" DEFAULT 'lg',
  	"settings_pb" "enum__services_v_blocks_logo_strip_settings_pb" DEFAULT 'lg',
  	"settings_anim" "enum__services_v_blocks_logo_strip_settings_anim" DEFAULT 'fade-up',
  	"settings_anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__services_v_blocks_spacer_size" DEFAULT 'md',
  	"divider" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "services_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vehicle_showcase" ADD CONSTRAINT "pages_blocks_vehicle_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fleet_comparison_compare" ADD CONSTRAINT "pages_blocks_fleet_comparison_compare_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_fleet_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_fleet_comparison" ADD CONSTRAINT "pages_blocks_fleet_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_list_items" ADD CONSTRAINT "pages_blocks_feature_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_list_items" ADD CONSTRAINT "pages_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_list" ADD CONSTRAINT "pages_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip_logos" ADD CONSTRAINT "pages_blocks_logo_strip_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip_logos" ADD CONSTRAINT "pages_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip" ADD CONSTRAINT "pages_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_vehicles_fk" FOREIGN KEY ("vehicles_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pricing_fk" FOREIGN KEY ("pricing_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vehicle_showcase" ADD CONSTRAINT "_pages_v_blocks_vehicle_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fleet_comparison_compare" ADD CONSTRAINT "_pages_v_blocks_fleet_comparison_compare_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_fleet_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_fleet_comparison" ADD CONSTRAINT "_pages_v_blocks_fleet_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD CONSTRAINT "_pages_v_blocks_feature_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_list_items" ADD CONSTRAINT "_pages_v_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_list" ADD CONSTRAINT "_pages_v_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table" ADD CONSTRAINT "_pages_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip_logos" ADD CONSTRAINT "_pages_v_blocks_logo_strip_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip_logos" ADD CONSTRAINT "_pages_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip" ADD CONSTRAINT "_pages_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer" ADD CONSTRAINT "_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_vehicles_fk" FOREIGN KEY ("vehicles_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pricing_fk" FOREIGN KEY ("pricing_id") REFERENCES "public"."pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_ctas" ADD CONSTRAINT "services_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid" ADD CONSTRAINT "services_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_vehicle_showcase" ADD CONSTRAINT "services_blocks_vehicle_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_fleet_comparison_compare" ADD CONSTRAINT "services_blocks_fleet_comparison_compare_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services_blocks_fleet_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_fleet_comparison" ADD CONSTRAINT "services_blocks_fleet_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_list_items" ADD CONSTRAINT "services_blocks_feature_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_list_items" ADD CONSTRAINT "services_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_list" ADD CONSTRAINT "services_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats_items" ADD CONSTRAINT "services_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_stats" ADD CONSTRAINT "services_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text" ADD CONSTRAINT "services_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image_text" ADD CONSTRAINT "services_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery" ADD CONSTRAINT "services_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials" ADD CONSTRAINT "services_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table" ADD CONSTRAINT "services_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps_steps" ADD CONSTRAINT "services_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_process_steps" ADD CONSTRAINT "services_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_banner" ADD CONSTRAINT "services_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_form" ADD CONSTRAINT "services_blocks_form_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_form" ADD CONSTRAINT "services_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_map" ADD CONSTRAINT "services_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_strip_logos" ADD CONSTRAINT "services_blocks_logo_strip_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_strip_logos" ADD CONSTRAINT "services_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_strip" ADD CONSTRAINT "services_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_spacer" ADD CONSTRAINT "services_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero_ctas" ADD CONSTRAINT "_services_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_grid" ADD CONSTRAINT "_services_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_vehicle_showcase" ADD CONSTRAINT "_services_v_blocks_vehicle_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_fleet_comparison_compare" ADD CONSTRAINT "_services_v_blocks_fleet_comparison_compare_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v_blocks_fleet_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_fleet_comparison" ADD CONSTRAINT "_services_v_blocks_fleet_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD CONSTRAINT "_services_v_blocks_feature_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_list_items" ADD CONSTRAINT "_services_v_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_list" ADD CONSTRAINT "_services_v_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats_items" ADD CONSTRAINT "_services_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_stats" ADD CONSTRAINT "_services_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text" ADD CONSTRAINT "_services_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_text" ADD CONSTRAINT "_services_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_gallery" ADD CONSTRAINT "_services_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonials" ADD CONSTRAINT "_services_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq" ADD CONSTRAINT "_services_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing_table" ADD CONSTRAINT "_services_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_process_steps" ADD CONSTRAINT "_services_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_banner" ADD CONSTRAINT "_services_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form" ADD CONSTRAINT "_services_v_blocks_form_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form" ADD CONSTRAINT "_services_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_map" ADD CONSTRAINT "_services_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_strip_logos" ADD CONSTRAINT "_services_v_blocks_logo_strip_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_strip_logos" ADD CONSTRAINT "_services_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_strip" ADD CONSTRAINT "_services_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_spacer" ADD CONSTRAINT "_services_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_video_idx" ON "pages_blocks_hero" USING btree ("video_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_vehicle_showcase_order_idx" ON "pages_blocks_vehicle_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_vehicle_showcase_parent_id_idx" ON "pages_blocks_vehicle_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vehicle_showcase_path_idx" ON "pages_blocks_vehicle_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_fleet_comparison_compare_order_idx" ON "pages_blocks_fleet_comparison_compare" USING btree ("order");
  CREATE INDEX "pages_blocks_fleet_comparison_compare_parent_idx" ON "pages_blocks_fleet_comparison_compare" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_fleet_comparison_order_idx" ON "pages_blocks_fleet_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_fleet_comparison_parent_id_idx" ON "pages_blocks_fleet_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_fleet_comparison_path_idx" ON "pages_blocks_fleet_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_list_items_order_idx" ON "pages_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_list_items_parent_id_idx" ON "pages_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_list_items_image_idx" ON "pages_blocks_feature_list_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_list_order_idx" ON "pages_blocks_feature_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_list_parent_id_idx" ON "pages_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_list_path_idx" ON "pages_blocks_feature_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_service_idx" ON "pages_blocks_form" USING btree ("service_id");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_strip_logos_order_idx" ON "pages_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_strip_logos_parent_id_idx" ON "pages_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_strip_logos_logo_idx" ON "pages_blocks_logo_strip_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_strip_order_idx" ON "pages_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_strip_parent_id_idx" ON "pages_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_strip_path_idx" ON "pages_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_vehicles_id_idx" ON "pages_rels" USING btree ("vehicles_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_pricing_id_idx" ON "pages_rels" USING btree ("pricing_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_video_idx" ON "_pages_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vehicle_showcase_order_idx" ON "_pages_v_blocks_vehicle_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vehicle_showcase_parent_id_idx" ON "_pages_v_blocks_vehicle_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vehicle_showcase_path_idx" ON "_pages_v_blocks_vehicle_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_fleet_comparison_compare_order_idx" ON "_pages_v_blocks_fleet_comparison_compare" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_fleet_comparison_compare_parent_idx" ON "_pages_v_blocks_fleet_comparison_compare" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_fleet_comparison_order_idx" ON "_pages_v_blocks_fleet_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_fleet_comparison_parent_id_idx" ON "_pages_v_blocks_fleet_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_fleet_comparison_path_idx" ON "_pages_v_blocks_fleet_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_list_items_order_idx" ON "_pages_v_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_list_items_parent_id_idx" ON "_pages_v_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_list_items_image_idx" ON "_pages_v_blocks_feature_list_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_list_order_idx" ON "_pages_v_blocks_feature_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_list_parent_id_idx" ON "_pages_v_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_list_path_idx" ON "_pages_v_blocks_feature_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_table_order_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_parent_id_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_path_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_service_idx" ON "_pages_v_blocks_form" USING btree ("service_id");
  CREATE INDEX "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_strip_logos_order_idx" ON "_pages_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_strip_logos_parent_id_idx" ON "_pages_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_logos_logo_idx" ON "_pages_v_blocks_logo_strip_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_order_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_strip_parent_id_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_path_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_order_idx" ON "_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_parent_id_idx" ON "_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_path_idx" ON "_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_vehicles_id_idx" ON "_pages_v_rels" USING btree ("vehicles_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_pricing_id_idx" ON "_pages_v_rels" USING btree ("pricing_id");
  CREATE INDEX "services_blocks_hero_ctas_order_idx" ON "services_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_ctas_parent_id_idx" ON "services_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_image_idx" ON "services_blocks_hero" USING btree ("image_id");
  CREATE INDEX "services_blocks_hero_video_idx" ON "services_blocks_hero" USING btree ("video_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "services_blocks_services_grid_order_idx" ON "services_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_services_grid_parent_id_idx" ON "services_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_path_idx" ON "services_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_vehicle_showcase_order_idx" ON "services_blocks_vehicle_showcase" USING btree ("_order");
  CREATE INDEX "services_blocks_vehicle_showcase_parent_id_idx" ON "services_blocks_vehicle_showcase" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_vehicle_showcase_path_idx" ON "services_blocks_vehicle_showcase" USING btree ("_path");
  CREATE INDEX "services_blocks_fleet_comparison_compare_order_idx" ON "services_blocks_fleet_comparison_compare" USING btree ("order");
  CREATE INDEX "services_blocks_fleet_comparison_compare_parent_idx" ON "services_blocks_fleet_comparison_compare" USING btree ("parent_id");
  CREATE INDEX "services_blocks_fleet_comparison_order_idx" ON "services_blocks_fleet_comparison" USING btree ("_order");
  CREATE INDEX "services_blocks_fleet_comparison_parent_id_idx" ON "services_blocks_fleet_comparison" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_fleet_comparison_path_idx" ON "services_blocks_fleet_comparison" USING btree ("_path");
  CREATE INDEX "services_blocks_feature_list_items_order_idx" ON "services_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_list_items_parent_id_idx" ON "services_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_list_items_image_idx" ON "services_blocks_feature_list_items" USING btree ("image_id");
  CREATE INDEX "services_blocks_feature_list_order_idx" ON "services_blocks_feature_list" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_list_parent_id_idx" ON "services_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_list_path_idx" ON "services_blocks_feature_list" USING btree ("_path");
  CREATE INDEX "services_blocks_stats_items_order_idx" ON "services_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_items_parent_id_idx" ON "services_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_order_idx" ON "services_blocks_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_stats_parent_id_idx" ON "services_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_stats_path_idx" ON "services_blocks_stats" USING btree ("_path");
  CREATE INDEX "services_blocks_image_text_order_idx" ON "services_blocks_image_text" USING btree ("_order");
  CREATE INDEX "services_blocks_image_text_parent_id_idx" ON "services_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_text_path_idx" ON "services_blocks_image_text" USING btree ("_path");
  CREATE INDEX "services_blocks_image_text_image_idx" ON "services_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "services_blocks_gallery_order_idx" ON "services_blocks_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_parent_id_idx" ON "services_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_path_idx" ON "services_blocks_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonials_order_idx" ON "services_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_parent_id_idx" ON "services_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_path_idx" ON "services_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_table_order_idx" ON "services_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_parent_id_idx" ON "services_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_path_idx" ON "services_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "services_blocks_process_steps_steps_order_idx" ON "services_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_steps_parent_id_idx" ON "services_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_steps_order_idx" ON "services_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_process_steps_parent_id_idx" ON "services_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_process_steps_path_idx" ON "services_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_banner_order_idx" ON "services_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_banner_parent_id_idx" ON "services_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_banner_path_idx" ON "services_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "services_blocks_form_order_idx" ON "services_blocks_form" USING btree ("_order");
  CREATE INDEX "services_blocks_form_parent_id_idx" ON "services_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_form_path_idx" ON "services_blocks_form" USING btree ("_path");
  CREATE INDEX "services_blocks_form_service_idx" ON "services_blocks_form" USING btree ("service_id");
  CREATE INDEX "services_blocks_map_order_idx" ON "services_blocks_map" USING btree ("_order");
  CREATE INDEX "services_blocks_map_parent_id_idx" ON "services_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_map_path_idx" ON "services_blocks_map" USING btree ("_path");
  CREATE INDEX "services_blocks_logo_strip_logos_order_idx" ON "services_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_strip_logos_parent_id_idx" ON "services_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_strip_logos_logo_idx" ON "services_blocks_logo_strip_logos" USING btree ("logo_id");
  CREATE INDEX "services_blocks_logo_strip_order_idx" ON "services_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_strip_parent_id_idx" ON "services_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_strip_path_idx" ON "services_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "services_blocks_spacer_order_idx" ON "services_blocks_spacer" USING btree ("_order");
  CREATE INDEX "services_blocks_spacer_parent_id_idx" ON "services_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_spacer_path_idx" ON "services_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_ctas_order_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_ctas_parent_id_idx" ON "_services_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_image_idx" ON "_services_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_hero_video_idx" ON "_services_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_services_grid_order_idx" ON "_services_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_grid_parent_id_idx" ON "_services_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_grid_path_idx" ON "_services_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_vehicle_showcase_order_idx" ON "_services_v_blocks_vehicle_showcase" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_vehicle_showcase_parent_id_idx" ON "_services_v_blocks_vehicle_showcase" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_vehicle_showcase_path_idx" ON "_services_v_blocks_vehicle_showcase" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_fleet_comparison_compare_order_idx" ON "_services_v_blocks_fleet_comparison_compare" USING btree ("order");
  CREATE INDEX "_services_v_blocks_fleet_comparison_compare_parent_idx" ON "_services_v_blocks_fleet_comparison_compare" USING btree ("parent_id");
  CREATE INDEX "_services_v_blocks_fleet_comparison_order_idx" ON "_services_v_blocks_fleet_comparison" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_fleet_comparison_parent_id_idx" ON "_services_v_blocks_fleet_comparison" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_fleet_comparison_path_idx" ON "_services_v_blocks_fleet_comparison" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_feature_list_items_order_idx" ON "_services_v_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_list_items_parent_id_idx" ON "_services_v_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_list_items_image_idx" ON "_services_v_blocks_feature_list_items" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_feature_list_order_idx" ON "_services_v_blocks_feature_list" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_list_parent_id_idx" ON "_services_v_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_list_path_idx" ON "_services_v_blocks_feature_list" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_stats_items_order_idx" ON "_services_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_items_parent_id_idx" ON "_services_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_order_idx" ON "_services_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_stats_parent_id_idx" ON "_services_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_stats_path_idx" ON "_services_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_text_order_idx" ON "_services_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_text_parent_id_idx" ON "_services_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_image_text_path_idx" ON "_services_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_text_image_idx" ON "_services_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_gallery_order_idx" ON "_services_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_gallery_parent_id_idx" ON "_services_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_gallery_path_idx" ON "_services_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonials_order_idx" ON "_services_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonials_parent_id_idx" ON "_services_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonials_path_idx" ON "_services_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faq_order_idx" ON "_services_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_parent_id_idx" ON "_services_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_path_idx" ON "_services_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_pricing_table_order_idx" ON "_services_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pricing_table_parent_id_idx" ON "_services_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pricing_table_path_idx" ON "_services_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_process_steps_steps_order_idx" ON "_services_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_steps_parent_id_idx" ON "_services_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_order_idx" ON "_services_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_process_steps_parent_id_idx" ON "_services_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_process_steps_path_idx" ON "_services_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_cta_banner_order_idx" ON "_services_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_banner_parent_id_idx" ON "_services_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_banner_path_idx" ON "_services_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_form_order_idx" ON "_services_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_form_parent_id_idx" ON "_services_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_form_path_idx" ON "_services_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_form_service_idx" ON "_services_v_blocks_form" USING btree ("service_id");
  CREATE INDEX "_services_v_blocks_map_order_idx" ON "_services_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_map_parent_id_idx" ON "_services_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_map_path_idx" ON "_services_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_logo_strip_logos_order_idx" ON "_services_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_strip_logos_parent_id_idx" ON "_services_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_strip_logos_logo_idx" ON "_services_v_blocks_logo_strip_logos" USING btree ("logo_id");
  CREATE INDEX "_services_v_blocks_logo_strip_order_idx" ON "_services_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_strip_parent_id_idx" ON "_services_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_strip_path_idx" ON "_services_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_spacer_order_idx" ON "_services_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_spacer_parent_id_idx" ON "_services_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_spacer_path_idx" ON "_services_v_blocks_spacer" USING btree ("_path");
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_rels_media_id_idx" ON "services_rels" USING btree ("media_id");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "_services_v_rels_media_id_idx" ON "_services_v_rels" USING btree ("media_id");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vehicle_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_fleet_comparison_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_fleet_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vehicle_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_fleet_comparison_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_fleet_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_vehicle_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_fleet_comparison_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_fleet_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_pricing_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_services_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_vehicle_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_fleet_comparison_compare" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_fleet_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_image_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_pricing_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_cta_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_vehicle_showcase" CASCADE;
  DROP TABLE "pages_blocks_fleet_comparison_compare" CASCADE;
  DROP TABLE "pages_blocks_fleet_comparison" CASCADE;
  DROP TABLE "pages_blocks_feature_list_items" CASCADE;
  DROP TABLE "pages_blocks_feature_list" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_strip" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_vehicle_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_fleet_comparison_compare" CASCADE;
  DROP TABLE "_pages_v_blocks_fleet_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_list" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_map" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_blocks_hero_ctas" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_services_grid" CASCADE;
  DROP TABLE "services_blocks_vehicle_showcase" CASCADE;
  DROP TABLE "services_blocks_fleet_comparison_compare" CASCADE;
  DROP TABLE "services_blocks_fleet_comparison" CASCADE;
  DROP TABLE "services_blocks_feature_list_items" CASCADE;
  DROP TABLE "services_blocks_feature_list" CASCADE;
  DROP TABLE "services_blocks_stats_items" CASCADE;
  DROP TABLE "services_blocks_stats" CASCADE;
  DROP TABLE "services_blocks_image_text" CASCADE;
  DROP TABLE "services_blocks_gallery" CASCADE;
  DROP TABLE "services_blocks_testimonials" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_pricing_table" CASCADE;
  DROP TABLE "services_blocks_process_steps_steps" CASCADE;
  DROP TABLE "services_blocks_process_steps" CASCADE;
  DROP TABLE "services_blocks_cta_banner" CASCADE;
  DROP TABLE "services_blocks_form" CASCADE;
  DROP TABLE "services_blocks_map" CASCADE;
  DROP TABLE "services_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "services_blocks_logo_strip" CASCADE;
  DROP TABLE "services_blocks_spacer" CASCADE;
  DROP TABLE "_services_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_services_grid" CASCADE;
  DROP TABLE "_services_v_blocks_vehicle_showcase" CASCADE;
  DROP TABLE "_services_v_blocks_fleet_comparison_compare" CASCADE;
  DROP TABLE "_services_v_blocks_fleet_comparison" CASCADE;
  DROP TABLE "_services_v_blocks_feature_list_items" CASCADE;
  DROP TABLE "_services_v_blocks_feature_list" CASCADE;
  DROP TABLE "_services_v_blocks_stats_items" CASCADE;
  DROP TABLE "_services_v_blocks_stats" CASCADE;
  DROP TABLE "_services_v_blocks_image_text" CASCADE;
  DROP TABLE "_services_v_blocks_gallery" CASCADE;
  DROP TABLE "_services_v_blocks_testimonials" CASCADE;
  DROP TABLE "_services_v_blocks_faq" CASCADE;
  DROP TABLE "_services_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_services_v_blocks_process_steps" CASCADE;
  DROP TABLE "_services_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_services_v_blocks_form" CASCADE;
  DROP TABLE "_services_v_blocks_map" CASCADE;
  DROP TABLE "_services_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_services_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_services_v_blocks_spacer" CASCADE;
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_media_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_pages_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_services_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_testimonials_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_media_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_pages_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_services_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_testimonials_fk";
  
  DROP INDEX "services_rels_media_id_idx";
  DROP INDEX "services_rels_pages_id_idx";
  DROP INDEX "services_rels_services_id_idx";
  DROP INDEX "services_rels_testimonials_id_idx";
  DROP INDEX "_services_v_rels_media_id_idx";
  DROP INDEX "_services_v_rels_pages_id_idx";
  DROP INDEX "_services_v_rels_services_id_idx";
  DROP INDEX "_services_v_rels_testimonials_id_idx";
  ALTER TABLE "services_rels" DROP COLUMN "media_id";
  ALTER TABLE "services_rels" DROP COLUMN "pages_id";
  ALTER TABLE "services_rels" DROP COLUMN "services_id";
  ALTER TABLE "services_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "media_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "testimonials_id";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_media_type";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_hero_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_rich_text_variant";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_rich_text_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_services_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_services_grid_source";
  DROP TYPE "public"."enum_pages_blocks_services_grid_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_services_grid_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_services_grid_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_services_grid_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_variant";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_source";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_vehicle_showcase_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_compare";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_variant";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_source";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_fleet_comparison_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_feature_list_items_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_list_items_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_feature_list_items_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_list_items_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_list_variant";
  DROP TYPE "public"."enum_pages_blocks_feature_list_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_feature_list_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_feature_list_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_feature_list_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_stats_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_stats_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_image_text_variant";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_image_text_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_image_text_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_image_text_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_text_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_image_text_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_image_text_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_image_text_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_gallery_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_testimonials_variant";
  DROP TYPE "public"."enum_pages_blocks_testimonials_source";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_testimonials_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_faq_variant";
  DROP TYPE "public"."enum_pages_blocks_faq_source";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_faq_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_variant";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_process_steps_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_process_steps_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_process_steps_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_process_steps_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_next_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_form_variant";
  DROP TYPE "public"."enum_pages_blocks_form_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_form_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_form_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_form_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_map_variant";
  DROP TYPE "public"."enum_pages_blocks_map_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_map_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_map_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_map_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_variant";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_settings_bg";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_settings_pt";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_settings_pb";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_settings_anim";
  DROP TYPE "public"."enum_pages_blocks_spacer_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_hero_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_variant";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_variant";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_source";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_vehicle_showcase_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_compare";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_variant";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_source";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_fleet_comparison_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_items_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_variant";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_stats_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_stats_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_variant";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_faq_variant";
  DROP TYPE "public"."enum__pages_v_blocks_faq_source";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_faq_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_variant";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_cta_icon";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_next_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_form_variant";
  DROP TYPE "public"."enum__pages_v_blocks_form_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_form_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_form_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_form_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_map_variant";
  DROP TYPE "public"."enum__pages_v_blocks_map_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_map_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_map_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_map_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_variant";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_settings_bg";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_settings_pt";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_settings_pb";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_settings_anim";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_size";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_cta_icon";
  DROP TYPE "public"."enum_services_blocks_hero_ctas_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_hero_media_type";
  DROP TYPE "public"."enum_services_blocks_hero_settings_bg";
  DROP TYPE "public"."enum_services_blocks_hero_settings_pt";
  DROP TYPE "public"."enum_services_blocks_hero_settings_pb";
  DROP TYPE "public"."enum_services_blocks_hero_settings_anim";
  DROP TYPE "public"."enum_services_blocks_rich_text_variant";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_bg";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_pt";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_pb";
  DROP TYPE "public"."enum_services_blocks_rich_text_settings_anim";
  DROP TYPE "public"."enum_services_blocks_services_grid_variant";
  DROP TYPE "public"."enum_services_blocks_services_grid_source";
  DROP TYPE "public"."enum_services_blocks_services_grid_settings_bg";
  DROP TYPE "public"."enum_services_blocks_services_grid_settings_pt";
  DROP TYPE "public"."enum_services_blocks_services_grid_settings_pb";
  DROP TYPE "public"."enum_services_blocks_services_grid_settings_anim";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_variant";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_source";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_cta_icon";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_settings_bg";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_settings_pt";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_settings_pb";
  DROP TYPE "public"."enum_services_blocks_vehicle_showcase_settings_anim";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_compare";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_variant";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_source";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_settings_bg";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_settings_pt";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_settings_pb";
  DROP TYPE "public"."enum_services_blocks_fleet_comparison_settings_anim";
  DROP TYPE "public"."enum_services_blocks_feature_list_items_icon";
  DROP TYPE "public"."enum_services_blocks_feature_list_items_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_feature_list_items_cta_icon";
  DROP TYPE "public"."enum_services_blocks_feature_list_items_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_feature_list_variant";
  DROP TYPE "public"."enum_services_blocks_feature_list_settings_bg";
  DROP TYPE "public"."enum_services_blocks_feature_list_settings_pt";
  DROP TYPE "public"."enum_services_blocks_feature_list_settings_pb";
  DROP TYPE "public"."enum_services_blocks_feature_list_settings_anim";
  DROP TYPE "public"."enum_services_blocks_stats_variant";
  DROP TYPE "public"."enum_services_blocks_stats_settings_bg";
  DROP TYPE "public"."enum_services_blocks_stats_settings_pt";
  DROP TYPE "public"."enum_services_blocks_stats_settings_pb";
  DROP TYPE "public"."enum_services_blocks_stats_settings_anim";
  DROP TYPE "public"."enum_services_blocks_image_text_variant";
  DROP TYPE "public"."enum_services_blocks_image_text_image_position";
  DROP TYPE "public"."enum_services_blocks_image_text_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_image_text_cta_icon";
  DROP TYPE "public"."enum_services_blocks_image_text_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_image_text_settings_bg";
  DROP TYPE "public"."enum_services_blocks_image_text_settings_pt";
  DROP TYPE "public"."enum_services_blocks_image_text_settings_pb";
  DROP TYPE "public"."enum_services_blocks_image_text_settings_anim";
  DROP TYPE "public"."enum_services_blocks_gallery_variant";
  DROP TYPE "public"."enum_services_blocks_gallery_settings_bg";
  DROP TYPE "public"."enum_services_blocks_gallery_settings_pt";
  DROP TYPE "public"."enum_services_blocks_gallery_settings_pb";
  DROP TYPE "public"."enum_services_blocks_gallery_settings_anim";
  DROP TYPE "public"."enum_services_blocks_testimonials_variant";
  DROP TYPE "public"."enum_services_blocks_testimonials_source";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_bg";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_pt";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_pb";
  DROP TYPE "public"."enum_services_blocks_testimonials_settings_anim";
  DROP TYPE "public"."enum_services_blocks_faq_variant";
  DROP TYPE "public"."enum_services_blocks_faq_source";
  DROP TYPE "public"."enum_services_blocks_faq_settings_bg";
  DROP TYPE "public"."enum_services_blocks_faq_settings_pt";
  DROP TYPE "public"."enum_services_blocks_faq_settings_pb";
  DROP TYPE "public"."enum_services_blocks_faq_settings_anim";
  DROP TYPE "public"."enum_services_blocks_pricing_table_variant";
  DROP TYPE "public"."enum_services_blocks_pricing_table_settings_bg";
  DROP TYPE "public"."enum_services_blocks_pricing_table_settings_pt";
  DROP TYPE "public"."enum_services_blocks_pricing_table_settings_pb";
  DROP TYPE "public"."enum_services_blocks_pricing_table_settings_anim";
  DROP TYPE "public"."enum_services_blocks_process_steps_variant";
  DROP TYPE "public"."enum_services_blocks_process_steps_settings_bg";
  DROP TYPE "public"."enum_services_blocks_process_steps_settings_pt";
  DROP TYPE "public"."enum_services_blocks_process_steps_settings_pb";
  DROP TYPE "public"."enum_services_blocks_process_steps_settings_anim";
  DROP TYPE "public"."enum_services_blocks_cta_banner_variant";
  DROP TYPE "public"."enum_services_blocks_cta_banner_cta_appearance";
  DROP TYPE "public"."enum_services_blocks_cta_banner_cta_icon";
  DROP TYPE "public"."enum_services_blocks_cta_banner_cta_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_banner_next_type";
  DROP TYPE "public"."enum_services_blocks_cta_banner_settings_bg";
  DROP TYPE "public"."enum_services_blocks_cta_banner_settings_pt";
  DROP TYPE "public"."enum_services_blocks_cta_banner_settings_pb";
  DROP TYPE "public"."enum_services_blocks_cta_banner_settings_anim";
  DROP TYPE "public"."enum_services_blocks_form_variant";
  DROP TYPE "public"."enum_services_blocks_form_settings_bg";
  DROP TYPE "public"."enum_services_blocks_form_settings_pt";
  DROP TYPE "public"."enum_services_blocks_form_settings_pb";
  DROP TYPE "public"."enum_services_blocks_form_settings_anim";
  DROP TYPE "public"."enum_services_blocks_map_variant";
  DROP TYPE "public"."enum_services_blocks_map_settings_bg";
  DROP TYPE "public"."enum_services_blocks_map_settings_pt";
  DROP TYPE "public"."enum_services_blocks_map_settings_pb";
  DROP TYPE "public"."enum_services_blocks_map_settings_anim";
  DROP TYPE "public"."enum_services_blocks_logo_strip_variant";
  DROP TYPE "public"."enum_services_blocks_logo_strip_settings_bg";
  DROP TYPE "public"."enum_services_blocks_logo_strip_settings_pt";
  DROP TYPE "public"."enum_services_blocks_logo_strip_settings_pb";
  DROP TYPE "public"."enum_services_blocks_logo_strip_settings_anim";
  DROP TYPE "public"."enum_services_blocks_spacer_size";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_hero_ctas_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_hero_media_type";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_hero_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_variant";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_variant";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_source";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_services_grid_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_variant";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_source";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_vehicle_showcase_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_compare";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_variant";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_source";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_fleet_comparison_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_items_icon";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_items_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_items_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_items_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_variant";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_feature_list_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_stats_variant";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_stats_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_image_text_variant";
  DROP TYPE "public"."enum__services_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__services_v_blocks_image_text_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_image_text_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_image_text_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_image_text_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_image_text_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_image_text_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_image_text_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__services_v_blocks_gallery_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_gallery_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_gallery_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_gallery_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_variant";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_source";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_testimonials_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_faq_variant";
  DROP TYPE "public"."enum__services_v_blocks_faq_source";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_faq_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_variant";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_variant";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_process_steps_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_variant";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_cta_appearance";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_cta_icon";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_cta_link_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_next_type";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_cta_banner_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_form_variant";
  DROP TYPE "public"."enum__services_v_blocks_form_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_form_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_form_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_form_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_map_variant";
  DROP TYPE "public"."enum__services_v_blocks_map_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_map_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_map_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_map_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_logo_strip_variant";
  DROP TYPE "public"."enum__services_v_blocks_logo_strip_settings_bg";
  DROP TYPE "public"."enum__services_v_blocks_logo_strip_settings_pt";
  DROP TYPE "public"."enum__services_v_blocks_logo_strip_settings_pb";
  DROP TYPE "public"."enum__services_v_blocks_logo_strip_settings_anim";
  DROP TYPE "public"."enum__services_v_blocks_spacer_size";`)
}
