const mysql = require('mysql');

const con = mysql.createConnection({
  host     : '85.10.205.173',
  port     :  '3306',
  user     :  'sgroot',
  password : '5eCAs,QEyU0Zb9dT',
  database : 'smart_trash'
  });

  const pool = mysql.createPool({
    connectionLimit : 100,
    host     : '85.10.205.173',
    port     :  '3306',
    user     :  'sgroot',
    password : '5eCAs,QEyU0Zb9dT',
    database : 'smart_trash'
  });

// in this table -> the combination of barcode and status is primary key
// it means if the product is detected and it is status is unbought we just update the amount and prevent to add 
//the new row for it in table but also update the detected_date
function insertProduct(barcode , name, description, manufacturer, image,size, brand, detectedDate, amount, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand, detected_date, amount) " + 
      "VALUES (?,?,?,?,?,?,?,?,?)";
      client.query(sql, [barcode , name, description, manufacturer, image,size, brand, detectedDate,amount], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand, detected_date, amount) " + 
      "VALUES (?,?,?,?,?,?,?,?,?)";
      client.query(sql, [barcode , name, description, manufacturer, image,size, brand, detectedDate,amount], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
} 
}

//to update the amount of detected product and prevent to add more rows for one product
function updateAmountofProduct(barcode, detected_date, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "update products set amount = amount + 1 , detected_date = ?  where barcode = ? and status = 1";
      client.query(sql, [barcode , detected_date], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "update products set amount = amount + 1 , detected_date = ?  where barcode = ? and status = 1";
    client.query(sql, [barcode , detected_date], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
}

// status = 3 means deleted product
function deleteProduct(barcode, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "update products set status = 3 where barcode = ? and status = 1 ";
      client.query(sql, [barcode], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "update products set status = 3 where barcode = ? and status = 1 ";
    client.query(sql, [barcode], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
}


function buyProduct(barcode, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "update products set status = 2 where barcode = ? and status = 1 ";
      client.query(sql, [barcode], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "update products set status = 2 where barcode = ? and status = 1 ";
    client.query(sql, [barcode], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
}

function showAllProducts( callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "SELECT * FROM products where status <> 3";
      client.query(sql, [barcode], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status <> 3";
    client.query(sql, [barcode], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
} 

function showBoughtProducts( callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "SELECT * FROM products where status = 2";
      client.query(sql, [barcode], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status = 2";
    client.query(sql, [barcode], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
} 

function showUNpurchasedProducts( callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "SELECT * FROM products where status = 1";
      client.query(sql, [barcode], function (err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status = 1";
    client.query(sql, [barcode], function(err, result) {
        client.release()
        if (err) callback({'error': err});
        callback(result);
  });
}
}


function login(){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "select * from users where user_id = 1 ";
      client.query(sql, function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "select * from users where user_id = 1 ";
    client.query(sql, function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  })
}  
}

module.exports.insertProduct = insertProduct;
module.exports.updateAmountofProduct = updateAmountofProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.buyProduct = buyProduct;
module.exports.showAllProducts = showAllProducts;
module.exports.showBoughtProducts = showBoughtProducts;
module.exports.showUNpurchasedProducts = showUNpurchasedProducts;
module.exports.login = login;



