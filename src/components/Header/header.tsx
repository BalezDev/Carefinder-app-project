import React, { useRef, useEffect, useCallback } from "react";
import "./header.css";
import { motion } from "framer-motion";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.jpg";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from 'react-toastify';
import careicon from "../../assets/images/carefinder 1.jpg"

const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "hospital",
    display: "Hospital List",
  },
  {
    path: "login",
    display: "Login",
  },
  {
    path: "signup",
    display: "Signup",
  },
];

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const profileActionRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = useCallback(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__menu");
      } else {
        headerRef.current?.classList.remove("sticky__menu");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    stickyHeaderFunc();
  }, [stickyHeaderFunc]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed Out');
        navigate('/home');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const menuToggle = () => menuRef.current?.classList.toggle("active__menu");

  const toggleProfileActions = () => {
    if (profileActionRef.current) {
      profileActionRef.current.style.display =
        profileActionRef.current.style.display === "none" ? "block" : "none";
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <div>
                <h1>
                <span>
                    <img
                      src= {careicon}
                      alt="CareFinder Logo"
                      className="careiconmain"
                      style={{ width: "24px", height: "24px",}}
                    />
                  </span>
                  <Link to='/' className="Carehome">
                  CareFinder
                  </Link>
                </h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL || userIcon}
                  alt="User"
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup" className="secondarylinks">Signup</Link>
                      <Link to="/login" className="secondarylinks">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
