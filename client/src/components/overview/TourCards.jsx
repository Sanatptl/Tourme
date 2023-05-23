import React from "react";
import { TourOverviewPage } from "../index";

const TourCards = () => {
  return (
    <main className="main">
      <div className="card-container max-md:grid-cols-[minmax(250px,300px)]">
        <TourOverviewPage />
      </div>
    </main>
  );
};

export default TourCards;
