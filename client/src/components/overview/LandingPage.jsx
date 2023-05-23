import "./ladingsection.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/alltours");
  };

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            // src={`https://images.unsplash.com/photo-1682949029983-d7436536bfc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
            src={`https://images.unsplash.com/photo-1545562083-c583d014b4f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2033&q=80`}
            alt="Taj image"
          />
        </div>
        <div className="heading-box flex flex-col items-center justify-between">
          <h1 className="flex flex-col text-white uppercase text-center md:mb-20">
            {/* heading-primary */}
            <span className="md:text-8xl text-4xl font-thin tracking-[3rem] mb-4">
              Outdoors
            </span>
            <span className="md:text-4xl text-2xl font-normal tracking-[1.5rem] ">
              is where life happens
            </span>
          </h1>
          <button
            className="btn btn--white md:w-[45%] max-md:px-10 max-md:py-4 animate-bounce"
            onClick={handleClick}
          >
            Discover our tours
          </button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
