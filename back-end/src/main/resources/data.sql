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

