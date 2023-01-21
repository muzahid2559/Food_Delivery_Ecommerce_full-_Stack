import React, { useRef, useEffect, useState } from "react";

import { Container, NavbarBrand } from "reactstrap";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import "../../styles/header.css";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import useAuth from "../../hooks/useAuth";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
];
const buyerNavbar = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Order",
    path: "/order",
  },
];
const sellerNavbar = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Dashboard",
    path: "/dashboard",
  },
];
const deliverNavbar = [
  {
    display: "Dashboard",
    path: "/deliver-table",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { userType } = useSelector((state) => state.auth);
  const [navLink, setNavLink] = useState(nav__links);
  const dispatch = useDispatch();
  const [profileStatus, setProfileStatus] = useState("none");
  const { authenticated } = useAuth();
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
      if (
        document.body.scrollTop > 5 ||
        document.documentElement.scrollTop > 5
      ) {
        setProfileStatus("none");
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);
  window.addEventListener("click", (e) => {
    if (!e.target.id && e.target.id !== "profileMenu") {
      setProfileStatus("none");
    }
  });

  useEffect(() => {
    if (userType === "buyer") {
      setNavLink([...buyerNavbar]);
    } else if (userType === "seller") {
      setNavLink([...sellerNavbar]);
    } else if (userType === "deliver") {
      setNavLink([...deliverNavbar]);
    }
  }, []);

  const styles = {
    ul: {
      position: "absolute",
      top: "70px",
      listStyle: "none",
      right: "0",
      borderRadius: "4px",
      backgroundColor: "#EEE",
      textAlign: "center",
      paddingLeft: "0px",
      display: profileStatus,
    },
    li: {
      backgroundColor: "#ccc",
      padding: "0 25px",
      margin: "5px 0",
      textAlign: "center",
    },
    a: { textDecoration: "none", color: "black", fontWeight: "700" },
  };

  function profileVisible() {
    return (
      <div className="lineHeight">
        <ul
          className="flex flex-col profileMenu"
          style={styles.ul}
          id="profileMenu"
        >
          <li style={styles.li}>
            <Link to="/profile" style={styles.a}>
              Profile
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/logout" style={styles.a}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo Part */}
            <div className="logo">
              <NavbarBrand href="/">
                {" "}
                <img src={logo} alt="logo" />{" "}
              </NavbarBrand>
              <h5>DIU FOOD</h5>
            </div>

            {/* Menu Part */}
            <div className="navigation" ref={menuRef}>
              <div className="menu d-flex align-items-center gap-5">
                {navLink.map((item, index) => (
                  <NavLink
                    onClick={toggleMenu}
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/*nav right icons part*/}
            <div className="nav__right d-flex align-items-center gap-4">
              {userType === "seller" || userType === "deliver" ? (
                ""
              ) : (
                <span className="cart__icon" onClick={toggleCart}>
                  <i className="ri-shopping-basket-line"></i>
                  <span className="cart__badge"> {totalQuantity} </span>
                </span>
              )}

              <span className="user">
                {authenticated ? (
                  <div onClick={() => setProfileStatus("")} className="iconDiv">
                    <i className="ri-user-line" id="profileIcon2"></i>
                    {profileVisible()}
                  </div>
                ) : (
                  <Link to="/login">
                    <i className="ri-user-line"></i>
                  </Link>
                )}
              </span>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

// const profileStatusValue = profileStatus;
export default Header;
