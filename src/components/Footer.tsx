import {Link, useLocation} from "react-router-dom";


const Footer = () => {
    const location = useLocation();
    const active = (path: string) => location.pathname === path ? "active" : "";


    return(
        <footer className="footer">
            <Link to="/" className={`footer-button ${active("/")}`}>
                <span>Matches</span>
            </Link>
            <Link to="/analytics" className={`footer-button ${active("/analytics")}`}>
                <span>Tips</span>
            </Link>
            <Link to="/manager" className={`footer-button ${active("/manager")}`}>
                <span>Manager</span>
            </Link>
            <button className="footer-button disabled">
                <span>Coming</span>
            </button>
            <button className="footer-button disabled">
                <span>Soon</span>
            </button>
        </footer>


    )
}

export default Footer;