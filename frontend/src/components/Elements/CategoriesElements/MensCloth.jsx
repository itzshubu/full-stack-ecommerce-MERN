import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import ProductGrid from '../../ProductGrid'

const MensCloth = () => {
  let { products } = useSelector((data) => data.MyProducts)

  let mensProducts = products.filter((item) => {
    return item.main_category === "Men's Wear"
  })

  return (
    <div className='my-2 sm:my-5 px-1 sm:px-0'>
      <h2 className='my-1 sm:my-3 text-lg sm:text-2xl text-center'>Men&apos;s Wear</h2>
      <ProductGrid>
        {mensProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default MensCloth
