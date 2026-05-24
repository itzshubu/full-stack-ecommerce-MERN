import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import ProductGrid from '../../ProductGrid'

const All = () => {
  let {products} = useSelector((data)=>{return data.MyProducts})
  console.log(products)
  return (
    <div className='my-5'>
      <h2 className='my-3 text-2xl text-center'>All Products</h2>
      <ProductGrid>
        {products.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default All