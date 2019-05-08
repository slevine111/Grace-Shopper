import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import CategorySelector from './CategorySelector'

class Products extends Component {
  render() {
    const { products, history, categoryName } = this.props
    return (
      <div>
        <CategorySelector history={history} />
        <h4>{`${categoryName} Products`}</h4>
        {products.map(product => {
          const { id, name, price, image } = product
          return (
            <ul key={id}>
              <li>
                <img src={image} />
              </li>
              <li>
                {' '}
                <Link to={`/products/${id}`}>{name}</Link>{' '}
              </li>
              <li>{makePriceCurrencyFormat(price)}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ products, categories }, { match: { params } }) => {
  const { categoryId } = params
  return {
    products: categoryId
      ? products.filter(product => product.categoryId === Number(categoryId))
      : products,
    categoryName:
      categoryId && categories[0]
        ? categories.find(c => c.id === Number(categoryId)).name
        : 'All'
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)