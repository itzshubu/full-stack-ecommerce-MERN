import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSearchPath, decodeSearchQuery } from "../../utils/search";

const iconNavClass = ({ isActive }) =>
  isActive ? "icon-nav-link icon-nav-link-active" : "icon-nav-link";

const Button = () => {
  const [show, isShow] = useState(false);
  const [input1, setInput1] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const btnref = useRef();
  const iconref = useRef();

  const cart = useSelector((data) => data.MyCart.cartProducts);

  const isSearchActive = location.pathname.startsWith("/search");

  const totalproducts = cart.reduce((sum, item) => sum + (item.quentity || 1), 0);

  useEffect(() => {
    if (location.pathname.startsWith("/search/")) {
      const segment = location.pathname.slice("/search/".length);
      setInput1(decodeSearchQuery(segment));
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (btnref.current && !btnref.current.contains(e.target) && e.target !== iconref.current) {
        isShow(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  function onenter() {
    const path = getSearchPath(input1);
    if (path) {
      navigate(path);
      isShow(false);
    }
  }

  return (
    <StyledWrapper>
      <div className="sm:font-semibold text-xl button-container mainColor h-[50px] w-screen fixed bottom-0 left-[50%] translate-x-[-50%] sm:translate-x-0 sm:static sm:w-auto sm:h-auto gap-2 sm:gap-[15px] sm:shadow-none mt-[5px]">
        <NavLink to="/" end className={iconNavClass} title="Home">
          <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
            </svg>
        </NavLink>

        {/* Hidden on md+ — navbar uses center SearchBar instead */}
        <button type="button" className={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full sm:relative ${isSearchActive ? "icon-nav-link-active bg-white/20" : "hover:bg-white/15"}`} id="search1" title="Search">
          <div
            ref={btnref}
            className={`hidden border-white transition-all duration-500 ${
              show ? "w-[100vw] border sm:w-[250px] sm:left-[-73px] sm:p-3 sm:py-2" : "w-0 sm:w-0 sm:left-[41px]"
            } z-10 sm:flex justify-center items-center gap-1 rounded-full mainColor fixed top-[calc(74px+86px-100vh-15px)] sm:absolute sm:top-[120%]`}
          >
            <input
              type="text"
              placeholder="Search"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onenter()}
              className={`transition-all duration-500 ${show ? "w-[70vw] sm:w-[200px] p-2" : "w-0 opacity-0"} h-[27px] sm:h-auto bg-inherit outline-none border-none text-white placeholder:text-blue-100`}
            />
          </div>
          <svg
            ref={iconref}
            onClick={() => isShow(!show)}
            className="w-5 h-5 text-white"
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <NavLink to="/profile" className={iconNavClass} title="Profile">
          <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
            </svg>
        </NavLink>

        <NavLink to="/cart" className={iconNavClass} title="Cart">
          <span className="relative inline-flex items-center justify-center">
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-red-600 text-white text-[10px] font-medium flex justify-center items-center px-0.5 z-10">
              {totalproducts}
            </span>
            <svg className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx={9} cy={21} r={1} />
              <circle cx={20} cy={21} r={1} />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </span>
        </NavLink>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(0, 73, 144, 0.5) 5px 10px 15px;
    transition: all 0.5s;
  }

  @media (min-width: 640px) {
    .button-container {
      justify-content: flex-start;
      gap: 15px;
      box-shadow: none;
    }
  }
`;

export default Button;
