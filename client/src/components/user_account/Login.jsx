import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/userAuth";
import FormInput from "./FormInputs";
import { BASE_URL } from "../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["jwt"]);
  const { setIsLoggedIn, setUser } = useAuth();
  // const closeLoginModal = () => {
  //   document.body.style.overflowY = 'visible';
  //   setShowLogin(false);
  // };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await axios({
        method: "post",
        url: `${BASE_URL}/api/v1/users/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      setCookie("jwt", result.data.token, { path: "/" });
      // console.log(result);
      setUser(result.data.data.user);
      setIsLoggedIn(true);
      toast.success("Login successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const goBackPage = () => {
    navigate("/");
  };

  return (
    <>
      <div className="relative inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 "></div>
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
              <FormInput
                label="Email address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label="Password"
                id="password"
                type="password"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="form__group">
                <button type="submit" className="btn btn--green mr-16">
                  Login
                </button>
                <button className="btn bg-gray-200 ml-16" onClick={goBackPage}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
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
