const mysql = require('mysql');

  const pool = mysql.createPool({
    connectionLimit : 100,
    host     : '85.10.205.173',
    port     :  '3306',
    user     :  'sgroot',
    password : '5eCAs,QEyU0Zb9dT',
    database : 'smart_trash'
  });


  //local database
  /*const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    port     :  '3307',
    user     :  'root',
    password : 'root',
    database : 'smartbin'
  });*/



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
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand, detected_date, amount) " + 
      "VALUES (?,?,?,?,?,?,?,?,?)";
      client.query(sql, [barcode , name, description, manufacturer, image,size, brand, detectedDate,amount], function (err, result) {
        client.release();
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
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "update products set amount = amount + 1 , detected_date = ?  where barcode = ? and status = 1";
    client.query(sql, [barcode , detected_date], function(err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}

// status = 3 means deleted product
function deleteProduct(barcode, detected_date, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "update products set status = 3 where barcode = ? and detected_date = ? ";      
      client.query(sql, [barcode , detected_date], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback({'deleted': true});
      });
    });
  }else {
    var sql = "update products set status = 3 where barcode = ? and detected_date = ? ";
        client.query(sql, [barcode , detected_date], function(err, result) {
        client.release();
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
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "update products set status = 2 where barcode = ? and status = 1 ";
    client.query(sql, [barcode], function(err, result) {
        client.release();
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
      client.query(sql, function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status <> 3";
    client.query(sql,  function(err, result) {
        client.release();
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
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status = 2";
    client.query(sql, [barcode], function(err, result) {
        client.release();
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
      client.query(sql, function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "SELECT * FROM products where status = 1";
    client.query(sql, function(err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}


function insertShoppingList(name , ownerId, created_date, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "INSERT INTO `shoppingList`(`shoppingList_name`, `owner_id` , `created_date`) VALUES (?,?,?)";
      client.query(sql, [name , ownerId,created_date], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "INSERT INTO `shoppingList`(`shoppingList_name`, `owner_id` , `created_date`) VALUES (?,?,?)";
      client.query(sql, [name , ownerId, created_date], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
} 

function insertShoppingListDetail(product , amount, created_date, shoppingListName , callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "INSERT INTO shoppinglistdetails (`sl_id`, `product`, `amount`, `created_date`)" +
      " SELECT shoppingList_id , ? , ? , ? from shoppinglist where shoppingList_name = ?";
      client.query(sql, [product , amount, created_date,shoppingListName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "INSERT INTO shoppinglistdetails (`sl_id`, `product`, `amount`, `created_date`)" +
      " SELECT shoppingList_id , ? , ? , ? from shoppinglist where shoppingList_name = ?";
      client.query(sql, [product , amount, created_date, shoppingListName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}


function deleteShoppingList(name , callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "UPDATE `shoppinglist` SET `status`=3 WHERE shoppinglist_name = ?";
      client.query(sql, [name], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "UPDATE `shoppinglist` SET `status`=3 WHERE shoppinglist_name = ?";
      client.query(sql, [name], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}

function deleteShoppingListDetail(name , productName, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "UPDATE `shoppinglistdetails` b set b.`status`= 3 WHERE sl_id = " +
      "(select a.shoppingList_id from shoppinglist a where a.shoppingList_name = ?) and b.product = ?";
      client.query(sql, [name, productName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "UPDATE `shoppinglistdetails` b set b.`status`= 3 WHERE sl_id = " +
      "(select a.shoppingList_id from shoppinglist a where a.shoppingList_name = ?) and b.product = ?";
      client.query(sql, [name, productName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}

function updateShoppingListDetailAmount(name , productName, amount, callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "UPDATE `shoppinglistdetails` b set b.`amount`= ? WHERE sl_id = " +
      "(select a.shoppingList_id from shoppinglist a where a.shoppingList_name = ?) and b.product = ?";
      client.query(sql, [amount, name, productName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "UPDATE `shoppinglistdetails` b set b.`amount`= ? WHERE sl_id = " +
      "(select a.shoppingList_id from shoppinglist a where a.shoppingList_name = ?) and b.product = ?";
      client.query(sql, [amount, name, productName], function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}

function showShoppingListByType(type, callback){
  var status = ''
  switch(type.toLowerCase()){
        case "purchased" :
          status = 2;
          break;
        case "deleted" :
          status = 3
          break;
        case "unpurchased" :
            status = 1 ;
            break ;
        default:
            status = 1 ;
            break ;
  }

  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "select * from shoppinglist a join shoppinglistdetails b on a.shoppingList_id = b.sl_id " +
      "where a.status = ? and b.status = 1";
      client.query(sql,[status] , function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "select * from shoppinglist a join shoppinglistdetails b on a.shoppingList_id = b.sl_id " +
      "where a.status = ? and b.status = 1";
      client.query(sql,[status] , function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}


function showSpecificShoppingList(name , callback){
  if(pool != null){
    pool.getConnection(function(err,client) {
      if (err) throw err;
      var sql = "select * from shoppinglist a join shoppinglistdetails b on a.shoppingList_id = b.sl_id " +
      "where a.status = 1 and b.status = 1 and a.shoppingList_name = ?";
      client.query(sql,[name] , function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
      });
    });
  }else {
    var sql = "select * from shoppinglist a join shoppinglistdetails b on a.shoppingList_id = b.sl_id " +
      "where a.status = 1 and b.status = 1 and a.shoppingList_name = ?";
      client.query(sql,[name] , function (err, result) {
        client.release();
        if (err) callback({'error': err});
        callback(result);
  });
}
}





module.exports.insertProduct = insertProduct;
module.exports.updateAmountofProduct = updateAmountofProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.buyProduct = buyProduct;
module.exports.showAllProducts = showAllProducts;
module.exports.showBoughtProducts = showBoughtProducts;
module.exports.showUNpurchasedProducts = showUNpurchasedProducts;
module.exports.insertShoppingList = insertShoppingList;
module.exports.insertShoppingListDetail = insertShoppingListDetail;
module.exports.deleteShoppingList = deleteShoppingList;
module.exports.deleteShoppingListDetail = deleteShoppingListDetail;
module.exports.updateShoppingListDetailAmount = updateShoppingListDetailAmount;
module.exports.showShoppingListByType = showShoppingListByType;
module.exports.showSpecificShoppingList = showSpecificShoppingList;



