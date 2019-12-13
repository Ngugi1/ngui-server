use SMART_BIN;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 1;


CREATE TABLE products (
  barcode varchar(20) NOT NULL,
  name varchar(250) NOT NULL,
  description varchar(500) ,
  manufacturer varchar(250) ,
  image varchar(500) ,
  size varchar(150) ,
  brand varchar(100) ,
  detected_date varchar(100) NOT NULL,
  status int NOT NULL DEFAULT 1,
  amount int not null DEFAULT 1
);


INSERT INTO products (barcode, name, description, manufacturer, image, size, brand, detected_date, status, amount) VALUES
('4960999980034', 'RP-108 Colour Ink Cartridge', NULL, NULL, NULL, '500 ml', NULL, '1574077585500', 3, 3),
('609728949310', 'Einstok White Wheat Beer', NULL, '\r\nEinstok Beer Company', NULL, '330ml', NULL, '1574077595500', 1, 1),
('612615091580', 'Water Glass Water Bottle', '', NULL, NULL, NULL, NULL, '1574077585500', 1, 1),
('62105976277', 'wholesale borosilicate milk cup dairy milk cup Milk carton', NULL, NULL, NULL, NULL, NULL, '1574077595500', 1, 1),
('7611471003624', 'Aptamil Sensivia 2 Follow-Up Milk', NULL, NULL, NULL, NULL, NULL, '1574077596500', 2, 1),
('9421902090035', 'Karma Cola Gingerella', NULL, NULL, NULL, NULL, NULL, '1574077595500', 3, 1);


CREATE TABLE shoppinglist (
  shoppingList_id int primary key auto_increment,
  shoppingList_name varchar(100) NOT NULL,
  created_date varchar(100) NOT NULL,
  owner_id int NOT NULL DEFAULT 1,
  status tinyint NOT NULL DEFAULT 1
);

INSERT INTO shoppinglist (shoppingList_id, shoppingList_name, created_date, owner_id, status) VALUES
(1, 'sl1', 0, 2, 2),
(2, 'sl2', 1234556, 1, 1),
(3, 'sl3', 12345, 1, 1);

CREATE TABLE shoppinglistdetails (
  detail_id int primary key auto_increment,
  sl_id int NOT NULL,
  product varchar(100) NOT NULL,
  amount int NOT NULL DEFAULT 1,
  created_date varchar(100) NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  constraint FK1 foreign key(sl_id) references shoppinglist(shoppingList_id)
) ;

INSERT INTO shoppinglistdetails (detail_id, sl_id, product, amount, created_date, status) VALUES
(1, 1, 'p1', 1, 1234343, 3),
(2, 1, 'p2', 1, 1234, 3),
(3, 2, 'p3', 3, 1234, 1),
(4, 3, 'p4', 1, 12345, 1);


CREATE TABLE users (
  user_id int primary key auto_increment,
  user_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  created_date varchar(100) NOT NULL
) ;

INSERT INTO users (user_id, user_name, password, first_name, last_name, created_date) VALUES
(1, 'reyhan', '123', 'reyhan', 'kalhor', '2019-11-17'),
(2, 'sam', '123', 'samuel', 'Ngugi', '2019-11-17');

ALTER TABLE products
  ADD PRIMARY KEY (barcode,name,detected_date,status);

ALTER TABLE shoppinglist
  ADD UNIQUE KEY shoppingListNameUnique (shoppingList_name);

ALTER TABLE users
  ADD UNIQUE KEY user_name (user_name);


