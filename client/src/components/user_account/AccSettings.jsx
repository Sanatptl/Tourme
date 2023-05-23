import { useState } from "react";
import { useAuth } from "../../contexts/userAuth";
import axios from "axios";
import AlertWindow from "../alert_error/AlertWindow";
import { BASE_URL } from "../../utils";
import FormInput from "./FormInputs";
import useForm from "./../../hooks/useForm";

const AccSettings = () => {
  const { user } = useAuth();
  const initialValue = { name: user.name, email: user.email };
  const [values, handleChange, resetForm] = useForm(initialValue);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("photo", file);

    try {
      const result = await axios({
        method: "PATCH",
        url: `${BASE_URL}/api/v1/users/updateMe`,
        data,
        withCredentials: true,
      });
      if (result.data.status === "success") {
        setMsg("Profile updated successfully!");
        setType("success");
      } else if (result.data.status === "fail") {
        setMsg(result.data.message);
        setType("error");
      }
    } catch (err) {
      setMsg(err.message);
      setType("error");
    } finally {
      setShow(true);
      resetForm();
    }
  };

  return (
    <>
      <AlertWindow show={show} msg={msg} type={type} setShow={setShow} />

      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

        <form className="form form-user-data">
          <FormInput
            label="Name"
            id="name"
            name="name"
            type="text"
            value={values.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />

          <FormInput
            label="Email address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            classDiv={"ma-bt-md"}
          />
          <div className="form__group form__photo-upload">
            <img
              className="form__user-photo"
              src={`/img/users/${user.photo}`}
              alt="User photo"
            />
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="btn-text" htmlFor="photo">
              Choose new photo
            </label>
          </div>
          <div className="form__group right">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn--small btn--green"
            >
              Save settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccSettings;
