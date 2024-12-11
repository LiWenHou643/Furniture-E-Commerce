CREATE DATABASE IF NOT EXISTS appdb;
USE appdb;
SET time_zone = 'Asia/Bangkok';

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,  -- Example: 'admin', 'customer', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number CHAR(10) UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Store password securely (hashed in the app)
    role_id INT NOT NULL,  -- Reference to the roles table (admin, customer)
    user_status TINYINT(1) NOT NULL DEFAULT 1,  -- Account status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    unit_number VARCHAR(50),  -- Optional for apartments or buildings
    street_number INT,        -- Numeric street number
    street_name VARCHAR(255) NOT NULL, -- Name of the street
    ward_name VARCHAR(255),    -- Ward or Commune (optional)
    district_name VARCHAR(255), -- District
    city_province VARCHAR(255) NOT NULL, -- City or Province
    postal_code VARCHAR(20) NOT NULL, -- Postal code
    country VARCHAR(100) NOT NULL DEFAULT 'Vietnam', -- Country, default is Vietnam
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sub_categories (
    sub_category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    sub_category_name VARCHAR(255) NOT NULL,
    sub_category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    quantity SMALLINT DEFAULT 0,
    rating_count INT DEFAULT 0,
    sub_category_id INT NOT NULL,
    product_status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(sub_category_id)
);

CREATE TABLE product_feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique feedback identifier
    customer_id INT NOT NULL,  -- Reference to the customer who submitted the feedback
    product_id INT NOT NULL,  -- Reference to the product being reviewed
    rating INT NOT NULL,  -- Product rating (e.g., 1-5 stars)
    feedback_text TEXT,  -- Written feedback (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),  -- Reference to customers table
    FOREIGN KEY (product_id) REFERENCES products(product_id),  -- Reference to products table
    CONSTRAINT check_rating CHECK (rating BETWEEN 1 AND 5)  -- Ensure rating is between 1 and 5
);

CREATE TABLE product_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    image_url VARCHAR(255) NOT NULL,
    is_main_image TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE coupons (
    coupon_id INT PRIMARY KEY,
    coupon_code VARCHAR(50) UNIQUE NOT NULL,   -- Coupon code (e.g., BLACKFRIDAY2024)
    discount_type ENUM('percentage', 'flat') NOT NULL,  -- Type of discount
    discount_value DECIMAL(10, 2) NOT NULL, -- Discount amount or percentage
    min_order_value DECIMAL(10, 2),  -- Minimum order value for coupon to apply
    max_discount_value DECIMAL(10, 2), -- Maximum money amount to discount
    valid_from DATE,  -- Coupon validity start
    valid_until DATE,    -- Coupon validity end
    usage_limit INT,  -- How many times a coupon can be used
    usage_count INT DEFAULT 0, -- How many times the coupon has been used
    coupon_status TINYINT(1) NOT NULL DEFAULT 1,  -- If the coupon is active or not
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    sale_description VARCHAR(255) NOT NULL,     -- e.g., "Black Friday Sale"
    start_date DATE,                -- When the sale starts
    end_date DATE,                  -- When the sale ends
    discount_type ENUM('percentage', 'flat') NOT NULL,  -- Type of sale discount
    discount_value DECIMAL(10, 2) NOT NULL,  -- Discount percentage or amount
    sale_status TINYINT(1) NOT NULL DEFAULT 1,     -- If the sale is active or not
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_sales (
    product_id INT,
    sale_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, sale_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    coupon_id INT,         -- Reference to the applied promotion
    coupon_value DECIMAL(10, 2), -- Value at time order created
    total_discount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL,
    shipping_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date when the order was shipped
    shipping_address INT NOT NULL,  -- Reference to the shipping address
    shipping_method ENUM('standard', 'express', 'overnight') NOT NULL,  -- Shipping method
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
);

CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    sale_id INT,  -- Sale associated with this product (if applicable)
    total_discount DECIMAL(10, 2) DEFAULT 0.00,  -- The discount applied due to the sale (if applicable)
    total_price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
    transaction_reference VARCHAR(255), -- Payment gateway or transaction reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE invalidated_tokens
(
	token_id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    expiration TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens (
	refresh_token_id INT AUTO_INCREMENT PRIMARY KEY,
    refresh_token VARCHAR(512) NOT NULL,
    revoked TINYINT(1) NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- CREATE TABLE product_colors (
-- 	color_id INT AUTO_INCREMENT PRIMARY KEY,
--     color_name BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE product_item (
--     product_item_id INT AUTO_INCREMENT PRIMARY KEY,
--     product_id INT NOT NULL,
--     original_price DECIMAL(10, 2) NOT NULL,
--     sale_price DECIMAL(10, 2) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_id) REFERENCES products(product_id)
-- );

-- CREATE TABLE product_variation (
-- 	variation_id INT AUTO_INCREMENT PRIMARY KEY,
--     product_item_id INT NOT NULL,
--     product_color_id INT NOT NULL,
--     quantity INT DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_item_id) REFERENCES product_item(product_item_id),
-- 	FOREIGN KEY (product_color_id) REFERENCES product_colors(color_id)
-- );
