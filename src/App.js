import React, { Component } from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './component/Header/Header';
import Dashboard from './component/Dahsboard/Dashboard';
import Form from './component/Form/Form';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      inventory: [],
      dataLoaded: false,
      currentlySelected: null
    }
    this.addProduct = this.addProduct.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.currentItem = this.currentItem.bind(this)
  }

  componentDidMount(){
    axios(`/api/inventory`)
    .then(response => {
      // console.log('hit')
      this.setState({inventory: response.data, dataLoaded: true})
    })
  }

  getProduct(){
    axios(`/api/inventory`)
    .then(response => {
      this.setState({inventory: response.data})
    })
  }

  componentDidUpdate(prevProps){
    if(this.state.inventory !== prevProps.inventory) {
      this.getProduct()
    }
  }

  addProduct(val){
    axios.post(`/api/inventory`, val)
    .then(response => {
      this.setState({inventory: response.data})
    })
  }

  handleDelete(id){
    // console.log()
    axios.delete(`/api/inventory/${id}`)
    .then( response => {
      // console.log(response);
      this.setState({inventory: response.data});
    })
  }

  handleEdit(val, id){
    axios.put(`/api/inventory/${id}`, val)
    .then( response => {
      this.setState({inventory: response.data})
    })
  }

  currentItem(val){
    this.setState({currentlySelected: val})
  }

  render() {
    if(!this.state.dataLoaded){
      return <div className='loading'>LOADING...</div>
    }else{return (
      <div>
        <Header />
        <Dashboard 
          className='dashboard' 
          inventory={this.state.inventory}
          handleDelete={this.handleDelete}/>
        <Form 
        className='form' 
        inventory={this.state.inventory}
        addProduct={this.addProduct}
        currentlySelected={this.state.currentlySelected}
        currentItem={this.currentItem}
        />
      </div>
    );}
  }
}

export default App;
