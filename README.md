# Smart Bin
## Next Generation User Interfaces Server
This server retrieves the details of a product based on the barcode.
It also serves the stored shopping lists to the mobile applications

TO run the app ensure you have nodejs installed.
Navigate to the root directory and run this command: `npm install`
# Endpoints
## **127.0.0.1:3000/fetch**

**GET**

You load all the items added to the server (This will eventually be loaded per user in v2)

## **127.0.0.1:3000/create**

**POST**

Add new item manually
provide a json object with the following fields
 e.g.
`{
		"barcode": 123878877834,
		"name": "dgdfgfh",
		"description": "dfdsgsgdfghf"
}`

## **127.0.0.1:3000/delete/:barcode**

**DELETE**

Delete an item with given barcode
Provide the barcode in the url


