import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/userAuth";
import { BASE_URL } from "../../utils";
import useForm from "../../hooks/useForm";
import Login from "../../components/user_account/Login";

const LoginPage = () => {
  const initialValue = { email: "", password: "" };
  const [values, handleChange] = useForm(initialValue);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: "post",
        url: `${BASE_URL}/api/v1/users/login`,
        data: {
          email: values.email,
          password: values.password,
        },
        withCredentials: true,
      });
      setUser(result.data.data.user);
      setIsLoggedIn(true);
      toast.success("Login successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const goBackPage = () => {
    navigate("/");
  };

  return (
    <>
      <Login
        goBackPage={goBackPage}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
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

export default LoginPage;
