import useScrollPosition from "../../hooks/useScrollPosition";
import "./hamburger.css";
import { Link } from "react-router-dom";

const Hamburger = ({ onClick, isActive }) => {
  const show = useScrollPosition(90);

  return (
    <>
      <div className={`ham_menu ${isActive ? "block" : "hidden"}`}>
        <ul className="ham_menu_items">
          <li>
            <Link to="/login" onClick={onClick}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/createtour" onClick={onClick}>
              Create Tour
            </Link>
          </li>
          <li>
            <Link to="/signup" onClick={onClick}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`hamburger ${isActive && "active"} ${show ? "show" : ""}`}
        onClick={onClick}
      >
        <div className="hamburger_box">
          <span className="hamburger_inner line-1">&nbsp;</span>
          <span className="hamburger_inner line-2">&nbsp;</span>
          <span className="hamburger_inner line-3">&nbsp;</span>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
