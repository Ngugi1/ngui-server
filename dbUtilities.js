const MySQL = require('mysql');

const con = MySQL.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "smartbin"
  
    /*host: "https://remotemysql.com",
      port: 3306,
      user: "rRUPQkGNIB",
      password : "cNtHGWJcrk",    
      database: "rRUPQkGNIB"*/
  });


// in this table -> the combination of barcode and status is primary key
// it means if the product is detected and it is status is unbought we just update the amount and prevent to add 
//the new row for it in table but also update the detected_date
function insertProduct(barcode , name, description, manufacturer, image,size, brand, detectedDate, amount){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand, detected_date, amount) " + 
    "VALUES (?,?,?,?,?,?,?,?,?)";
    con.query(sql, [barcode , name, description, manufacturer, image,size, brand, detectedDate,amount], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

//to update the amount of detected product and prevent to add more rows for one product
function updateAmountofProduct(barcode, detected_date){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "update products set amount = amount + 1 and detected_date = ?  where barcode = ? and status = 1";
    con.query(sql, [barcode , detected_date], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

// status = 3 means deleted product
function deleteProduct(barcode)
{
  con.connect(function(err) {
    if (err) throw err;
    var sql = "update products set status = 3 where barcode = ? and status = 1 ";
    con.query(sql,[barcode], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

function buyProduct(barcode)
{
  con.connect(function(err) {
    if (err) throw err;
    var sql = "update products set status = 2 where barcode = ? and status = 1 ";
    con.query(sql,[barcode], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}


function showAllProducts(){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM products where status <> 3";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
} 

function showBoughtProducts(){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM products where status = 2";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
} 

function showUNpurchasedProducts(){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM products where status = 1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
} 





// status = 2 means purchased product
function setProductAsPurchased(barcode, detected_date)
{
  con.connect(function(err) {
    if (err) throw err;
    var sql = "update products set status = 2 where barcode = ? and detected_date = ? ";
    con.query(sql,[barcode , detected_date], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

module.exports.insertProduct = insertProduct;
module.exports.showAllProducts = showAllProducts;
module.exports.showBoughtProducts = showBoughtProducts;
module.exports.showUNpurchasedProducts = showUNpurchasedProducts;

