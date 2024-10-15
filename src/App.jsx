import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import PricesPage from "./pages/PricesPage.jsx";
import LegalInformationPage from "./pages/LegalInformationPage.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: '/about-us',
            element: <AboutUsPage />,
        },
        {
            path: '/prices',
            element: <PricesPage />
        },
        {
            path: '/legal-info',
            element: <LegalInformationPage />
        }
    ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
