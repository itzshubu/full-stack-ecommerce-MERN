import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Navigate, NavLink , useNavigate ,replace,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Button = () => {
  const [show, isShow] = useState(false);
  const [input1 , setInput1] = useState("")
  let Navigate = useNavigate()
  // console.log(show);
  let btnref = useRef();
  let iconref = useRef();

   let cart = useSelector((data)=>{
           return data.MyCart.cartProducts
   })
   console.log(cart)

   let totalproducts = cart.reduce((old , value)=>{
    return old+value.quentity
   },0)

  window.onclick = function (e) {
    if (!(e.target.parentNode == btnref.current)) {
      if (!(e.target == iconref.current)) {
        isShow(false);
      }
    }
  };
  function onenter(){
    Navigate(`/search/${input1}`)
  }

  return (
    <StyledWrapper>
      <div className="sm:font-semibold text-xl button-container mainColor h-[50px] w-screen fixed bottom-0 left-[50%] translate-x-[-50%] sm:translate-x-0 sm:static sm:w-[250px] sm:h-[0px] mt-[5px]">
        <button className="button">
          <svg
            className="icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
          </svg>
        </button>
        <button className="button sm:relative" id="search1">
          <div
            ref={btnref}
            className={`hidden border-white transition-all duration-500 ${
              show
                ? "w-[100vw] border sm:w-[250px] sm:left-[-73px] sm:p-3 sm:py-2"
                : "w-0 sm:w-0 sm:left-[41px]"
            } z-10 sm:flex  justify-center items-center gap-1 rounded-full mainColor fixed top-[calc(74px+86px-100vh-15px)]  sm:absolute   sm:top-[120%] `}
          >
            <input
              type="text"
              placeholder="Search"
              value={input1}
              onChange={(e)=>setInput1(e.target.value)}
              onKeyDown={(e)=>{console.log(e.key);e.key == "Enter"?onenter():"sdf"}}
              className={`transition-all duration-500 ${
                show ? "sm:w-[200px] p-1" : "w-0"
              }  h-[27px] sm:h-auto bg-inherit outline-none  border-none`}
            />
            <svg
              className={`icon  ${show ? "" : "w-0"} `}
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              onClick={()=>Navigate(`/search/${input1}`)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <svg
            ref={iconref}
            onClick={() => isShow(!show)}
            className="icon"
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="button">
          <svg
            className="icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
          </svg>
        </button>
        <NavLink to="cart"  className={({isActive})=>isActive?"text-white dark:text-black relative":"relative"}>
          <p className="absolute left-[50%] top-[-2px] font-thin text-white h-[22px] rounded-full bg-blue-500 translate-x-[0%] h-[20px] w-[20px] bg-red-900 text-sm flex justify-center items-center ">{totalproducts}</p>
          <button className="button">
            <svg
              className="icon"
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={9} cy={21} r={1} />
              <circle cx={20} cy={21} r={1} />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </NavLink>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(0, 73, 144, 0.5) 5px 10px 15px;
    transition: all 0.5s;
  }
  .button-container:hover {
    transition: all 0.5s;
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
  }
`;

export default Button;
