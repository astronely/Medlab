import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import PricesPage from "./pages/PricesPage.jsx";
import LegalInformationPage from "./pages/LegalInformationPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import {ModalManager} from "./components/modal/ModalManager.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: '/about-us',
            element: <AboutUsPage/>,
        },
        {
            path: '/prices',
            element: <PricesPage/>
        },
        {
            path: '/legal-info',
            element: <LegalInformationPage/>
        },
        {
            path: '/contacts',
            element: <ContactsPage/>
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
            <ModalManager />
        </>
    )
}

export default App
