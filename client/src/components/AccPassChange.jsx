import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useErr } from '../contexts/ErrContext';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const AccPassChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setCookie] = useCookies(['jwt']);
  const { setMsg, showErr, setShowErr } = useErr();
  const navigate = useNavigate();
  // console.log(newPassword);
  const handleSubmit = async (e) => {
    try {
      if (!newPassword || !confirmPassword) {
        return console.log('new password or confirm password field is empty');
      }
      e.preventDefault();

      const result = await axios({
        method: 'patch',
        url: 'http://127.0.0.1:8000/api/v1/users/updatePassword',
        data: { currentPassword, newPassword, confirmPassword },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Set Content-Type header
        },
      });
      setCookie('jwt', result.data.token, { path: '/' });
      console.log(result);
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      } else {
        setMsg(err);
      }
      // navigate('/error');
      setShowErr(true);
    }
  };

  return (
    <>
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
    </>
  );
};

export default AccPassChange;
