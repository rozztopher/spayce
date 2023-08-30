import React, { useContext } from "react";
import CTAbutton from "../../../components/CTAbutton";
import { networks } from "../../../utils/Constants";
import { gatewayURL } from "../../../clients/ipfsClient";
import { SmartContractContext } from "../../../contexts/SmartContractContext";
import { UserContext } from "../../../contexts/UserContext";

const ProductModal = (props) => {

  const { user } = useContext(UserContext);
  const { mint, getPrice } = useContext(SmartContractContext);

  const closeCustomModal = (e) => {
    props.onCloseModal(e);
  };

  const handleMint = async (product) => {
    const cost = await getPrice(product.id)
    mint(product.id, user.wallet_address, cost)
  };

  const product = props.product;

  return (
    <div className="shop-modal-container">
      <div className="close">
        <div
          className="close-modal pointer"
          style={{ zIndex: "100" }}
          onClick={closeCustomModal}
        >
          <img src="/icons/close.svg" alt="close"></img>
        </div>
      </div>
      <div className="modal-grid">
        <div className="modal-instruction">
          <img
            src={gatewayURL + product.image.split("ipfs://")[1]}
            alt="product"
          ></img>
        </div>
        <div className="modal-info">
          <h3 className="fs-28">{product.name}</h3>
          <p
            className="ceil fs-15 mt-12"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            Rarity: &nbsp;{" "}
            <span
              className="product-chip fs-14 ls-1o6 uppercase"
              style={{
                background: product.color,
              }}
            >
              {product.rarity}
            </span>
          </p>
          <div className="modal-divider mt-17"></div>
          <p className="fs-15 mt-24">
            <span className="ceil fs-15">Drop Collection: &nbsp;</span>{" "}
            {product.collection}
          </p>
          <p className="fs-15 mt-14">
            <span className="ceil fs-15">Category: &nbsp;</span>{" "}
            {product.category}
          </p>
          <p className="fs-15 mt-14">
            <span className="ceil fs-15">Type: &nbsp;</span> {product.type}
          </p>
          <p className="ceil fs-15 lh-33 mt-16">{product.description}</p>
        </div>
      </div>
      <div className="mt-60" />
      <div className="modal-footer">
        <div style={{ display: "flex" }}>
          <p className="fs-15">
            <span className="ceil fs-1">Quantity available: &nbsp;</span>{" "}
            {product.supply - product.sold}
          </p>
          <div className="vertical-divider-small ml-25"></div>
          <p className="fs-15 ceil ml-25">
            Price:{" "}
            <span className="purple semi-bold fs-15">{product.price} ETH</span>
          </p>
        </div>
        <CTAbutton
          background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
          outline={false}
          text={"Pay with MATIC"}
          height="40px"
          fill={false}
          wide={true}
          onClick={() => handleMint(product)}
          fontSize="0.938rem"
        />
      </div>
    </div>
  );
};

export default ProductModal;
