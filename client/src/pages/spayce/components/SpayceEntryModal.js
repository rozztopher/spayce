import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import {
  updateUser,
  updateSpace,
  getUserById,
} from "../../../utils/dbFunctions";
import CTAbutton from "../../../components/CTAbutton";

const SpayceEntryModal = (props) => {
  const { user, setUser } = useContext(UserContext);

  const [owner, setOwner] = useState({});

  useEffect(() => {
    if (props.spayce) {
      getOwner();
    }
  }, [props.spayce]);

  const getOwner = async () => {
    const data = await getUserById(props.spayce.owner);
    setOwner(data);
  };

  const isLikedSpayce = () => {
    if (
      Object.keys(user).length > 0 &&
      user.likedspaces &&
      user.likedspaces.length > 0
    ) {
      for (let i = 0; i < user.likedspaces.length; i++) {
        if (user.likedspaces[i] === props.spayce._id) {
          return true;
        }
      }
    }
    return false;
  };

  const likeSpayce = async () => {
    const newUser = Object.assign(user);
    const newSpayce = Object.assign(props.spayce);
    let alreadyLiked = false;

    newUser.likedspaces.forEach((likedSpayce, i) => {
      if (likedSpayce === props.spayce._id) {
        alreadyLiked = true;
        newSpayce.likes = newSpayce.likes - 1;
        newUser.likedspaces.splice(i, 1);
      }
    });

    if (!alreadyLiked) {
      newUser.likedspaces.push(props.spayce._id);
      newSpayce.likes = newSpayce.likes + 1;
    }
    newUser.likedspaces = newUser.likedspaces;

    await updateUser(user._id, newUser);
    await updateSpace(props.spayce._id, newSpayce);
    props.setSpayce(newSpayce);
    setUser(newUser);
  };

  const spayceName = props.spayce ? props.spayce.name : "Spayce";
  const heartContainerStyle = isLikedSpayce()
    ? "entry-modal-control-selected pointer"
    : "entry-modal-control glass pointer";
  const heartImageStyle = isLikedSpayce()
    ? "/icons/heart-purple.svg"
    : "/icons/heart-white.svg";
  const ownerName = owner ? owner.display : "USER";
  const ownerPFP = owner ? owner.pfp : "/images/default-pfp.jpg";

  return (
    <div className="entry-instructions">
      <div className="space-between-row">
        <h2 className="fs-35">{spayceName}</h2>
        <div className="entry-modal-controls">
          <div className={"entry-modal-control glass pointer"}>
            <img src={"/icons/share-white.svg"} alt="heart"></img>
          </div>
          <div className={heartContainerStyle} onClick={likeSpayce}>
            <img src={heartImageStyle} alt="heart"></img>
          </div>
        </div>
      </div>
      <img className="mt-8" src="/waves/enter-modal-waves.svg" alt="wave" />
      <div className="space-between-row">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className="enter-modal-pfp" src={ownerPFP} alt="pfp" />
          <p className="ml-8 fs-14 maximum-blue-purple">{ownerName}</p>
        </div>
        <CTAbutton
          id="enter-spayce-button"
          background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
          outline={false}
          text="Enter Spayce"
          height="46px"
          wide={true}
          onClick={props.enterSpace}
          fontSize="0.938rem"
        />
      </div>
      <div className="horizontal-divider mt-30" />
      <div className="instruction-grid mt-30">
        <div className="space-instruction glass">
          <img
            src="/icons/key-inst.svg"
            alt="keyboard instructions"
            style={{ width: "60%" }}
          ></img>
          <p className="fs-13 center lh-16 mt-20">
            Press the arrow keys or ASWD keys to move
          </p>
        </div>
        <div className="space-instruction glass">
          <img
            src="/icons/mouse-inst.svg"
            alt="mouse instructions"
            style={{ width: "40%" }}
          ></img>
          <p className="fs-13 center lh-16 mt-30">
            Drag with mouse to look around and click on the floor to move
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpayceEntryModal;
