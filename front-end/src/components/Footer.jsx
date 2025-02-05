import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import footerimg from "../../public/footerimg.png"
import { FaFacebook , FaLinkedin ,FaLocationArrow , FaMobileAlt } from "react-icons/fa";
const BannerImg = {
     backgroundImage : `url("https://shopsy-tcj.netlify.app/assets/footer-pattern-mGVwO-y6.jpg")`,
    // backgroundImage : url(footerimg),
     backgroundPosition : "bottom",
     backgroundRepeat : "no-repeat",
     backgroundSize : "cover",
     hight:"100%",
     width :"100%",
}

const Footer = () => {
  return (
    <div className='text-white mb-20 ' style={BannerImg} >
        <div className='container m-auto'> 
             <div className='grid md:grid-cols-3 pb-44 mb-[-100px] pt-5  '>
                {/* compant detail */}
                <div className='py-8 px-4' >
                     <h1 className='sm:text-3xl text-xl font-bold  sm:text-left text-justify mb-3 flex items-center gap-3'>
                     <img src='https://shopsy-tcj.netlify.app/assets/logo-Jm4BVSCI.png' alt="logo" className='max-w-[50px] '></img>

                     ShopFlick
                     </h1>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae exercitationem consequuntur alias ad sint fugiat odit aut dolor sit!</p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
                    <div>
                         <div className='py-8 px-4 '>
                             <h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3'>Sections</h1>
                             <ul className='flex  flex-col gap-3'>
                                <li >Home</li>
                                <li>About</li>
                                <li>Contact</li>
                                <li>FeedBack</li>
                             </ul>
                         </div>
                          
                    </div>
                    <div>
                         <div className="flex items-center gap-3 mt-6 "> 
                            <a href='#'> 
                                 <FaInstagram className='text-3xl'/>
                            </a>
                            <a href='#'> 
                                 <FaFacebook className='text-3xl'/>
                            </a>
                            <a href='#'> 
                                 <FaLinkedin className='text-3xl'/>
                            </a>

                         </div>
                         <div className='mt-6 '>
                              <div className='flex items-center gap-3'>
                                  <FaLocationArrow  />  
                                  <p>Una ,Himachal Pradesh</p>
                              </div>
                              <div className='flex items-center gap-3'>
                                  <FaMobileAlt  />  
                                  <p>+91 8219644580</p>
                              </div>
                         </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
  )
}

export default Footer