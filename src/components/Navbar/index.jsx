import { useState } from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getAuthCookie, removeAuthCookie } from "../../utils/cookies";
import logoNavbar from "../../assets/images/logo-nav.png";
import "./style.scss";

const Navbar = () => {
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const userAuth = getAuthCookie() && JSON.parse(getAuthCookie());

  const handleShowProfileMenu = () => {
    setIsShowProfileMenu(!isShowProfileMenu);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        removeAuthCookie();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav id="navbar" className="navbar">
      <div className="container navbar__container">
        <Link className="navbar__brand">
          <img src={logoNavbar} alt="Navbar Logo" />
          <h4>financify</h4>
        </Link>
        <div className="navbar__menu">
          <ul className="navbar__menu__list">
            <li className="navbar__menu__item">
              <a href="#features">Features</a>
            </li>
            <li className="navbar__menu__item">
              <a href="#about">About</a>
            </li>
          </ul>
          <div className="navbar__profile">
            <div className="profile" onClick={handleShowProfileMenu}>
              <h6 className="first-name">
                {userAuth.email.charAt(0).toUpperCase()}
              </h6>
            </div>
            {isShowProfileMenu && (
              <div className="profile__menu">
                <p className="profile__name">{userAuth.displayName}</p>
                <ul className="profile__menu__list">
                  <li className="profile__menu__item"></li>
                  <li className="profile__menu__item" onClick={handleLogout}>
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
