import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/product'
import {addItemToOrder} from '../../store/order'
import {NotFoundComponent} from './NotFoundComponent'
import {Link} from 'react-router-dom'

const possibleCategories = ["Miscellaneous", "Sedimentary", "Igneous", "Metamorphic", "all"];

class ProductList extends React.Component {

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const category = this.props.match.params.category;
    const name = this.props.match.params.name;
    let products = this.props.products;

    if (name) {
      products = this.props.products.filter(prod => prod.name.toLowerCase() === name.toLowerCase());
    } else if (category !== 'all') {
      products = this.props.products.filter(prod => prod.category === category);
    }
    return (
      possibleCategories.includes(category) || name ?

        <div className="all-product-outer-wrapper">
          {category && <h3>{`${category.toUpperCase()} PRODUCTS`}</h3>}
          <div className="all-product-container">
            {this.props.isAdmin && <Link to="../../products/create"><button type="submit" className="create-new-product">Create new Product</button></Link>}
            <div className="row">
              <br/>
              {products.map(eachProduct => (
                <div className="column" key={eachProduct.name}>
                  <Link to={`../../products/${eachProduct.id}`}><img className="column-image" src={eachProduct.pictureUrl} /></Link>
                  <Link to={`../../products/${eachProduct.id}`}><h2>{eachProduct.name}</h2></Link>
                  ${eachProduct.price}
                  <br/>
                  <button className="add-to-cart" type="button" onClick={() => this.props.addToCart(eachProduct.id)}>Add To Cart</button>
                  <br />
                  {this.props.isAdmin && <Link to={{pathname: `../../products/${eachProduct.id}/update`, state: eachProduct}}>Edit</Link>}
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div> :
        <NotFoundComponent />
    )
  }
}

const mapStatetoProps = state => ({
  products: state.product.products,
  isAdmin: state.user.adminStatus
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchProducts()),
  addToCart: (id) => dispatch(addItemToOrder(id))
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
