import Header from "../components/Header.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";
import {useMediaQuery} from "react-responsive";

export default function AboutUsPage() {
    return (
        <>
            <Header />
            <main>
                <AboutUs />
            </main>
            <Footer />
        </>

    )
}