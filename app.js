const express = require('express');
const createError = require('http-errors');
const https = require('https')
const bodyParser = require('body-parser');

const database = require('./dbUtil');
const barcodeReader = require('./barcodeModule');
const EventHandler = require('./EventHandler');

//const eventHandler = new EventHandler();


let app = express();
app.use(express.json());
var router = express.Router();


app.post('/upload', (req, res) => {
    const barcodes = req.body.barcodes;
    console.log(barcodes);
    if (barcodes != null) {
        for (const barcode in barcodes) {
            const barcodeDetails = barcodeReader.getProductByBarcode(barcode)
            if (barcodeDetails != null) {
                database.insertProduct(barcodeDetails.barcode,
                    barcodeDetails.name, barcodeDetails.description,
                    barcodeDetails.manufacturer,
                    null,
                    null,
                    Date.now())
            }

        }
    }

    res.send('Complete');
});

app.get('/fetch', (req, res) => {
    // Given shopping list ID, we send you your list
    const data = barcodeReader.getProductByBarcode("5449000011527")
    res.send({ list: ['Cola', 'Beer', 'Milk', 'Ram'], data: data })

})

app.get('/shoppingList/:sid', function (req, res) {
    // Access userId via: req.params.userId
    // Access bookId via: req.params.bookId
    res.send(req.params);
})

// Http options

//database.getShoppingList(userId)();*/

//database.insertProduct(1234,"hello",null,null,null,null,null,null)


// barcodeReader.getProductByBarcode("5449000011527")
app.listen(3000, () => console.log("Listening on port 3000"))






