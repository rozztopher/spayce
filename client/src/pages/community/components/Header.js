import React, { useState, useEffect } from "react";
import CTAbutton from "../../../components/CTAbutton";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { getSpaceById, getUserById } from "../../../utils/dbFunctions";

const Header = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [spayces, setSpayces] = useState([]);

  const bannerItems = [
    "6295e229e5a299468a786466",
    "62962502e5a299468a78646e",
    "629896a4348b759b205cb3b0",
    "629896b1348b759b205cb3b1",
  ];

  const handleActiveItemChange = (e) => {
    setActiveItem(parseInt(e.target.id));
  };

  const getSpayces = async () => {
    const items = [];
    for (let i = 0; i < bannerItems.length; i++) {
      const space = await getSpaceById(bannerItems[i])
      const user = await getUserById(space.owner)
      space.user = user.display
      items.push(space)
    }
    setSpayces(items)
  };

  useEffect(() => {
    if (spayces.length === 0) {
      getSpayces();
    }

    if (spayces.length > 0) {
      setTimeout(() => {
        const tl = gsap.timeline().addLabel("tl");
        tl.to(".banner-creator", { duration: 1, autoAlpha: 0 }, "tl");
        tl.to("#banner-text", { delay: 0.2, duration: 1, autoAlpha: 0 }, "tl");
        tl.to(
          ".community-banner .cta-button",
          { delay: 0.4, duration: 1, autoAlpha: 0 },
          "tl"
        );
        tl.to(
          ".community-banner img",
          { delay: 0.6, duration: 1, autoAlpha: 0 },
          "tl"
        );
        setTimeout(() => {
          if (activeItem === bannerItems.length - 1) {
            setActiveItem(0);
          } else {
            setActiveItem(activeItem + 1);
          }
          tl.reverse();
        }, 2000);
      }, 5000);
    }
  }, [spayces]);

  if (spayces.length > 0) {
    return (
      <div className="community-header-container mt-40">
        <h2>Community</h2>
        <div className="community-banner mt-40">
          <p className="banner-creator">
            Creator: <span className="semi-bold">{spayces[activeItem].user}</span>
          </p>
          <p className="fs-47 lh-59 mt-2o5 mb-5 semi-bold">
            {spayces[activeItem].name}
            <span id="banner-text" className="ripe-mango fs-47 semi-bold"> #{spayces[activeItem]._id.substring(0,4)}</span>
          </p>
          <Link to={`/myspayce?spayce=${spayces[activeItem]._id}`} style={{ width: "100%" }}>
            <CTAbutton
              background="#FFFFFF"
              outline={false}
              text="View Spayce"
              height="5vh"
              color="#050420"
              wide={true}
              fontSize="0.938rem"
            />
          </Link>
          <img src={spayces[activeItem].thumbnail} alt="img"></img>
        </div>
        <div className="carousel-5 mt-31">
          {bannerItems.map((item, i) => {
            const className =
              i === activeItem ? "carousel-chip-active" : "carousel-chip";
            return (
              <div
                className={className}
                id={i}
                key={i}
                onClick={handleActiveItemChange}
              ></div>
            );
          })}
        </div>
      </div>
    );
  } else return <></>;
};

export default Header;
