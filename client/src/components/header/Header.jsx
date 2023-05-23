import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../contexts/userAuth";
import KebabMenu from "./KebabMenu";
import { BASE_URL } from "../../utils";

const Header = () => {
  const { isLoggedIn, user, setIsLoggedIn } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
          {/* <form className="nav__search">
            <button className="nav__search-btn">
              <svg>
                <use xlink:href="img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search tours"
              className="nav__search-input"
            />
          </form> */}
        </nav>
        <div className="header__logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>
        <KebabMenu onClick={handleClick} isActive={isActive} />
        <nav className={`nav nav--user ${isActive && "open"}`}>
          {isLoggedIn ? (
            <LoggedIn user={user} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoggedOut />
          )}
        </nav>
      </header>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

// function logout(setIsLoggedIn) {
//   return () => {
//     axios.get(`${BASE_URL}/api/v1/users/logout`).then((res) => {
//       if (res.status === 200) toast.success("You're Logged out!");
//       // setCookie("jwt", "logout", {
//       //   path: "/",
//       //   expires: new Date(Date.now() + 10 * 1000),
//       // });
//       setIsLoggedIn(false);
//     });
//   };
// }

async function logout(setIsLoggedIn) {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/users/logout`, {
      withCredentials: true,
    });

    if (res.status === 200) toast.success("You're Logged out!");
    setIsLoggedIn(false);
    localStorage.setItem("user", JSON.stringify({}));
  } catch (err) {}
}

function LoggedIn({ user, setIsLoggedIn }) {
  return (
    <>
      <Link to="/" className="nav__el" onClick={() => logout(setIsLoggedIn)}>
        Log out
      </Link>
      <Link to="/me" className="nav__el">
        <img
          src={`img/users/${user.photo}`}
          alt="User photo"
          className="nav__user-img"
        />
        <span className="text-blue-500 hidden md:inline">
          {user.name.split(" ")[0]}
        </span>
      </Link>
    </>
  );
}

function LoggedOut() {
  return (
    <>
      <button className="nav__el nav_list">
        <Link to="/login">Log in</Link>
      </button>

      <button className="nav__el nav__el--cta nav_list">
        <Link to="/signup">Sign up</Link>
      </button>
    </>
  );
}

export default Header;
