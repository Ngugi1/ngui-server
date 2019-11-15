const datatrick = require('datakick');

// Function to fetch the barcode
function getProduct(barcode) {
    datatrick.item("5449000011527").then(data => {
        console.log(JSON.stringify(data))
    }).catch(error => {
        console.log("error")
    })
}


module.exports.getProductByBarcode = getProduct;