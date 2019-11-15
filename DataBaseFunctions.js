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


  //function to get shopping list
function createAccount(userName , password) {

}

function login(userName,password)
{

}

function addRelative(){}

function getProducts()
{}

function addUser(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

function getShoppingList(userId){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
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
    console.log("Connected!");
    var sql = "select * from users where user_name = ? and password=?";
    con.query(sql, [userName,password], function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}


module.exports.createAccount = createAccount;
module.exports.login = login;
module.exports.addRelative = addRelative;
module.exports.getShoppingList = getShoppingList;

