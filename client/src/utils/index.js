import axios from 'axios';
import useBodyScrollLock from './hooks';

export const getTourDetail = (id, setTourDetails, setShowTour) => {
  axios.get(`http://localhost:8000/api/v1/tours/${id}`).then((res) => {
    localStorage.setItem('tour', JSON.stringify(res.data.data.data));
    setTourDetails(res.data.data.data);
  });
  setShowTour(true);
};

export const toggleLoginHandler = (showLogin, setShowLogin, toggle) => () => {
  setShowLogin(!showLogin);
  toggle();
};
