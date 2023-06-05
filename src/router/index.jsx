import { createBrowserRouter } from "react-router-dom";

//VIEWS
//PUBLIC
import Landing from "../views/Landing";
import Register from "../views/Register";
import Login from "../views/Login";
import Products, { loaderBooks } from "../views/Products";
import Product, { loaderBook } from "../views/Product";
import NotFound from "../views/NotFound";

//PRIVATE
import Profile from "../views/Profile";
import MyProducts, { loaderProds } from "../views/MyProducts";
import CreateProduct from "../views/CreateProduct";
import Favorites from "../views/Favorites";

//LAYOUTS
import RootLayout from "../layouts/RootLayout";
import UserLayout, { loaderUser } from "../layouts/UserLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products />, loader: loaderBooks },
      { path: "/products/:id", element: <Product />, loader: loaderBook },
      {
        path: "/profile",
        element: <UserLayout />,
        loader: loaderUser,
        children: [{ index: true, element: <Profile /> }],
      },
      {
        path: "/publicaciones",
        element: <UserLayout />,
        loader: loaderUser,
        children: [
          {
            path: "/publicaciones/mispublicaciones",
            element: <MyProducts />,
            loader: loaderProds,
          },
          {
            path: "/publicaciones/nuevapublicacion",
            element: <CreateProduct />,
          },
          {
            path: "/publicaciones/favoritos",
            element: <Favorites />,
            loader: loaderProds,
          },
        ],
      },
    ],
  },
]);
