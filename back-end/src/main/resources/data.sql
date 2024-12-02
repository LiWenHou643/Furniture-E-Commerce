INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('ADMIN'),
       ('USER');

-- pwd: admin@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role_id`)
VALUES ('admin', 'admin123@gmail.com', '{bcrypt}$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK', '1');

INSERT INTO `defaultdb`.`address` (`street_address`, `ward`, `district`, `city`)
VALUES ('1 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('2 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('3 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('4 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('5 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('6 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('7 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('8 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('9 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('10 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('11 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('12 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('13 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('14 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('15 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('16 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('17 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('18 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('19 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('20 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('21 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('22 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('23 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('24 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('25 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('26 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('27 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('28 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('29 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('30 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('31 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('32 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('33 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('34 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('35 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('36 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('37 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('38 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('39 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('40 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('41 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('42 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('43 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('44 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('45 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('46 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('47 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('48 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('49 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('50 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ');

-- pwd: user@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `phone_number`, `address_id`, `image`, `password`, `role_id`)
VALUES ('le van hau', 'user001@gmail.com', '0939000001', '1', 'cat.jpg',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2');

INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `phone_number`, `address_id`, `password`, `role_id`)
VALUES ('thien de', 'user002@gmail.com', '0939000002', '2',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duy nga doc ton', 'user003@gmail.com', '0939000003', '3',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('de bat kiem tien', 'user004@gmail.com', '0939000004', '4',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('luc duong', 'user005@gmail.com', '0939000005', '5',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('van chi', 'user006@gmail.com', '0939000006', '6',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('manh canh chu', 'user007@gmail.com', '0939000007', '7',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duong khai', 'user008@gmail.com', '0939000008', '8',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tu tieu thu', 'user009@gmail.com', '0939000009', '9',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('han lap', 'user010@gmail.com', '0939000010', '10',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('le phi vu', 'user011@gmail.com', '0939000011', '11',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tran binh an', 'user012@gmail.com', '0939000012', '12',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('lam vinh da', 'user013@gmail.com', '0939000013', '13',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('muc tran', 'user014@gmail.com', '0939000014', '14',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tieu viem', 'user015@gmail.com', '0939000015', '15',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('hao thien de', 'user016@gmail.com', '0939000016', '16',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('ly that da', 'user017@gmail.com', '0939000017', '17',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('de ba', 'user018@gmail.com', '0939000018', '18',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('hoang thien de', 'user019@gmail.com', '0939000019', '19',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('thach hao', 'user020@gmail.com', '0939000020', '20',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('ton ngo khong', 'user021@gmail.com', '0939000021', '21',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duong tang', 'user022@gmail.com', '0939000022', '22',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tru bat gioi', 'user023@gmail.com', '0939000023', '23',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('sa ngo tinh', 'user024@gmail.com', '0939000024', '24',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('bach long ma', 'user025@gmail.com', '0939000025', '25',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('nu oa', 'user026@gmail.com', '0939000026', '26',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('hau tho', 'user027@gmail.com', '0939000027', '27',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duong tien', 'user028@gmail.com', '0939000028', '28',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('hang nga', 'user029@gmail.com', '0939000029', '29',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('dai vu', 'user030@gmail.com', '0939000030', '30',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('vu chinh', 'user031@gmail.com', '0939000031', '31',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('thai at', 'user032@gmail.com', '0939000032', '32',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('luc ap', 'user033@gmail.com', '0939000033', '33',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('thai thanh', 'user034@gmail.com', '0939000034', '34',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('thong thien', 'user035@gmail.com', '0939000035', '35',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tran pham', 'user036@gmail.com', '0939000036', '36',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('ly mo uyen', 'user037@gmail.com', '0939000037', '37',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('vuong lam', 'user038@gmail.com', '0939000038', '38',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('long ngao thien', 'user039@gmail.com', '0939000039', '39',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duong tam', 'user040@gmail.com', '0939000040', '40',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('mac pham', 'user041@gmail.com', '0939000041', '41',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('ly chau', 'user042@gmail.com', '0939000042', '42',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('la chinh', 'user043@gmail.com', '0939000043', '43',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('la thien', 'user044@gmail.com', '0939000044', '44',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('tieu ly', 'user045@gmail.com', '0939000045', '45',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('hao nhien', 'user046@gmail.com', '0939000046', '46',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('bach da', 'user047@gmail.com', '0939000047', '47',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('cam diem', 'user048@gmail.com', '0939000048', '48',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('diep tieu kim', 'user049@gmail.com', '0939000049', '49',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('thai than', 'user050@gmail.com', '0939000050', '50',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2');

INSERT INTO `defaultdb`.`category` (`id`, `name`)
VALUES ('1', 'eyeglasses'),
       ('2', 'sunglasses'),
       ('3', 'eyelens');

INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount_percentage`, `image`,
                                   `description`,
                                   `stock_quantity`)
