import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./routes/layout";
import Users from "./routes/users";
import { loader as userLoader } from "./routes/users";
import UserDetails from "./routes/UserDetails";
import Post from "./routes/post";
import { loader as singleUserLoader } from "./routes/UserDetails";
import { loader as postLoader } from "./routes/post";
import Album from "./routes/album";
import { loader as albumLoader } from "./routes/album";
import Favorites from "./routes/favorites";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "users",
        index: true,
        element: <Users></Users>,
        loader: userLoader,
      },
      {
        path: "users/:userId",
        element: <UserDetails />,
        loader: singleUserLoader,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "users/:userId/albums/:albumId",
        element: <Album/>,
        loader: albumLoader,
      },
      {
        path:"favorites",
        element: <Favorites></Favorites>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
