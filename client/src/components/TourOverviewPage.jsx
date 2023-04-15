import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const TourOverviewPage = ({ setTourDetails, setShowTour, isLoggedIn }) => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/tours?limit=10')
      .then((res) => setTours(res.data.data.data));
    //   .then((res) => console.log(res.data.data.data));
  }, []);

  return tours.map((tour) => (
    <Card
      key={tour.id}
      imageCover={tour.imageCover}
      tourName={tour.name}
      tourId={tour.id}
      difficulty={tour.difficulty}
      duration={tour.duration}
      summary={tour.summary}
      startDate={new Date(tour.startDates[0]).toLocaleString('en-IN', {
        month: 'long',
        year: 'numeric',
      })}
      tourLocationLegth={tour.locations.length}
      maxGroupSize={tour.maxGroupSize}
      price={tour.price}
      ratingsAverage={tour.ratingsAverage}
      ratingsQuantity={tour.ratingsQuantity}
      startLocationDescription={tour.startLocation.description}
    />
  ));
};

export default TourOverviewPage;
