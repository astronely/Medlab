import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import PricesPage from "./pages/PricesPage.jsx";
import LegalInformationPage from "./pages/LegalInformationPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import {ModalManager} from "./components/modal/ModalManager.jsx";
import SpecialistsPage from "./pages/SpecialistsPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import {AdminPanelPage} from "./pages/AdminPanelPage.jsx";
import axios from "axios";

function App() {
    axios.defaults.withCredentials = true;
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
        },
        {
            path: '/specialists',
            element: <SpecialistsPage />
        },
        {
            path: '/adminLoginPage',
            element: <AdminLoginPage />
        },
        {
            path: '/adminPanelPage',
            element: <AdminPanelPage />
        },
    ]);

    return (
        <>
            <RouterProvider router={router}/>
            <ModalManager />
        </>
    )
}

export default App
