import React, { useEffect, useState } from "react";
import SpayceEntryModal from "./SpayceEntryModal";
import { getSpaceById } from "../../../utils/dbFunctions";

const LoadingScreen = (props) => {
  return (
    <div className="loading-screen-container">
      <div className="space-blur" />
      <div
        className="loading-screen"
        style={{ backgroundImage: `url(${props.spayce.thumbnail})` }}
      />
      <div className="loading-screen-content">
        <h2 className="fs-39">{props.spayce.name}</h2>
        <div className="loading-bar mt-30" />
        <p className="fs-14 uppercase ls-4o8 mt-15">Loading</p>
      </div>
      {props.spayce.owner && (
        <SpayceEntryModal
          enterSpace={props.enterSpace}
          setSpayce={props.setSpace}
          spayce={props.spayce}
        />
      )}
    </div>
  );
};

export default LoadingScreen;
