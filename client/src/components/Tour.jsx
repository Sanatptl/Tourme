import React from 'react';
import Guides from './Guides';
import Overview from './Overview';
import ReviewCard from './ReviewCard';
import { useTours } from '../contexts/TourContext';

const Tour = () => {
  const { tourDetails } = useTours();
  // const date = new Date(tourDetails.startDates[0]).toLocaleString('en-IN', {
  //   month: 'long',
  //   year: 'numeric',
  // });
  return (
    <>
      {/*   
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay"> &nbsp</div>
          <img src="" alt="tour.imagecover" className="header__hero-img" />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tourname} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icom">
                <use xlink:href="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icom">
                <use xlink:href="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                tor.starlocation.decription
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description"></section> */}
      {/* <div className="absolute top-2/4 left-2/4 z-[100] translate-[50%,50%]"> */}
      <div className="">
        <section className="section-header">
          <div className="header__hero">
            <div className="header__hero-overlay">&nbsp;</div>
            <img
              className="header__hero-img"
              src={`/img/tours/${tourDetails.imageCover}`}
              alt={tourDetails.name}
            />
          </div>
          <div className="heading-box">
            <h1 className="heading-primary">
              <span>{`${tourDetails.name} tour`}</span>
            </h1>
            <div className="heading-box__group">
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-clock"></use>
                </svg>
                <span className="heading-box__text">{`${tourDetails.duration} days`}</span>
              </div>
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                </svg>
                <span className="heading-box__text">
                  {tourDetails.startLocation.description}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                <Overview
                  label={'Next date'}
                  text={new Date(tourDetails.startDates[0]).toLocaleString(
                    'en-IN',
                    {
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                  icon={'calender'}
                />
                <Overview
                  label={'Difficulty'}
                  text={tourDetails.difficulty}
                  icon={'trending-up'}
                />
                <Overview
                  label={'Participants'}
                  text={tourDetails.maxGroupSize}
                  icon={'user'}
                />
                <Overview
                  label={'Rating'}
                  text={`${tourDetails.ratingsAverage} / 5`}
                  icon={'calender'}
                />
              </div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                {tourDetails.guides.map((guide) => (
                  <Guides
                    key={guide._id}
                    photo={guide.photo}
                    name={guide.name}
                    role={guide.role}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">{`About ${tourDetails.name} tour`}</h2>
            {tourDetails.description.split('\n').map((p, i = 0) => {
              i++;
              return (
                <p key={i} className="description__text">
                  {p}
                </p>
              );
            })}
          </div>
        </section>
        <section className="section-pictures">
          {tourDetails.images.map((img, i = 0) => (
            <div key={i++} className="picture-box">
              <img
                className={`picture-box__img--${i + 1}`}
                src={`/img/tours/${img}`}
                alt={`The Park Camper Tour ${i + 1}`}
              />
            </div>
          ))}
        </section>
        <section className="section-map">
          <div
            id="map"
            data-locations={JSON.stringify(tourDetails.locations)}
          ></div>
        </section>
        <section className="section-reviews">
          <div className="reviews">
            {tourDetails.reviews.map((review) => (
              <ReviewCard
                key={review.id}
                photo={review.user.photo}
                name={review.user.name}
                review={review.review}
                rating={review.rating}
              />
            ))}
          </div>
        </section>

        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src="/img/logo-white.png" alt="Natours logo" />
            </div>
            <img
              className="cta__img cta__img--1"
              src={`/img/tours/${tourDetails.images[1]}`}
              alt="Tour picture"
            />
            <img
              className="cta__img cta__img--2"
              src={`/img/tours/${tourDetails.images[2]}`}
              alt="Tour picture"
            />
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">{`${tourDetails.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
              <button className="btn btn--green span-all-rows">
                Book tour now!
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tour;

//

//

//

//

// const Tour = ({
//   name,
//   imagecover,
//   duration,
//   tourStartLocationDescription,
//   guides,
//   description,
//   startDate,
//   locations,
//   difficulty,
//   ratingsAverage,
//   maxGroupSize,
//   images,
//   reviews,
// }) => {
//   const date = new Date(startDate[0]).toLocaleString('en-IN', {
//     month: 'long',
//     year: 'numeric',
//   });
//   return (
//     <>
//       {/*
//       <section className="section-header">
//         <div className="header__hero">
//           <div className="header__hero-overlay"> &nbsp</div>
//           <img src="" alt="tour.imagecover" className="header__hero-img" />
//         </div>

//         <div className="heading-box">
//           <h1 className="heading-primary">
//             <span>{`${tourname} tour`}</span>
//           </h1>
//           <div className="heading-box__group">
//             <div className="heading-box__detail">
//               <svg className="heading-box__icom">
//                 <use xlink:href="/img/icons.svg#icon-clock"></use>
//               </svg>
//               <span className="heading-box__text">{`${tour.duration} days`}</span>
//             </div>
//             <div className="heading-box__detail">
//               <svg className="heading-box__icom">
//                 <use xlink:href="/img/icons.svg#icon-map-pin"></use>
//               </svg>
//               <span className="heading-box__text">
//                 tor.starlocation.decription
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="section-description"></section> */}
//       <section className="section-header">
//         <div className="header__hero">
//           <div className="header__hero-overlay">&nbsp;</div>
//           <img
//             className="header__hero-img"
//             src={`/img/tours/${imagecover}`}
//             alt={name}
//           />
//         </div>
//         <div className="heading-box">
//           <h1 className="heading-primary">
//             <span>{`${name} tour`}</span>
//           </h1>
//           <div className="heading-box__group">
//             <div className="heading-box__detail">
//               <svg className="heading-box__icon">
//                 <use xlinkHref="/img/icons.svg#icon-clock"></use>
//               </svg>
//               <span className="heading-box__text">{`${duration} days`}</span>
//             </div>
//             <div className="heading-box__detail">
//               <svg className="heading-box__icon">
//                 <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
//               </svg>
//               <span className="heading-box__text">
//                 {tourStartLocationDescription}
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="section-description">
//         <div className="overview-box">
//           <div>
//             <div className="overview-box__group">
//               <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
//               <Overview label={'Next date'} text={date} icon={'calender'} />
//               <Overview
//                 label={'Difficulty'}
//                 text={difficulty}
//                 icon={'trending-up'}
//               />
//               <Overview
//                 label={'Participants'}
//                 text={maxGroupSize}
//                 icon={'user'}
//               />
//               <Overview
//                 label={'Rating'}
//                 text={`${ratingsAverage} / 5`}
//                 icon={'calender'}
//               />
//             </div>
//             <div className="overview-box__group">
//               <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
//               {guides.map((guide) => (
//                 <Guides
//                   key={guide._id}
//                   photo={guide.photo}
//                   name={guide.name}
//                   role={guide.role}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="description-box">
//           <h2 className="heading-secondary ma-bt-lg">{`About ${name} tour`}</h2>
//           {description.split('\n').map((p, i = 0) => {
//             i++;
//             return (
//               <p key={i} className="description__text">
//                 {p}
//               </p>
//             );
//           })}
//         </div>
//       </section>
//       <section className="section-pictures">
//         {images.map((img, i) => (
//           <div key={i} className="picture-box">
//             <img
//               className={`picture-box__img--${i + 1}`}
//               src={`/img/tours/${img}`}
//               alt={`The Park Camper Tour ${i + 1}`}
//             />
//           </div>
//         ))}
//       </section>
//       <section className="section-map">
//         <div id="map" data-locations={JSON.stringify(locations)}></div>
//       </section>
//       <section className="section-reviews">
//         <div className="reviews">
//           {reviews.map((review) => (
//             <ReviewCard
//               key={review.id}
//               photo={review.user.photo}
//               name={review.user.name}
//               review={review.review}
//               rating={review.rating}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="section-cta">
//         <div className="cta">
//           <div className="cta__img cta__img--logo">
//             <img src="/img/logo-white.png" alt="Natours logo" />
//           </div>
//           {/* <img
//             className="cta__img cta__img--1"
//             src={`/img/tours/${tour.images[1]}`}
//             alt="Tour picture"
//           />
//           <img
//             className="cta__img cta__img--2"
//             src={`/img/tours/${tour.images[2]}`}
//             alt="Tour picture"
//           /> */}
//           <div className="cta__content">
//             <h2 className="heading-secondary">What are you waiting for?</h2>
//             {/* <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p> */}
//             <button className="btn btn--green span-all-rows">
//               Book tour now!
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Tour;
