import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Producttemp from "./producttemp";

const Searchcompo = () => {
  let {searchtext} = useParams();
  let { products } = useSelector((data) => {
    return data.MyProducts;
  });
  products = products.filter((item) => {
    console.log(item , searchtext)
    return item.name.toLowerCase().includes(searchtext.toLowerCase());
  });
  console.log(products);
  return (
    <>
      <div className="my-5 flex justify-center items-center flex-wrap gap-4"> {products.map((item)=>{
        return <div><Producttemp item={item}/></div>
      })} </div>
    </>
  );
};

export default Searchcompo;
