import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Match from "./routes/match";
import Manage from "./routes/manage";
import "./index.css";
import Dashboard from "./routes/dashboard";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import MatchDetail from "./component/MatchDetail";
import Login from "./routes/login";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    scc_blue: {
      100: "#00AEEF",
    },
    scc_yellow: {
      100: "#FFF200",
    },
  },
  fonts: {
    heading: `'Nunito', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "manage",
        element: <Manage />,
      },
      {
        path: "match/*",
        element: <Match />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
