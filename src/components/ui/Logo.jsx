import "../styles/components.scss"
import {Link, useNavigate} from "react-router-dom";

export default function Logo({isLink = false}) {
    const navigate = useNavigate();

    return (
        <>
            {isLink ?
                <Link className="logo" style={{textDecoration: "none"}} to={"/"}> МедЛаб </Link>
                :
                <div className="logo">МедЛаб</div>}

        </>
    )
}