import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <Home /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
  
);
