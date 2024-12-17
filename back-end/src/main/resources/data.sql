-- Insert roles (admin, customer)
INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');

-- Insert admin -- pwd: admin
INSERT INTO admins (username, password, role_id) 
VALUES ('admin', '{bcrypt}$2a$12$D79WRzamHQ2atDk4QvOUhumU4EGKNrhTaTjBKdN.Y6Wb.k/yT8ymK', 1);

-- Insert users -- pwd: user@123
INSERT INTO users (email, phone_number, first_name, last_name, avatar, password, role_id)
VALUES
('user1@example.com', '0931234567', 'Nguyen', 'Anh Tu', 'https://example.com/avatar1.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user2@example.com', '0912345678', 'Tran', 'Thi Mai', 'https://example.com/avatar2.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user3@example.com', '0982345679', 'Pham', 'Minh Chien', 'https://example.com/avatar3.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user4@example.com', '0973456780', 'Le', 'Thi Lan', 'https://example.com/avatar4.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user5@example.com', '0904567891', 'Hoang', 'Quoc An', 'https://example.com/avatar5.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user6@example.com', '0945678902', 'Doan', 'Ngoc Bich', 'https://example.com/avatar6.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user7@example.com', '0956789013', 'Nguyen', 'Hong Son', 'https://example.com/avatar7.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user8@example.com', '0937890124', 'Bui', 'Thi Thanh', 'https://example.com/avatar8.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user9@example.com', '0988901235', 'Vu', 'Quang Hieu', 'https://example.com/avatar9.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user10@example.com', '0979012346', 'Trinh', 'Ngoc Lan', 'https://example.com/avatar10.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user11@example.com', '0910123457', 'Phan', 'Thi Minh', 'https://example.com/avatar11.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user12@example.com', '0981234568', 'Le', 'Thi Bao', 'https://example.com/avatar12.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user13@example.com', '0902345679', 'Tran', 'Minh Hoang', 'https://example.com/avatar13.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user14@example.com', '0943456780', 'Ngo', 'Thi Lan', 'https://example.com/avatar14.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user15@example.com', '0934567891', 'Nguyen', 'Thi Huong', 'https://example.com/avatar15.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user16@example.com', '0975678902', 'Tran', 'Hieu Duong', 'https://example.com/avatar16.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user17@example.com', '0906789013', 'Nguyen', 'Mai Hoang', 'https://example.com/avatar17.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user18@example.com', '0947890124', 'Pham', 'Mai Linh', 'https://example.com/avatar18.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user19@example.com', '0938901235', 'Bui', 'Hien Anh', 'https://example.com/avatar19.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user20@example.com', '0989012346', 'Ho', 'Minh Hieu', 'https://example.com/avatar20.jpg', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2);

