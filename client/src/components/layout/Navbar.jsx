import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/auth/AuthContext";

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, logout, user } = useContext(authContext);

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Reigster</Link>
            </li>
          </>
        )}
        {isAuthenticated ? (
          <Fragment>
            <li>Hello, {user && user.name} </li>
            <li>
              <a href="#!" onClick={() => logout()}>
                <i className="fas fa-sign-out-alt"></i>{" "}
                <span className="hide-sm">Logout</span>
              </a>
            </li>
          </Fragment>
        ) : (
          <div></div>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-address-card",
};
export default Navbar;
