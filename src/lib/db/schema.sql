-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the staff table
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    company_id INTEGER,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    thumbnail TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- Create the staff_companies table (many-to-many relationship)
CREATE TABLE staff_companies (
    staff_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    PRIMARY KEY (staff_id, company_id),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
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
    company_id INTEGER NOT NULL,
    prompt TEXT,
    thumbnail TEXT,
    generator_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
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
    company_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    derived_from INTEGER,
    vector_db_reference_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (derived_from) REFERENCES documents(id) ON DELETE CASCADE
);

-- Create the api_keys table
CREATE TABLE api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the video_tags table (many-to-many relationship)
CREATE TABLE video_tags (
    video_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (video_id, tag_id),
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create the asset_tags table (many-to-many relationship)
CREATE TABLE asset_tags (
    media_asset_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (media_asset_id, tag_id),
    FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create the permission_types table
CREATE TABLE permission_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the mascot_permissions table (many-to-many relationship)
CREATE TABLE mascot_permissions (
    staff_id INTEGER NOT NULL,
    mascot_id INTEGER NOT NULL,
    permission_type_id INTEGER NOT NULL,
    PRIMARY KEY (staff_id, mascot_id, permission_type_id),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (mascot_id) REFERENCES mascots(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_type_id) REFERENCES permission_types(id) ON DELETE CASCADE
);

-- Create the video_permissions table (many-to-many relationship)
CREATE TABLE video_permissions (
    staff_id INTEGER NOT NULL,
    mascot_id INTEGER NOT NULL,
    permission_type_id INTEGER NOT NULL,
    PRIMARY KEY (staff_id, mascot_id, permission_type_id),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (mascot_id) REFERENCES mascots(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_type_id) REFERENCES permission_types(id) ON DELETE CASCADE
);

-- Create the generator_documents table (many-to-many relationship)
CREATE TABLE generator_documents (
    generator_id INTEGER NOT NULL,
    document_id INTEGER NOT NULL,
    PRIMARY KEY (generator_id, document_id),
    FOREIGN KEY (generator_id) REFERENCES generators(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- Add indexes for frequently accessed data
CREATE INDEX idx_videos_primary_mascot_id ON videos (primary_mascot_id);
CREATE INDEX idx_media_assets_video_id ON media_assets (video_id);
CREATE INDEX idx_staff_company_id ON staff (company_id);
CREATE INDEX idx_mascots_company_id ON mascots (company_id);
