import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@theme-toggles/react/css/Simple.css";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FeaturesProvider } from "./Context/features.context";
import StatePage from "./pages/StatePage/StatePage";
import NotFound from "./pages/NotFound/NotFound";
import Statistics from "./pages/Statistics/Statistics";
function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/:state",
          element: <StatePage />,
        },
        {
          path: "/stats/:state",
          element: <Statistics />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  let myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <FeaturesProvider>
          <RouterProvider router={routes}></RouterProvider>
        </FeaturesProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
