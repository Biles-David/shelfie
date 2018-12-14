require("dotenv").config();
const massive = require('massive');
const express = require("express");
const { json } = require("body-parser");
const { getProducts, addProduct, deleteProduct, editProduct } = require("./controller")
const app = express();
const port = 3001;

app.use(json());

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db)
  console.log('Database connected')
}).catch(err => console.log(err));


app.get("/api/inventory", getProducts)
app.post("/api/inventory", addProduct)
app.delete("/api/inventory/:id", deleteProduct)
app.put("/api/inventory/:id", editProduct)


app.listen(port, console.log(`Listening on port ${port}`));