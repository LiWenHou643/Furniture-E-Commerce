USE appdb;
SET time_zone = 'Asia/Bangkok';


-- Create the 'coupons' table
CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,          -- Unique coupon code
    discount_type ENUM('percentage', 'fixed') NOT NULL,  -- Type of discount
    discount_value DECIMAL(10, 2) NOT NULL,    -- The discount value (either percentage or fixed amount)
    minimum_order_amount DECIMAL(10, 2) DEFAULT 0,  -- Minimum order amount for the coupon to be valid
    start_date DATE NOT NULL,                  -- Start date of coupon validity
    end_date DATE NOT NULL,                    -- End date of coupon validity
    is_active BOOLEAN DEFAULT TRUE,            -- Whether the coupon is active or not
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'orders' table (updated to support coupon)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    coupon_id INT,                             -- Foreign key to coupon
    coupon_discount DECIMAL(10, 2) DEFAULT 0,  -- Discount applied through coupon
    total_amount DECIMAL(10, 2) NOT NULL,      -- Total order amount after discount
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

-- Modified 'order_details' table to store details for products in an order
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,        -- Price per unit at the time of order
    total_price DECIMAL(10, 2) NOT NULL,       -- Total price for this product (unit_price * quantity)
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create the 'delivery' table
CREATE TABLE delivery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,                   -- Foreign key to orders table
    delivery_address TEXT NOT NULL,          -- Delivery address for the order
    delivery_status ENUM('pending', 'shipped', 'delivered', 'failed') DEFAULT 'pending',
    tracking_number VARCHAR(100),            -- Delivery tracking number (optional)
    delivery_date TIMESTAMP,                 -- Date and time when the order was delivered (nullable)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Create the 'payments' table
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,                   -- Foreign key to orders table
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'cod') NOT NULL,  -- Payment methods
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',  -- Status of payment
    transaction_id VARCHAR(100) UNIQUE,      -- Unique payment transaction ID (for tracking)
    payment_amount DECIMAL(10, 2) NOT NULL,  -- Amount paid for the order
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

