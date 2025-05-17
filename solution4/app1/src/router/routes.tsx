import { Home } from "../pages/Home";
import { Child } from "../pages/Child";
export const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "child/*",
        element: <Child />,
      },
    ],
  }
];
