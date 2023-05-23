import { useState } from "react";
import axios from "axios";
import AlertWindow from "../alert_error/AlertWindow";
import { BASE_URL } from "../../utils";
import useForm from "../../hooks/useForm";
import FormInput from "./FormInputs";

const AccPassChange = () => {
  const initialValue = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [values, handleChange, resetForm] = useForm(initialValue);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !values.currentPassword ||
        !values.newPassword ||
        !values.confirmPassword
      ) {
        throw new Error("Please fill up required fields");
      }

      const result = await axios({
        method: "PATCH",
        url: `${BASE_URL}/api/v1/users/updatePassword`,
        data: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        withCredentials: true,
      });
      if (result.data.status === "success") {
        setMsg("Data updated successfully!");
        setType("success");
        resetForm();
      }
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      } else {
        setMsg(err.message);
      }
      setType("error");
    } finally {
      setShow(true);
    }
  };

  let content = (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>

      <form className="form form-user-password">
        <FormInput
          label="Current password"
          id="password-current"
          type="password"
          name="currentPassword"
          placeholder="••••••••"
          required={true}
          minLength="8"
          value={values.currentPassword}
          onChange={handleChange}
        />

        <FormInput
          label="New password"
          id="password"
          type="password"
          name="newPassword"
          placeholder="••••••••"
          required={true}
          minLength="8"
          value={values.newPassword}
          onChange={handleChange}
        />

        <FormInput
          classDiv="ma-bt-lg"
          label="Confirm password"
          id="password-confirm"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          required={true}
          minLength="8"
          value={values.confirmPassword}
          onChange={handleChange}
        />

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
