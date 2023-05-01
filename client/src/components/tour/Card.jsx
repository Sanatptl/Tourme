import DetailBtn from "./DetailBtn";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`/img/tours/${props.imageCover}`}
            alt={props.tourName}
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{props.tourName}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{`${props.difficulty} ${props.duration} day tour`}</h4>
        <p className="card__text">{props.summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{props.startLocationDescription}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>
            {/* tour.startDates[0].toLocaleString('en-us', {month: 'long', year: 'numeric'}) */}
            {props.startDate}
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-flag"></use>
          </svg>
          <span>{`${props.tourLocationLegth} stops`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-user"></use>
          </svg>
          <span>{`${props.maxGroupSize} people`}</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">{props.price}</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{props.ratingsAverage}</span>
          <span className="card__footer-text">{`rating (${props.ratingsQuantity})`}</span>
        </p>
        <DetailBtn
          tourId={props.tourId}
          // setShowTour={props.setShowTour}
          // setTourDetails={props.setTourDetails}
          // isLoggedIn={props.isLoggedIn}
        />
        {/* <a
              href={`http://127.0.0.1:8000/api/v1/tours/${props.tourId}`}
              className="btn btn--green btn--small"
            >
              Details
            </a> */}
      </div>
    </div>
  );
};

export default Card;
