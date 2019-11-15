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



function insertProduct(barcode , name, description, manufacturer, image,size, brand, detectedDate){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand, detected_date) " + 
    "VALUES (?,?,?,?,?,?,?,?)";
    con.query(sql, [barcode , name, description, manufacturer, image,size, brand, detectedDate], function (err, result) {
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



module.exports.insertProduct = insertProduct;
module.exports.showAllProducts = showAllProducts;
module.exports.showBoughtProducts = showBoughtProducts;
module.exports.showUNpurchasedProducts = showUNpurchasedProducts;

