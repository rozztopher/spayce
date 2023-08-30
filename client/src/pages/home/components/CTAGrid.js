import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";

const CTAGrid = (props) => {
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <div className="home-cta-container mt-145">
        {Object.keys(user).length === 0 && (
          <div className="home-cta" onClick={props.connectMetamask}>
            <p className="fs-15 semi-bold">Create Account</p>
            <img
              className="ml-5"
              src="/icons/right-arrow.svg"
              alt="arrow right"
            ></img>
          </div>
        )}
        {Object.keys(user).length > 0 && (
          <Link to={"/profile/"+user.customURL}>
            <div className="home-cta">
              <p className=" fs-15 semi-bold">My Profile</p>
              <img
                className="ml-5"
                src="/icons/right-arrow.svg"
                alt="arrow right"
              ></img>
            </div>
          </Link>
        )}
        <Link to="/create">
          <div className="home-cta">
            <p className=" fs-15 semi-bold">Create Spayce</p>
            <img
              className="ml-5"
              src="/icons/right-arrow.svg"
              alt="arrow right"
            ></img>
          </div>
        </Link>
        <Link to="/community">
          <div className="home-cta">
            <p className=" fs-15 semi-bold">Community</p>
            <img
              className="ml-5"
              src="/icons/right-arrow.svg"
              alt="arrow right"
            ></img>
          </div>
        </Link>
        <Link to="/shop">
          <div className="home-cta">
            <p className=" fs-15 semi-bold">Shop</p>
            <img
              className="ml-5"
              src="/icons/right-arrow.svg"
              alt="arrow right"
            ></img>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CTAGrid;
