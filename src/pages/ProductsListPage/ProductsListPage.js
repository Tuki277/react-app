import React, { Component } from 'react'
import ProductsList from '../../components/ProductsList/ProductsList'
import ProductsItem from '../../components/ProductsItem/ProductsItem'
import { connect } from 'react-redux'
import callApi from './../../utils/apiCaller'
import { Link } from 'react-router-dom'
import axios from 'axios'

const getData = () => axios.get('http://localhost:3000')
								.then( (res) => res.data)

class ProductsListPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data : null
		}
	}

	componentWillMount () {
		// callApi('GET', null).then(res => {
		// console.log('data = ', res.data)
		console.log(getData())
			if (this.state.data	 === null){
				getData().then((data) => {
					this.setState ({
					data : data
				})
			})
		}
	}

	onDelete = (id) => {
		var { products } = this.state
		callApi(`products/${id}`, 'DELETE', null).then(res => {
				if (res.status === 200){
					var index = this.findIndex(products, id)
					if (index !== -1){
						products.splice(index, 1)
						this.setState({
							products : products
						})
					}
				}
		})
	}

	findIndex = (products ,id) => {
		var result = -1
		products.forEach((products, index) => {
			if (products.id === id){
				result = index
			}
		})
		return result
	}

	render () {
		
		// var { products } = this.props

		var { data } = this.state

		console.log('data trong state render = ', data)

		return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<Link to='/products/add' type="button" className="btn btn-info mb-10">Add Products</Link>
				<ProductsList>
					{ this.showProducts() }
				</ProductsList>
			</div>
		)
	}

	showProducts = () => {
		if (this.state.data !== null){
			console.log('showProducts log = ', this.state.data.data)
			return this.state.data.data.map((data, index) => {
				return (<ProductsItem
					key={index}
					products={data}
					index={index}
				/>)
			})
		}
	}

	// showProducts(products){
	// 	var result = null
	// 	if (products !== null) {
	// 		result = products.map((products, index) =>{
	// 			return <ProductsItem
	// 				key={index}
	// 				products={products}
	// 				index={index}
	// 				onDelete={this.onDelete}
	// 			/>
	// 		})
	// 	}
	// 	return result
	// }
}

const mapStareToProps = state => {
	return {
		products : state.products
	}
}

export default connect(mapStareToProps, null)(ProductsListPage)