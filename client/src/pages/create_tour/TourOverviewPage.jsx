import Card from "../../components/tour/Card";
import useFetch from "../../hooks/useFetch";
import AlertWindow from "../../components/alert_error/AlertWindow";
import LoadingSkelton from "../../components/overview/LoadingSkelton";

const TourOverviewPage = () => {
  const { data, isLoading, error } = useFetch("/api/v1/tours?limit=10", []);

  if (!data) localStorage.setItem("toursData", JSON.stringify(data));
  return isLoading ? (
    // <h1 className="bg-grey text-6xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
    //   {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
    //   Loading...
    // </h1>
    <>
      <LoadingSkelton />
      <LoadingSkelton />
      <LoadingSkelton />
    </>
  ) : error ? (
    <AlertWindow show={true} type="error" msg={error.message} />
  ) : (
    data.map((tour) => (
      <Card
        key={tour.id}
        imageCover={tour.imageCover}
        tourName={tour.name}
        tourId={tour.id}
        difficulty={tour.difficulty}
        duration={tour.duration}
        summary={tour.summary}
        startDate={new Date(tour.startDates[0]).toLocaleString("en-IN", {
          month: "long",
          year: "numeric",
        })}
        tourLocationLegth={tour.locations.length}
        maxGroupSize={tour.maxGroupSize}
        price={tour.price}
        ratingsAverage={tour.ratingsAverage}
        ratingsQuantity={tour.ratingsQuantity}
        startLocationDescription={tour.startLocation.description}
      />
    ))
  );
};

export default TourOverviewPage;
