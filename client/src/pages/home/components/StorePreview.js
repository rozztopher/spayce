import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CTAbutton from "../../../components/CTAbutton";
import { UserContext } from "../../../contexts/UserContext";
import { SmartContractContext } from "../../../contexts/SmartContractContext";
import { getAlNFTs } from "../../../utils/dbFunctions";
import { gatewayURL } from "../../../clients/ipfsClient";
import {
  getCategoryAttribute,
  getCollectionAttribute,
  getRarityColor,
  getRarityAttribute,
  getTypeAttribute
} from "../../../utils/Common";
import Web3 from "web3";

const StorePreview = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(UserContext);
  const { getSold, getSupply, getPrice } = useContext(SmartContractContext);

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, []);

  const productsToShow =
    window.innerWidth <= 480 ? 5 : window.innerWidth <= 1300 ? 3 : 4;
  const previewProducts = [];
  if (products.length > 0) {
    for (let i = 0; i < productsToShow; i++) {
      previewProducts.push(products[i]);
    }
  }

  const getProducts = async () => {
    const nfts = await getAlNFTs();
    for (let i = 0; i < nfts.length; i++) {
      const price = await getPrice(nfts[i].id);
      const supply = await getSupply(nfts[i].id);
      const sold = await getSold(nfts[i].id);
      nfts[i].price = parseFloat(Web3.utils.fromWei(price));
      nfts[i].sold = parseInt(sold);
      nfts[i].supply = parseInt(supply);
      nfts[i].color = getRarityColor(nfts[i].attributes);
      nfts[i].rarity = getRarityAttribute(nfts[i].attributes);
      nfts[i].category = getCategoryAttribute(nfts[i].attributes);
      nfts[i].type = getTypeAttribute(nfts[i].attributes);
      nfts[i].collection = getCollectionAttribute(nfts[i].attributes);
    }
    setProducts(nfts);
  };

  const getMoreDetails = (product) => {
    setTimeout(() => {
      const event = new CustomEvent("HomeProductClick", { detail: product });
      window.dispatchEvent(event);
    }, 1000);
  };

  const MobileStorePreview = () => {
    return (
      <div className="store-preview-container mt-15">
        <h2>The Latest Drop For Customisation</h2>
        <div className="store-preview-product-carousel mb-4">
          {previewProducts.map((product) => {
            return (
              <div className="store-preview-product-chip glass" key={product._id}>
                <div className="create-chip-header">
                  <p
                    className="fs-14 rarity-chip ls-1o6 uppercase medium"
                    style={{ background: product.color }}
                  >
                    {product.rarity}
                  </p>
                  <p className="maximum-blue-purple-50">{`${product.supply-product.sold}/${product.supply}`}</p>
                </div>
                <img
                  className="mt-1"
                  src={gatewayURL + product.image.split("ipfs://")[1]}
                  alt="product"
                  style={{ width: "100%", borderRadius: "10px" }}
                ></img>
                <p className="fs-17 lh-26 mt-2">{product.name}</p>
                <p className="mt-1 maximum-blue-purple">{product.category}</p>
                <div className="horizontal-divider-light"></div>
                <p className="mt-1">
                  Price: <span className="purple">{product.price} ETH</span>
                </p>
                <Link to="/shop">
                  <CTAbutton
                    outline={true}
                    text="More details"
                    height="40px"
                    fill={true}
                    fontSize="0.938rem"
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <Link to="/home" style={{ width: "100%" }}>
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text="View all Products"
            height="40px"
            fill={true}
            fontSize="0.938rem"
          />
        </Link>
      </div>
    );
  };

  if (window.innerWidth <= 480 && products.length > 0) {
    return <MobileStorePreview />;
  } else if (products.length > 0) {
    return (
      <div className="store-preview-container mt-100">
        <h2>The Latest Drop For Customisation</h2>
        <div className="store-preview-product-grid mt-60 mb-40">
          {previewProducts.map((product) => {
            return (
              <div
                className="store-preview-product-chip glass"
                key={product._id}
              >
                <div className="create-chip-header">
                  <p
                    className="fs-14 rarity-chip ls-1o6 uppercase"
                    style={{ background: product.color }}
                  >
                    {product.rarity}
                  </p>
                  <p className="ceil-60">{`${product.supply - product.sold}/${
                    product.supply
                  }`}</p>
                </div>
                <img
                  className="mt-16"
                  src={gatewayURL + product.image.split("ipfs://")[1]}
                  alt="product"
                  style={{ width: "100%", borderRadius: "10px" }}
                ></img>
                <p className="fs-17 lh-26 mt-18 mb-0">{product.name}</p>
                <p className="mt-3 ceil-60">{product.category}</p>
                <div className="horizontal-divider-light mt-12"></div>
                <p className="mt-12 mb-16">
                  Price: <span className="purple">{product.price} ETH</span>
                </p>
                <Link to="/shop">
                  <CTAbutton
                    onClick={() => getMoreDetails(product)}
                    outline={true}
                    text="More details"
                    height="40px"
                    fill={true}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <Link to="/shop">
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text="View all Products"
            height="40px"
            wide={true}
          />
        </Link>
      </div>
    );
  } else return <></>;
};

export default StorePreview;
