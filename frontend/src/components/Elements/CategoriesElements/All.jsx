import React from 'react'
import { useSelector } from 'react-redux'
import Producttemp from '../../producttemp'
import { NavLink } from 'react-router-dom'

const All = () => {
  let {products} = useSelector((data)=>{return data.MyProducts})
  console.log(products)
  return (
    <div className='flex my-5 justify-center flex-wrap gap-4'>
      {products.map((item)=>{
         return  <Producttemp key={item.productId} item={item}/>
      })}
    </div>
  )
}

export default All