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
    const barcodes = req.body.barcodes;
    console.log(barcodes);
    if (barcodes != null) {
        for (const barcode in barcodes) {
         barcodeReader.getProductByBarcode(barcode, (barcodeDetails) => {
            if (barcodeDetails != null) {
                database.insertProduct(barcodeDetails.barcode,
                    barcodeDetails.name, barcodeDetails.description,
                    barcodeDetails.manufacturer,
                    null,
                    null,
                    null,
                    Date.now(),
                    null,
                    (data) => {
                        res.send(data)
                    })
            }
         })
        }
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


app.post('/create', (req,res) => {
    const product = req.body;
    console.log(product)
    database.insertProduct(product.barcode, product.name, product.description,null, null, null,null, Date.now(), null, (data) => {
        res.send(JSON.stringify(data))
    })
})

app.delete('/delete/:barcode', (req,res) => {
    const barcode = req.params.barcode;
    console.log(barcode)
    database.deleteProduct(barcode, (status) => {
        res.send(status)
    })
})




// app.get('/shoppingList/:sid', function (req, res) {
//     // Access userId via: req.params.userId
//     // Access bookId via: req.params.bookId
//     res.send(req.params);
// })


// app.get('/login', function(req, res) {
//      database.login();
// });

// app.get('/showAllProducts', function(req, res, next) {
//     res.json(database.showAllProducts());
// });
// database.insertProduct(1234565,"hello","hello",null,null,null,null,12345443,1);
app.listen(3000, () => console.log("Listening on port 3000"))






