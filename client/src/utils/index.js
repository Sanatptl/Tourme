import axios from "axios";

// export const BASE_URL = "https://tourme.onrender.com";
export const BASE_URL = "http://localhost:8000";

export const getTourDetail = (id, setTourDetails, setShowTour) => {
  axios.get(`${BASE_URL}/api/v1/tours/${id}`).then((res) => {
    localStorage.setItem("tour", JSON.stringify(res.data.data.data));
    setTourDetails(res.data.data.data);
  });
  setShowTour(true);
};

//
