import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from "../../producttemp"

const Jewelery = () => {

   let {products} = useSelector((data)=>{return data.MyProducts })
       console.log(products)

  let Jewelry = products.filter((item)=>{
         return item.main_category == "Jewelry"
  })


  return (
    <div>
      <h2 className='text-center font-bold text-2xl'>Jewelery</h2>
     <div className='flex gap-4 justify-center flex-wrap my-4'>
           {
                Jewelry.map((item)=>{
                  return <Producttemp item={item}/>
                })
           }
     </div>
    </div>
  )
}

export default Jewelery