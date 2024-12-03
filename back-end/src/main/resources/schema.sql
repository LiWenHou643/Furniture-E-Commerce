USE appdb;
SET time_zone = 'Asia/Bangkok';

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number CHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    unit_number VARCHAR(50),  -- Optional for apartments or buildings
    street_number INT,        -- Numeric street number
    street_name VARCHAR(255) NOT NULL, -- Name of the street
    ward_name VARCHAR(255),    -- Ward or Commune (optional)
    district_name VARCHAR(255), -- District or Quận
    city_province VARCHAR(255) NOT NULL, -- City or Province
    postal_code VARCHAR(20) NOT NULL, -- Postal code
    country VARCHAR(100) NOT NULL DEFAULT 'Vietnam' -- Country, default is Vietnam
);

CREATE TABLE customer_address (
    customer_address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    address_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id),
    UNIQUE(customer_id, address_id)  -- Ensures that a customer cannot be assigned the same address multiple times
);

CREATE TABLE product_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_category_id) REFERENCES product_categories(category_id)
);

CREATE TABLE product_colors (
	color_id INT AUTO_INCREMENT PRIMARY KEY,
    color_name BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_item (
    product_item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE product_variation (
	variation_id INT AUTO_INCREMENT PRIMARY KEY,
    product_item_id INT NOT NULL,
    product_color_id INT NOT NULL,
    qty_in_stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_item_id) REFERENCES product_item(product_item_id),
	FOREIGN KEY (product_color_id) REFERENCES product_colors(color_id)
);

CREATE TABLE product_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_item_id INT,
    image_url VARCHAR(255) NOT NULL,
    is_main_image BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE delivery_services (
    delivery_service_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_service_name VARCHAR(255) NOT NULL,
    delivery_service_description TEXT,
    delivery_time VARCHAR(100),
    cost DECIMAL(10, 2) NOT NULL
);

CREATE TABLE promotions (
    promotion_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5, 2) NOT NULL,  -- Percentage off
    discount_amount DECIMAL(10, 2),  -- Fixed amount off
    valid_from DATETIME NOT NULL,
    valid_to DATETIME NOT NULL,
    minimum_order_amount DECIMAL(10, 2),  -- Minimum order to apply coupon
    promotion_status ENUM('active', 'inactive') NOT NULL
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_service_id INT,  -- Reference to the delivery service
    promotion_id INT,         -- Reference to the applied promotion
    order_status ENUM('pending', 'shipped', 'delivered', 'cancelled') NOT NULL,
    delivery_address_id INT,  -- Reference to delivery address
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (delivery_service_id) REFERENCES delivery_services(delivery_service_id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id),
    FOREIGN KEY (delivery_address_id) REFERENCES addresses(address_id)
);

CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,  -- Discount applied on product level
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') NOT NULL,
    promo_discount DECIMAL(10, 2) DEFAULT 0,  -- Total discount applied from promo
    delivery_cost DECIMAL(10, 2) DEFAULT 0,   -- Delivery cost for the order
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
