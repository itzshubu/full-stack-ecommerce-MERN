import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Profilepage = () => {
// const [user , setUser] = useState()
let {user}  = useSelector((data)=>{
    return data.MyAuth
})
  return (
    <div className='text-center m-5'>
        <h2 className='text-3xl text-center'>welcome to your profile page</h2>
         <p>name : {user.fullName} </p>
         <p>email : {user.email} </p>
    </div>
  )
}

export default Profilepage