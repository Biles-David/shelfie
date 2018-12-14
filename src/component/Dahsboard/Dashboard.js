import React, { Component } from 'react';
import Product from '../Product/Product';
import './Dashboard.css';

class Dashboard extends Component {

  render () {
    let {inventory} = this.props
    let map = inventory.map( (product,i) => 
      <Product 
      inventory={inventory[i]}
      handleDelete={this.props.handleDelete}/>
    )
    return (
      <div className="dashboard">
        {map}
      </div>
    )
  }
}

export default Dashboard;