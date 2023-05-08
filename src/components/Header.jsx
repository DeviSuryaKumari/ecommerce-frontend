import './header.scss';
import logo from "../images/e_logo.png";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserNavigation from './UserNavigation';

const Header = () => {
    return (
        <div>
            <nav className="header navbar-expand-lg text-primary">
                <img
                    src={logo}
                    width="35"
                    height="35"
                    className="cart-logo d-inline-block align-top"
                    alt=""
                />
                <Link to="/" className="navbar-brand">
                    <i>
                        <b className="text-primary">ECommerce Web Application</b>
                    </i>
                </Link>

                <ul className="header-link-list navbar-nav">
                    <li className="header-link-list__item nav-item">
                        <Link to="/about" className="nav-link active">
                            <b className="text-primary">About Us</b>
                        </Link>
                    </li>

                    <li className="header-link-list__item nav-item">
                        <Link to="/contact" className="nav-link active">
                            <b className="text-primary">Contact Us</b>
                        </Link>
                    </li>
                    <UserNavigation />
                </ul>
            </nav>
        </div>
    );
};

export default Header;
