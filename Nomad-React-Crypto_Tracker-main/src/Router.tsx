import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chart from "./pages/Chart";
import Coin from "./pages/Coin";
import Coins from "./pages/Coins";
import Price from "./pages/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
