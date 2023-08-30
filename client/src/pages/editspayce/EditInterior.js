import React, { useState, useEffect, useContext } from "react";
import SelectNetwork from "../../components/SelectNetwork";
import SearchBar from "../../components/SearchBar";
import CTAbutton from "../../components/CTAbutton";
import EditSlider from "../../components/EditSlider";
import NoAssets from "./NoAssets";
import { networks } from "../../utils/Constants";
import { UserContext } from "../../contexts/UserContext";

const EditInterior = (props) => {
  const [active, setActive] = useState(null);
  const [added, setAdded] = useState([]);
  const [hovered, setHovered] = useState("");
  const [network, setNetwork] = useState("All");

  const { nfts } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("ActiveItem", (e) => {
      const item = Object.assign({}, e.detail);
      item.name = item.name.split("~interior~")[1];
      setActive(item);
    });
    window.addEventListener("InteriorNamesReceived", (e) => {
      setAdded(e.detail);
    });
    const event = new CustomEvent("InteriorMenuLoaded");
    window.dispatchEvent(event);
  }, []);

  const handleInteriorAdd = (artwork) => {
    const event = new CustomEvent("AddItem", { detail: artwork });
    window.dispatchEvent(event);

    const newArtworks = Object.assign({}, props.interior);
    const newAdded = Object.assign([], added);

    if (!Object.keys(newArtworks).includes(artwork.animation_url)) {
      if (!newAdded.includes(artwork.animation_url)) {
        newAdded.push(artwork.animation_url);
      }
    }

    props.setInterior(newArtworks);
    setAdded(newAdded);
  };

  const handleInteriorEdit = (artwork) => {
    const event = new CustomEvent("SelectInterior", { detail: artwork.name });
    window.dispatchEvent(event);

    const event2 = new CustomEvent("SetActiveItem", {
      detail: artwork.animation_url,
    });
    window.dispatchEvent(event2);
  };

  const handleInteriorRemove = () => {
    const newAdded = Object.assign([], added);
    const index = newAdded.indexOf(active.animation_url);
    if (index > -1) {
      newAdded.splice(index, 1);
    }
    const event = new CustomEvent("RemoveItem");
    window.dispatchEvent(event);
    setAdded(newAdded);
    setActive(null);
  };

  const handleBackClick = () => {
    setActive(null);
    const event = new CustomEvent("ClearActiveItem");
    window.dispatchEvent(event);
  };

  const isPlaced = (artwork) => {
    return added.includes(artwork.animation_url);
  };

  const isFiltered = () => {
    if (network === "All") {
      return true;
    } else return false;
  };

  const PlacedChip = () => {
    return (
      <div className="artwork-selected">
        <img src="/icons/tick.svg" alt="tick"></img>
        <span className="fs-12-ep uppercase ls-1o6 semi-bold ml-7">PLACED</span>
      </div>
    );
  };

  const handleXChange = (value) => {
    const event = new CustomEvent("PositionChange", { detail: { x: value } });
    window.dispatchEvent(event);
  };

  const handleYChange = (value) => {
    const event = new CustomEvent("PositionChange", { detail: { y: value } });
    window.dispatchEvent(event);
  };

  const handleZChange = (value) => {
    const event = new CustomEvent("PositionChange", { detail: { z: value } });
    window.dispatchEvent(event);
  };

  const handleRotationChange = (value) => {
    const event = new CustomEvent("RotationChange", { detail: { y: value } });
    window.dispatchEvent(event);
  };

  const handleScaleChange = (value) => {
    const event = new CustomEvent("ScaleChange", { detail: { x: value } });
    window.dispatchEvent(event);
  };

  const ActiveView = () => {
    return (
      <div className="active-edit">
        <div className="flex pointer" onClick={handleBackClick}>
          <img src="/icons/arrow-left.svg" alt="back arrow" />
          <p className="ceil-60 fs-14-ep ml-8">Go back to all products</p>
        </div>
        <div className="active-edit-chip glass mt-10">
          <img className="edit-product" src={active.image_url} alt="nft"></img>
          <p className="fs-16-ep semi-bold ml-15">{active.name}</p>
          <img
            className="edit-bin pointer"
            src="/icons/bin.svg"
            alt="bin"
            onClick={handleInteriorRemove}
          />
        </div>
        <p className="fs-18-ep medium mt-24">Position</p>
        <div className="horizontal-divider"></div>
        <EditSlider
          max={39}
          min={-1}
          mt="mt-1"
          set={handleXChange}
          title="X (position)"
          value={active.position.x}
        />
        <EditSlider
          max={3}
          min={0}
          mt="mt-2"
          set={handleYChange}
          title="Y (position)"
          value={active.position.y}
        />
        <EditSlider
          max={3}
          min={-3}
          mt="mt-2"
          set={handleZChange}
          title="Z (position)"
          value={active.position.z}
        />
        <EditSlider
          max={10}
          min={0}
          mt="mt-2"
          set={handleScaleChange}
          title="Scale"
          value={active.scale.x}
        />
        <EditSlider
          max={Math.PI * 2}
          min={0}
          mt="mt-2"
          set={handleRotationChange}
          title="Rotation (360°)"
          value={active.rotation.y}
        />
      </div>
    );
  };

  const GridView = () => {
    return (
      <div className="edit-artwork-container">
        <div className="edit-header">
          <p className="fs-16-ep medium wrap">Select Network</p>
          <SelectNetwork value={network} options={networks} set={setNetwork} />
        </div>
        <div className="mt-20"></div>
        <SearchBar height="3.125rem" width="100%" />
        <div className="edit-artwork-grid mt-20">
          {nfts.map((artwork, i) => {
            if (isFiltered() && artwork.animation_url) {
              return (
                <div
                  className="edit-artwork-chip glass pointer"
                  key={artwork.image_url + i}
                  value={artwork.image_url}
                  onMouseEnter={() => setHovered(artwork.image_url)}
                  onMouseLeave={() => setHovered("")}
                >
                  {isPlaced(artwork) && <PlacedChip />}
                  <img
                    className="mb-1"
                    src={artwork.image_url}
                    alt="artwork"
                  ></img>
                  {hovered !== artwork.image_url && (
                    <p className="fs-14-ep semi-bold mt-13">{artwork.name}</p>
                  )}
                  {hovered === artwork.image_url && (
                    <CTAbutton
                      background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                      text={isPlaced(artwork) ? "Edit" : "Add"}
                      height="19%"
                      fontSize="0.729vw"
                      onClick={
                        isPlaced(artwork)
                          ? () => handleInteriorEdit(artwork)
                          : () => handleInteriorAdd(artwork)
                      }
                    />
                  )}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    );
  };

  if (
    active !== null &&
    active.animation_url &&
    active.animation_url !== "/images/spayce.jpg"
  )
    return <ActiveView />;
  else if (nfts.length > 0) return <GridView />
  else return <NoAssets />
};

export default EditInterior;
