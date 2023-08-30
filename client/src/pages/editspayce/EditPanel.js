import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import CTAbutton from "../../components/CTAbutton";
import { getSpaceById } from "../../utils/dbFunctions";
import SelectSpayce from "./SelectSpayce";
import EditArchitecture from "./EditArchitecture";
import EditArtworks from "./EditArtworks";
import EditWallpaper from "./EditWallpaper";
import EditAudio from "./EditAudio";
import EditMisc from "./EditMisc";
import gsap from "gsap";
import EditInterior from "./EditInterior";

const EditPanel = (props) => {
  const [section, setSection] = useState("Your Spayces");
  const [name, setName] = useState("");
  const [frames, setFrames] = useState({});
  const [interior, setInterior] = useState({});
  const [activeSpayce, setActiveSpayce] = useState({});
  const [spayces, setSpayces] = useState([]);

  const { nfts, user } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("MenuChange", (e) => {
      setSection(e.detail);
    });
    getUserSpayces();
  }, []);

  const EditMenuSelection = (props) => {
    return (
      <img
        className="pointer"
        src={props.src}
        alt={props.sec}
        onClick={() => setSection(props.sec)}
      />
    );
  };

  const getUserSpayces = async () => {
    const userSpayces = [];
    for (let i = 0; i < user.spaces.length; i++) {
      const userSpayce = await getSpaceById(user.spaces[i]);
      userSpayces.push(userSpayce);
    }
    setSpayces(userSpayces);
  };

  const handleActiveSpayceChange = (spayce) => {
    setActiveSpayce(spayce);
    props.setSpayce(spayce);
    props.setEntered(false);
    setSection("Architecture");
    setName(spayce.name);
    gsap.set(".entry-instructions", { display: "block" });
    gsap.timeline().to(".entry-instructions", { duration: 2, autoAlpha: 1 });
    const event = new CustomEvent("SpayceLoadEvent", { detail: spayce });
    window.dispatchEvent(event);
  };

  const isActiveSpayce = () => {
    if (Object.keys(activeSpayce).length > 0) {
      return true;
    } else return false;
  };

  const goBack = () => {
    setSection("Your Spayces");
    setActiveSpayce({});
  };

  const saveRoom = () => {
    const obj = { name: name, id: activeSpayce._id };
    const event = new CustomEvent("SaveRoom", { detail: obj });
    window.dispatchEvent(event);
    gsap.set('.spayce-modal', {display: 'flex'})
    gsap.set('.entry-instructions', {display: 'none'})
  };

  return (
    <div className="edit-panel">
      <div className="edit-header">
        <div className="flex ai-center">
          {section !== "Your Spayces" && (
            <img
              className="back-arrow mr-13 pointer"
              src="/icons/chevron-left.svg"
              alt="chevron-left"
              onClick={goBack}
            />
          )}
          <p className="fs-28-ep semi-bold">{section}</p>
        </div>
        <CTAbutton
          outline={true}
          text="Save and exit"
          height="40px"
          fontSize="0.781vw"
          onClick={saveRoom}
        />
      </div>
      <div className="horizontal-divider mt-16 mb-16"></div>
      <div className="edit-content-container">
        {section === "Your Spayces" && !isActiveSpayce() && (
          <SelectSpayce
            spayces={spayces}
            handleActiveSpayceChange={handleActiveSpayceChange}
          />
        )}
        {section === "Architecture" && isActiveSpayce() && (
          <EditArchitecture
            spayce={activeSpayce}
            name={name}
            setName={setName}
          />
        )}
        {section === "Artworks" && (
          <EditArtworks frames={frames} setFrames={setFrames} />
        )}
        {section === "Interior" && (
          <EditInterior interior={interior} setInterior={setInterior} />
        )}
        {section === "Wallpaper" && <EditWallpaper />}
        {section === "Miscellaneous" && <EditMisc />}
        {section === "Audio" && <EditAudio />}
        <div className="edit-menu-selection glass mt-2">
          <EditMenuSelection sec="Architecture" src="/icons/architecture.svg" />
          <div className="horizontal-divider mt-18" />
          <EditMenuSelection sec="Artworks" src="/icons/artworks.svg" />
          <EditMenuSelection sec="Interior" src="/icons/interior.svg" />
          <EditMenuSelection sec="Wallpaper" src="/icons/wallpaper.svg" />
          <EditMenuSelection sec="Miscellaneous" src="/icons/marker.svg" />
          <EditMenuSelection sec="Audio" src="/icons/music.svg" />
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
