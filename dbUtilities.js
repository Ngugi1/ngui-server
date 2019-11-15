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



module.exports.insertProduct = insertProduct;

