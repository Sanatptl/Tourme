const Hamburger = ({ onClick, isActive }) => {
  return (
    <>
      <div className={`hamburger ${isActive && 'active'}`} onClick={onClick}>
        <div className="hamburger_box">
          <span className="hamburger_inner"></span>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
