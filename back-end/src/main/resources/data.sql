-- Insert roles (admin, customer)
INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('customer');

-- Insert admin users
INSERT INTO users (username, email, password, role_id) 
VALUES 
    ('admin1', 'admin1@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1), 
    ('admin2', 'admin2@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1), 
    ('admin3', 'admin3@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1);

-- Insert customer users
INSERT INTO users (username, email, phone_number, password, role_id)
VALUES
    ('customer1', 'customer1@example.com', '0123456789', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer2', 'customer2@example.com', '0123456790', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer3', 'customer3@example.com', '0123456791', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer4', 'customer4@example.com', '0123456792', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer5', 'customer5@example.com', '0123456793', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer6', 'customer6@example.com', '0123456794', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer7', 'customer7@example.com', '0123456795', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer8', 'customer8@example.com', '0123456796', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer9', 'customer9@example.com', '0123456797', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer10', 'customer10@example.com', '0123456798', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer11', 'customer11@example.com', '0123456799', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer12', 'customer12@example.com', '0123456800', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer13', 'customer13@example.com', '0123456801', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer14', 'customer14@example.com', '0123456802', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer15', 'customer15@example.com', '0123456803', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer16', 'customer16@example.com', '0123456804', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer17', 'customer17@example.com', '0123456805', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer18', 'customer18@example.com', '0123456806', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer19', 'customer19@example.com', '0123456807', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer20', 'customer20@example.com', '0123456808', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer21', 'customer21@example.com', '0123456809', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer22', 'customer22@example.com', '0123456810', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer23', 'customer23@example.com', '0123456811', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer24', 'customer24@example.com', '0123456812', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer25', 'customer25@example.com', '0123456813', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer26', 'customer26@example.com', '0123456814', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer27', 'customer27@example.com', '0123456815', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer28', 'customer28@example.com', '0123456816', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
	('customer29', 'customer29@example.com', '0123456817', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer30', 'customer30@example.com', '0123456818', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer31', 'customer31@example.com', '0123456819', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer32', 'customer32@example.com', '0123456820', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer33', 'customer33@example.com', '0123456821', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer34', 'customer34@example.com', '0123456822', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer35', 'customer35@example.com', '0123456823', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer36', 'customer36@example.com', '0123456824', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer37', 'customer37@example.com', '0123456825', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer38', 'customer38@example.com', '0123456826', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer39', 'customer39@example.com', '0123456827', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer40', 'customer40@example.com', '0123456828', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer41', 'customer41@example.com', '0123456829', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer42', 'customer42@example.com', '0123456830', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer43', 'customer43@example.com', '0123456831', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer44', 'customer44@example.com', '0123456832', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer45', 'customer45@example.com', '0123456833', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer46', 'customer46@example.com', '0123456834', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer47', 'customer47@example.com', '0123456835', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer48', 'customer48@example.com', '0123456836', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer49', 'customer49@example.com', '0123456837', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer50', 'customer50@example.com', '0123456838', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2);


-- Insert customer profiles
INSERT INTO customers (user_id, first_name, last_name, avatar) 
VALUES 
    (4, 'John', 'Doe', 'avatar1.jpg'),
    (5, 'Jane', 'Smith', 'avatar2.jpg'),
    (6, 'Alice', 'Johnson', 'avatar3.jpg'),
    (7, 'Michael', 'Williams', 'avatar4.jpg'),
    (8, 'Sarah', 'Miller', 'avatar5.jpg'),
    (9, 'David', 'Davis', 'avatar6.jpg'),
    (10, 'Mary', 'Garcia', 'avatar7.jpg'),
    (11, 'James', 'Martinez', 'avatar8.jpg'),
    (12, 'Patricia', 'Hernandez', 'avatar9.jpg'),
    (13, 'Robert', 'Lopez', 'avatar10.jpg'),
    (14, 'Linda', 'Gonzalez', 'avatar11.jpg'),
    (15, 'William', 'Wilson', 'avatar12.jpg'),
    (16, 'Elizabeth', 'Anderson', 'avatar13.jpg'),
    (17, 'Joseph', 'Thomas', 'avatar14.jpg'),
    (18, 'Helen', 'Jackson', 'avatar15.jpg'),
    (19, 'Charles', 'White', 'avatar16.jpg'),
    (20, 'Margaret', 'Harris', 'avatar17.jpg'),
    (21, 'Christopher', 'Clark', 'avatar18.jpg'),
    (22, 'Betty', 'Lewis', 'avatar19.jpg'),
    (23, 'George', 'Walker', 'avatar20.jpg'),
    (24, 'Dorothy', 'Allen', 'avatar21.jpg'),
    (25, 'Thomas', 'Young', 'avatar22.jpg'),
    (26, 'Ruth', 'King', 'avatar23.jpg'),
    (27, 'Steven', 'Scott', 'avatar24.jpg'),
    (28, 'Nancy', 'Adams', 'avatar25.jpg'),
    (29, 'Kenneth', 'Baker', 'avatar26.jpg'),
    (30, 'Donna', 'Nelson', 'avatar27.jpg'),
    (31, 'Paul', 'Carter', 'avatar28.jpg'),
    (32, 'Carol', 'Mitchell', 'avatar29.jpg'),
    (33, 'Jerry', 'Perez', 'avatar30.jpg'),
    (34, 'Shirley', 'Roberts', 'avatar31.jpg'),
    (35, 'Edward', 'Turner', 'avatar32.jpg'),
    (36, 'Margaret', 'Phillips', 'avatar33.jpg'),
    (37, 'Frank', 'Evans', 'avatar34.jpg'),
    (38, 'Barbara', 'Gonzalez', 'avatar35.jpg'),
    (39, 'Larry', 'Morris', 'avatar36.jpg'),
    (40, 'Jessica', 'Rogers', 'avatar37.jpg'),
    (41, 'Kevin', 'Reed', 'avatar38.jpg'),
    (42, 'Michelle', 'Cook', 'avatar39.jpg'),
    (43, 'Richard', 'Morgan', 'avatar40.jpg'),
    (44, 'Susan', 'Bell', 'avatar41.jpg'),
    (45, 'Thomas', 'Murphy', 'avatar42.jpg'),
    (46, 'Laura', 'Bailey', 'avatar43.jpg'),
    (47, 'Daniel', 'Rivera', 'avatar44.jpg'),
    (48, 'Cynthia', 'Cooper', 'avatar45.jpg'),
    (49, 'Andrew', 'Richardson', 'avatar46.jpg'),
    (50, 'Rebecca', 'Wood', 'avatar47.jpg'),
    (51, 'Joshua', 'Watson', 'avatar48.jpg'),
    (52, 'Amy', 'Brooks', 'avatar49.jpg'),
    (53, 'Nicholas', 'Kelly', 'avatar50.jpg');

-- Insert addresses for customers 1 to 50
INSERT INTO addresses (customer_id, unit_number, street_number, street_name, ward_name, district_name, city_province, postal_code, country) 
VALUES 
    (1, '101', 1, 'Main Street', 'Ward 1', 'District 1', 'Hanoi', '100000', 'Vietnam'),
    (2, '102', 2, 'Baker Street', 'Ward 2', 'District 1', 'Hanoi', '100001', 'Vietnam'),
    (3, '103', 3, 'Elm Street', 'Ward 3', 'District 2', 'Hanoi', '100002', 'Vietnam'),
    (4, '104', 4, 'Pine Avenue', 'Ward 1', 'District 3', 'Hanoi', '100003', 'Vietnam'),
    (5, '105', 5, 'Maple Road', 'Ward 4', 'District 2', 'Hanoi', '100004', 'Vietnam'),
    (6, '106', 6, 'Oak Boulevard', 'Ward 5', 'District 4', 'Hanoi', '100005', 'Vietnam'),
    (7, '107', 7, 'Cedar Lane', 'Ward 6', 'District 1', 'Hanoi', '100006', 'Vietnam'),
    (8, '108', 8, 'Birch Street', 'Ward 7', 'District 3', 'Hanoi', '100007', 'Vietnam'),
    (9, '109', 9, 'Cherry Street', 'Ward 8', 'District 5', 'Hanoi', '100008', 'Vietnam'),
    (10, '110', 10, 'Willow Road', 'Ward 9', 'District 6', 'Hanoi', '100009', 'Vietnam'),
    (11, '111', 11, 'Ash Avenue', 'Ward 10', 'District 1', 'Hanoi', '100010', 'Vietnam'),
    (12, '112', 12, 'Cypress Boulevard', 'Ward 11', 'District 2', 'Hanoi', '100011', 'Vietnam'),
    (13, '113', 13, 'Redwood Lane', 'Ward 12', 'District 3', 'Hanoi', '100012', 'Vietnam'),
    (14, '114', 14, 'Sequoia Road', 'Ward 13', 'District 4', 'Hanoi', '100013', 'Vietnam'),
    (15, '115', 15, 'Spruce Street', 'Ward 14', 'District 5', 'Hanoi', '100014', 'Vietnam'),
    (16, '116', 16, 'Fir Road', 'Ward 15', 'District 6', 'Hanoi', '100015', 'Vietnam'),
    (17, '117', 17, 'Juniper Lane', 'Ward 16', 'District 1', 'Hanoi', '100016', 'Vietnam'),
    (18, '118', 18, 'Hickory Avenue', 'Ward 17', 'District 2', 'Hanoi', '100017', 'Vietnam'),
    (19, '119', 19, 'Mahogany Street', 'Ward 18', 'District 3', 'Hanoi', '100018', 'Vietnam'),
    (20, '120', 20, 'Teak Road', 'Ward 19', 'District 4', 'Hanoi', '100019', 'Vietnam'),
    (21, '121', 21, 'Chestnut Boulevard', 'Ward 20', 'District 5', 'Hanoi', '100020', 'Vietnam'),
    (22, '122', 22, 'Acacia Lane', 'Ward 21', 'District 6', 'Hanoi', '100021', 'Vietnam'),
    (23, '123', 23, 'Eucalyptus Street', 'Ward 22', 'District 1', 'Hanoi', '100022', 'Vietnam'),
    (24, '124', 24, 'Palm Avenue', 'Ward 23', 'District 2', 'Hanoi', '100023', 'Vietnam'),
    (25, '125', 25, 'Alder Road', 'Ward 24', 'District 3', 'Hanoi', '100024', 'Vietnam'),
    (26, '126', 26, 'Olive Street', 'Ward 25', 'District 4', 'Hanoi', '100025', 'Vietnam'),
    (27, '127', 27, 'Bamboo Lane', 'Ward 26', 'District 5', 'Hanoi', '100026', 'Vietnam'),
    (28, '128', 28, 'Linden Road', 'Ward 27', 'District 6', 'Hanoi', '100027', 'Vietnam'),
    (29, '129', 29, 'Elm Avenue', 'Ward 28', 'District 1', 'Hanoi', '100028', 'Vietnam'),
    (30, '130', 30, 'Sandalwood Street', 'Ward 29', 'District 2', 'Hanoi', '100029', 'Vietnam'),
    (31, '131', 31, 'Rosewood Road', 'Ward 30', 'District 3', 'Hanoi', '100030', 'Vietnam'),
    (32, '132', 32, 'Ivy Lane', 'Ward 31', 'District 4', 'Hanoi', '100031', 'Vietnam'),
    (33, '133', 33, 'Clementine Boulevard', 'Ward 32', 'District 5', 'Hanoi', '100032', 'Vietnam'),
    (34, '134', 34, 'Magnolia Street', 'Ward 33', 'District 6', 'Hanoi', '100033', 'Vietnam'),
    (35, '135', 35, 'Honeysuckle Avenue', 'Ward 34', 'District 1', 'Hanoi', '100034', 'Vietnam'),
    (36, '136', 36, 'Jasmine Road', 'Ward 35', 'District 2', 'Hanoi', '100035', 'Vietnam'),
    (37, '137', 37, 'Daffodil Lane', 'Ward 36', 'District 3', 'Hanoi', '100036', 'Vietnam'),
    (38, '138', 38, 'Lavender Street', 'Ward 37', 'District 4', 'Hanoi', '100037', 'Vietnam'),
    (39, '139', 39, 'Sunflower Road', 'Ward 38', 'District 5', 'Hanoi', '100038', 'Vietnam'),
    (40, '140', 40, 'Tulip Boulevard', 'Ward 39', 'District 6', 'Hanoi', '100039', 'Vietnam'),
    (41, '141', 41, 'Orchid Lane', 'Ward 40', 'District 1', 'Hanoi', '100040', 'Vietnam'),
    (42, '142', 42, 'Lilac Avenue', 'Ward 41', 'District 2', 'Hanoi', '100041', 'Vietnam'),
    (43, '143', 43, 'Petunia Road', 'Ward 42', 'District 3', 'Hanoi', '100042', 'Vietnam'),
    (44, '144', 44, 'Violet Street', 'Ward 43', 'District 4', 'Hanoi', '100043', 'Vietnam'),
    (45, '145', 45, 'Heather Lane', 'Ward 44', 'District 5', 'Hanoi', '100044', 'Vietnam'),
    (46, '146', 46, 'Fuchsia Boulevard', 'Ward 45', 'District 6', 'Hanoi', '100045', 'Vietnam'),
    (47, '147', 47, 'Poppy Road', 'Ward 46', 'District 1', 'Hanoi', '100046', 'Vietnam'),
    (48, '148', 48, 'Hibiscus Avenue', 'Ward 47', 'District 2', 'Hanoi', '100047', 'Vietnam'),
    (49, '149', 49, 'Chrysanthemum Street', 'Ward 48', 'District 3', 'Hanoi', '100048', 'Vietnam'),
    (50, '150', 50, 'Geranium Road', 'Ward 49', 'District 4', 'Hanoi', '100049', 'Vietnam');


INSERT INTO categories (category_name, category_description, created_at, updated_at) VALUES
('Flowers', 'A wide range of flowers for gardens, decoration, and gifting', NOW(), NOW()),
('Vegetables', 'Fresh vegetables for home gardening and cooking', NOW(), NOW()),
('Fruits', 'Delicious fruits for planting or harvesting in your garden', NOW(), NOW());

INSERT INTO sub_categories (category_id, sub_category_name, sub_category_description, created_at, updated_at) VALUES
(1, 'Indoor Flowers', 'Beautiful flowers for indoor decoration', NOW(), NOW()),
(1, 'Outdoor Flowers', 'Flowers for garden planting and outdoor decoration', NOW(), NOW()),
(2, 'Leafy Vegetables', 'Leafy greens such as lettuce, spinach, kale, etc.', NOW(), NOW()),
(2, 'Root Vegetables', 'Root vegetables like carrots, potatoes, onions, etc.', NOW(), NOW()),
(3, 'Citrus Fruits', 'Fruits like oranges, lemons, limes, etc.', NOW(), NOW()),
(3, 'Berry Fruits', 'Berries like strawberries, blueberries, raspberries, etc.', NOW(), NOW());

INSERT INTO products (product_name, product_description, product_price, average_rating, quantity, rating_count, sub_category_id, product_status, created_at, updated_at) VALUES
('Indoor Orchid', 'A beautiful indoor orchid, perfect for home decor or as a gift. Requires minimal sunlight.', 19.99, 4.5, 100, 120, 1, 1, NOW(), NOW()),
('Rose Bouquet', 'A bouquet of fresh roses, ideal for gifts, decoration, or special occasions.', 29.99, 4.7, 50, 85, 2, 1, NOW(), NOW()),
('Lettuce Plant', 'A fresh and healthy lettuce plant for your indoor garden.', 9.99, 4.2, 200, 150, 3, 1, NOW(), NOW()),
('Carrot Seeds', 'Pack of organic carrot seeds for home gardening.', 4.99, 4.8, 500, 300, 4, 1, NOW(), NOW()),
('Orange Tree', 'A small citrus orange tree, perfect for home gardening.', 39.99, 4.3, 30, 50, 5, 1, NOW(), NOW()),
('Blueberry Bush', 'A compact blueberry bush for growing delicious berries in your garden.', 24.99, 4.6, 70, 120, 6, 1, NOW(), NOW());

INSERT INTO product_images (product_id, image_url, is_main_image, created_at, updated_at) VALUES
(1, 'https://example.com/images/indoor_orchid_main.jpg', 1, NOW(), NOW()),
(1, 'https://example.com/images/indoor_orchid_2.jpg', 0, NOW(), NOW()),
(2, 'https://example.com/images/rose_bouquet_main.jpg', 1, NOW(), NOW()),
(2, 'https://example.com/images/rose_bouquet_2.jpg', 0, NOW(), NOW()),
(3, 'https://example.com/images/lettuce_plant_main.jpg', 1, NOW(), NOW()),
(3, 'https://example.com/images/lettuce_plant_2.jpg', 0, NOW(), NOW()),
(4, 'https://example.com/images/carrot_seeds_main.jpg', 1, NOW(), NOW()),
(4, 'https://example.com/images/carrot_seeds_2.jpg', 0, NOW(), NOW()),
(5, 'https://example.com/images/orange_tree_main.jpg', 1, NOW(), NOW()),
(5, 'https://example.com/images/orange_tree_2.jpg', 0, NOW(), NOW()),
(6, 'https://example.com/images/blueberry_bush_main.jpg', 1, NOW(), NOW()),
(6, 'https://example.com/images/blueberry_bush_2.jpg', 0, NOW(), NOW());

