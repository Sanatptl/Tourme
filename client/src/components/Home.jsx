import React from 'react';
import { Header, TourOverviewPage, Footer } from './';
const Home = ({ setTourDetails, setShowTour, isLoggedIn }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="main">
        <div className="card-container">
          <TourOverviewPage
          // isLoggedIn={isLoggedIn}
          // setShowTour={setShowTour}
          // setTourDetails={setTourDetails}
          />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
