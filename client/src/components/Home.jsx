import React from 'react';
import { Header, TourOverviewPage, Footer } from './';
const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <main className="main">
        <div className="card-container">
          <TourOverviewPage />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
