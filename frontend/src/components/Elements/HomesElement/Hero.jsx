import React from 'react'

import { NavLink } from 'react-router-dom'

import Slider from 'react-slick'

import { amazon } from '../../../config/images.js'



const ImageList = [

  {

    id: 1,

    img: amazon.womensDress,

    title: "Upto 50% off on all Womens's Wear ",

    discription:

      "Upgrade your wardrobe with our exclusive sale! Enjoy up to 50% off on all Women's Wear. Shop trendy dresses, chic tops, and more – limited time only.",

    route: "categories/womenscloths",

  },

  {

    id: 2,

    img: amazon.backpack,

    title: "Upto 30% off on all Mens's Wear ",

    discription:

      "Revamp your style with our exclusive sale! Enjoy up to 30% off on all Men's Wear. Shop dapper shirts, cool jackets, and more – limited time only.",

    route: "categories/menscloths",

  },

  {

    id: 3,

    img: amazon.headphones,

    title: "Upto 70% off on all Electronics sale ",

    discription:

      "Upgrade your tech game with our massive sale! Enjoy up to 70% off on Electronics. Shop the latest gadgets and accessories – limited time only.",

    route: "categories/electronics",

  },

]



const Hero = () => {

  const settings = {

    dots: true,

    arrows: false,

    infinite: true,

    speed: 800,

    slidesToShow: 1,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 4000,

    cssEase: "ease-in-out",

    pauseOnHover: true,

    pauseOnFocus: true,

  }



  return (

    <div className="relative overflow-hidden min-h-0 max-md:py-3 sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-900 dark:text-white duration-200 z-0">

      <div className="h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] mainColor absolute -top-1/4 -right-16 sm:-top-1/3 sm:-right-20 rounded-3xl rotate-45 opacity-90 pointer-events-none" />

      <div className="container pb-4 sm:pb-6 pt-1 sm:pt-0 relative z-10 hero-slider">

        <Slider {...settings}>

          {ImageList.map((item) => (

            <div key={item.id}>

              <NavLink to={item.route}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 items-center px-2 py-0 sm:py-2">

                  <div className="flex flex-col justify-center gap-2 sm:gap-4 pt-2 sm:pt-0 text-center sm:text-left order-2 sm:order-1">

                    <h1 className="text-xl sm:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight">

                      {item.title}

                    </h1>

                    <p className="text-sm text-gray-700 dark:text-gray-300 max-w-lg mx-auto sm:mx-0">

                      {item.discription}

                    </p>

                    <div>

                      <button type="button" className="btn1">

                        Order Now

                      </button>

                    </div>

                  </div>



                  <div className="order-1 sm:order-2 flex justify-center">

                    <div className="home-img-frame w-full max-w-[240px] sm:max-w-[400px] aspect-square mx-auto">

                      <img

                        src={item.img}

                        alt={item.title}

                        className="w-full h-full object-contain"

                      />

                    </div>

                  </div>

                </div>

              </NavLink>

            </div>

          ))}

        </Slider>

      </div>

    </div>

  )

}



export default Hero


