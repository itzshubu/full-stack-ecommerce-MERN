import React from 'react'
import Slider from "react-slick"

const textimonialdata =  [
        {
          id: 1,
          name: "Victor",
          text: "Very good quality and excellent service, highly recommend!",
          img: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
          id: 2,
          name: "Sophia",
          text: "I am extremely satisfied with my purchase. The customer support was outstanding.",
          img: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
          id: 3,
          name: "James",
          text: "Top-notch quality! Everything exceeded my expectations.",
          img: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
          id: 4,
          name: "Olivia",
          text: "Fantastic experience! The product was exactly as described, and delivery was fast.",
          img: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
          id: 5,
          name: "Liam",
          text: "A wonderful shopping experience! The services were impeccable and the quality is superb.",
          img: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
          id: 6,
          name: "Emma",
          text: "Quick delivery and high-quality items. Will definitely shop here again!",
          img: "https://randomuser.me/api/portraits/women/6.jpg"
        }
      ]
      


const Testimonial = () => {
    var settings ={
        dots:true , 
        arrows :false ,
        infinite : true ,
        speed : 500 , 
        slidesToScroll :1 ,
        autoplay : true ,
        autoplayspeed:500,
        cssEase : "linear",
        pauseOnHover:true,
        pauseOnFocus:true,
        responsive:[
            {
                breakpoint:10000,
                settings:{
                     slidesToShow:3,
                     slidesToScroll :1 ,
                     infinite : true ,
                },
            },
            {
                breakpoint:1024,
                settings:{
                     slidesToShow:2,
                     slidesToScroll :1 ,
                     initialSlide:2
                },
            },
            {
                breakpoint:640,
                settings:{
                     slidesToshow:1,
                     slidesToScroll :1 ,
                },
            },
        ]
     }

  return (
         <div className='py-5 container m-auto '> 
            <div className='container m-auto'>
               <div className='text-center  mb-10 max-w-[600px] mx-auto  '> 
               <p className='text-lg textmainColor '> What our customers are saying</p>
               <h1 className='text-3xl font-bold my-3 '>Testimonials</h1>
               <p className='text-xs text-gray-400'>Lorem ipsum dolor us in deleniti sed natus voluptates dolorum sapiente, fuga odit accusamus placeat?</p>
           </div>
           {/* cards  */}
           <div className='mb-4'> 
                <Slider {...settings}>
                    {
                        textimonialdata.map(( item )=>{
                             return <div className='my-6'>
                              <div key={item.id} className='flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-blue-100 relative h-[250px] '>
                                   <div className='mb-4 '>
                                     <img src={item.img} alt='' className='rounded-full w-20 h-20 '></img>
                                     </div> 
                                     <div className='flex flex-col items-center gap-4 '>
                                      <div className='space-y-3 '>

                                         <p className='text-xs text-gray-500 dark:text-white'>{item.text}</p>
                                         <h1 className='text-xl font-bold text-black/80 dark:text-lime-50 '>{item.name}</h1>
                                     </div>
                                      </div>
                                      <p className='text-black/20 text-9xl font-serif absolute top-0 right-0 dark:text-lime-50'>,,</p>
                                   </div>
                             </div>
                        }) 
                    } 
                </Slider>
           </div>
       </div>
    </div>
  )
}

export default Testimonial