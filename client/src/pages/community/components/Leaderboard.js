import React, { useEffect, useState } from "react";
import CTAbutton from "../../../components/CTAbutton";
import { Link } from "react-router-dom";
import { getNumberOfSpaces, getSpacesByViews, getUserById } from "../../../utils/dbFunctions";

const Leaderboard = () => {
  const [cardsToShow, setCardsToShow] = useState(4);
  const [mostViewed, setMostViewed] = useState([]);
  const [totalSpayces, setTotalSpayces] = useState(0)

  const getSpayces = async () => {
    let items = [];
    const totalSpayces = await getNumberOfSpaces()
    setTotalSpayces(totalSpayces)

    const spacesByViews = await getSpacesByViews()
    for (let i = 0; i < items.length; i++) {
      const user = await getUserById(spacesByViews[i].owner)
      spacesByViews[i].user = user.display
    }
    setMostViewed(spacesByViews)
  };

  useEffect(() => {
    if (mostViewed.length === 0) {
      getSpayces();
    }
  }, [mostViewed]);

  const handleCardsToShow = () => {
    if (cardsToShow <= 4) {
      if (mostViewed.length < 100) {
        setCardsToShow(mostViewed.length);
      } else {
        setCardsToShow(100);
      }
    } else {
      setCardsToShow(4);
    }
  };

  const cards = mostViewed.slice(0, cardsToShow);

  const ctaText = cardsToShow <= 4 ? "Show More" : "Show Less";
  const ctaStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div className="leaderboard-container mt-80 mb-40">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Top Spayces of the month</h2>
        <p className="maximum-blue-purple-80">
          Total Spayces Created: <span className="semi-bold">{totalSpayces}</span>
        </p>
      </div>
      <div className="leaderboard-grid mt-40">
        {cards.map((spayce, i) => {
          return (
            <Link to={`/myspayce?spayce=${spayce._id}`} className="leaderboard-card" key={spayce._id+i}>
              <div className="position-chip">
                <img src="/icons/trophy.svg" alt="trophy"></img>
                <p className="fs-15 medium ml-8">#{i + 1}</p>
              </div>
              <p className="mt-80 fs-20 semi-bold">{spayce.name}</p>
              <div className="leaderboard-stats mt-36">
                <p className="lotion fs-14">Spayce number: {spayce._id.substring(0,4)}</p>
                <p className="lotion fs-14">Views: {spayce.views}</p>
                <p className="lotion fs-14">Likes: {spayce.likes}</p>
              </div>
              <p className="fs-15 mt-70">{spayce.user}</p>
              <img
                className="background-image"
                src={spayce.thumbnail}
                alt="img"
              ></img>
            </Link>
          );
        })}
      </div>
      <div className="mt-40" style={ctaStyle}>
        <CTAbutton
          background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
          outline={false}
          text={ctaText}
          height="5vh"
          fill={false}
          onClick={handleCardsToShow}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
