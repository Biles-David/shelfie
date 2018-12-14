const express = require("express");
const {json} = require("body-parser");

const getProducts = (req, res, next) => {
  const db = req.app.get('db');
  db.getProduct().then( product => res.status(200).json(product))
  .catch( err => {res.status(500); console.log(err)})
}

const addProduct = (req, res, next) => {
  const db = req.app.get('db');
  db.addProduct([req.body.name, req.body.price, req.body.img])
  .then( response => {
    db.getProduct().then(response => res.json( response ))
    res.json(response)
  })
}

const deleteProduct = (req, res, next) => {
  const db = req.app.get('db');
  db.deleteProduct(req.params.id)
  .then( response => {
    db.getProduct().then(response => res.json( response ));
    () => res.sendStatus(200)
  })
  .catch(err => console.log(err))
}

const editProduct = (req, res, next) => {
  const db = req.app.get('db');
  const { params, body } = req;
  db.editProduct([params.id, body.name, body.price, body.img])
  .then( () => res.sendStatus(200) )
  .catch( err => {
    console.log(err)
  })
} 

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct
}