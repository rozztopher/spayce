import React, { useEffect, useState } from "react";
import EditPanel from "./EditPanel";
import gsap from "gsap";
import SpayceEntryModal from "../spayce/components/SpayceEntryModal";
import SavedModal from "./SavedModal";

const EditSpayce = () => {
  const [activeSpayce, setActiveSpayce] = useState({});
  const [entered, setEntered] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    gsap.set(".app-container", { width: "100vw", marginTop: "-16px" });
    gsap.set(".minimised-footer-container ", { display: "flex" });
    gsap.set(".footer-container ", { display: "none" });
    gsap.set(".social-container ", { display: "none" });
  }, []);

  const enterSpace = async () => {
    gsap.set(".entry-instructions", { display: "none" });
    gsap.set(".space-blur", { display: "none" });
    gsap.timeline().to(".loading-screen", { duration: 2, autoAlpha: 0 });
    gsap.set(".loading-screen", { delay: 2, display: "none" });
    setEntered(true);
  };

  return (
    <div className="edit-spayce-container">
      <div className="edit-spayce-canvas" id="canvas-container">
        {entered && <div className="crosshair"></div>}
        <canvas id="webgl" className="webgl space-canvas"></canvas>
        {!entered && (
          <img
            src="/images/loop2.gif"
            style={{ width: "100%", position: "absolute", top: 0, left: 0 }}
          />
        )}
        {activeSpayce && !entered && (
          <SpayceEntryModal
            enterSpace={enterSpace}
            setSpayce={setActiveSpayce}
            spayce={activeSpayce}
          />
        )}
        <SavedModal spayce={activeSpayce}/>
      </div>
      <EditPanel
        setSpayce={setActiveSpayce}
        setEntered={setEntered}
        setSaved={setSaved}
      />
    </div>
  );
};

export default EditSpayce;
