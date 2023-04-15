import { useState } from 'react';
import { useAuth } from '../contexts/userAuth';

const AccSettings = () => {
  const { user } = useAuth();
  console.log(user.name);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <>
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
            <a className="btn-text" href="">
              Choose new photo
            </a>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">Save settings</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccSettings;
