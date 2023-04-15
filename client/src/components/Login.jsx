import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/userAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['jwt']);
  const { setIsLoggedIn, setUser } = useAuth();
  // const closeLoginModal = () => {
  //   document.body.style.overflowY = 'visible';
  //   setShowLogin(false);
  // };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   withCredentials: true,
      // };
      // const result = await axios.post(
      //   'http://127.0.0.1:8000/api/v1/users/login',
      //   {
      //     email,
      //     password,
      //   },
      //   config
      // );
      const result = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/users/login',
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      setCookie('jwt', result.data.token, { path: '/' });
      // console.log(result);
      setUser(result.data.data.user);
      setIsLoggedIn(true);
      toast.success('Login successfully!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const goBackPage = () => {
    navigate('/');
  };

  return (
    <>
      <div className="relative inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="shadow-lg">
          <main className="main">
            <div className="login-form">
              <h2 className="heading-secondary ma-bt-lg">
                Log into your account
              </h2>
              <form
                action=""
                className="form form--login"
                onSubmit={handleSubmit}
              >
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form__input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form__input"
                    placeholder="********"
                  />
                </div>
                <div className="form__group flex fl">
                  <button type="submit" className="btn btn--green mr-16">
                    Login
                  </button>
                  <button
                    className="btn bg-gray-200 ml-16"
                    onClick={goBackPage}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;
