import React from "react";
import "./about.css";

const InfoSection = () => {
  return (
    <>
      <section className="section_about">
        <h1 className="heading_about_section">
          Exciting tours for adventurous people
        </h1>
        <div className="container_about">
          <div className="col-1-tour">
            <h3 className="heading_h3">
              YOU'RE GOING TO FALL IN LOVE WITH NATURE
            </h3>
            <p className="para">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo sapiente nulla non. Impedit recusandae quibusdam,
              possimus cumque dolor molestiae esse quas accusantium atque quidem
              corporis ea necessitatibus cupiditate error laboriosam.
            </p>
            <h3 className="heading_h3">
              LIVE ADVENTURES LIKE YOU NEVER HAVE BEFORE
            </h3>
            <p className="para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              debitis excepturi accusantium non earum alias aliquam quia
              provident, at eligendi.
            </p>
          </div>
          <div className="col-2-tour">
            <img
              src={`https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
              className={`about_img-1`}
              alt={`photo-1`}
            />
            <img
              src={`https://images.unsplash.com/photo-1679199688745-7756b94ec8fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
              className={`about_img-2`}
              alt={`photo-2`}
            />
            <img
              src={`https://images.unsplash.com/photo-1680430631963-f2b3a2a793cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80`}
              className={`about_img-3`}
              alt={`photo-3`}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoSection;
