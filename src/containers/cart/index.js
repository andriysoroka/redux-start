import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeFromCart, addToAvalaibleInCart, removeFromAvailableInCart} from '../../actions/cart.actions';

import './cart.css';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  renderCards () {
    return this.props.inCart.map((i, index) => (
      <div className="product_list_item" key={index}>
        <p>{i.name}</p>
        <p>Price: {i.price}</p>
        <div>
          <button onClick={() => this.decrement(i)}>-</button>
          <span>{i.available}</span>
          <button onClick={() => this.increment(i, index)}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={() => this.removeFromCart(index)}>remove from card</button>
      </div>
    ));
  }

  removeFromCart = id => {
    let removedItem = this.props.inCart[id];
    this.props.inCart.splice(id, 1);
    let newProducts = this.props.products.reduce((acc, item) => {
      if(item.name === removedItem.name) {
        item.available = item.available + removedItem.available;
      }
      acc.push(item);
      return acc;
    }, [])
    console.log(this.props.inCart, removedItem);
    this.props.dispatch(removeFromCart(newProducts));
    if (this.props.inCart.length === 0) {
      alert('0 carts');
    }
  }

  increment = product => {
    let isAvailable = true;
    let newProducts = this.props.products.reduce((acc, item) => {
      if(item.name === product.name && item.available > 0) {
        item.available = item.available - 1;
        console.log('in products' + item.available)
      } else if(item.name === product.name && item.available === 0) {
        isAvailable = false;
        alert('sold out!');
      }
      acc.push(item);
      return acc;
    }, [])
    if(isAvailable) {
      product.available = product.available + 1
    } 
    this.props.dispatch(addToAvalaibleInCart(newProducts));
  }

  decrement = (product, index) => {
    let isAvailable = true;
    let newProducts = this.props.products.reduce((acc, item) => {
      if(item.name === product.name && product.available > 1) {
        item.available = item.available + 1;
        console.log('-1', isAvailable);
      } else if(item.name === product.name && product.available === 1) {
        isAvailable = false;
        console.log( isAvailable)
        alert('remove this item from card');
      }
      acc.push(item);
      return acc
    }, [])
    if(isAvailable) {
      product.available = product.available - 1;
    } else {
      removeFromCart(index)
    }
    this.props.dispatch(removeFromAvailableInCart(newProducts));
  }

  render() {
    return (<div className="App-cart">
      {this.props.inCart.length ? this.renderCards() : 'Your cart is empty :('}
    </div>);
  }
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(Cart);
