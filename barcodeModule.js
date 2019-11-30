const https = require('https');
var unirest = require("unirest");
// Function to fetch the barcode
function getProduct(barcode, callback) {
    var req = unirest("GET", "https://product-api.p.rapidapi.com/openfood/product");
    req.query({
        "product_code": barcode
    });
    // set headers
    req.headers({
        "x-rapidapi-host": "product-api.p.rapidapi.com",
        "x-rapidapi-key": "f7d9c4b774msh29032b69e20b46fp12fecdjsnd4ec0c3ba17f",
        "User-Agent": "BinOverflow"
    });
    // Read data from the request
    req.end(function (res) {
        if (res.error) return callback({ "error": res.body })
        const json = res.body
        callback({
            "name": json.product_name,
            "description": json.product_name + ' ' + json.quantity,
            "amount": json.serving_quantity,
            "barcode": json.product_code,
            "brand": json.brands[0],
            "image": null,
            "size": json.serving_quantity,
            "manufacturer": null,
            "date_detected": Date.now()
        })
    });
}
module.exports.getProductByBarcode = getProduct;