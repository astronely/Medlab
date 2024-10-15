import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./styles/page.scss"
import HomeInfo from "../components/HomeInfo.jsx";

export default function Home() {

    return (
        <>
            <Header/>
            <main>
                <HomeInfo />
            </main>
            <Footer/>
        </>
    )
}