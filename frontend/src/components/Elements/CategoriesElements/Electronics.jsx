import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'

const Electronics = () => {
   let {products} = useSelector((data)=>{return data.MyProducts})
    console.log(products)

    let Electronics = products.filter((item)=>{
      return item.main_category == "Electronics"
      
    }) 
  return (
    <div className='my-5'>
      <h2 className='my-3 text-2xl text-center'>Electronics</h2>
      <div className='flex  justify-center flex-wrap gap-4'>
        {Electronics.map((item)=>{
             return <Producttemp item={item}/>
        })}
      </div>
    </div>
  )
}

export default Electronics