import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  let { products } = useSelector((data) => {
    return data.MyProducts;
  });

  let { id } = useParams();

  let product = products.filter((item) => {
    return item.productId == id;
  })[0];

  console.log(product , id)
  return (
    <div>
      ProductDetailPage
      <div>
        <div>
          <img src={product.image} alt="" />
          <p>{product.productId}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
