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

INSERT INTO products (product_name, product_description, average_rating, rating_count, sub_category_id, created_at, updated_at) VALUES
('Rose Plant', 'A beautiful rose plant for your garden or home', 4.8, 220, 1, NOW(), NOW()),
('Tulip Bulbs', 'Bright and colorful tulips for your garden', 4.6, 300, 1, NOW(), NOW()),
('Lavender Plant', 'Lavender for a relaxing aroma and beautiful flowers', 4.7, 180, 1, NOW(), NOW()),
('Sunflower Seeds', 'Grow your own sunflowers with these high-quality seeds', 4.9, 400, 2, NOW(), NOW()),
('Orchid Plant', 'A delicate and elegant orchid plant for indoors', 4.5, 150, 1, NOW(), NOW()),
('Lettuce Seeds', 'Organic lettuce seeds for home gardening', 4.3, 210, 3, NOW(), NOW()),
('Spinach Seeds', 'Healthy and easy-to-grow spinach seeds for your garden', 4.2, 180, 3, NOW(), NOW()),
('Carrot Seeds', 'High-quality carrot seeds for healthy vegetables', 4.4, 230, 4, NOW(), NOW()),
('Tomato Plants', 'Fresh tomato plants for your garden or patio', 4.6, 330, 4, NOW(), NOW()),
('Apple Tree Sapling', 'A young apple tree sapling ready for planting', 4.7, 500, 5, NOW(), NOW()),
('Strawberry Plant', 'A strawberry plant that yields delicious fruit', 4.8, 550, 6, NOW(), NOW()),
('Lemon Tree', 'A lemon tree that can produce fresh lemons year-round', 4.6, 400, 5, NOW(), NOW()),
('Blueberry Bush', 'Plant your own blueberries with this easy-to-grow bush', 4.9, 600, 6, NOW(), NOW());
