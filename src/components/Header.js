import React from "react";
import { Link } from "react-router-dom";

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-dark padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {userId ? (
                  <>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "home" ? "active" : ""
                        }`}
                        onClick={() => setActive("home")}
                      >
                        Home
                      </li>
                    </Link>

                    <Link to="/create" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "create" ? "active" : ""
                        }`}
                        onClick={() => setActive("create")}
                      >
                        Create
                      </li>
                    </Link>

                    <Link to="/mygames" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "mygames" ? "active" : ""
                        }`}
                        onClick={() => setActive("mygames")}
                      >
                        My Games
                      </li>
                      
                    </Link>
                    <img style={{
                            display: "block",
                            position: "absolute",
                            marginLeft: "45%",
                            width: "180px",
                            height: "30px",
                            marginTop: "10px",
                          }} alt="logo" src="https://i.ibb.co/VCPSmYg/logo.png" />
                  </>
                  
                ) : (
                  <>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "home" ? "active" : ""
                        }`}
                        onClick={() => setActive("home")}
                      >
                        Home
                      </li>
                    </Link>
                  </>
                )}
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="profile"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      </div>
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        Logout
                      </li>
                    </>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        }`}
                        onClick={() => setActive("login")}
                      >
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
