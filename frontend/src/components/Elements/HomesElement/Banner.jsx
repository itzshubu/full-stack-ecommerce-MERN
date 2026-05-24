import React from 'react'
import { amazon } from '../../../config/images.js'
import { GrSecure } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
const Banner = () => {
  return (
    <div className='min-h-0 sm:min-h-[550px] flex justify-center items-center py-6 sm:py-10 bg-gray-50 dark:bg-gray-950'>
         <div className='container px-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center mt-2 sm:mt-10'>
                 <div className='flex justify-center'>
                     <div className='home-img-frame w-full max-w-[400px] aspect-[4/5]'>
                     <img src={amazon.womensMaxi} alt='Winter sale' className='w-full h-full object-contain p-2 drop-shadow-lg rounded-lg'></img>
                     </div>
                 </div> 
                 {/* text dec  */}
                   <div className='flex flex-col justify-center gap-6 sm:pt-0 '>
                     <h1 className='text-3xl sm:text-4xl font-bold'>Winter sale Upto 50% off</h1>
                     <p className='text-sm text-gray-500 tracking-wide leading-5'> 
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. At aspernatur illo odio similique cupiditate porro asperiores recusandae ratione, consequatur doloremque!
                     </p>
                     <div className='flex flex-col gap-4'>
                          <div className='flex items-center gap-4'>
                            <GrSecure className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400  ' />
                            <p>Quality Products</p>
                          </div>

                          <div className='flex items-center gap-4'>
                            <FaShippingFast className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-oange-400  ' />
                            <p>Fast Delivery</p>
                          </div>

                          <div className='flex items-center gap-4'>
                            <RiSecurePaymentLine className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400  ' />
                            <p>Easy Payment method</p>
                          </div>
                          
                          <div className='flex items-center gap-4'>
                            <BiSolidOffer className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400  ' />
                            <p>Get offers</p>
                          </div>

                     </div>
                   </div>
                </div> 

         </div>
    </div>
  )
}

export default Banner