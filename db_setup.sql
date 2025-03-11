-- Create database
CREATE DATABASE IF NOT EXISTS construction_inventory;
USE construction_inventory;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT,
  quantity INT NOT NULL DEFAULT 0,
  threshold INT NOT NULL DEFAULT 0,
  unit VARCHAR(50),
  location VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  category VARCHAR(100),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  supplier_id INT,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  order_date DATE NOT NULL,
  expected_delivery DATE,
  status ENUM('pending', 'approved', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Inventory transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  transaction_type ENUM('in', 'out', 'adjustment') NOT NULL,
  reference_id INT,
  reference_type ENUM('order', 'manual', 'wastage') DEFAULT 'manual',
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert sample data
INSERT INTO users (name, email, password) VALUES
('Admin User', 'admin@example.com', '$2b$10$1234567890123456789012uQiLTjHhSXsJzRREMtiA5F9Jy0tOhO2');

INSERT INTO categories (name, description) VALUES
('Building Materials', 'Basic construction materials like cement, sand, etc.'),
('Reinforcement', 'Steel bars and other reinforcement materials'),
('Wood Materials', 'Plywood, lumber and other wood products'),
('Finishing', 'Paint, tiles and other finishing materials'),
('Electrical', 'Wires, outlets and other electrical supplies'),
('Plumbing', 'Pipes, fittings and other plumbing materials');

INSERT INTO suppliers (name, contact_person, email, phone, address, category, status) VALUES
('ABC Building Supplies', 'John Smith', 'john@abcbuilding.com', '123-456-7890', '123 Main St, Naval, Biliran', 'Building Materials', 'active'),
('Steel Masters Inc.', 'Maria Garcia', 'maria@steelmasters.com', '234-567-8901', '456 Oak Ave, Naval, Biliran', 'Reinforcement', 'active'),
('Woodworks Co.', 'David Lee', 'david@woodworks.com', '345-678-9012', '789 Pine St, Naval, Biliran', 'Wood Materials', 'active'),
('Paint Experts', 'Sarah Johnson', 'sarah@paintexperts.com', '456-789-0123', '101 Maple Rd, Naval, Biliran', 'Finishing', 'active'),
('Electrical Supplies Ltd.', 'Michael Brown', 'michael@electricalsupplies.com', '567-890-1234', '202 Elm St, Naval, Biliran', 'Electrical', 'inactive');
EOL ; npm install && echo 'Tempo: Node Modules Installed' ; npm run dev
