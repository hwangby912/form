import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCookie from "../common/getCookie";

export default function Nav({
  setId,
  isLoggedIn,
  setIsLoggedIn,
  setIsAdmin,
  setPasswordSame
}) {
  const logout = () => {
    document.cookie = `Authorization=;expires=${new Date().toUTCString()}`;
    setId("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPasswordSame(false);
  };
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("Authorization"));
    // Header Payload Signature
    if (document.cookie.includes("Authorization")) {
      const jwt = getCookie("Authorization").split(" ")[1];
      const payload = jwt.split(".")[1];
      const { admin } = JSON.parse(atob(payload));
      setIsAdmin(admin);
    }
  }, []);
  return (
    <>
      {!setIsLoggedIn ? null : (
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            {/* <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setIsMenuOpened(!isMenuOpened);
          }}
        >
          Menu
          <i className="fas fa-bars" />
        </button> */}
            {/* <div
          className={`collapse navbar-collapse ${!isCollapsed && "show"}`}
          id="navbarResponsive"
        > */}
            <ul className="navbar-nav ml-auto">
              {/* <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            > */}
              {isLoggedIn ? (
                <Link
                  className="nav-link"
                  to="/home"
                  // onClick={setPasswordSame(false)}
                >
                  Home
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  Main
                </Link>
              )}
              {/* <Link className="nav-link" to="/">
                Home
              </Link> */}
              {/* </li> */}
              {/* <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            > */}
              {isLoggedIn ? (
                <Link className="nav-link" onClick={logout} to="/">
                  Log Out
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              )}
              {/* </li> */}
              {/* {isAdmin && (
              <li
                className="nav-item"
                onClick={() => {
                  if (isMenuOpened) {
                    setIsCollapsed(!isCollapsed);
                    setIsMenuOpened(!isMenuOpened);
                  }
                }}
              >
                <Link className="nav-link" to="/write">
                  Write
                </Link>
              </li>
            )} */}
            </ul>
            {/* </div> */}
          </div>
        </nav>
      )}
    </>
  );
}
