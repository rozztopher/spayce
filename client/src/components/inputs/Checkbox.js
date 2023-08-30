import React, { useState } from "react";

const Checkbox = () => {
  const [active, setActive] = useState(false);
  return (
    <div
      className="checkbox-container pointer"
      onClick={() => setActive(!active)}
      style={{ background: active ? "#BA04FC" : "transparent" }}
    >
      {active && (
        <img className="checkbox-tick" src="/icons/tick.svg" alt="tick" />
      )}
    </div>
  );
};

export default Checkbox;
