import React from "react";
import CTAbutton from "../../../components/CTAbutton";
import { Link } from "react-router-dom";

const ProfileCard = (props) => {
  const copyAddressToClipboard = () => {
    const address = document.getElementById("copy").innerHTML;
    navigator.clipboard.writeText(address);
  };

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const truncateAddress = (str) => {
    let newStr = "";
    for (let i = 0; i < 6; i++) {
      newStr += str.charAt(i);
    }
    newStr += "...";
    for (let i = str.length - 4; i < str.length; i++) {
      newStr += str.charAt(i);
    }
    return newStr;
  };

  if (props.user.wallet_address) {
    return (
      <div className="profile-card glass">
        <div className="profile-pic-container mt-1">
          <img src={props.user.pfp} alt="profile"></img>
        </div>
        <h3 className="fs-26 mt-10 mb-0">{props.user.display}</h3>
        <p className="purple semi-bold mt-1 mb-0">{props.user.name}</p>
        <div className="user-wallet-container mt-20">
          <p id="copy" className="ceil-90">
            {truncateAddress(props.user.wallet_address)}
          </p>
          <img
            className="pointer"
            src="/icons/clipboard.svg"
            alt="clipboard"
            onClick={copyAddressToClipboard}
          ></img>
        </div>
        <p className="fs-14 ceil center lh-24 mt-22">
          {props.user.bio}
        </p>
        <div className="profile-social-row mt-20">
          {props.user.twitter && (
            <Link to={{ pathname: props.user.twitter }} target="_blank">
              <img
                className="pointer"
                src="/icons/twitter-fade.svg"
                alt="twitter"
              ></img>
            </Link>
          )}
          {props.user.discord && (
            <Link to={{ pathname: props.user.discord }} target="_blank">
              <img
                className="pointer"
                src="/icons/discord-fade.svg"
                alt="discord"
              ></img>
            </Link>
          )}
          {props.user.instagram && (
            <Link to={{ pathname: props.user.insta }} target="_blank">
              <img
                className="pointer"
                src="/icons/insta-fade.svg"
                alt="instagram"
              ></img>
            </Link>
          )}
          {props.user.website && (
            <Link to={{ pathname: props.user.website }} target="_blank">
              <img
                className="pointer"
                src="/icons/world-fade.svg"
                alt="world"
              ></img>
            </Link>
          )}
          <img
            className="pointer"
            src="/icons/share.svg"
            alt="share"
            onClick={copyURLToClipboard}
          ></img>
        </div>
        {props.isOwner() && (
          <React.Fragment>
            <div className="horizontal-divider mt-20 mb-20"></div>
            <Link
              to="/profilesettings"
              style={{
                width: "100%",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CTAbutton
                height="50px"
                outline={true}
                fill={true}
                text="Edit Profile"
                fontSize="0.938rem"
              />
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  } else return <></>

};

export default ProfileCard;