INSERT INTO addresses (user_id, unit_number, street_number, street_name, ward_name, district_name, city_province, postal_code, country)
VALUES
(1, NULL, 10, 'Nguyen Thi Minh Khai', 'Ben Thanh', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(2, NULL, 25, 'Pham Ngoc Thach', 'Phu My', 'District 3', 'Ho Chi Minh City', '700000', 'Vietnam'),
(3, NULL, 12, 'Le Lai', 'Bui Thi Xuan', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(4, NULL, 45, 'Tran Quoc Toan', 'Tan Dinh', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(5, NULL, 8, 'Le Duan', 'Ben Nghe', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(6, NULL, 3, 'Bui Vien', 'Pham Ngu Lao', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(7, NULL, 18, 'Nguyen Hue', 'Ben Nghe', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(8, NULL, 33, 'Cach Mang Thang Tam', 'Hiep Thanh', 'District 10', 'Ho Chi Minh City', '700000', 'Vietnam'),
(9, NULL, 27, 'Xo Viet Nghe Tinh', 'Nhon Loc', 'Binh Thanh', 'Ho Chi Minh City', '700000', 'Vietnam'),
(10, NULL, 54, 'Hong Bang', 'Phu Tho Hoa', 'District 11', 'Ho Chi Minh City', '700000', 'Vietnam'),
(11, NULL, 61, 'Nguyen Thi Minh Khai', 'Cau Kho', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(12, NULL, 23, 'Cach Mang Thang Tam', 'Tan Son Hoa', 'Tan Binh', 'Ho Chi Minh City', '700000', 'Vietnam'),
(13, NULL, 15, 'Cong Hoa', 'Tan Quoi', 'Tan Phu', 'Ho Chi Minh City', '700000', 'Vietnam'),
(14, NULL, 77, 'Nguyen Tuan', 'Thanh My Loi', 'District 2', 'Ho Chi Minh City', '700000', 'Vietnam'),
(15, NULL, 9, 'Le Thi Rieng', 'Ben Thanh', 'District 1', 'Ho Chi Minh City', '700000', 'Vietnam'),
(16, NULL, 66, 'Hoang Hoa Tham', 'Hiep Tan', 'Tan Phu', 'Ho Chi Minh City', '700000', 'Vietnam'),
(17, NULL, 4, 'Nguyen Chi Thanh', 'Lang Ha', 'Ba Dinh', 'Hanoi', '100000', 'Vietnam'),
(18, NULL, 28, 'Dai La', 'Dai Kim', 'Hoang Mai', 'Hanoi', '100000', 'Vietnam'),
(19, NULL, 72, 'Xuan Thuy', 'My Dinh', 'Nam Tu Liem', 'Hanoi', '100000', 'Vietnam'),
(20, NULL, 56, 'To Hieu', 'Thach Ban', 'Long Bien', 'Hanoi', '100000', 'Vietnam');

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

INSERT INTO brands (brand_name, brand_description)
VALUES 
    ('Ikea', 'A global leader in ready-to-assemble furniture, offering affordable and stylish products for every room.'),
    ('Ashley Furniture', 'Known for its high-quality furniture, Ashley offers a wide range of designs for all home styles.'),
    ('La-Z-Boy', 'Famous for their recliners and comfortable seating, La-Z-Boy combines style with relaxation.'),
    ('West Elm', 'A modern furniture brand focused on sustainable materials and innovative designs.'),
    ('Herman Miller', 'Renowned for its ergonomic and functional office furniture, Herman Miller is a staple for workplace comfort.');
    
INSERT INTO materials (material_name, material_description)
VALUES 
    ('Wood', 'Natural wood used in furniture making, known for durability and a classic look.'),
    ('Metal', 'Strong and durable metal materials, often used for frames and accents in furniture.'),
    ('Fabric', 'Soft materials like cotton, linen, or polyester used for upholstery in sofas and chairs.'),
    ('Leather', 'Premium upholstery material offering a luxurious look and feel, commonly used for sofas and chairs.'),
    ('Glass', 'Transparent material used for tabletops and decorative furniture pieces.'),
    ('Marble', 'Hard and strong material, often use for making beautiful tables and chairs');

-- Seating Category: 11 products
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Chesterfield Sofa', 'A timeless chesterfield sofa with deep button tufting and luxurious leather upholstery, perfect for any living room.', 1, 3, 4, 4.8, 220, TRUE),
    ('Hobro Don Sofa', 'The sofa mattress is made of polyester fabric that is dust-proof, mold-resistant and the mattress cover can be easily removed for cleaning. Gray sofa cushions create a modern beauty, but no less luxurious and gentle', 1, 5, 3, 4.8, 178, TRUE),
    ('Egg Chair Type 1', 'Add a touch of modern elegance to any room with the Egg Chair Type 1. Designed for ultimate comfort, its ergonomic shape cradles your body, while the soft upholstery and sturdy swivel base provide both style and support. Ideal for lounging, reading, or simply relaxing, this iconic chair is perfect for any contemporary space.', 1, 1, 3, 4.9, 123, TRUE),
    ('Egg Chair Type 2', 'Add a touch of modern elegance to any room with the Egg Chair Type 1. Designed for ultimate comfort, its ergonomic shape cradles your body, while the soft upholstery and sturdy swivel base provide both style and support. Ideal for lounging, reading, or simply relaxing, this iconic chair is perfect for any contemporary space.', 1, 1, 3, 4.8, 128, TRUE),
    ('Hobro Armchair Sofa', 'Hobro sofa is designed with a solid structure, along with good bearing capacity thanks to the solid characteristics of rubber wood such as toughness, hardness, not soft and water... thereby helping the product to be durable. Soak and use for a long time.', 1, 1, 3, 4.8, 146, TRUE),
    ('Modular Sectional Sofa', 'Create a customized, comfortable seating area with the Modular Sectional Sofa. Designed to fit your space and style, this sofa features interchangeable pieces that allow you to arrange it however you like. The soft cushions and durable fabric provide long-lasting comfort, while the sleek, modern design complements any living room or lounge area.', 1, 2, 3, 4.7, 149, TRUE),
    ('Papasan Chair', "Relax in style with the Papasan Chair, a cozy and iconic piece of furniture perfect for any room. With its wide, cushioned seat and sturdy frame, this chair offers a comfortable, cradling experience for ultimate relaxation. Whether you're reading, lounging, or just unwinding, the Papasan Chair adds a touch of charm and comfort to your space.", 1, 3, 3, 4.7, 144, TRUE),
	('Parsons Chair', 'The Parsons Chair combines sleek design with timeless elegance. Featuring clean lines, a sturdy frame, and comfortable upholstery, this chair is perfect for any dining room, office, or living space. Its versatile style complements both modern and traditional interiors, offering both function and sophistication.', 1, 3, 3, 4.8, 140, TRUE),
    ('Swivel Chair', 'A versatile swivel chair with padded arms and back, perfect for offices or living rooms.', 1, 2, 3, 4.7, 180, TRUE),
    ('Wood Rattan Cane Chair', 'Use of Mango Wood as primary material gives this Dining Chair a solid & sturdy look. Secondary material is used as Rattan Cane at back side & Fabrics(Used in Seat).', 1, 3, 1, 4.8, 180, TRUE),
    ('Wood Heirloom Chair', 'These heirloom quality chairs are crafted to compliment your Modular Table and complete your dining set. American-made and solid hardwood. Upholstered seating available on specified models.', 1, 4, 1, 4.9, 140, TRUE);
    
-- Table Category: 10 products
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
	('Glass Table Type 1', 'Add a touch of sophistication to your space with the Glass Table Type 1. Featuring a sleek glass top and a sturdy base, this table offers a modern, minimalist design that enhances any room. Perfect for dining, working, or as a statement piece, it combines elegance with functionality.', 2, 2, 5, 4.9, 330, TRUE),
    ('Glass Table Type 2', 'Add a touch of sophistication to your space with the Glass Table Type 2. Featuring a sleek glass top and a sturdy base, this table offers a modern, minimalist design that enhances any room. Perfect for dining, working, or as a statement piece, it combines elegance with functionality.', 2, 2, 5, 4.9, 330, TRUE),
    ('Nested Table', 'Maximize space and style with the Nested Table. Featuring a set of smaller tables that tuck neatly together, this versatile design offers flexibility for any room. Whether used as individual accent tables or stacked together for a modern look, the Nested Table adds both function and elegance to your home.', 2, 3, 1, 4.9, 330, TRUE),
    ('Round Marble Table Type 1', 'Elevate your space with the luxurious Round Marble Table. Featuring a sleek marble top and a sturdy base, this table exudes elegance and sophistication. Its timeless design makes it perfect for dining rooms, living areas, or as a statement piece in any modern home.', 2, 1, 6, 4.9, 330, TRUE),
    ('Round Marble Table Type 2', 'Elevate your space with the luxurious Round Marble Table. Featuring a sleek marble top and a sturdy base, this table exudes elegance and sophistication. Its timeless design makes it perfect for dining rooms, living areas, or as a statement piece in any modern home.', 2, 1, 6, 4.7, 230, TRUE),
    ('Round Marble Table Type 3', 'Elevate your space with the luxurious Round Marble Table. Featuring a sleek marble top and a sturdy base, this table exudes elegance and sophistication. Its timeless design makes it perfect for dining rooms, living areas, or as a statement piece in any modern home.', 2, 1, 6, 4.8, 310, TRUE),
    ('Round Wood Table Type 1', 'The Round Wood Table combines natural beauty with timeless design. Crafted from high-quality wood, this table features a smooth, round surface and sturdy legs, making it a perfect addition to any dining room, kitchen, or living space. Its versatile design complements a variety of styles, from rustic to modern.', 2, 3, 1, 4.8, 350, TRUE),
    ('Round Wood Table Type 2', 'The Round Wood Table combines natural beauty with timeless design. Crafted from high-quality wood, this table features a smooth, round surface and sturdy legs, making it a perfect addition to any dining room, kitchen, or living space. Its versatile design complements a variety of styles, from rustic to modern.', 2, 3, 1, 4.7, 235, TRUE),
    ('Square Wood Table', 'The Square Wood Table offers a blend of durability and style, featuring a smooth wooden surface and sturdy construction. Its clean, square design makes it a versatile addition to dining rooms, kitchens, or workspaces. Perfect for both modern and traditional interiors, this table brings warmth and functionality to any room.', 2, 3, 1, 4.6, 335, TRUE),
    ('Convertible Wood Table', 'The Convertible Wood Table offers versatile functionality with its innovative design. Crafted from durable wood, this table easily transforms from a compact size to a larger surface, perfect for both everyday use and hosting gatherings. Its stylish look and practical functionality make it a great addition to any modern home.', 2, 3, 1, 4.5, 300, TRUE);
    
-- Bed Category: 10 products
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Luxury Modern Bed 1', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 1, 1, 4.9, 222, TRUE),
    ('Luxury Modern Bed 2', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 1, 1, 4.9, 232, TRUE),
    ('Luxury Modern Bed 3', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 2, 1, 4.8, 242, TRUE),
    ('Luxury Modern Bed 4', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 2, 1, 4.7, 252, TRUE),
    ('Luxury Modern Bed 5', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 3, 1, 4.8, 262, TRUE),
    ('Luxury Modern Bed 6', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 3, 1, 4.7, 272, TRUE),
    ('Luxury Modern Bed 7', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 4, 1, 4.8, 282, TRUE),
    ('Luxury Modern Bed 8', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 4, 1, 4.7, 292, TRUE),
    ('Luxury Modern Bed 9', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 5, 1, 4.9, 202, TRUE),
    ('Luxury Modern Bed 10', 'Experience ultimate comfort and elegance with the Luxury Modern Bed. Featuring a sleek, contemporary design and premium materials, this bed creates a sophisticated focal point in any bedroom. Its plush headboard and sturdy frame provide both style and support, ensuring a restful night’s sleep.', 3, 5, 1, 4.8, 212, TRUE);

-- Storage Category: 15 products
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
    ('Luxury Modern Drawer NightStand Type 1', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 1, 1, 4.9, 130, TRUE),
    ('Luxury Modern Drawer NightStand Type 2', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 1, 1, 4.7, 133, TRUE),
    ('Luxury Modern Drawer NightStand Type 3', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 2, 1, 4.8, 135, TRUE),
    ('Luxury Modern Drawer NightStand Type 4', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 2, 1, 4.9, 136, TRUE),
    ('Luxury Modern Drawer NightStand Type 5', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 3, 1, 4.8, 138, TRUE),
    ('Luxury Modern Drawer NightStand Type 6', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 3, 1, 4.7, 139, TRUE),
    ('Luxury Modern Drawer NightStand Type 7', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 4, 1, 4.9, 130, TRUE),
    ('Luxury Modern Drawer NightStand Type 8', 'The Luxury Modern Drawer Nightstand blends contemporary style with practical storage. Featuring sleek lines, high-quality craftsmanship, and smooth-gliding drawers, it’s the perfect addition to any modern bedroom. Its elegant design and functional storage make it ideal for keeping essentials close at hand while enhancing your room’s décor.', 4, 4, 1, 4.8, 140, TRUE),
    ('Luxury Modern Shelf Type 1', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 1, 2, 4.9, 130, TRUE),
    ('Luxury Modern Shelf Type 2', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 1, 2, 4.8, 140, TRUE),
    ('Luxury Modern Shelf Type 3', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 2, 1, 4.9, 150, TRUE),
    ('Luxury Modern Shelf Type 4', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 2, 1, 4.8, 160, TRUE),
    ('Luxury Modern Shelf Type 5', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 2, 1, 4.9, 170, TRUE),
    ('Luxury Modern Shelf Type 6', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 2, 1, 4.9, 170, TRUE),
    ('Luxury Modern Shelf Type 7', 'The Luxury Modern Shelf combines sophisticated design with practical storage. Crafted from high-quality materials, this sleek shelf offers a stylish way to display books, décor, or personal items. Its minimalist aesthetic fits seamlessly into any modern living room, bedroom, or office space.', 4, 1, 2, 4.8, 180, TRUE);

-- Decor Category
INSERT INTO products (product_name, product_description, category_id, brand_id, material_id, average_rating, rating_count, product_status)
VALUES 
	('Beautiful Picture Frame Type 1', 'Showcase your cherished memories with the Beautiful Picture Frame. Designed with elegance, this frame features a classic yet modern style that complements any décor. Made from high-quality materials, it adds a touch of sophistication while highlighting your favorite photos.', 5, 1, 6, 4.7, 150, TRUE),
    ('Beautiful Picture Frame Type 1', 'Showcase your cherished memories with the Beautiful Picture Frame. Designed with elegance, this frame features a classic yet modern style that complements any décor. Made from high-quality materials, it adds a touch of sophistication while highlighting your favorite photos.', 5, 2, 1, 4.8, 120, TRUE),
    ('Beautiful Picture Frame Type 1', 'Showcase your cherished memories with the Beautiful Picture Frame. Designed with elegance, this frame features a classic yet modern style that complements any décor. Made from high-quality materials, it adds a touch of sophistication while highlighting your favorite photos.', 5, 3, 6, 4.9, 130, TRUE),
    ('Beautiful Picture Frame Type 1', 'Showcase your cherished memories with the Beautiful Picture Frame. Designed with elegance, this frame features a classic yet modern style that complements any décor. Made from high-quality materials, it adds a touch of sophistication while highlighting your favorite photos.', 5, 4, 1, 4.8, 140, TRUE),
    ('Vintage Luxe Mirror Type 1', 'Add a touch of elegance and sophistication to your space with the Vintage Luxe Mirror. Featuring a timeless vintage design with intricate detailing, this mirror serves as both a functional piece and a striking focal point in any room. Its luxurious frame enhances any décor style, from classic to contemporary.', 5, 1, 1, 4.7, 150, TRUE),
    ('Vintage Luxe Mirror Type 1', 'Add a touch of elegance and sophistication to your space with the Vintage Luxe Mirror. Featuring a timeless vintage design with intricate detailing, this mirror serves as both a functional piece and a striking focal point in any room. Its luxurious frame enhances any décor style, from classic to contemporary.', 5, 2, 1, 4.8, 130, TRUE),
    ('Vintage Luxe Mirror Type 1', 'Add a touch of elegance and sophistication to your space with the Vintage Luxe Mirror. Featuring a timeless vintage design with intricate detailing, this mirror serves as both a functional piece and a striking focal point in any room. Its luxurious frame enhances any décor style, from classic to contemporary.', 5, 3, 6, 4.6, 120, TRUE),
    ('Vintage Luxe Mirror Type 1', 'Add a touch of elegance and sophistication to your space with the Vintage Luxe Mirror. Featuring a timeless vintage design with intricate detailing, this mirror serves as both a functional piece and a striking focal point in any room. Its luxurious frame enhances any décor style, from classic to contemporary.', 5, 4, 6, 4.7, 110, TRUE),
    ('Room Decor Vase Type 1', '', 5, 1, 6, 4.7, 150, TRUE),
    ('Room Decor Vase Type 1', '', 5, 1, 6, 4.7, 150, TRUE),
    ('Room Decor Vase Type 1', '', 5, 1, 6, 4.7, 150, TRUE),
    ('Room Decor Vase Type 1', '', 5, 1, 6, 4.7, 150, TRUE),
    ('Room Decor Vase Type 1', '', 5, 1, 6, 4.7, 150, TRUE);

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
INSERT INTO product_colors (color_name, hex_code)
VALUES
('Antique Taupe', '#d4c1b1'),
('Antique Coffee', '#141112'),
('Smooth White', '#f0f0f2'),
('Natural', '#9f7544'),
('Sage Green', '#7c8e76'),
('Mineral', '#a49e92'),
('Caramel Brown', '#65350F'),
('Cadet Blue', '#587a84'),
('Walnut', '#69452e'),
('White Oak', '#b38546'),
('Black Oak', '#28282d'),
('Amber', '#ba3c11'),
('Navy Blue', '#1d2933'),
('Cream', '#ccc7bc');

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
