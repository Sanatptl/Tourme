import React from "react";
import "./homecard.css";

const HomeCard = ({ data, classCardNo }) => {
  return (
    <div className="container_home_card mb-8 md:mb-0">
      <div className="home_card">
        <div className="card_side card_side-front">
          <div
            className={`card_front-picture card_front-picture-${classCardNo}`}
          >
            &nbsp;
          </div>
          <h4 className="card_heading">
            <span
              className={`card_heading-span card_heading-span-${classCardNo}`}
            >
              {data.name}
            </span>
          </h4>
          <div className="home_card_details">
            <ul>
              <li>{`${data.duration} day tour`}</li>
              <li>{`Up to ${data.group_size} people`}</li>
              <li>{`${data.guide} tour guide`}</li>
              <li>{`${data.slogan}`}</li>
            </ul>
          </div>
        </div>
        <div
          className={`card_side card_side-back card_side-back-${classCardNo}`}
        >
          <div className="card_flip">
            <div className="card_back-box">
              <p className="card_back-title">{`${data.price}`}</p>
            </div>
            <a href="#" className="card_btn card_btn-white card_btn-animated">
              Book Now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
