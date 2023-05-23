import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userAuth";
import { BASE_URL } from "../../utils";
import useForm from "../../hooks/useForm";
import Signup from "../../components/user_account/Signup";
import AlertWindow from "../../components/alert_error/AlertWindow";

const SignupPage = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [values, handleChange] = useForm(initialValue);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("email", values.email);
      data.append("password", values.password);
      data.append("passwordConfirm", values.passwordConfirm);
      data.append("photo", file);

      const result = await axios({
        method: "POST",
        withCredentials: true,
        url: `${BASE_URL}/api/v1/users/signup`,
        data,
      });
      setUser(result.data.data.user);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);

      if (result.data.status === "success") {
        setType("success");
        setMsg("Account created successfully!");
      }
      console.log(result);
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      } else if (err.message) {
        setMsg(err.message);
      }
      setType("error");
      console.log(err);
    } finally {
      setShow(true);
    }
  };

  const goBackPage = () => {
    navigate("/");
  };

  return (
    <>
      <AlertWindow show={show} msg={msg} type={type} setShow={setShow} />
      <Signup
        values={values}
        handleChange={handleChange}
        setFile={setFile}
        handleSubmit={handleSubmit}
        goBackPage={goBackPage}
      />
    </>
  );
};

export default SignupPage;
