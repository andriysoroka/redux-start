import React, {Component} from 'react';
import {connect} from 'react-redux';

import './product-list.css';
import {addToCard} from '../../actions/products.action';

export class ProductList extends Component {
	constructor(props) {
		super(props);
		this.value = 2;
		this.addToCart = this.addToCart.bind(this);
	}
  
	renderProducts() {
		return this.props.products.map((i, index) => (
			<div className="product_list_item" key={index}>
				<p>{i.name}</p>
				<p>Price: {i.price}</p>
				<p>{i.available > 0 ? 'In stock' : 'Sold out'}</p>
				<button className="add-to-cart-btn" onClick={() => this.addToCart(i)}>Add to card</button>
				{/* <button className="add-to-cart-btn" onClick={() => addNewProduct({ name: 'Ae',price: 3,available: 1})}>console products</button> */}
			</div>
		));
	}

	addToCart(item) {
		let  refreshCart = [];
		let inCart = this.props.inCart.find(el => el.name === item.name);
		if(item.available && inCart) {
			item.available = item.available - 1;
			refreshCart = this.props.inCart.reduce((acc, el) => {
				if(el.name === inCart.name) {
					el.available = el.available + 1;
					console.log('find');
				}
				acc.push(el);
				return acc
			}, [])
			this.props.dispatch(addToCard(refreshCart));
			console.log('find!' + refreshCart);
		} else if (item.available && !inCart) {
			refreshCart = [...this.props.inCart, {...item, available: 1}];
			item.available = item.available - 1;
			this.props.dispatch(addToCard(refreshCart));
			console.log('not here');
		} else  {
			alert('sold out!');
		}
		console.log(this.props.products);
	}

 
	render() {
		return (<div className="App-product_list">
			{this.renderProducts()}
		</div>);
	}
}

const mapStateToProps = state => ({...state});

// const mapDispatchToProps = dispatch => {
//   return ({
//     addToCart: i =>  {dispatch(addToCard(i))}
//   })
//  };


export default connect(mapStateToProps)(ProductList);