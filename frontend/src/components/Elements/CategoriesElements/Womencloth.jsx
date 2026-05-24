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
    <div className='my-5'>
      <h2 className='my-3 text-2xl text-center'>Women&apos;s Wear</h2>
      <ProductGrid>
        {womensProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
      </ProductGrid>
    </div>
  )
}

export default Womencloth
