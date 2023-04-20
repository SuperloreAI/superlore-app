-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the generators table
CREATE TABLE generators (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the mascots table
CREATE TABLE mascots (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL, -- Changed the data type to UUID
    prompt TEXT,
    thumbnail TEXT,
    generator_id UUID, -- Changed the data type to UUID
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE SET NULL
);

-- Create the videos table
CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    primary_mascot_id UUID, -- Changed the data type to UUID
    prompt TEXT,
    status VARCHAR(50) NOT NULL,
    thumbnail TEXT,
    url VARCHAR(255),
    notes TEXT,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (primary_mascot_id) REFERENCES mascots(id) ON DELETE SET NULL
);

-- Create the media_assets table
CREATE TABLE media_assets (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    notes TEXT,
    prompt TEXT,
    thumbnail TEXT,
    metadata JSONB,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the canvas table
CREATE TABLE canvas (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    user_id UUID NOT NULL, -- Changed the data type to UUID
    video_id UUID UNIQUE, -- Changed the data type to UUID
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

-- Create the canvas_media_assets table (many-to-many relationship)
CREATE TABLE canvas_media_assets (
    canvas_id UUID NOT NULL, -- Changed the data type to UUID
    media_asset_id UUID NOT NULL, -- Changed the data type to UUID
    PRIMARY KEY (canvas_id, media_asset_id),
    FOREIGN KEY (canvas_id) REFERENCES canvas(id) ON DELETE CASCADE,
    FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE
);

-- Create the documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL, -- Changed the data type to UUID
    title TEXT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    vector_db_reference_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the media_assets_generators table (many-to-many relationship)
CREATE TABLE media_assets_generators (
  media_asset_id UUID NOT NULL, -- Changed the data type to UUID
  generator_id UUID NOT NULL, -- Changed the data type to UUID
  PRIMARY KEY (media_asset_id, generator_id),
  FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
  FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE CASCADE
);

-- Create the shared_access table
CREATE TABLE shared_access (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL, -- Changed the data type to UUID
  shared_with_user_id UUID NOT NULL, -- Changed the data type to UUID
  mascot_id UUID, -- Changed the data type to UUID
  generator_id UUID, -- Changed the data type to UUID
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (mascot_id) REFERENCES mascots(id) ON DELETE CASCADE,
  FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE CASCADE,
  CHECK ((mascot_id IS NOT NULL AND generator_id IS NULL) OR (mascot_id IS NULL AND generator_id IS NOT NULL))
);

-- Add indexes for frequently accessed data
CREATE INDEX idx_videos_primary_mascot_id ON videos (primary_mascot_id);
CREATE INDEX idx_mascots_user_id ON mascots (user_id);

-- Add indexes for frequently accessed data
CREATE INDEX idx_shared_access_user_id ON shared_access (user_id);
CREATE INDEX idx_shared_access_shared_with_user_id ON shared_access (shared_with_user_id);
CREATE INDEX idx_shared_access_mascot_id ON shared_access (mascot_id);
CREATE INDEX idx_shared_access_generator_id ON shared_access (generator_id);
