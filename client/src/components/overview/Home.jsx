import { useState } from "react";
import LandingPage from "./LandingPage";
import InfoSection from "../tour/InfoSection";
import HomeCard from "../tour/HomeCard";
import Hamburger from "./../header/Hamburger";

const Home = () => {
  const cardData = [
    {
      id: 1,
      name: "Mountain point",
      price: 45000,
      duration: 10,
      group_size: 17,
      guide: 3,
      slogan: "Sleep in provided tent",
    },
    {
      id: 2,
      name: "Sea surf",
      price: 55000,
      duration: 16,
      group_size: 25,
      guide: 5,
      slogan: "Go along with nature",
    },
    {
      id: 3,
      name: "Greece",
      price: 600000,
      duration: 20,
      group_size: 15,
      guide: 2,
      slogan: "Sleep in cozy hotels",
    },
  ];
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Hamburger onClick={handleClick} isActive={isActive} />

      <LandingPage />
      <InfoSection />
      <section className="flex flex-col md:flex-row">
        {cardData.map((data) => (
          <HomeCard key={data.id} data={data} classCardNo={data.id} />
        ))}
      </section>
    </>
  );
};

export default Home;
