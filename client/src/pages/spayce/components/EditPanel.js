import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "rc-slider/assets/index.css";
import CTAbutton from "../../../components/CTAbutton";
import TextField from "../../../components/inputs/TextField";
import EditArtworks from "./EditArtworks";
import EditInterior from "./EditInterior";
import { getSpaceById } from "../../../utils/dbFunctions";

const EditPanel = (props) => {
  const [section, setSection] = useState("Architecture");
  const [name, setName] = useState("");
  const [frames, setFrames] = useState({});
  const [interior, setInterior] = useState({});
  const [spayce, setSpayce] = useState({})

  const { nfts } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("MenuChange", (e) => {
      setSection(e.detail);
    });
    loadRoom()
  }, []);

  const loadRoom = async () => {
    var url = new URL(window.location.href);
    const space = await getSpaceById(url.searchParams.get("spayce"))
    setSpayce(space)
    setName(space.name)
  };

  const saveRoom = async () => {
    props.save()
    const event = new CustomEvent("SaveRoom", {detail: name});
    window.dispatchEvent(event);
  };

  const EditArchitecture = () => {
    return (
      <div className="edit-architecture-container">
        <p className="fs-15-ep medium mt-2">Spayce Design</p>
        <div className="architecture-overview glass">
          <img src={spayce.thumbnail} alt="architecture" />
          <p className="fs-16-ep m0 mt-1">{spayce.architecture.name}</p>
          <p className="fs-14-ep maximum-blue-purple">
            {spayce.architecture.frames} frames
          </p>
          <p className="fs-16-ep mt-1 mb-1">
            Price: {spayce.architecture.price} ETH
          </p>
          <CTAbutton
            outline={true}
            text="Change the Spayce Design"
            height="40px"
            fontSize={"0.781vw"}
          />
        </div>
        <div className="mt-2"></div>
        <TextField
          label="Spayce Title"
          placeholder="Untitled"
          set={setName}
          value={name}
        />
      </div>
    );
  };

  return (
    <div className="edit-panel">
      <div className="edit-header">
        <p className="fs-28-ep semi-bold">{section}</p>
        <CTAbutton
          outline={true}
          text="Save and exit"
          height="40px"
          onClick={saveRoom}
          fontSize="0.781vw"
        />
      </div>
      <div className="horizontal-divider mt-16 mb-16"></div>
      <div className="edit-content-container">
        {(section === "Architecture" && spayce.architecture) &&
              <div className="edit-architecture-container">
              <p className="fs-15-ep medium">Spayce Design</p>
              <div className="architecture-overview glass mt-10">
                <img src={spayce.thumbnail} alt="architecture" />
                <p className="fs-16-ep semi-bold mt-12">{spayce.architecture.name}</p>
                <p className="fs-14-ep maximum-blue-purple mt-1 mb-12">
                  {spayce.architecture.frames} frames
                </p>
                <CTAbutton
                  outline={true}
                  text="Change the Spayce Design"
                  height="40px"
                  fontSize={"0.781vw"}
                />
              </div>
              <div className="mt-20"></div>
              <TextField
                label="Spayce Title"
                placeholder="Untitled"
                set={setName}
                value={name}
              />
            </div>
        }
        {(section === "Artworks" && spayce.architecture) && (
          <EditArtworks
            nfts={nfts}
            frames={frames}
            setFrames={setFrames}
          />
        )}
        {(section === "Interior" && spayce.architecture) && (
          <EditInterior
            nfts={nfts}
            interior={interior}
            setInterior={setInterior}
          />
        )}
        <div className="edit-menu-selection glass mt-2">
          <img
            className="pointer"
            src="/icons/architecture.svg"
            alt="architecture"
            onClick={() => setSection("Architecture")}
          />
          <div className="horizontal-divider mt-3" />
          <img
            className="pointer"
            src="/icons/artworks.svg"
            alt="artworks"
            onClick={() => setSection("Artworks")}
          />
          <img
            className="pointer"
            src="/icons/interior.svg"
            alt="interior"
            onClick={() => setSection("Interior")}
          />
          <img
            className="pointer"
            src="/icons/wallpaper.svg"
            alt="wallpaper"
            onClick={() => setSection("Wallpaper")}
          />
          <img
            className="pointer"
            src="/icons/marker.svg"
            alt="marker"
            onClick={() => setSection("Marker")}
          />
          <img
            className="pointer"
            src="/icons/music.svg"
            alt="music"
            onClick={() => setSection("Audio")}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
