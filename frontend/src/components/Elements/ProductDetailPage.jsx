import React, { useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  MdOutlineShoppingCart,
  MdOutlineCategory,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import { addToCartApi, selectIsCartPending } from "../../Store/Slices/CartSlice";
import { Togglefav } from "../../Store/Slices/FavSlice";
import LoadingButton from "../ui/LoadingButton";

const getCategoryPath = (mainCategory) => {
  const routes = {
    "Men's Wear": "/categories/menscloths",
    "Women's Wear": "/categories/womenscloths",
    Electronics: "/categories/electronics",
    Jewelry: "/categories/jewelery",
    Grocery: "/grocery/all",
    Fruits: "/fruits",
    Vegetables: "/vegetables",
  };
  return routes[mainCategory] || "/categories/all";
};

const StarRating = ({ rating = 0 }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < Math.round(rating) ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 dark:text-gray-600" />
      )
    );
  }
  return (
    <div className="flex items-center gap-1 text-lg">
      {stars}
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 ml-1">
        {rating?.toFixed(1) ?? "—"}
      </span>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { products, status } = useSelector((data) => data.MyProducts);
  const favProducts = useSelector((data) => data.MyFav.favproducts);

  const productId = Number(id);

  const product = useMemo(
    () => products.find((item) => item.productId === productId),
    [products, productId]
  );

  const isFav = useMemo(
    () => favProducts.some((item) => item.productId === productId),
    [favProducts, productId]
  );

  const isAddingToCart = useSelector(
    selectIsCartPending(productId, "add")
  );

  const originalPrice = product
    ? (product.price + product.price * 0.1).toFixed(2)
    : null;

  const handleToggleFav = () => {
    if (!product) return;
    dispatch(Togglefav(product));
    toast.success(isFav ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await dispatch(
        addToCartApi({ productId: product.productId, quantity })
      ).unwrap();
      toast.success(
        quantity > 1
          ? `${quantity} items added to cart!`
          : "Item added to cart!"
      );
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    try {
      await dispatch(
        addToCartApi({ productId: product.productId, quantity })
      ).unwrap();
      navigate("/cart");
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    }
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-[60vh] px-4 py-8">
        <div className="container mx-auto max-w-5xl animate-pulse">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          <div className="auth-card grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="auth-card text-center max-w-md">
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Product not found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            No product with ID {id}. It may have been removed.
          </p>
          <NavLink to="/" className="btn1 inline-block">
            Back to Home
          </NavLink>
        </div>
      </div>
    );
  }

  const categoryLink = getCategoryPath(product.main_category);

  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-gray-950 pb-16">
      <Toaster position="top-center" />

      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 text-gray-500 dark:text-gray-400 px-4 py-4 items-center text-sm sm:text-base">
        <NavLink to="/" className="hover:text-blue-500 transition-colors">
          <IoHome className="text-xl" />
        </NavLink>
        <span>{">"}</span>
        <NavLink to={categoryLink} className="hover:text-blue-500 transition-colors">
          {product.main_category || "Shop"}
        </NavLink>
        <span>{">"}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="auth-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="home-img-frame aspect-square w-full max-h-[420px] mx-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 mix-blend-multiply dark:mix-blend-normal"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {product.subcategory || product.type}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  ID: {product.productId}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              <div className="mt-3">
                <StarRating rating={product.rating} />
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-3xl sm:text-4xl font-bold textmainColor">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-1 rounded">
                  10% OFF
                </span>
              </div>

              {/* Meta */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MdOutlineCategory className="text-xl textmainColor shrink-0" />
                  <span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Category:
                    </span>{" "}
                    {product.main_category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <HiOutlineTag className="text-xl textmainColor shrink-0" />
                  <span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Type:
                    </span>{" "}
                    {product.type || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 sm:col-span-2">
                  <MdOutlineLocalOffer className="text-xl textmainColor shrink-0" />
                  <span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Subcategory:
                    </span>{" "}
                    {product.subcategory || "—"}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-5 py-2 font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <LoadingButton
                  type="button"
                  loading={isAddingToCart}
                  onClick={handleAddToCart}
                  className="flex-1 py-3"
                >
                  {!isAddingToCart && (
                    <MdOutlineShoppingCart className="text-xl" />
                  )}
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </LoadingButton>
                <LoadingButton
                  type="button"
                  variant="secondary"
                  loading={isAddingToCart}
                  onClick={handleBuyNow}
                  className="flex-1 py-3 font-semibold"
                >
                  {isAddingToCart ? "Please wait..." : "Buy Now"}
                </LoadingButton>
                <button
                  type="button"
                  onClick={handleToggleFav}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg border transition-colors ${
                    isFav
                      ? "border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400"
                      : "border-gray-300 dark:border-gray-600 hover:border-red-300 hover:text-red-500"
                  }`}
                  aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isFav ? (
                    <FaHeart className="text-xl" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Product Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>
        </div>

        {/* Related hint */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <NavLink to={categoryLink} className="textmainColor font-medium hover:underline">
            Browse more in {product.main_category}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