VALUES ('1', 'EG01', 'Eye Glasses 01', '59.9', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '0'),
       ('1', 'EG02', 'Eye Glasses 02', '35.39', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG03', 'Eye Glasses 03', '29.9', '40', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG04', 'Eye Glasses 04', '18.29', '20', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '0'),
       ('1', 'EG05', 'Eye Glasses 05', '29.39', '3', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG06', 'Eye Glasses 06', '23.49', '0', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG07', 'Eye Glasses 07', '47.59', '70', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG08', 'Eye Glasses 08', '83.69', '20', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG09', 'Eye Glasses 09', '62.79', '30', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG10', 'Eye Glasses 10', '45.89', '5', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG11', 'Eye Glasses 11', '38.9', '20', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG12', 'Eye Glasses 12', '64.19', '60', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG13', 'Eye Glasses 13', '88.9', '25', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG14', 'Eye Glasses 14', '77.19', '35', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG15', 'Eye Glasses 15', '66.39', '30', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG16', 'Eye Glasses 16', '55.59', '0', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG17', 'Eye Glasses 17', '44.69', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG18', 'Eye Glasses 18', '33.69', '0', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG19', 'Eye Glasses 19', '22.39', '40', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG20', 'Eye Glasses 20', '73.39', '40', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG21', 'Eye Glasses 21', '82.9', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG22', 'Eye Glasses 22', '74.39', '30', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG23', 'Eye Glasses 23', '64.9', '30', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG24', 'Eye Glasses 24', '49.39', '40', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG25', 'Eye Glasses 25', '47.39', '70', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG26', 'Eye Glasses 26', '69.39', '60', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG27', 'Eye Glasses 27', '59.39', '40', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG28', 'Eye Glasses 28', '39.39', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG29', 'Eye Glasses 29', '38.39', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG30', 'Eye Glasses 30', '47.39', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG31', 'Eye Glasses 31', '81.9', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG32', 'Eye Glasses 32', '61.89', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG33', 'Eye Glasses 33', '61.9', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG34', 'Eye Glasses 34', '71.89', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG35', 'Eye Glasses 35', '81.89', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG36', 'Eye Glasses 36', '91.89', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG37', 'Eye Glasses 37', '96.39', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG38', 'Eye Glasses 38', '46.39', '70', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG39', 'Eye Glasses 39', '75.39', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG40', 'Eye Glasses 40', '88.39', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG41', 'Eye Glasses 41', '55.9', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG42', 'Eye Glasses 42', '61.7', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG43', 'Eye Glasses 43', '61.8', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG44', 'Eye Glasses 44', '71.8', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG45', 'Eye Glasses 45', '81.8', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG46', 'Eye Glasses 46', '91.08', '60', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG47', 'Eye Glasses 47', '96.98', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG48', 'Eye Glasses 48', '46.88', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG49', 'Eye Glasses 49', '75.78', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG50', 'Eye Glasses 50', '88.68', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG51', 'Eye Glasses 51', '81.59', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG52', 'Eye Glasses 52', '61.49', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG53', 'Eye Glasses 53', '61.39', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG54', 'Eye Glasses 54', '71.29', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG55', 'Eye Glasses 55', '81.19', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG56', 'Eye Glasses 56', '91.29', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG57', 'Eye Glasses 57', '96.19', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG58', 'Eye Glasses 58', '46.34', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG59', 'Eye Glasses 59', '75.92', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),
       ('1', 'EG60', 'Eye Glasses 60', '88.91', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG01', 'Sun Glasses 01', '43.19', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG02', 'Sun Glasses 02', '67.29', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG03', 'Sun Glasses 03', '55.39', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG04', 'Sun Glasses 04', '26.49', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG05', 'Sun Glasses 05', '28.59', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG06', 'Sun Glasses 06', '24.69', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG07', 'Sun Glasses 07', '19.79', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG08', 'Sun Glasses 08', '46.89', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG09', 'Sun Glasses 09', '32.99', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG10', 'Sun Glasses 10', '29.79', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG11', 'Sun Glasses 11', '94.69', '70', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG12', 'Sun Glasses 12', '65.59', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG13', 'Sun Glasses 13', '53.49', '80', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG14', 'Sun Glasses 14', '54.39', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG15', 'Sun Glasses 15', '44.29', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG16', 'Sun Glasses 16', '88.99', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG17', 'Sun Glasses 17', '77.89', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG18', 'Sun Glasses 18', '64.79', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG19', 'Sun Glasses 19', '24.69', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG20', 'Sun Glasses 20', '54.59', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG21', 'Sun Glasses 21', '23.49', '60', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG22', 'Sun Glasses 22', '54.39', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG23', 'Sun Glasses 23', '24.29', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG24', 'Sun Glasses 24', '65.19', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG25', 'Sun Glasses 25', '35.29', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG26', 'Sun Glasses 26', '53.39', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG27', 'Sun Glasses 27', '35.49', '60', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG28', 'Sun Glasses 28', '55.49', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG29', 'Sun Glasses 29', '72.59', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG30', 'Sun Glasses 30', '39.69', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG31', 'Sun Glasses 31', '33.79', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG32', 'Sun Glasses 32', '34.89', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG33', 'Sun Glasses 33', '34.99', '70', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG34', 'Sun Glasses 34', '35.89', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG35', 'Sun Glasses 35', '55.79', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG36', 'Sun Glasses 36', '33.69', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG37', 'Sun Glasses 37', '45.59', '80', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG38', 'Sun Glasses 38', '45.49', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG39', 'Sun Glasses 39', '42.39', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG40', 'Sun Glasses 40', '49.29', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG41', 'Sun Glasses 41', '73.19', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG42', 'Sun Glasses 42', '24.29', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG43', 'Sun Glasses 43', '34.99', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG44', 'Sun Glasses 44', '45.89', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG45', 'Sun Glasses 45', '55.79', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG46', 'Sun Glasses 46', '63.69', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG47', 'Sun Glasses 47', '45.59', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG48', 'Sun Glasses 48', '75.49', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG49', 'Sun Glasses 49', '72.59', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG50', 'Sun Glasses 50', '79.39', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG51', 'Sun Glasses 51', '33.33', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG52', 'Sun Glasses 52', '24.11', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG53', 'Sun Glasses 53', '84.44', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG54', 'Sun Glasses 54', '85.33', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG55', 'Sun Glasses 55', '81.89', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG56', 'Sun Glasses 56', '83.19', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG57', 'Sun Glasses 57', '31.49', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG58', 'Sun Glasses 58', '51.49', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG59', 'Sun Glasses 59', '71.89', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),
       ('2', 'SG60', 'Sun Glasses 60', '51.89', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('3', 'EL01', 'Eye Lens 01', '40', '0', '/data-image/el-01.jpg', 'good glasses for protect eyes', '50'),
       ('3', 'EL02', 'Eye Lens 02', '50', '10', '/data-image/el-02.jpg', 'good glasses for protect eyes', '50'),
       ('3', 'EL03', 'Eye Lens 03', '60', '20', '/data-image/el-03.jpg', 'good glasses for protect eyes', '50');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('121', 'white', '#ffffff'),
       ('121', 'black', '#000000'),
       ('121', 'gray', '#8a8a8a'),
       ('121', 'orange', '#ffa600'),
       ('121', 'blue', '#0097ff'),
       ('121', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('122', 'white', '#ffffff'),
       ('122', 'black', '#000000'),
       ('122', 'gray', '#8a8a8a'),
       ('122', 'orange', '#ffa600'),
       ('122', 'blue', '#0097ff'),
       ('122', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('123', 'white', '#ffffff'),
       ('123', 'black', '#000000'),
       ('123', 'gray', '#8a8a8a'),
       ('123', 'orange', '#ffa600'),
       ('123', 'blue', '#0097ff'),
       ('123', 'green', '#00bd20');

INSERT INTO `defaultdb`.`cart` (`id`, `person_id`)
VALUES ('1', '2'),
       ('2', '3'),
       ('3', '4'),
       ('4', '5'),
       ('5', '6'),
       ('6', '7'),
       ('7', '8'),
       ('8', '9'),
       ('9', '10'),
       ('10', '11'),
       ('11', '12'),
       ('12', '13'),
       ('13', '14'),
       ('14', '15'),
       ('15', '16'),
       ('16', '17'),
       ('17', '18'),
       ('18', '19'),
       ('19', '20'),
       ('20', '21'),
       ('21', '22'),
       ('22', '23'),
       ('23', '24'),
       ('24', '25'),
       ('25', '26'),
       ('26', '27'),
       ('27', '28'),
       ('28', '29'),
       ('29', '30'),
       ('30', '31'),
       ('31', '32'),
       ('32', '33'),
       ('33', '34'),
       ('34', '35'),
       ('35', '36'),
       ('36', '37'),
       ('37', '38'),
       ('38', '39'),
       ('39', '40'),
       ('40', '41'),
       ('41', '42'),
       ('42', '43'),
       ('43', '44'),
       ('44', '45'),
       ('45', '46'),
       ('46', '47'),
       ('47', '48'),
       ('48', '49'),
       ('49', '50'),
       ('50', '51');


INSERT INTO `defaultdb`.`codes` (`id`, `code`, `value`)
VALUES ('1', 'vip10', '10'),
       ('2', 'vip20', '20'),
       ('3', 'vip30', '30');
       
       
INSERT INTO `defaultdb`.`cart_item` (`cart_id`, `product_id`, `quantity`, `price`, `discount_percentage`, `created_at`)
VALUES ('1', '6', '3', '23', '0', '2024-10-9 05:24:33'),
       ('1', '8', '3', '83', '20', '2024-10-10 05:24:33'),
       ('1', '15', '2', '66', '30', '2024-10-11 05:24:33');



-- order data for analyst ----------
INSERT INTO `orders` (
    `person_id`, `status`, `sub_total`, `discount_percentage`, `promo_code`, `shipping_address`, `notes`, `created_at`, `updated_at`
) VALUES (
    1, 'FINISHED', 123.61, 0.00, NULL, '1 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-6-1 14:17:20', '2024-6-6 13:57:50'             
),
(
    1, 'FINISHED', 65.15, 0.00, NULL, '1 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-6-10 14:17:20', '2024-6-15 13:57:50'             
),
(
    2, 'FINISHED', 57.04, 0.00, NULL, '2 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-7-20 14:17:20', '2024-7-25 13:57:50'             
),
(
    2, 'FINISHED', 46.98, 0.00, NULL, '2 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-7-24 14:17:20', '2024-7-29 13:57:50'             
),
(
    3, 'FINISHED', 162.45, 0.00, NULL, '3 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-7-25 14:17:20', '2024-7-30 13:57:50'             
),
(
    3, 'FINISHED', 87.91, 0.00, NULL, '3 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-7-27 14:17:20', '2024-8-3 13:57:50'             
),
(
    4, 'FINISHED', 149.53, 0.00, NULL, '4 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-8-1 14:17:20', '2024-8-6 13:57:50'             
),
(
    4, 'FINISHED', 184.70, 0.00, NULL, '4 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-9-10 14:17:20', '2024-9-15 13:57:50'             
),
(
    4, 'FINISHED', 100.12, 0.00, NULL, '4 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-9-20 14:17:20', '2024-9-25 13:57:50'             
),
(
    5, 'FINISHED', 92.91, 0.00, NULL, '5 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-9-22 14:17:20', '2024-9-27 13:57:50'             
),
(
    6, 'FINISHED', 146.93, 0.00, NULL, '6 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-2 14:17:20', '2024-10-7 13:57:50'             
),
(
    7, 'FINISHED', 67.38, 0.00, NULL, '7 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-8 14:17:20', '2024-10-13 13:57:50'             
),
(
    7, 'FINISHED', 217.15, 0.00, NULL, '7 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-9 14:17:20', '2024-10-14 13:57:50'             
),
(
    8, 'FINISHED', 362.98, 0.00, NULL, '8 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-12 14:17:20', '2024-10-17 13:57:50'             
),
(
    9, 'FINISHED', 181.72, 0.00, NULL, '9 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-14 14:17:20', '2024-10-19 13:57:50'             
),
(
    10, 'FINISHED', 29.63, 0.00, NULL, '10 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-18 14:17:20', '2024-10-23 13:57:50'             
),
(
    10, 'FINISHED', 14.22, 0.00, NULL, '10 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-19 14:17:20', '2024-10-24 13:57:50'             
),
(
    10, 'FINISHED', 55.51, 0.00, NULL, '10 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-20 14:17:20', '2024-10-25 13:57:50'             
),
(
    10, 'FINISHED', 35.63, 0.00, NULL, '10 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', '', '2024-10-21 14:17:20', '2024-10-26 13:57:50'             
);

INSERT INTO `defaultdb`.`order_item` (`order_id`, `product_id`, `quantity`, `price`, `discount_percentage`, `created_at`, `updated_at`)
VALUES 
( '1', '1', '2', '59.90', '50', '2024-6-1 14:17:20', '2024-6-1 14:17:20'),
( '1', '2', '2', '35.39', '10', '2024-6-1 14:17:20', '2024-6-1 14:17:20'),
( '2', '3', '2', '29.90', '40', '2024-6-10 14:17:20', '2024-6-10 14:17:20'),
( '2', '4', '2', '18.29', '20', '2024-6-10 14:17:20', '2024-6-10 14:17:20'),
( '3', '5', '2', '29.39', '3', '2024-7-20 14:17:20', '2024-7-20 14:17:20'),
( '4', '6', '2', '23.49', '0', '2024-7-24 14:17:20', '2024-7-24 14:17:20'),
( '5', '7', '2', '47.59', '70', '2024-7-25 14:17:20', '2024-7-25 14:17:20'),
( '5', '8', '2', '83.69', '20', '2024-7-25 14:17:20', '2024-7-25 14:17:20'),
( '6', '9', '2', '62.79', '30', '2024-7-27 14:17:20', '2024-7-27 14:17:20'),
( '7', '10', '2', '45.89', '5', '2024-8-1 14:17:20', '2024-8-1 14:17:20'),
( '7', '11', '2', '38.90', '20', '2024-8-1 14:17:20', '2024-8-1 14:17:20'),
( '8', '12', '2', '64.19', '60', '2024-9-10 14:17:20', '2024-9-10 14:17:20'),
( '8', '13', '2', '88.90', '25', '2024-9-10 14:17:20', '2024-9-10 14:17:20'),
( '9', '14', '2', '77.19', '35', '2024-9-20 14:17:20', '2024-9-20 14:17:20'),
( '10', '15', '2', '66.39', '30', '2024-9-22 14:17:20', '2024-9-22 14:17:20'),
( '11', '16', '2', '55.59', '0', '2024-10-2 14:17:20', '2024-10-2 14:17:20'),
( '11', '17', '1', '44.69', '20', '2024-10-2 14:17:20', '2024-10-2 14:17:20'),
( '12', '18', '2', '33.69', '0', '2024-10-8 14:17:20', '2024-10-8 14:17:20'),
( '13', '19', '3', '22.39', '40', '2024-10-9 14:17:20', '2024-10-9 14:17:20'),
( '13', '20', '4', '73.39', '40', '2024-10-9 14:17:20', '2024-10-9 14:17:20'),
( '14', '21', '5', '82.90', '50', '2024-10-12 14:17:20', '2024-10-12 14:17:20'),
( '14', '22', '3', '74.39', '30', '2024-10-12 14:17:20', '2024-10-12 14:17:20'),
( '15', '23', '4', '64.90', '30', '2024-10-14 14:17:20', '2024-10-14 14:17:20'),
( '16', '24', '1', '49.39', '40', '2024-10-18 14:17:20', '2024-10-18 14:17:20'),
( '17', '25', '1', '47.39', '70', '2024-10-19 14:17:20', '2024-10-19 14:17:20'),
( '18', '26', '2', '69.39', '60', '2024-10-20 14:17:20', '2024-10-20 14:17:20'),
( '19', '27', '1', '59.39', '40', '2024-10-21 14:17:20', '2024-10-21 14:17:20');

INSERT INTO `defaultdb`.`payments` (`order_id`, `status`, `amount`, `payment_method`, `created_at`, `updated_at`) 
VALUES 
('1', 'PAID', '123.61', 'CASH_ON_DELIVERY', '2024-6-1 14:17:20', '2024-6-6 13:57:50'),
('2', 'PAID', '65.15', 'CASH_ON_DELIVERY', '2024-6-10 14:17:20', '2024-6-15 13:57:50'),
('3', 'PAID', '57.04', 'CASH_ON_DELIVERY', '2024-7-20 14:17:20', '2024-7-25 13:57:50'),
('4', 'PAID', '46.98', 'CASH_ON_DELIVERY', '2024-7-24 14:17:20', '2024-7-29 13:57:50'),
('5', 'PAID', '162.45', 'PAYPAL', '2024-7-25 14:17:20', '2024-7-25 14:17:20'),
('6', 'PAID', '87.91', 'CASH_ON_DELIVERY', '2024-7-27 14:17:20', '2024-8-3 13:57:50'),
('7', 'PAID', '149.43', 'PAYPAL', '2024-8-1 14:17:20', '2024-8-1 14:17:20'),
('8', 'PAID', '184.70', 'CASH_ON_DELIVERY', '2024-9-10 14:17:20', '2024-9-15 13:57:50'),
('9', 'PAID', '100.12', 'CASH_ON_DELIVERY', '2024-9-20 14:17:20', '2024-9-25 13:57:50'),
('10', 'PAID', '92.91', 'PAYPAL', '2024-9-22 14:17:20', '2024-9-22 14:17:20'),
('11', 'PAID', '146.93', 'CASH_ON_DELIVERY', '2024-9-22 14:17:20', '2024-9-27 13:57:50'),
('12', 'PAID', '67.38', 'CASH_ON_DELIVERY', '2024-10-8 14:17:20', '2024-10-13 13:57:50'),
('13', 'PAID', '217.15', 'CASH_ON_DELIVERY', '2024-10-9 14:17:20', '2024-10-14 13:57:50'),
('14', 'PAID', '362.98', 'PAYPAL', '2024-10-12 14:17:20', '2024-10-12 14:17:20'),
('15', 'PAID', '181.72', 'PAYPAL', '2024-10-14 14:17:20', '2024-10-14 14:17:20'),
('16', 'PAID', '29.63', 'CASH_ON_DELIVERY', '2024-10-18 14:17:20', '2024-10-23 13:57:50'),
('17', 'PAID', '14.22', 'PAYPAL', '2024-10-19 14:17:20', '2024-10-19 14:17:20'),
('18', 'PAID', '55.51', 'PAYPAL', '2024-10-20 14:17:20', '2024-10-20 14:17:20'),
('19', 'PAID', '35.63', 'PAYPAL', '2024-10-21 14:17:20', '2024-10-21 14:17:20');



-- order data for test function ----------
INSERT INTO `orders` (
    `person_id`, `status`, `sub_total`, `discount_percentage`, `promo_code`, `shipping_address`, `notes`, `created_at`, `updated_at`
) VALUES (
    1, 'DELIVERED', 35.88, 0.00, NULL, '1 Mau Than, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ', 'Please ship to my house in the afternoon.', '2024-10-29 14:17:20', '2024-11-5 13:57:50'             
);
INSERT INTO `defaultdb`.`order_item` (`order_id`, `product_id`, `quantity`, `price`, `discount_percentage`, `created_at`, `updated_at`)
VALUES ('20', '3', '2', '29.90', '40', '2024-10-29 14:17:20', '2024-10-29 14:17:20');

INSERT INTO `order_status_history` (`order_id`, `status`, `datetime`)
VALUES (20,'PENDING', '2024-10-29 14:17:20'),
(20,'CONFIRMED', '2024-10-30 15:30:24'),
(20,'SHIPPED', '2024-10-31 10:10:30'),
(20,'DELIVERED', '2024-11-05 13:57:50');

INSERT INTO `defaultdb`.`payments` (`order_id`, `status`, `amount`, `payment_method`, `created_at`, `updated_at`) 
VALUES ('20', 'UNPAID', '35.88', 'CASH_ON_DELIVERY', '2024-03-15 03:00:00', '2024-03-15 03:00:00');


-- SHOW TABLES;
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE address;
-- TRUNCATE TABLE cart;
-- TRUNCATE TABLE cart_item;
-- TRUNCATE TABLE category;
-- TRUNCATE TABLE codes;
-- TRUNCATE TABLE color;
-- TRUNCATE TABLE invalidated_tokens;
-- TRUNCATE TABLE order_item;
-- TRUNCATE TABLE orders;
-- TRUNCATE TABLE payments;
-- TRUNCATE TABLE person;
-- TRUNCATE TABLE product;
-- TRUNCATE TABLE ratings;
-- TRUNCATE TABLE refresh_tokens;
-- TRUNCATE TABLE roles;
-- TRUNCATE TABLE order_status_history;
-- SET FOREIGN_KEY_CHECKS = 1;

