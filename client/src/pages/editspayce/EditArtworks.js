import React, { useState, useEffect, useContext } from "react";
import SelectNetwork from "../../components/SelectNetwork";
import SearchBar from "../../components/SearchBar";
import CTAbutton from "../../components/CTAbutton";
import NoAssets from "./NoAssets";
import { networks } from "../../utils/Constants";
import { UserContext } from "../../contexts/UserContext";

const EditArtworks = (props) => {
  const [active, setActive] = useState(null);
  const [added, setAdded] = useState([]);
  const [hovered, setHovered] = useState("");
  const [network, setNetwork] = useState("All");

  const { nfts } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("ActiveItem", (e) => {
      setActive(e.detail);
    });
    window.addEventListener("ArtworkNamesReceived", (e) => {
      setAdded(e.detail);
    });
    const event = new CustomEvent("ArtworkMenuLoaded");
    window.dispatchEvent(event);
  }, []);

  const handleArtworkAdd = (artwork) => {
    const event = new CustomEvent("AddArtwork", { detail: artwork });
    window.dispatchEvent(event);

    const newArtworks = Object.assign({}, props.frames);
    const newAdded = Object.assign([], added);

    if (!Object.keys(newArtworks).includes(artwork.image_url)) {
      if (!newAdded.includes(artwork.image_url)) {
        newAdded.push(artwork.image_url);
      }
    }

    props.setFrames(newArtworks);
    setAdded(newAdded);
  };

  const handleArtworkEdit = (artwork) => {
    setActive(artwork);
    const event = new CustomEvent("SetActiveItem", {
      detail: artwork.image_url,
    });
    window.dispatchEvent(event);
  };

  const handleArtworkRemove = () => {
    const newAdded = Object.assign([], added);
    const index = newAdded.indexOf(active.image_url);
    if (index > -1) {
      newAdded.splice(index, 1);
    }
    const event = new CustomEvent("RemoveArtwork");
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
    return added.includes(artwork.image_url);
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

  const ActiveView = () => {
    return (
      <div className="active-edit">
        <div className="flex pointer" onClick={handleBackClick}>
          <img src="/icons/arrow-left.svg" alt="back arrow" />
          <p className="ceil-60 fs-14-ep ml-8">Go back to all artworks</p>
        </div>
        <div className="active-edit-chip glass mt-10">
          <img className="edit-product" src={active.image_url} alt="nft"></img>
          <p className="fs-16-ep semi-bold ml-15">{active.name}</p>
          <img
            className="edit-bin pointer"
            src="/icons/bin.svg"
            alt="bin"
            onClick={() => handleArtworkRemove()}
          />
        </div>
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
            if (isFiltered() && artwork.image_url) {
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
                          ? () => handleArtworkEdit(artwork)
                          : () => handleArtworkAdd(artwork)
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
    active.image_url &&
    active.image_url !== "/images/spayce.jpg"
  )
    return <ActiveView />;
  else if (nfts.length > 0) return <GridView />;
  else return <NoAssets />;
};

export default EditArtworks;
