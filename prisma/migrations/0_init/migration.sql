-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "document_type" VARCHAR(50) NOT NULL,
    "derived_from" INTEGER,
    "vector_db_reference_id" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generator_documents" (
    "generator_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,

    CONSTRAINT "generator_documents_pkey" PRIMARY KEY ("generator_id","document_id")
);

-- CreateTable
CREATE TABLE "generators" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "model_type" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mascots" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prompt" TEXT,
    "thumbnail" TEXT,
    "generator_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mascots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "asset_type" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "prompt" TEXT,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "primary_mascot_id" INTEGER NOT NULL,
    "prompt" TEXT,
    "status" VARCHAR(50) NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_mascots_user_id" ON "mascots"("user_id");

-- CreateIndex
CREATE INDEX "idx_media_assets_video_id" ON "media_assets"("video_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_videos_primary_mascot_id" ON "videos"("primary_mascot_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_derived_from_fkey" FOREIGN KEY ("derived_from") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "generator_documents" ADD CONSTRAINT "generator_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "generator_documents" ADD CONSTRAINT "generator_documents_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "generators"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mascots" ADD CONSTRAINT "mascots_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "generators"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mascots" ADD CONSTRAINT "mascots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_primary_mascot_id_fkey" FOREIGN KEY ("primary_mascot_id") REFERENCES "mascots"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

