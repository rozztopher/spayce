import React, { Component } from "react";
import CTAbutton from "../../../components/CTAbutton";
import { Link } from "react-router-dom";

const gateway = "https://ipfs.moralis.io:2053/ipfs/";

const imageStyle = {
  borderRadius: "20px",
  marginTop: "1.25rem",
};

const modalStyle = {
  width: "33rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

class PurchasedModal extends Component {
  closeModal = () => {
    this.props.setPurchasedModalOpen(false);
  };

  render() {
    return (
      <div className="shop-modal-container" style={modalStyle}>
        <div className="close">
          <div
            className="close-modal pointer"
            style={{ zIndex: "100" }}
            onClick={this.closeModal}
          >
            <img src="/icons/close.svg" alt="close"></img>
          </div>
        </div>
        <h3>Thank you for your purchase</h3>
        <img src="/images/dog.gif" alt="smiling dog" style={imageStyle} />
        <p className="center mt-44">
          The product has been successfully purchased and is in your MetaMask
          account. You can use it to Design your Spayce.
        </p>
        <div className="flex-edge mt-30">
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text={"Continue Shopping"}
            height="40px"
            fill={false}
            wide={true}
            fontSize="0.938rem"
            onClick={() => this.props.setPurchasedModalOpen(false)}
          />
          <Link to="/edit">
            <CTAbutton
              background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
              outline={false}
              text={"Edit Spayce"}
              height="40px"
              fill={false}
              wide={true}
              fontSize="0.938rem"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default PurchasedModal;
