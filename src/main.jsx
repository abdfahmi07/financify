import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { getAuthCookie } from "./utils/cookies";
import Layouts from "./layouts";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import SplitBillPage from "./pages/SplitBill";
import SplitBillSuccessPage from "./pages/SplitBill/SuccessPage";
import CustomSplitBillPage from "./pages/CustomSplitBill";
import CustomSplitBillDetailPage from "./pages/CustomSplitBill/DetailPage";
import "./libraries/fontawesome";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      { element: <HomePage />, index: true },
      {
        path: "split-bill",
        element: <SplitBillPage />,
      },
      {
        path: "split-bill/:id",
        element: <SplitBillSuccessPage />,
      },
      {
        path: "custom-split-bill",
        element: <CustomSplitBillPage />,
      },
      {
        path: "custom-split-bill/:id",
        element: <CustomSplitBillDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const userAuth = getAuthCookie();

      if (userAuth) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      const userAuth = getAuthCookie();

      if (userAuth) {
        return redirect("/");
      }

      return null;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
);
