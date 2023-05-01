import { getTourDetail } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTours } from "../../contexts/TourContext";
import { useAuth } from "../../contexts/userAuth";

const DetailBtn = ({ tourId }) => {
  const navigate = useNavigate();
  const { setTourDetails, setShowTour } = useTours();
  const { isLoggedIn } = useAuth();

  const getTour = (id, setTourDetails, setShowTour, isLoggedIn, navigate) => {
    return () => {
      if (isLoggedIn) {
        getTourDetail(id, setTourDetails, setShowTour);
        setTimeout(() => {
          navigate("/tour");
        }, 1500);
      } else {
        toast.error(
          "You're not logged in, please Log in to view Detailed tour page!"
        );
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    };
  };

  return (
    <button
      className="btn btn--green btn--small"
      onClick={getTour(
        tourId,
        setTourDetails,
        setShowTour,
        isLoggedIn,
        navigate
      )}
    >
      Details
    </button>
  );
};

export default DetailBtn;
