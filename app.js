const express = require('express');
const createError = require('http-errors');
const https = require('https')
const database = require('./dbUtil');
const barcodeReader = require('./barcodeModule');

//const eventHandler = new EventHandler();


let app = express();
app.use(express.json());
var router = express.Router();

// This is for the bin
app.post('/upload', (req, res) => {
    const barcodes = req.body.barcodes.barcodes;
    console.log(barcodes);
    if (barcodes != null) {
        barcodeReader.getProductByBarcode(barcodes[0], (barcodeDetails) => {
            console.log(barcodeDetails)
            if (!barcodeDetails.message) {
                console.log('inserting')
                console.log(barcodeDetails.barcode)
                console.log(barcodeDetails.name.de)
                console.log(barcodeDetails.description.de)
                console.log(barcodeDetails.manufacturer)
                console.log(Date.now())
                database.insertProduct(barcodeDetails.barcode,
                    barcodeDetails.name.de,
                    barcodeDetails.description.de,
                    barcodeDetails.manufacturer,
                    null,
                    null,
                    null,
                    Date.now(),
                    null,
                    (data) => {
                        console.log('done ---- > ' + data)
                        res.send(data)
                    })
            } else {
                res.send({ error: 'item not found' })
            }
        });
    }
});
// load all products
app.get('/fetch', (req, res) => {
    // Given shopping list ID, we send you your list
    const data = database.showAllProducts((data) => {
        console.log(JSON.stringify(data))
        res.send(JSON.stringify(data))
    })
})


app.post('/create', (req, res) => {
    const product = req.body;
    console.log(product)
    database.insertProduct(product.barcode, product.name, product.description, null, null, null, null, Date.now(), product.amount, (data) => {
        res.send(JSON.stringify(data))
    })
})

app.delete('/delete/:barcode/:date_detected', (req, res) => {
    const barcode = req.params.barcode;
    const date = req.params.date_detected;
    console.log(barcode)
    database.deleteProduct(barcode, date, (status) => {
        res.send(status)
    })
})


app.listen(3000, () => console.log("Listening on port 3000"))


/*database.insertShoppingListDetail("p3"  , 1 , 1234,  "sl2", (status) => {
    console.log(status)
})*/



/*database.showSpecificShoppingList("sl2", (status) => {
    console.log(status)
})*/



/*database.insertShoppingListDetail("p4", 1, 12345 , "sl3",  (status) => {
    console.log(status)
})*/