import { createRoot } from "react-dom/client";
// third party imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { storee } from "./Store/store.js";

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
import Cart from "./components/Elements/Cart.jsx";
import Dynamicpage from "./components/Elements/ProductDetailPage.jsx";
import Signup from "./login&Signupform/signup.jsx";
import Login from "./login&Signupform/login.jsx";
import Searchcompo from "./components/Searchcompo.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

// 🔥 Secure Route Setup with Redux
const AuthWrapper = () => {
  let { token } = useSelector((state) => state.MyAuth);
token = true
  const routerr = createBrowserRouter([
    {
      path: "/",
      element: token ? <App /> : <Navigate to="/signup" replace />,
      children: [
        { path: "", element: <Home /> },
        { path: "explore", element: <Explore /> },
        { path: "product/:id", element: <Dynamicpage /> },
        { path: "search/:searchtext", element: <Searchcompo /> },
        {
          path: "Categories",
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
        { path: "cart", element: <Cart /> },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
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
