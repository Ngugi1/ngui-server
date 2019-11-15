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


// users Function
function createAccount(userName , password) {}
function login(userName,password){}
function addRelative(){}
function addUser(){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO `users`(`user_id`, `user_name`, `password`, `name`, `last_name`, `created_date`) VALUES (?,?,?,?,?,?)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

function getShoppingList(userId){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM shoppinglist a join shoppinglistdetails b on a.si_id = b.sl_id where a.owner_id = ?";
    con.query(sql, [userId] , function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

function getUser(userName, password){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "select * from users where user_name = ? and password=?";
    con.query(sql, [userName,password], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

function insertProduct(barcode , name, description, manufacturer, image,size, brand, detectedDate){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO products(barcode, name, description, manufacturer, image, size, brand)" + 
    "VALUES (?,?,?,?,?,?,?)";
    con.query(sql, [barcode , name, description, manufacturer, image,size, brand], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}


module.exports.createAccount = createAccount;
module.exports.insertProduct = insertProduct;
module.exports.login = login;
module.exports.addRelative = addRelative;
module.exports.getShoppingList = getShoppingList;



//barcode not null
//name of product
//brand
//manufacture
//name not null
//description
//detectedDate

//Sam pass me this options and I insert them in database
//I choose change database structure
//just simplify it
