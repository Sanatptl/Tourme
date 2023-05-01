const Guides = ({ photo, name, role }) => {
  return (
    <div className="overview-box__detail">
      <img
        className="overview-box__img"
        src={`/img/users/${photo}`}
        alt={name}
      />
      {role === "lead-guide" && (
        <span className="overview-box__label">Lead guide</span>
      )}
      {role === "guide" && (
        <span className="overview-box__label">Tour guide</span>
      )}
      <span className="overview-box__text">{name}</span>
    </div>
  );
};

export default Guides;
