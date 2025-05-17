import { Navigate } from "react-router-dom";

import { DefaultLayout } from "@/layout/DefaultLayout";
import { Page1 } from "@/pages/page1";
import { MicroFrontend } from "@/pages/microfrontend";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: "overview",
        element: <Page1 />,
      },
      {
        path: "microfrontend/*",
        element: <MicroFrontend />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
];
