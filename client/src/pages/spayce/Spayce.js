import React, { useEffect, useState, useContext } from "react";
import gsap from "gsap";
import CTAbutton from "../../components/CTAbutton";
import "rc-slider/assets/index.css";
import ReactTooltip from "react-tooltip";
import EditPanel from "./components/EditPanel";
import LoadingScreen from "./components/LoadingScreen";
import { UserContext } from "../../contexts/UserContext";
import {
  incrementViews,
  incrementShares,
  getUserById,
  getSpaceById,
} from "../../utils/dbFunctions";

const Spayce = () => {
  const [entered, setEntered] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [spayce, setSpayce] = useState({});
  const [spayceId, setSpayceId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [owner, setOwner] = useState({});

  const { setIsEditing, isEditing, user, setUser, visited, pushVisited } =
    useContext(UserContext);

  useEffect(() => {
    if (spayce._id) {
      setTimeout(() => {
        const event = new CustomEvent("SpayceLoadEvent", { detail: spayce });
        window.dispatchEvent(event);
      }, 1000)
    }

    window.addEventListener(
      "AssetsLoaded",
      function () {
        setLoaded(true);
      },
      false
    );

    gsap.set(".app-container", { width: "100vw", marginTop: "-16px" });
    gsap.set(".minimised-footer-container ", { display: "flex" });
    gsap.set(".footer-container ", { display: "none" });
    gsap.set(".social-container ", { display: "none" });
    if (entered) {
      gsap.set(".space-controls", { display: "flex" });
    }

    if (spayceId === "") {
      getSpayceById();
    } else {
      getOwner();
    }
  }, [spayceId, ownerId]);

  const getOwner = async () => {
    if (Object.keys(spayce).length > 0) {
      const user = await getUserById(spayce.owner);
      setOwner(user);
      setOwnerId(user._id);
    }
  };

  const getSpayceById = async () => {
    var url = new URL(window.location.href);
    let owned = false;
    if (user.display) {
      user.spaces.forEach((spayce) => {
        if (spayce._id === url.searchParams.get("spayce")) {
          owned = true;
        }
      });
    }
    if (!owned) {
      setIsEditing(false);
    }
    const id = url.searchParams.get("spayce");
    const space = await getSpaceById(id);
    setSpayce(space);
    setSpayceId(space.id);
  };

  const saveSpayce = () => {
    setIsEditing(false);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      gsap.timeline().set(".spayce-modal", { display: "flex" });
    }, 100);
  };

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const enterSpace = async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("spayce");
    gsap.set(".entry-instructions", { display: "none" });
    gsap.set(".space-blur", { display: "none" });
    gsap.timeline().to(".loading-screen-container", { duration: 2, autoAlpha: 0 });
    gsap.set(".loading-screen-container", { delay: 2, display: "none" });
    if (!visited.includes(id)) {
      pushVisited(id);
      incrementViews(id);
    }
    if (document.referrer) {
      incrementShares(id);
    }
    setEntered(true);
  };

  const InfoTooltip = () => {
    return (
      <ReactTooltip
        id="info"
        place="top"
        type="light"
        effect="solid"
        clickable={true}
      >
        <div className="position-chip-tt mt-2">
          <img src="/icons/trophy-light.svg" alt="trophy"></img>
          <p style={{ color: "#23262F" }} className="fs-14 m0 ml-o5">
            #4
          </p>
        </div>
        <p className="fs-28 mt-3 mb-1 charleston-green">Net Expressions</p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={owner.pfp}
            alt="profile"
            style={{ height: "1.75vw", width: "1.75vw" }}
          ></img>
          <p className="semi-bold fs-14 charleston-green ml-o5">
            {owner.display}
          </p>
        </div>
        <div className="mt-3">
          <p className="charleston-green m0">Spayce number #2749</p>
          <p className="charleston-green m0">Views: 2850</p>
          <p className="charleston-green m0">Likes: 358</p>
        </div>
        <div className="mt-4" style={{ position: "relative", display: "flex" }}>
          <CTAbutton
            outline={true}
            text="Copy Link"
            height="40px"
            color="#23262F"
            onClick={copyURLToClipboard}
          />
          <div className="instruction-heart-container pointer ml-1 mb-2">
            <img src="/icons/heart-light.svg" alt="heart"></img>
          </div>
        </div>
      </ReactTooltip>
    );
  };

  const HelpTooltip = () => {
    return (
      <ReactTooltip id="help" place="top" type="light" effect="solid">
        <div className="space-instruction-tt mt-2">
          <img
            src="/icons/keys-light.svg"
            alt="keyboard instructions"
            style={{ height: "8vh" }}
          ></img>
          <p className="center charleston-green">
            Press the arrow keys or ASWD keys to move
          </p>
        </div>
        <div className="space-instruction-tt mt-1 mb-2">
          <img
            src="/icons/mouse-light.svg"
            alt="mouse instructions"
            style={{ width: "8vh" }}
          ></img>
          <p className="center charleston-green">
            Drag with mouse to look around and click on the floor to move
          </p>
        </div>
      </ReactTooltip>
    );
  };

  const hideModal = () => {
    gsap.timeline().set(".spayce-modal", { display: "none" });
  };

  const SavedModal = () => {
    return (
      <div className="spayce-modal">
        <div className="spayce-modal-content">
          <h3 className="center fs-28">Your Spayce is now Live!</h3>
          <img className="mt-2" src="/images/saved.gif" alt="thank you" />
          <p className="center ceil lh-31 mt-4 mb-3">
            Congratulations! Your Spayce is now live and other users can visit
            it. You can also mint your Spayce to make it appear in your wallet.
          </p>
          <CTAbutton
            outline={true}
            text="View Spayce"
            height="46px"
            onClick={hideModal}
            fill={true}
            fontSize="0.938rem"
          />
        </div>
      </div>
    );
  };

  const style = isEditing
    ? { display: "grid", gridTemplateColumns: "0.73fr 0.27fr" }
    : { display: "grid", gridTemplateColumns: "1fr" };

  return (
    <>
      <div id="space-container" className="space-container" style={style}>
        <div
          id="canvas-container"
          style={{ position: "relative", width: "100%", height: "80vh" }}
        >
          <div className="crosshair"></div>
          <canvas id="webgl" className="webgl space-canvas"></canvas>
          <LoadingScreen
            enterSpace={enterSpace}
            setSpayce={setSpayce}
            spayce={spayce}
          />
        </div>
        {isEditing && <EditPanel save={saveSpayce} spayce={spayce} />}
      </div>
      <SavedModal />
    </>
  );
};

export default Spayce;
