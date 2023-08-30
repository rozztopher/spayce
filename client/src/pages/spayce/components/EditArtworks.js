import React, { useState, useEffect } from "react";
import CTAbutton from "../../../components/CTAbutton";
import SearchBar from "../../../components/SearchBar";
import SelectNetwork from "../../../components/SelectNetwork";

const EditArtworks = (props) => {
  const [hovered, setHovered] = useState("");
  const [added, setAdded] = useState([]);
  const [network, setNetwork] = useState("All");
  const [active, setActive] = useState(null);

  useEffect(() => {
    window.addEventListener("ActiveItem", (e) => {
      setActive(e.detail);
    });
  }, [active]);

  const handleArtworkAdd = (artwork) => {
    const event = new CustomEvent("AddArtwork", { detail: artwork });
    window.dispatchEvent(event);

    const newArtworks = Object.assign({}, props.frames);
    const newAdded = Object.assign([], added);

    if (!Object.keys(newArtworks).includes(artwork.name)) {
      if (!newAdded.includes(artwork.name)) {
        newAdded.push(artwork.name);
      }
    }

    props.setFrames(newArtworks);
    setAdded(newAdded);
  };

  const handleArtworkRemove = () => {
    const newAdded = Object.assign([], added);
    const index = newAdded.indexOf(active.name);
    if (index > -1) {
      newAdded.splice(index, 1);
    }
    const event = new CustomEvent("RemoveArtwork");
    window.dispatchEvent(event);
    setAdded(newAdded);
    setActive(null);
  };

  const networks = [
    "All",
    "Avax",
    "Bsc",
    "Goerli",
    "Kovan",
    "Mumbai",
    "Rinkeby",
    "Ropsten",
  ];

  const GridMenu = () => {
    return (
      <div className="edit-artwork-container">
        <div className="edit-header">
          <p className="fs-16-ep medium wrap">Select Network</p>
          <SelectNetwork value={network} options={networks} set={setNetwork} />
        </div>
        <div className="mt-20"></div>
        <SearchBar height="5vh" width="100%" />
        <div className="edit-artwork-grid mt-20">
          {props.nfts.map((artwork) => {
            if (network === "All" || artwork.chain === network.toLowerCase()) {
              return (
                <div
                  className="edit-artwork-chip glass pointer"
                  key={artwork.name}
                  value={artwork.image}
                  onMouseEnter={() => setHovered(artwork.name)}
                  onMouseLeave={() => setHovered("")}
                  onClick={() => handleArtworkAdd(artwork)}
                >
                  {added.includes(artwork.image) && (
                    <div className="artwork-selected">
                      <img src="/icons/tick.svg" alt="tick"></img>
                      <span className="fs-12-ep uppercase ls-1o6 semi-bold ml-7">PLACED</span>
                    </div>
                  )}
                  <img
                    className="mb-1"
                    src={artwork.image}
                    alt="artwork"
                  ></img>
                  {hovered !== artwork.name && (
                    <p className="fs-14-ep semi-bold mt-13">{artwork.name}</p>
                  )}
                  {hovered === artwork.name && (
                    <CTAbutton
                      background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                      text="Add artwork"
                      height="19%"
                      fontSize="0.729vw"
                    />
                  )}
                </div>
              );
            } else {
              return <></>
            }
          })}
        </div>
      </div>
    );
  };

  const ActiveItem = () => {
    return (
      <div className="active-edit">
        <p
          className="pointer ceil-60 fs-14-ep"
          onClick={() => setActive(null)}
        >
          {"<-"} Go back to all artworks
        </p>
        <div className="active-edit-chip glass">
            <img
              className="edit-product"
              src={active.image}
              alt="nft"
            ></img>
          <p className="fs-16-ep semi-bold ml-1">{active.name}</p>
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

  return (
    <>
      {(active && active.image) && <ActiveItem />}
      {(!active || !active.image) && <GridMenu />}
    </>
  );
};

export default EditArtworks;
