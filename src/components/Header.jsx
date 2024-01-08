import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname) {
      fetchData();
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  const delUserHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/deluser`, {
        withCredentials: true,
      });
      toast.success("User Deleted Successfully");
      await setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"} className="link">
          Home
        </Link>
        <Link to={"/profile"} className="link">
          Profile
        </Link>
        {isAuthenticated ? (
          <Link onClick={toggleDropdown} className="dropdown__toggle link user">
            {user?.name}
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
        <div className="dropdown">
          {isOpen && (
            // <ul className="dropdown__menu">
            <>
              <Link className="dropdown__item">
                {isAuthenticated ? (
                  <Link
                    disabled={loading}
                    onClick={logoutHandler}
                    className="link"
                  >
                    Logout
                  </Link>
                ) : null}
              </Link>
              <Link className="dropdown__item">
                {isAuthenticated ? (
                  <Link
                    to={"/deluser"}
                    className="link"
                    disabled={loading}
                    onClick={delUserHandler}
                  >
                    Del Acc
                  </Link>
                ) : null}
              </Link>
              </>
            // </ul>
          )}
        </div>
      </article>
    </nav>
  );
};

export default Header;
