const https = require('https');
// Function to fetch the barcode
function getProduct(barcode, callback) {
    const url = 'https://www.batzo.net/api/v1/products?barcode=' + barcode + '&key=37K1TtyQSGf6rxfWk2uTo2AFuv7lN5tQ2hf'
    console.log(url)
    https.get(url, (response) => {
        response.on('data', (data) => {
            const json = JSON.parse(data)
            callback(json)
        })
        response.on('error', (err) => { return {} })
    })
}
module.exports.getProductByBarcode = getProduct;