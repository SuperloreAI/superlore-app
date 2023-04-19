-- CreateTable
CREATE TABLE "canvas" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "video_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "canvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canvas_media_assets" (
    "canvas_id" UUID NOT NULL,
    "media_asset_id" UUID NOT NULL,

    CONSTRAINT "canvas_media_assets_pkey" PRIMARY KEY ("canvas_id","media_asset_id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "vector_db_reference_id" VARCHAR(255),
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generators" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "model_type" VARCHAR(50) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mascots" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "prompt" TEXT,
    "thumbnail" TEXT,
    "generator_id" UUID,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mascots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "asset_type" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "prompt" TEXT,
    "thumbnail" TEXT,
    "metadata" JSONB,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets_generators" (
    "media_asset_id" UUID NOT NULL,
    "generator_id" UUID NOT NULL,

    CONSTRAINT "media_assets_generators_pkey" PRIMARY KEY ("media_asset_id","generator_id")
);

-- CreateTable
CREATE TABLE "shared_access" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "shared_with_user_id" UUID NOT NULL,
    "mascot_id" UUID,
    "generator_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shared_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "primary_mascot_id" UUID,
    "prompt" TEXT,
    "status" VARCHAR(50) NOT NULL,
    "thumbnail" TEXT,
    "url" VARCHAR(255),
    "notes" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "canvas_video_id_key" ON "canvas"("video_id");

-- CreateIndex
CREATE INDEX "idx_mascots_user_id" ON "mascots"("user_id");

-- CreateIndex
CREATE INDEX "idx_shared_access_generator_id" ON "shared_access"("generator_id");

-- CreateIndex
CREATE INDEX "idx_shared_access_mascot_id" ON "shared_access"("mascot_id");

-- CreateIndex
CREATE INDEX "idx_shared_access_shared_with_user_id" ON "shared_access"("shared_with_user_id");

-- CreateIndex
CREATE INDEX "idx_shared_access_user_id" ON "shared_access"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_videos_primary_mascot_id" ON "videos"("primary_mascot_id");

-- AddForeignKey
ALTER TABLE "canvas" ADD CONSTRAINT "canvas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "canvas" ADD CONSTRAINT "canvas_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "canvas_media_assets" ADD CONSTRAINT "canvas_media_assets_canvas_id_fkey" FOREIGN KEY ("canvas_id") REFERENCES "canvas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "canvas_media_assets" ADD CONSTRAINT "canvas_media_assets_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "media_assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mascots" ADD CONSTRAINT "mascots_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "generators"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mascots" ADD CONSTRAINT "mascots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_assets_generators" ADD CONSTRAINT "media_assets_generators_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "generators"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_assets_generators" ADD CONSTRAINT "media_assets_generators_media_asset_id_fkey" FOREIGN KEY ("media_asset_id") REFERENCES "media_assets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shared_access" ADD CONSTRAINT "shared_access_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "generators"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shared_access" ADD CONSTRAINT "shared_access_mascot_id_fkey" FOREIGN KEY ("mascot_id") REFERENCES "mascots"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shared_access" ADD CONSTRAINT "shared_access_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shared_access" ADD CONSTRAINT "shared_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_primary_mascot_id_fkey" FOREIGN KEY ("primary_mascot_id") REFERENCES "mascots"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

