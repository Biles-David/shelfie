import React from 'react';
import './Product.css'

const Product = props => (
  <div className="productBox">
    <img alt='' className="productImg" src={props.inventory.img}></img>
    <div className="productText">
    <p>{props.inventory.name}</p>
    <p>${props.inventory.price}</p>
    </div>
    <div className="editBtn">
    <button className="dashboardBtn" onClick={
      // () => console.log(props.inventory.id)
      () => props.handleDelete(props.inventory.id)
      }>Delete</button>
    <button className="dashboardBtn">Edit</button>
    </div>
  </div>
)

export default Product;