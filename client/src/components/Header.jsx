import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useAuth } from '../contexts/userAuth';

const Header = () => {
  // const openLoginModal = toggleLoginHandler(showLogin, setShowLogin, toggle);
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['jwt']);
  const { isLoggedIn, user, setIsLoggedIn } = useAuth();

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
        <nav className="nav nav--user">
          {isLoggedIn ? (
            <LoggedIn
              user={user}
              setIsLoggedIn={setIsLoggedIn}
              navigate={navigate}
              setCookie={setCookie}
            />
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

function logout(setIsLoggedIn, navigate, setCookie) {
  return () => {
    axios.get('http://127.0.0.1:8000/api/v1/users/logout').then((res) => {
      if (res.status === 200) toast.success("You're Logged out!");
      setCookie('jwt', 'logout', {
        path: '/',
        expires: new Date(Date.now() + 10 * 1000),
      });
      setIsLoggedIn(false);
      navigate('/');
    });
  };
}

function LoggedIn({ user, setIsLoggedIn, navigate, setCookie }) {
  return (
    <>
      <Link
        to="/"
        className="nav__el"
        onClick={logout(setIsLoggedIn, navigate, setCookie)}
      >
        Log out
      </Link>
      <Link to="/me" className="nav__el">
        <img
          src={`img/users/${user.photo}`}
          alt="User photo"
          className="nav__user-img"
        />
        <span className="text-blue-500">{user.name.split(' ')[0]}</span>
      </Link>
    </>
  );
}

function LoggedOut() {
  return (
    <>
      <button className="nav__el">
        <Link to="/login">Log in</Link>
      </button>

      <button className="nav__el nav__el--cta">Sign up</button>
    </>
  );
}

export default Header;
