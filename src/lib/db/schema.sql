-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the generators table
CREATE TABLE generators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the mascots table
CREATE TABLE mascots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    prompt TEXT,
    thumbnail TEXT,
    generator_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE SET NULL
);

-- Create the videos table
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    primary_mascot_id INTEGER NOT NULL,
    prompt TEXT,
    status VARCHAR(50) NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (primary_mascot_id) REFERENCES mascots(id) ON DELETE CASCADE
);

-- Create the media_assets table
CREATE TABLE media_assets (
    id SERIAL PRIMARY KEY,
    video_id INTEGER NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    prompt TEXT,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

-- Create the documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    derived_from INTEGER,
    vector_db_reference_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (derived_from) REFERENCES documents(id) ON DELETE CASCADE
);

-- Create the generator_documents table (many-to-many relationship)
CREATE TABLE generator_documents (
    generator_id INTEGER NOT NULL,
    document_id INTEGER NOT NULL,
    PRIMARY KEY (generator_id, document_id),
    FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- Create the shared_access table
CREATE TABLE shared_access (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    shared_with_user_id INTEGER NOT NULL,
    mascot_id INTEGER,
    generator_id INTEGER,
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
CREATE INDEX idx_media_assets_video_id ON media_assets (video_id);
CREATE INDEX idx_mascots_user_id ON mascots (user_id);

-- Add indexes for frequently accessed data
CREATE INDEX idx_shared_access_user_id ON shared_access (user_id);
CREATE INDEX idx_shared_access_shared_with_user_id ON shared_access (shared_with_user_id);
CREATE INDEX idx_shared_access_mascot_id ON shared_access (mascot_id);
CREATE INDEX idx_shared_access_generator_id ON shared_access (generator_id);
