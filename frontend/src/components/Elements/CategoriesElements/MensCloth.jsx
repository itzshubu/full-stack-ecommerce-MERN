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
    <div className='my-5'>
      <h2 className='my-3 text-2xl text-center'>Men&apos;s Wear</h2>
      <ProductGrid>
        {mensProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default MensCloth
