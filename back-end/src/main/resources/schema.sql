CREATE
    DATABASE IF NOT EXISTS db;
USE
    db;
SET GLOBAL time_zone = 'UTC';

CREATE TABLE roles
(
    role_id    INT AUTO_INCREMENT PRIMARY KEY,
    role_name  VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users
(
    user_id      INT AUTO_INCREMENT PRIMARY KEY,
    email        VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(11) UNIQUE,
    password     VARCHAR(255) NOT NULL,
    first_name   VARCHAR(50)  NOT NULL,
    last_name    VARCHAR(50)  NOT NULL,
    avatar       VARCHAR(255),
    role_id      INT          NOT NULL,
    user_status  BOOLEAN   DEFAULT TRUE, -- Account status
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

ALTER TABLE users ADD FULLTEXT(first_name, last_name, phone_number, email);
    
CREATE TABLE invalidated_tokens
(
    token_id   INT AUTO_INCREMENT PRIMARY KEY,
    token      VARCHAR(512) NOT NULL,
    expiration TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens
(
    refresh_token_id INT AUTO_INCREMENT PRIMARY KEY,
    refresh_token    VARCHAR(512) NOT NULL,
    revoked          BOOLEAN      NOT NULL DEFAULT FALSE,
    user_id          INT          NOT NULL,
    created_at       TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE addresses
(
    address_id     INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT          NOT NULL,
    street_address VARCHAR(100) NOT NULL, -- Số nhà, tên đường
    ward           VARCHAR(10)  NOT NULL, -- Phường/Xã
    district       VARCHAR(10)  NOT NULL, -- Quận/Huyện
    city           VARCHAR(10)  NOT NULL, -- Thành phố/Tỉnh
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE categories
(
    category_id          INT AUTO_INCREMENT PRIMARY KEY,
    category_name        VARCHAR(255) NOT NULL UNIQUE,
    category_description TEXT,
    image_url            VARCHAR(255),
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE materials
(
    material_id          INT AUTO_INCREMENT PRIMARY KEY,
    material_name        VARCHAR(255) NOT NULL UNIQUE,
    material_description TEXT,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE brands
(
    brand_id          INT AUTO_INCREMENT PRIMARY KEY,
    brand_name        VARCHAR(255) NOT NULL UNIQUE,
    brand_description TEXT,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE areas
(
    area_id    INT AUTO_INCREMENT PRIMARY KEY,
    area_name  VARCHAR(255) NOT NULL UNIQUE,
    image_url  VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products
(
    product_id          INT AUTO_INCREMENT PRIMARY KEY,
    product_name        VARCHAR(255) NOT NULL,
    product_description TEXT,
    category_id         INT          NOT NULL,
    brand_id            INT          NOT NULL,
    material_id         INT          NOT NULL,
    average_rating      DECIMAL(3, 2)         DEFAULT 0,
    rating_count        INT                   DEFAULT 0,
    sold_quantity       INT          NOT NULL DEFAULT 0,
    product_status      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (category_id),
    FOREIGN KEY (brand_id) REFERENCES brands (brand_id),
    FOREIGN KEY (material_id) REFERENCES materials (material_id)
);

CREATE TABLE products_areas
(
    area_id    INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (area_id) REFERENCES areas (area_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE colors
(
    color_id   INT AUTO_INCREMENT PRIMARY KEY,
    color_name VARCHAR(255) NOT NULL UNIQUE,
    hex_code   CHAR(7)      NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_item
(
    product_item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id      INT                 NOT NULL,
    color_id        INT,
    sku             VARCHAR(100) UNIQUE NOT NULL,
    original_price  DECIMAL(10, 2)      NOT NULL,
    sale_price      DECIMAL(10, 2)      NOT NULL,
    stock_quantity  INT                 NOT NULL DEFAULT 0,
    product_item_status 		BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (color_id) REFERENCES colors (color_id)
);

CREATE TABLE product_images
(
    image_id        INT AUTO_INCREMENT PRIMARY KEY,
    product_item_id INT          NOT NULL,
    image_url       VARCHAR(255) NOT NULL,
    main_image      BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_item_id) REFERENCES product_item (product_item_id)
);

CREATE TABLE carts
(
    cart_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE cart_items
(
    cart_item_id    INT AUTO_INCREMENT PRIMARY KEY,
    cart_id         INT NOT NULL,
    product_item_id INT NOT NULL,
    quantity        INT NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts (cart_id),
    FOREIGN KEY (product_item_id) REFERENCES product_item (product_item_id)
);

CREATE TABLE orders
(
    order_id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT                                                                 NOT NULL,
    subtotal         DECIMAL(10, 2)                                                      NOT NULL,
    total            DECIMAL(10, 2)                                                      NOT NULL, -- subtotal + shipping_fee
    order_status     VARCHAR(50) NOT NULL,
    confirm_date     TIMESTAMP,
    shipping_date    TIMESTAMP,
    delivery_date    TIMESTAMP,
    cancel_date      TIMESTAMP,
    shipping_address TEXT                                                                NOT NULL, -- +84 123 456 789 - 123, ABC Street, XYZ Ward, HCM City
    shipping_method  VARCHAR(50)                            NOT NULL,
    shipping_cost    DECIMAL(10, 2)                                                      NOT NULL,
    notes            TEXT,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    -- Compound Index Declaration
    INDEX idx_user_created_status (user_id, created_at DESC, order_status ASC)
);

CREATE TABLE order_details
(
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id        INT            NOT NULL,
    product_item_id INT            NOT NULL,
    quantity        INT            NOT NULL,
    price           DECIMAL(10, 2) NOT NULL,
    total           DECIMAL(10, 2)          DEFAULT 0.00,
    feedback_given  BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_item_id) REFERENCES product_item (product_item_id)
);

CREATE TABLE payments
(
    payment_id            INT AUTO_INCREMENT PRIMARY KEY,
    order_id              INT                                 NOT NULL,
    payment_date          TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Payment datetime: customer paid for the order successfully
    payment_amount        DECIMAL(10, 2)                      NOT NULL,
    payment_method        VARCHAR(50) 			NOT NULL,
    payment_status        VARCHAR(50)          NOT NULL,
    transaction_reference VARCHAR(255),                        -- Payment gateway or transaction reference
    created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE feedbacks
(
    feedback_id     INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,                                             -- Reference to the customer who submitted the feedback
    product_item_id INT NOT NULL,                                             -- Reference to the product being reviewed
    rating          INT NOT NULL,                                             -- Product rating (e.g., 1-5 stars)
    comment         TEXT,                                                     -- Written feedback (optional)
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),                         -- Reference to customers table
    FOREIGN KEY (product_item_id) REFERENCES product_item (product_item_id),  -- Reference to products item table
    CONSTRAINT check_rating CHECK (rating BETWEEN 1 AND 5)                    -- Ensure rating is between 1 and 5
);

CREATE TABLE feedback_images
(
    feedback_image_id INT AUTO_INCREMENT PRIMARY KEY,
    feedback_id       INT NOT NULL,
    image_url         VARCHAR(255),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (feedback_id) REFERENCES feedbacks (feedback_id)
);

CREATE TABLE chat_messages (
    chat_message_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id VARCHAR(50) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Index on timestamp for efficient sorting & pagination
    INDEX idx_timestamp (timestamp),

    -- Composite index for fast retrieval by chat_id + timestamp
    INDEX idx_chatid_timestamp (chat_id, timestamp DESC)
);


CREATE TABLE chat_rooms (
    chat_room_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id VARCHAR(50) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL
);

CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    start_date DATETIME DEFAULT NULL,  -- When the event or sale starts
    end_date DATETIME DEFAULT NULL,    -- When it ends (NULL if not applicable)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,          -- NULL if the notification is for all users
    title VARCHAR(255) NOT NULL,       -- Short title for the notification
    message TEXT NOT NULL,             -- The content of the notification
    read_status BOOLEAN DEFAULT FALSE,     -- Whether the notification has been read
    action_url VARCHAR(255) DEFAULT NULL, -- URL for the user to take action (e.g., view order)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE -- Assuming a `users` table exists
);


