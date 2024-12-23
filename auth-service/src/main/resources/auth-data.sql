-- Insert roles (admin, customer)
INSERT INTO roles (role_name) VALUES ('admin'), ('user');

-- Insert admin -- pwd: admin
INSERT INTO admins (username, password, role_id) 
VALUES ('admin', '{bcrypt}$2a$12$D79WRzamHQ2atDk4QvOUhumU4EGKNrhTaTjBKdN.Y6Wb.k/yT8ymK', 1);

-- Insert users -- pwd: user@123
INSERT INTO users (email, phone_number, password, role_id)
VALUES
('user1@example.com', '0931234567', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user2@example.com', '0912345678', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user3@example.com', '0982345679', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user4@example.com', '0973456780', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user5@example.com', '0904567891', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user6@example.com', '0945678902', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user7@example.com', '0956789013', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user8@example.com', '0937890124', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user9@example.com', '0988901235', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user10@example.com', '0979012346', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user11@example.com', '0910123457', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user12@example.com', '0981234568', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user13@example.com', '0902345679', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user14@example.com', '0943456780', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user15@example.com', '0934567891', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user16@example.com', '0975678902', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user17@example.com', '0906789013', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user18@example.com', '0947890124', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user19@example.com', '0938901235', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2),
('user20@example.com', '0989012346', '{bcrypt}$2a$12$VXmwc5WgvQYW/vLEknysPuyHnSW0VLQCIUHO9FOcUCKsEoyy8SKr2', 2);
