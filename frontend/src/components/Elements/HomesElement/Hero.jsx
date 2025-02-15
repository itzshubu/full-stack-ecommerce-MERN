import React from 'react'
import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'

const ImageList = [
    {
        id :1 ,
        img :'https://shopsy-tcj.netlify.app/assets/women-NhG2D3pl.png',
        title : "Upto 50% off on all Womens's Wear ",
        discription :  "Upgrade your wardrobe with our exclusive sale! Enjoy up to 50% off on all Women’s Wear. Shop trendy dresses, chic tops, and more – limited time only. Don’t miss out!",
        route:"categories/womenscloths"  
   },
   {
    id :2 ,
    img :'https://shopsy-tcj.netlify.app/assets/shopping-vpNvhQDE.png',
    title : "Upto 30% off on all Mens's Wear ",
    discription :  "Revamp your style with our exclusive sale! Enjoy up to 30% off on all Men’s Wear. Shop dapper shirts, cool jackets, and more – limited time only. Don’t miss out!",
    route:"categories/menscloths" 
},
{
    id :3,
    img :'https://shopsy-tcj.netlify.app/assets/sale-cnpHUeHf.png',
    title : "Upto 70% off on all Electronics sale ",
    discription : "Upgrade your tech game with our massive sale! Enjoy up to 70% off on Electronics. Shop the latest gadgets, accessories, and more – limited time only. Grab the deals before they're gone!",
     route:"categories/electronics"
},
]



const hero = () => {

  var settings ={
     dots:false , 
     arrows :false ,
     infinite : true ,
     speed : 800 , 
     slidesToScroll :1 ,
     autoplay : true ,
     autoplayspeed:4000,
     cssEase : "ease-in-out",
     pauseOnHover:false,
     pauseOnFocus:true
  }


  return (
    <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 '>
        {/* background pattern */}
         <div className=' h-[700px] w-[700px] mainColor  absolute -top-1/2 right-0 rounded-3xl rotate-45 '>
         
         </div>
         {/* hero section */}
         <div className='container pb-8  sm:pb-0 '>
           <Slider {...settings}>
          {
             ImageList.map((item)=>{
                   return <div>
                    <NavLink to={item.route}>
                   <div className='grid grid-cols-1 sm:grid-cols-2' >
                       {/* text content section */}
                       <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 '>
                           <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'> {item.title} </h1>
                           <p className='text-sm'>{item.discription}  </p>
                       <div>
                       <button className='btn1'>Order Now </button>
   
                       </div>
                       </div>
                       {/* image content section */}
                       <div className='order-1 sm:order-2' >
                            <div  >
                                <img src={item.img} alt=''
                                className='w-[300px ] h-[300px ] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto' />
                            </div>
                       </div>
                   </div>
                   </NavLink>
               </div>
               
            })
          }


            
            </Slider> 
         </div>
    </div>
  )
}

export default hero