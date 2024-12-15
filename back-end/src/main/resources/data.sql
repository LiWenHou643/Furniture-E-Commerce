-- Insert roles (admin, customer)
INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');

-- Insert admin users
INSERT INTO users (email, password, role_id) 
VALUES 
    ('admin1@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1), 
    ('admin2@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1), 
    ('admin3@example.com', '{bcrypt}$2y$10$Pg8Vxn560H2/nJl9DrTveuRyVGsmOzPnaKC3UXu1xbCpQh87PE6d6', 1);

-- Insert customer users
INSERT INTO users (email, phone_number, password, role_id)
VALUES
    ('customer1@example.com', '0123456789', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer2@example.com', '0123456790', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer3@example.com', '0123456791', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer4@example.com', '0123456792', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer5@example.com', '0123456793', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer6@example.com', '0123456794', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer7@example.com', '0123456795', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer8@example.com', '0123456796', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer9@example.com', '0123456797', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer10@example.com', '0123456798', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer11@example.com', '0123456799', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer12@example.com', '0123456800', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer13@example.com', '0123456801', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer14@example.com', '0123456802', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer15@example.com', '0123456803', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer16@example.com', '0123456804', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer17@example.com', '0123456805', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer18@example.com', '0123456806', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer19@example.com', '0123456807', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer20@example.com', '0123456808', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer21@example.com', '0123456809', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer22@example.com', '0123456810', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer23@example.com', '0123456811', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer24@example.com', '0123456812', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer25@example.com', '0123456813', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer26@example.com', '0123456814', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer27@example.com', '0123456815', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer28@example.com', '0123456816', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer29@example.com', '0123456817', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer30@example.com', '0123456818', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer31@example.com', '0123456819', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer32@example.com', '0123456820', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer33@example.com', '0123456821', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer34@example.com', '0123456822', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer35@example.com', '0123456823', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer36@example.com', '0123456824', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer37@example.com', '0123456825', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer38@example.com', '0123456826', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer39@example.com', '0123456827', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer40@example.com', '0123456828', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer41@example.com', '0123456829', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer42@example.com', '0123456830', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer43@example.com', '0123456831', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer44@example.com', '0123456832', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer45@example.com', '0123456833', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer46@example.com', '0123456834', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer47@example.com', '0123456835', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer48@example.com', '0123456836', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer49@example.com', '0123456837', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2),
    ('customer50@example.com', '0123456838', '{bcrypt}$2y$10$Ng5.Up8JB4R6w7AirThSGOX8NwIJMXwae68Pge0ogg/UnxF5dtaFW', 2);


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

INSERT INTO categories (category_name, category_description)
VALUES 
    ('Seating', 'Furniture designed primarily for sitting, including sofas, chairs, armchairs, and benches.'),
    ('Table', 'Furniture primarily used for placing items, including dining tables, coffee tables, side tables, and desks.'),
    ('Bed', 'Furniture designed for sleeping, including beds, bunk beds, and platform beds.'),
    ('Storage', 'Furniture focused on storage, such as bookshelves, wardrobes, and cabinets.'),
    ('Decor', 'Items used to enhance the aesthetic appeal of a space, such as vases, wall art, rugs, mirrors, and decorative lighting.');

INSERT INTO areas (area_name)
VALUES 
    ('Living Room'),
    ('Bedroom'),
    ('Dining Room'),
    ('Office'),
    ('Kitchen'),
    ('Hallway'),
    ('Outdoor');

INSERT INTO materials (material_name, material_description)
VALUES 
    ('Wood', 'Natural wood used in furniture making, known for durability and a classic look.'),
    ('Metal', 'Strong and durable metal materials, often used for frames and accents in furniture.'),
    ('Fabric', 'Soft materials like cotton, linen, or polyester used for upholstery in sofas and chairs.'),
    ('Leather', 'Premium upholstery material offering a luxurious look and feel, commonly used for sofas and chairs.'),
    ('Glass', 'Transparent material used for tabletops and decorative furniture pieces.'),
    ('Marble', 'Hard and strong material, often use for making beautiful tables and chairs');

INSERT INTO brands (brand_name, brand_description)
VALUES 
    ('Ikea', 'A global leader in ready-to-assemble furniture, offering affordable and stylish products for every room.'),
    ('Ashley Furniture', 'Known for its high-quality furniture, Ashley offers a wide range of designs for all home styles.'),
    ('La-Z-Boy', 'Famous for their recliners and comfortable seating, La-Z-Boy combines style with relaxation.'),
    ('West Elm', 'A modern furniture brand focused on sustainable materials and innovative designs.'),
    ('Herman Miller', 'Renowned for its ergonomic and functional office furniture, Herman Miller is a staple for workplace comfort.');

-- Seating Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Luxury Reclining Sofa', 'A luxury reclining sofa made with premium leather, offering multiple reclining positions for ultimate comfort.', 1, 1, 4, 4.9, 300, TRUE),
    ('Chesterfield Sofa', 'A timeless chesterfield sofa with deep button tufting and luxurious leather upholstery, perfect for any living room.', 1, 3, 4, 4.8, 220, TRUE),
    ('Swivel Chair', 'A versatile swivel chair with padded arms and back, perfect for offices or living rooms.', 1, 2, 3, 4.7, 180, TRUE),
    ('Wood Rattan Cane Chair', 'Use of Mango Wood as primary material gives this Dining Chair a solid & sturdy look. Secondary material is used as Rattan Cane at back side & Fabrics(Used in Seat).', 1, 3, 1, 4.8, 180, TRUE),
    ('Wood Heirloom Chair', 'These heirloom quality chairs are crafted to compliment your Modular Table and complete your dining set. American-made and solid hardwood. Upholstered seating available on specified models.', 1, 4, 1, 4.9, 140, TRUE),
	('Hobro Armchair Sofa', 'Hobro sofa is designed with a solid structure, along with good bearing capacity thanks to the solid characteristics of rubber wood such as toughness, hardness, not soft and water... thereby helping the product to be durable. Soak and use for a long time.', 1, 1, 3, 4.8, 146, TRUE),
	('Hobro Don Sofa', 'The sofa mattress is made of polyester fabric that is dust-proof, mold-resistant and the mattress cover can be easily removed for cleaning. Gray sofa cushions create a modern beauty, but no less luxurious and gentle', 1, 5, 3, 4.8, 178, TRUE);
    
-- Table Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Round Marble Dining Table Type 1', 'A sophisticated marble dining table with a polished finish, designed for modern homes and elegant dining experiences.', 2, 1, 6, 4.8, 320, TRUE),
    ('Round Marble Dining Table Type 2', 'A sophisticated marble dining table with a polished finish, designed for modern homes and elegant dining experiences.', 2, 1, 6, 4.9, 280, TRUE),
    ('Round Wood Coffee Table Type 1', 'A sturdy solid wood coffee table with rustic appeal, perfect for any living room or den.', 2, 3, 1, 4.7, 250, TRUE),
	('Round Wood Coffee Table Type 2', 'A sturdy solid wood coffee table with rustic appeal, perfect for any living room or den.', 2, 3, 1, 4.8, 220, TRUE),
    ('Glass Dining Table with Chairs', 'A sleek glass dining table set with 6 high-back chairs, ideal for family gatherings and dinner parties.', 2, 2, 5, 4.6, 270, TRUE),
    ('Modern Office Desk', 'A modern office desk with ample storage and a minimalistic design, made from high-quality wood and metal.', 2, 5, 1, 4.5, 210, TRUE),
    ('Wooden End Table', 'A small, yet stylish wooden end table with a drawer for convenient storage, perfect for living rooms and bedrooms.', 2, 4, 1, 4.4, 180, TRUE),
    ('Foldable Dining Table', 'A space-saving foldable dining table that can easily be stored when not in use, ideal for small apartments.', 2, 3, 1, 4.3, 120, TRUE);

-- Bed Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Memory Foam Bed', 'A luxurious memory foam bed with dual-layer construction, offering superior comfort and support for a restful night’s sleep.', 3, 1, 1, 4.9, 400, TRUE),
    ('Bunk Bed with Desk', 'Space-saving bunk bed with a built-in desk and shelves, perfect for kids or guest rooms.', 3, 2, 1, 4.7, 270, TRUE),
    ('King Size Adjustable Bed', 'A king-size adjustable bed with independent head and foot elevation, designed for maximum comfort and convenience.', 3, 3, 1, 4.8, 320, TRUE),
    ('Twin Size Bed', 'A compact twin-size bed with a sturdy wooden frame, perfect for children’s rooms or guest rooms.', 3, 4, 1, 4.6, 150, TRUE),
    ('Platform Bed with Storage', 'A modern platform bed with built-in storage drawers, perfect for maximizing space in small bedrooms.', 3, 5, 1, 4.7, 250, TRUE),
    ('Futon Bed', 'A convertible futon that functions as both a bed and a sofa, ideal for studio apartments and guest rooms.', 3, 2, 1, 4.5, 200, TRUE);

-- Storage Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Wardrobe with Sliding Doors', 'A modern wardrobe with sliding doors and multiple compartments, perfect for storing clothes and accessories.', 4, 3, 1, 4.8, 330, TRUE),
    ('Shoe Rack Organizer', 'A multi-tier shoe rack organizer made from durable wood, designed to store shoes neatly and efficiently.', 4, 1, 1, 4.7, 210, TRUE),
    ('Metal Filing Cabinet', 'A sturdy metal filing cabinet with 4 drawers, ideal for organizing office documents and files.', 4, 2, 2, 4.6, 180, TRUE),
    ('Corner Storage Cabinet', 'A compact corner storage cabinet with adjustable shelves, perfect for small spaces and living rooms.', 4, 4, 1, 4.5, 150, TRUE),
    ('Bookshelf with Ladder', 'A stylish wooden bookshelf with a ladder design, perfect for displaying books and decor items in your living room.', 4, 5, 1, 4.7, 200, TRUE),
    ('Storage Bench with Cushion', 'A multi-functional storage bench with a comfortable cushion on top, ideal for entryways and hallways.', 4, 3, 1, 4.4, 170, TRUE);

-- Decor Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Wall Mirror with Gold Frame', 'A stylish wall mirror with a gold frame, perfect for brightening up any room in your home.', 5, 4, 1, 4.9, 420, TRUE),
    ('Decorative Floor Vase', 'A tall decorative floor vase made from ceramic, perfect for adding elegance to any corner of your living room or hallway.', 5, 3, 1, 4.8, 350, TRUE),
    ('Modern Wall Clock', 'A modern wall clock with a sleek, minimalist design, perfect for any contemporary living or office space.', 5, 1, 5, 4.7, 300, TRUE),
    ('Abstract Art Painting', 'An abstract art painting with vibrant colors, designed to bring life and energy to any room.', 5, 2, 1, 4.6, 280, TRUE),
    ('Decorative Throw Pillows', 'A set of decorative throw pillows with intricate patterns, perfect for adding a pop of color to your sofa or bed.', 5, 4, 3, 4.7, 250, TRUE),
    ('Table Lamp with Fabric Shade', 'A stylish table lamp with a fabric shade, perfect for reading or adding ambiance to your living room or bedroom.', 5, 2, 3, 4.5, 220, TRUE),
    ('Area Rug with Geometric Pattern', 'A plush area rug with a bold geometric pattern, perfect for adding warmth and style to your living room.', 5, 5, 3, 4.8, 270, TRUE),
    ('Candle Holder Set', 'A set of elegant candle holders made from brass, ideal for creating a cozy and inviting atmosphere.', 5, 3, 2, 4.6, 230, TRUE);

-- Linking products to areas

-- Seating Products
INSERT INTO products_areas (area_id, product_id)
VALUES
    (1, 1),  -- Luxury Reclining Sofa (Living Room)
    (1, 2),  -- Chesterfield Sofa (Living Room)
    (2, 3),  -- Swivel Chair (Office)
    (5, 4),  -- Outdoor Hammock Chair (Outdoor)
    (1, 5),  -- Armchair with Ottoman (Living Room)
    (5, 6);  -- Adjustable Lounge Chair (Outdoor)

-- Table Products
INSERT INTO products_areas (area_id, product_id)
VALUES
    (1, 7),  -- Marble Dining Table (Living Room)
    (3, 8),  -- Solid Wood Coffee Table (Dining Room)
    (3, 9),  -- Glass Dining Table with Chairs (Dining Room)
    (4, 10), -- Modern Office Desk (Office)
    (1, 11), -- Wooden End Table (Living Room)
    (3, 12); -- Foldable Dining Table (Dining Room)

-- Bed Products
INSERT INTO products_areas (area_id, product_id)
VALUES
    (2, 13), -- Memory Foam Bed (Bedroom)
    (2, 14), -- Bunk Bed with Desk (Bedroom)
    (2, 15), -- King Size Adjustable Bed (Bedroom)
    (2, 16), -- Twin Size Bed (Bedroom)
    (2, 17), -- Platform Bed with Storage (Bedroom)
    (2, 18); -- Futon Bed (Bedroom)

-- Storage Products
INSERT INTO products_areas (area_id, product_id)
VALUES
    (2, 19), -- Wardrobe with Sliding Doors (Bedroom)
    (5, 20), -- Shoe Rack Organizer (Kitchen)
    (4, 21), -- Metal Filing Cabinet (Office)
    (1, 22), -- Corner Storage Cabinet (Living Room)
    (1, 23), -- Bookshelf with Ladder (Living Room)
    (5, 24); -- Storage Bench with Cushion (Outdoor)

-- Decor Products
INSERT INTO products_areas (area_id, product_id)
VALUES
    (1, 25), -- Wall Mirror with Gold Frame (Living Room)
    (2, 26), -- Decorative Floor Vase (Bedroom)
    (1, 27), -- Modern Wall Clock (Living Room)
    (1, 28), -- Abstract Art Painting (Living Room)
    (1, 29), -- Decorative Throw Pillows (Living Room)
    (2, 30), -- Table Lamp with Fabric Shade (Bedroom)
    (1, 31), -- Area Rug with Geometric Pattern (Living Room)
    (1, 32); -- Candle Holder Set (Living Room)

-- Insert some colors into the product_colors table
INSERT INTO product_colors (color_name)
VALUES
    ('Red'),
    ('Blue'),
    ('Green'),
    ('Black'),
    ('White'),
    ('Grey');

-- Insert product variants for the Seating Category (Example: Swivel Chair, Chesterfield Sofa)
-- Swivel Chair
INSERT INTO product_item (product_id, color_id, sku, original_price, sale_price, stock_quantity)
VALUES
    (3, 1, 'SWC-RED-001', 200.00, 180.00, 50), -- Red Swivel Chair
    (3, 2, 'SWC-BLUE-001', 200.00, 180.00, 40), -- Blue Swivel Chair
    (3, 3, 'SWC-GREEN-001', 200.00, 180.00, 30), -- Green Swivel Chair
    (3, 4, 'SWC-BLACK-001', 200.00, 180.00, 25), -- Black Swivel Chair
    (3, 5, 'SWC-WHITE-001', 200.00, 180.00, 20); -- White Swivel Chair

-- Chesterfield Sofa
INSERT INTO product_item (product_id, color_id, sku, original_price, sale_price, stock_quantity)
VALUES
    (2, 1, 'CHS-RED-001', 800.00, 750.00, 10), -- Red Chesterfield Sofa
    (2, 2, 'CHS-BLUE-001', 800.00, 750.00, 8), -- Blue Chesterfield Sofa
    (2, 3, 'CHS-GREEN-001', 800.00, 750.00, 5), -- Green Chesterfield Sofa
    (2, 4, 'CHS-BLACK-001', 800.00, 750.00, 7), -- Black Chesterfield Sofa
    (2, 5, 'CHS-WHITE-001', 800.00, 750.00, 4); -- White Chesterfield Sofa

-- Marble Dining Table (Products in the Table Category)
-- Dining Table
INSERT INTO product_item (product_id, color_id, sku, original_price, sale_price, stock_quantity)
VALUES
    (7, 1, 'MDT-RED-001', 1500.00, 1400.00, 12), -- Red Marble Dining Table
    (7, 2, 'MDT-BLUE-001', 1500.00, 1400.00, 8), -- Blue Marble Dining Table
    (7, 4, 'MDT-BLACK-001', 1500.00, 1400.00, 15), -- Black Marble Dining Table
    (7, 6, 'MDT-GREY-001', 1500.00, 1400.00, 20); -- Grey Marble Dining Table
