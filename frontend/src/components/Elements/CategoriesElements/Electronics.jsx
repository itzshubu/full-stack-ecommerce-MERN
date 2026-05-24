import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import ProductGrid from '../../ProductGrid'

const Electronics = () => {
   let {products} = useSelector((data)=>{return data.MyProducts})
    console.log(products)

    let electronicsProducts = products.filter((item) => {
      return item.main_category === "Electronics"
    })
  return (
    <div className='my-2 sm:my-5 px-1 sm:px-0'>
      <h2 className='my-1 sm:my-3 text-lg sm:text-2xl text-center'>Electronics</h2>
      <ProductGrid>
        {electronicsProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default Electronics