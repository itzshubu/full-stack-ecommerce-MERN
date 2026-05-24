import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from "../../producttemp"
import ProductGrid from "../../ProductGrid"

const Jewelery = () => {

   let {products} = useSelector((data)=>{return data.MyProducts })
       console.log(products)

  let jewelryProducts = products.filter((item) => {
    return item.main_category === "Jewelry"
  })

  return (
    <div className='my-5'>
      <h2 className='my-3 text-2xl text-center'>Jewelery</h2>
     <ProductGrid className="my-4">
        {jewelryProducts.map((item) => (
          <Producttemp key={item.productId} item={item} />
        ))}
     </ProductGrid>
    </div>
  )
}

export default Jewelery