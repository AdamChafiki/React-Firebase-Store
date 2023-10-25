import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/amazon-ar21.svg";
import { auth } from "../firebase/fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineDown,
  AiOutlineUp
} from "react-icons/ai";
import { FiLogOut} from "react-icons/fi";
import {GrNext,GrSearch} from "react-icons/gr";
import Footer from "../components/Footer";

const initialCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
];

const allCategories = [
  ...initialCategories,
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
];

const Layout = () => {
  // Account
  const [user, setUser] = useState(null);
  const [isDrop, setIsDrop] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [displayedCategories, setDisplayedCategories] =
    useState(initialCategories);

  const value = useSelector((state) => state.cart.numCart);
  const inputSearch = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputSearch.current.value;
    navigate(`/product/search?q=${query}`);
    inputSearch.current.value = "";
  };

if (isDrop) {
  document.body.style.overflow = "hidden";
} else {
  document.body.style.overflow = "visible"; // Or "auto" if you want to show scrollbars when needed
}

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };

  return (
    <>
      <div
        onClick={() => setIsDrop(!isDrop)}
        className={`layout ${
          isDrop ? "block" : "hidden"
        }   fixed  top-0 left-0 w-full h-screen opacity-50 bg-gray-950 z-40`}
      ></div>
      <nav className="container mx-auto flex flex-wrap justify-between items-center p-3">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div>
          <form className="flex items-center">
            <input
              ref={inputSearch}
              type="search"
              name="search"
              id="search"
              placeholder="Search Amazon...."
              className="border w-[400px] border-yellow-500 p-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 border  border-yellow-500 p-3"
            >
              <GrSearch/>
            </button>
          </form>
        </div>
        <ul className="flex items-center space-x-7">
          {user ? (
            <li className="flex items-center group relative p-2">
              <img
                src={user.photoURL}
                className="w-8 rounded-full me-2"
                alt="profile"
              />
              <h1>{user.email}</h1>
              <div className="absolute w-full top-[100%] p-2 bg-zinc-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center bg-zinc-50 hover:bg-zinc-200 text-black p-2 w-full rounded-md"
                >
                  Logout <FiLogOut className="ms-2" />
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}

          <li className="relative p-3">
            <span className="absolute right-0 top-0 ">{value}</span>
            <Link to="/cart" className="text-xl">
              <HiOutlineShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="cat_section container mx-auto p-2 bg-gray-200">
        <button
          onClick={() => setIsDrop(!isDrop)}
          className="flex items-center p-2 hover:border-2 hover:border-white"
        >
          <AiOutlineMenu className="me-2 text-xl" />
          All
        </button>
      </div>
      <div>
        <div
          id="sidebar"
          className={`sideBar overflow-y-scroll  bg-gray-300  fixed top-0 left-0 h-[100vh] w-[350px] z-50 transform ${
            isDrop ? "translate-x-0" : "-translate-x-full"
          } transition-transform`}
        >
          <div className="top_sideBar flex items-center justify-between p-3 bg-gray-900 text-white">
            {user ? (
              <p className="text-xl flex items-center">
                Welcome, {user.displayName}!
                <AiOutlineUser className="ms-2" />
              </p>
            ) : (
              <h1 className="text-xl flex items-center">
                Hello Sign in
                <AiOutlineUser className="ms-2" />
              </h1>
            )}
            <button onClick={() => setIsDrop(false)} className="p-2">
              <AiOutlineClose className="text-xl  " />
            </button>
          </div>
          <div className="px-3 my-4">
            <div className="border-b-2 border-gray-950">
              <h2 className="text-xl text-gray-950 font-bold">
                Shop By Department
              </h2>
              <ul className=" p-2 flex flex-col space-y-5">
                {displayedCategories.map((category) => (
                  <Link
                    onClick={() => setIsDrop(!isDrop)}
                    to={`/product/category/${category}`}
                    className=" hover:bg-white rounded-md p-2 flex justify-between items-center"
                    key={category}
                  >
                    {category}
                    <GrNext />
                  </Link>
                ))}
                {initialCategories.length < allCategories.length && (
                  <Link className=" hover:bg-white rounded-md p-2 flex justify-between items-center">
                    {/* Toggle between showing all and only initial categories */}
                    {showAllCategories ? (
                      <button
                      className="flex items-center justify-between  w-full p-2"
                        onClick={() => {
                          setShowAllCategories(false);
                          setDisplayedCategories(initialCategories);
                        }}
                      >
                        Show Less Categories <AiOutlineUp/>
                      </button>
                    ) : (
                      <button
                      className="flex  justify-between items-center w-full p-2"
                        onClick={() => {
                          setShowAllCategories(true);
                          setDisplayedCategories(allCategories);
                        }}
                      >
                        Show All Categories <AiOutlineDown/>
                      </button>
                    )}
                  </Link>
                )}
              </ul>
            </div>
            <div className="my-4">
              <h2 className="text-xl text-gray-950 font-bold">Account</h2>
              <ul className="flex flex-col space-y-4 p-2">
                {user ? (
                  <button
                    onClick={()=>{
                      setIsDrop(!isDrop)
                      handleLogout();
                    }}
                    className="hover:bg-white rounded-md flex justify-between p-2"
                  >
                    Logout <GrNext/>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="hover:bg-white rounded-md p-2 flex justify-between items-center"
                    >
                      SignUp <GrNext />
                    </Link>
                    <Link
                      to="/login"
                      className="hover:bg-white rounded-md p-2 flex justify-between items-center"
                    >
                      Login <GrNext />
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer logo={logo} />
    </>
  );
};

export default Layout;
