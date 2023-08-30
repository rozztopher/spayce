import React, { useState, useEffect } from "react";
import CTAbutton from "../../../components/CTAbutton";
import SearchBar from "../../../components/SearchBar";
import EditSlider from "../../../components/EditSlider";
import SelectNetwork from "../../../components/SelectNetwork";

const EditInterior = (props) => {
  const [hovered, setHovered] = useState("");
  const [added, setAdded] = useState([]);
  const [active, setActive] = useState(null);
  const [network, setNetwork] = useState("All");

  useEffect(() => {
    window.addEventListener("ActiveItem", (e) => {
      const item = Object.assign({}, e.detail);
      item.name = item.name.split("~interior~")[1];
      setActive(item);
    });
    window.addEventListener("InteriorNamesReceived", (e) => {
      setAdded(e.detail)
    });
    const event = new CustomEvent("InteriorMenuLoaded");
    window.dispatchEvent(event);
  }, []);

  const handleInteriorAdd = (interior) => {
    const newInteriors = Object.assign({}, props.interior);
    const newAdded = Object.assign([], added);

    if (!Object.keys(newInteriors).includes(interior.name)) {
      if (!newAdded.includes(interior.name)) {
        newAdded.push(interior.name);
      }
    }

    props.setInterior(newInteriors);
    setAdded(newAdded);
  };

  const handleInteriorRemove = () => {
    const newAdded = Object.assign([], added);
    const index = newAdded.indexOf(active.name);
    if (index > -1) {
      newAdded.splice(index, 1);
    }
    const event = new CustomEvent("RemoveItem");
    window.dispatchEvent(event);
    setAdded(newAdded);
    setActive(null);
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

  const fireAddItemEvent = (item) => {
    const event = new CustomEvent("AddItem", { detail: item });
    window.dispatchEvent(event);
  };

  const fireSelectItemEvent = (item) => {
    const event = new CustomEvent("SelectInterior", { detail: item.name });
    window.dispatchEvent(event);
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
          {props.nfts.map((item) => {
            if ((network === "All" || item.chain === network.toLowerCase()) && item.animation_url.length > 0) {
              return (
                <div
                  className="edit-artwork-chip glass pointer"
                  key={item.name}
                  value={item.image}
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered("")}
                  onClick={() => {
                    handleInteriorAdd(item);
                    if (added.includes(item.name)) {
                      fireSelectItemEvent(item)
                    } else {
                      fireAddItemEvent(item)
                    }
                  }}
                >
                  {added.includes(item.name) && (
                    <div className="artwork-selected">
                      <img src="/icons/tick.svg" alt="tick"></img>
                      <span className="fs-12-ep uppercase ls-1o6 semi-bold ml-7">PLACED</span>
                    </div>
                  )}
                    <img
                      className="mb-1"
                      src={item.image}
                      alt="nft"
                    ></img>
                  {hovered !== item.name && (
                    <p className="fs-14-ep semi-bold mt-13">{item.name}</p>
                  )}
                  {hovered === item.name && (
                    <CTAbutton
                      background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                      text={
                        added.includes(item.name)
                          ? "Edit Product"
                          : "Add Product"
                      }
                      height="19%"
                      fontSize="0.729vw"
                    />
                  )}
                </div>
              );
            } else return <></>
          })}
        </div>
      </div>
    );
  };

  const ActiveItem = () => {
    return (
      <div className="active-edit">
        <p className="pointer ceil-60 fs-14-ep" onClick={() => setActive(null)}>
          {"<-"} Go back to all products
        </p>
        <div className="active-edit-chip glass">
          <img className="edit-product" src={active.image} alt="nft"></img>
          <p className="fs-16-ep semi-bold ml-1">{active.name}</p>
          <img
            className="edit-bin pointer"
            src="/icons/bin.svg"
            alt="bin"
            onClick={() => handleInteriorRemove()}
          />
        </div>
        <p className="fs-18-ep medium">Position</p>
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

  return (
    <>
      {active && <ActiveItem />}
      {!active && <GridMenu />}
    </>
  );
};

export default EditInterior;
