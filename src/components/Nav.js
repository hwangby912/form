import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCookie from "../common/getCookie";

export default function Nav({
  setId,
  isLoggedIn,
  setIsLoggedIn,
  setIsAdmin,
  setPasswordSame,
  myStorage
}) {
  const logout = () => {
    document.cookie = `Authorization=;expires=${new Date().toUTCString()}`;
    setId("");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setPasswordSame(false);
    myStorage.clear();
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
            <ul className="navbar-nav ml-auto">
              {isLoggedIn ? (
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              ) : (
                <Link className="nav-link" to="/">
                  Main
                </Link>
              )}
              {isLoggedIn ? (
                <Link className="nav-link" onClick={logout} to="/">
                  Log Out
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              )}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
