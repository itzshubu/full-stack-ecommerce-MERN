import { createRoot } from "react-dom/client";
import { useEffect } from "react";
// third party imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { storee } from "./Store/store.js";
import { fetchCart } from "./Store/Slices/CartSlice.js";
import { fetchProducts } from "./Store/Slices/productsSlice.js";

// our imports
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Elements/Home.jsx";
import Explore from "./components/Elements/Explore.jsx";
import Categories from "./components/Elements/Categories.jsx";
import All from "./components/Elements/CategoriesElements/All.jsx";
import Electronics from "./components/Elements/CategoriesElements/Electronics.jsx";
import MensCloth from "./components/Elements/CategoriesElements/MensCloth.jsx";
import Womencloth from "./components/Elements/CategoriesElements/Womencloth.jsx";
import Jewelery from "./components/Elements/CategoriesElements/Jewelery.jsx";
import CategoryProductList from "./components/Elements/CategoriesElements/CategoryProductList.jsx";
import Cart from "./components/Elements/Cart.jsx";
import Dynamicpage from "./components/Elements/ProductDetailPage.jsx";
import Login from "./login&Signupform/login.jsx";
import Profilepage from "./components/Profilepage.jsx";
import Searchcompo from "./components/Searchcompo.jsx";

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.MyAuth);

  useEffect(() => {
    if (user) {
      dispatch(fetchProducts());
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="textmainColor font-semibold">Loading...</p>
      </div>
    );
  }

  const routerr = createBrowserRouter([
    {
      path: "/",
      element: user ? <App /> : <Navigate to="/login" replace />,
      children: [
        { path: "", element: <Home /> },
        { path: "explore", element: <Explore /> },
        { path: "product/:id", element: <Dynamicpage /> },
        { path: "profile", element: <Profilepage /> },
        { path: "search/:searchtext", element: <Searchcompo /> },
        {
          path: "categories",
          element: <Categories />,
          children: [
            { index: true, element: <Navigate to="all" replace /> },
            { path: "all", element: <All /> },
            { path: "menscloths", element: <MensCloth /> },
            { path: "womenscloths", element: <Womencloth /> },
            { path: "electronics", element: <Electronics /> },
            { path: "jewelery", element: <Jewelery /> },
          ],
        },
        {
          path: "grocery",
          element: <Categories />,
          children: [
            { index: true, element: <Navigate to="all" replace /> },
            {
              path: "all",
              element: (
                <CategoryProductList title="Grocery" mainCategory="Grocery" />
              ),
            },
            {
              path: "wheat",
              element: (
                <CategoryProductList
                  title="Wheat & Grains"
                  mainCategory="Grocery"
                  subcategory="Grains"
                />
              ),
            },
            {
              path: "rice",
              element: (
                <CategoryProductList
                  title="Rice"
                  mainCategory="Grocery"
                  subcategory="Rice"
                />
              ),
            },
            {
              path: "oil",
              element: (
                <CategoryProductList
                  title="Cooking Oil"
                  mainCategory="Grocery"
                  subcategory="Cooking Oil"
                />
              ),
            },
          ],
        },
        {
          path: "fruits",
          element: (
            <CategoryProductList title="Fruits" mainCategory="Fruits" />
          ),
        },
        {
          path: "vegetables",
          element: (
            <CategoryProductList title="Vegetables" mainCategory="Vegetables" />
          ),
        },
        { path: "cart", element: <Cart /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routerr} />;
};

createRoot(document.getElementById("root")).render(
  <Provider store={storee}>
    <AuthWrapper />
  </Provider>
);
