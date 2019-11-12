const express = require('express');
const https = require('https')
const datatrick = require('datakick')
const bodyParser = require('body-parser');
let app = require('express')();
app.use(express.json());



app.post('/upload', (req, res) => {
    const message = req.body.barcodes;
    console.log(message);
    // Lookup the product name among other details
    // This is the API key - 6s59ggwl1mr1aoguyzoczcyxn5wbvf
    // Read the message being sent here

    res.send('Complete');
});

app.get('/fetch', (req, res) => {
    // Given shopping list ID, we send you your list
    const data = getProduct("5449000011527")
    res.send({ list: ['Cola', 'Beer', 'Milk', 'Ram'], data: data })

})

// Http options

// Function to fetch the barcode
function getProduct(barcode) {
    datatrick.item("5449000011527").then(data => {
        console.log(JSON.stringify(data))
    }).catch(error => {
        console.log("error")
    })
}
getProduct("5449000011527")
app.listen(3000, () => console.log("Listening on port 3000"))