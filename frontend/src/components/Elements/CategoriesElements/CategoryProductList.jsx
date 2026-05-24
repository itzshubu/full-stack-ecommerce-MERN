import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import ProductGrid from '../../ProductGrid'

const CategoryProductList = ({ title, mainCategory, subcategory }) => {
  const { products, status } = useSelector((data) => data.MyProducts)

  const filtered = products.filter((item) => {
    if (mainCategory && item.main_category !== mainCategory) return false
    if (subcategory && item.subcategory !== subcategory) return false
    return true
  })

  return (
    <div className="my-5 px-4">
      <h2 className="my-3 text-2xl text-center font-bold">{title}</h2>

      {status === 'loading' && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {status !== 'loading' && filtered.length === 0 && (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}

      <ProductGrid>
        {filtered.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default CategoryProductList
