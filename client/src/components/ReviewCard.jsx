const ReviewCard = ({ photo, name, review, rating }) => {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`/img/users/${photo}`}
          alt={`${name}`}
        />
        <h6 className="reviews__user">{name}</h6>
      </div>
      <p className="reviews__text">{review}</p>
      <div className="reviews__rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`reviews__star reviews__star--${
              rating >= star ? 'active' : 'inactive'
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
