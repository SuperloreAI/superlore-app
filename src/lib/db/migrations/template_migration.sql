-- 1. Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    thumbnail VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Rename the staff table to staff_backup
ALTER TABLE staff RENAME TO staff_backup;

-- 3. Create the updated staff table
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    company_id INTEGER,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);


-- 4. Migrate data from the staff_backup table to the new users and staff tables
INSERT INTO users (id, name, email, thumbnail, created_at, updated_at)
SELECT id, name, email, thumbnail, created_at, updated_at FROM staff_backup;

INSERT INTO staff (id, user_id, company_id, is_admin, created_at, updated_at)
SELECT id, id as user_id, company_id, is_admin, created_at, updated_at FROM staff_backup;

-- 5. Transfer foreign key depenenices from the staff_backup table to the new staff table
ALTER TABLE api_keys DROP CONSTRAINT api_keys_staff_id_fkey;

UPDATE api_keys
SET staff_id = users.id
FROM users, staff
WHERE api_keys.staff_id = staff.id
  AND staff.name = users.name;

ALTER TABLE api_keys RENAME COLUMN staff_id TO user_id;

ALTER TABLE api_keys
ADD CONSTRAINT api_keys_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);



-- 6. Drop the staff_backup table
DROP TABLE staff_backup;


