import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useErr } from "../../contexts/ErrContext";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../alert_error/ErrorPage";
import AlertWindow from "../alert_error/AlertWindow";
import { BASE_URL } from "../../utils";

const AccPassChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [, setCookie] = useCookies(["jwt"]);
  const [type, setType] = useState("");
  // const { setError, error } = useErr();
  // const navigate = useNavigate();
  // console.log(newPassword);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Please fill up required fields");
      }

      const result = await axios({
        method: "PATCH",
        url: `${BASE_URL}/api/v1/users/updatePassword`,
        data: { currentPassword, newPassword, confirmPassword },
        withCredentials: true,
        // headers: {
        //   'Content-Type': 'application/json', // Set Content-Type header
        // },
      });
      setCookie("jwt", result.data.token, { path: "/" });
      if (result.data.status === "success") {
        setMsg("Data updated successfully!");
        setType("success");
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        setMsg(err.response.data.message);
      } else {
        setMsg(err.message);
      }
      setType("error");
      // navigate('/error');
    } finally {
      setShow(true);
    }
  };
  let content = (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>

      <form className="form form-user-password">
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            id="password-current"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
          </label>
          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form__group ma-bt-lg">
          <label htmlFor="password-confirm" className="form__label">
            Confirm password
          </label>
          <input
            id="password-confirm"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form__group right">
          <button
            type="submit"
            className="btn btn--small btn--green btn--save-password"
            onClick={handleSubmit}
          >
            Save password
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <AlertWindow show={show} msg={msg} type={type} setShow={setShow} />
      {content}
    </>
  );
};

export default AccPassChange;
