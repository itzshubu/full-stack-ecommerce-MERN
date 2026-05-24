import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import ProductGrid from '../../ProductGrid'

const Womencloth = () => {
  let { products } = useSelector((data) => data.MyProducts)

  let womensProducts = products.filter((item) => {
    return item.main_category === "Women's Wear"
  })

  return (
    <div className='my-2 sm:my-5 px-1 sm:px-0'>
      <h2 className='my-1 sm:my-3 text-lg sm:text-2xl text-center'>Women&apos;s Wear</h2>
      <ProductGrid>
        {womensProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default Womencloth
