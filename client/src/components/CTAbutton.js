import React from "react";

const CTAbutton = (props) => {
  const buttonStyle = {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: props.wide ? "5px 45px" : "5px 20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: props.fill ? "0px" : props.wide ? "45px" : "20px",
    paddingRight: props.fill ? "0px" : props.wide ? "45px" : "20px",
    position: "relative",
    background: props.outline ? "initial" : props.background,
    borderRadius: "40px",
    border: props.outline ? "1px solid rgba(176, 170, 221, 0.2)" : "none",
    boxSizing: props.outline ? "border-box" : "initial",
    width: props.fill ? "100%" : props.width ? props.width : "initial",
    height: props.height,
    color: props.color ? props.color : "#FFFFFF",
    disabled: props.disabled ? true : false,
    fontSize: props.fontSize ? props.fontSize : "0.983rem",
    pointerEvents: "all",
  };

  const iconStyle = {
    marginLeft: "5%",
    width: "2vw",
  };

  return (
    <div
      id={props.id || Math.random()}
      className="cta-button fs-15 semi-bold pointer"
      style={buttonStyle}
      onClick={props.onClick}
    >
      {props.text}
      {props.icon && (
        <img src={props.icon} alt={props.alt} style={iconStyle}></img>
      )}
    </div>
  );
};

export default CTAbutton;
