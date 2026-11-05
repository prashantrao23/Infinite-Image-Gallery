import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SkeletonGallery from "../components/gallery/SkeletonGallery/SkeletonGallery";

const Home = lazy(() => import("../pages/Home"));
const Collections = lazy(() => import("../pages/Collections"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SkeletonGallery />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "collections",
        element: (
          <Suspense fallback={<SkeletonGallery />}>
            <Collections />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
