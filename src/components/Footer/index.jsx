import { Link } from "react-router-dom";
import logoNavbar from "../../assets/images/logo-nav.png";
import "./style.scss";

const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="container footer__container">
        <nav className="footer__navbar">
          <div className="footer__identity">
            <Link className="footer__brand">
              <img src={logoNavbar} alt="Navbar Logo" />
              <h4>financify</h4>
            </Link>
            <p>More features, more productive</p>
          </div>
          <div className="footer__menu">
            <h5>Menu</h5>
            <ul className="footer__menu__list">
              <li className="footer__menu__item">Features</li>
              <li className="footer__menu__item">About</li>
            </ul>
          </div>
        </nav>
        <div className="footer__author">
          &copy;{new Date().getFullYear()}. Abdulloh Fahmi
        </div>
      </div>
    </div>
  );
};

export default Footer;
