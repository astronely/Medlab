import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: '/about-us',
            element: <AboutUsPage />,
        }
    ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
