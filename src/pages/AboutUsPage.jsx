import {Container} from "react-bootstrap";
import Header from "../components/Header.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";

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