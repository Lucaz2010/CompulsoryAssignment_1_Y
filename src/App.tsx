import {createBrowserRouter, RouterProvider} from "react-router";
import {FeedPage} from "@/pages/FeedPage.tsx";
import {PostPage} from "@/pages/PostPage.tsx";
import {CreatePostPage} from "@/pages/CreatePostPage.tsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <FeedPage/>,
    },
  {
    path: "/posts/:id",
    element: <PostPage/>,
  },
  {
    path: "/create",
    element: <CreatePostPage/>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}