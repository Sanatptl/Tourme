import { useState } from 'react';
import { useAuth } from '../contexts/userAuth';
import axios from 'axios';
import AlertWindow from './AlertWindow';

const AccSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('photo', file);

    fetch('http://127.0.0.1:8000/api/v1/users/updateMe', {
      method: 'PATCH',
      body: data,
      credentials: 'include',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setMsg('Profile updated successfully!');
          setType('success');
        }
        if (data.status === 'fail') {
          setMsg(data.message);
          setType('error');
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        setMsg(err.message);
        setType('error');
        console.log(err);
      })
      .finally(() => {
        setShow(true);
      });

    // try {
    //   const result = await axios({
    //     method: 'PATCH',
    //     url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
    //     data: { name, email },
    //     withCredentials: true,
    //   });

    //   console.log(result);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <AlertWindow show={show} msg={msg} type={type} setShow={setShow} />

      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              value={name}
              required
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              value={email}
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
