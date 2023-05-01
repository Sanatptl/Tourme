import { useState } from 'react';
import FormInput from './FormInputs';
import axios from 'axios';
import AlertWindow from './AlertWindow';
import { useCookies } from 'react-cookie';
import { useAuth } from '../contexts/userAuth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const [, setCookie] = useCookies(['jwt']);
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('passwordConfirm', passwordConfirm);
      data.append('photo', file);

      const result = await axios({
        method: 'POST',
        withCredentials: true,
        url: 'http://127.0.0.1:8000/api/v1/users/signup',
        data,
      });
      setCookie('jwt', result.data.token, { path: '/' });
      setUser(result.data.data.user);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);

      if (result.data.status === 'success') {
        setType('success');
        setMsg('Account created successfully!');
      }
      console.log(result);
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      } else if (err.message) {
        setMsg(err.message);
      }
      setType('error');
      console.log(err);
    } finally {
      setShow(true);
    }
  };

  return (
    <>
      <AlertWindow show={show} msg={msg} type={type} setShow={setShow} />
      <div className="container"></div>
      <div className="shadow-lg">
        <main className="main">
          <div className="flex flex-col items-center">
            <h2 className="heading-secondary ma-bt-lg md:text-4xl sm:text-base">
              Create Your New Account
            </h2>
            <form
              className="form flex flex-row flex-wrap  gap-x-16"
              action=""
              onSubmit={handleSubmit}
            >
              <FormInput
                label="Name"
                id="name"
                type="text"
                classDiv="min-w-[35vw]"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                classDiv="min-w-[35vw]"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label="Password"
                id="password"
                type="password"
                classDiv="min-w-[35vw]"
                value={password}
                placeholder="*********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                label="Confirm Password"
                id="passConfirm"
                type="password"
                classDiv="min-w-[35vw]"
                value={passwordConfirm}
                placeholder="you@example.com"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />

              <div className="form__group form__photo-upload min-w-[35vw]">
                <img
                  className="form__user-photo"
                  src={`/img/users/default.jpg`}
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
                  Profile Photo
                </label>
              </div>
              <div className="form__group mt-8">
                <button type="submit" className="btn btn--green mr-16">
                  Submit
                </button>
                <button className="btn bg-gray-200 ml-16">Cancel</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signup;
