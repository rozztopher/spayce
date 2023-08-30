import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CTAbutton from "../../../components/CTAbutton";
import ProductModal from "./ProductModal";
import SearchBar from "../../../components/SearchBar";
import { UserContext } from "../../../contexts/UserContext";
import { SmartContractContext } from "../../../contexts/SmartContractContext";
import { gatewayURL } from "../../../clients/ipfsClient";
import PurchasedModal from "./PurchasedModal";
import { getAlNFTs } from "../../../utils/dbFunctions";
import {
  compare,
  getCategoryAttribute,
  getCollectionAttribute,
  getRarityAttribute,
  getRarityColor,
  getTypeAttribute,
} from "../../../utils/Common";
import Web3 from "web3";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilerMenu";
import RarityFilter from "./RarityFilter";

const Products = () => {
  const { erc1155, user, buyCrypto } = useContext(UserContext);
  const { getSold, getSupply, getPrice } = useContext(SmartContractContext);

  const [cardsToShow, setCardsToShow] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const [activeRarity, setActiveRarity] = useState("");
  const [isSortMenuOpen, setSortMenuOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Newest");
  const [products, setProducts] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [collectionFilters, setCollectionFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [isPurchasedModalOpen, setPurchasedModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    } else {
      sortProducts();
    }
    window.addEventListener("HomeProductClick", (e) => {
      setActiveProduct(e.detail);
      setShowModal(true);
    });
    window.addEventListener("MintComplete", () => {
      setShowModal(false)
      setPurchasedModalOpen(true);
    })
  }, [activeSort]);

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

  const sortProducts = () => {
    const newProducts = Object.assign([], products);
    if (activeSort === "Newest") {
      newProducts.sort((a, b) => compare(a, b, "asc"));
    } else if (activeSort === "Most Expensive") {
      newProducts.sort((a, b) => b.price - a.price);
    } else if (activeSort === "Least Expensive") {
      newProducts.sort((a, b) => a.price - b.price);
    } else if (activeSort === "Most Expensive") {
      newProducts.sort((a, b) => b.sold - a.sold);
    } else if (activeSort === "Oldest") {
      newProducts.sort((a, b) => compare(a, b, "desc"));
    }
    setProducts(newProducts);
  };

  const handleCardsToShow = () => {
    if (products) {
      if (cardsToShow <= 8) {
        if (products.length.length < 100) {
          setCardsToShow(products.length);
        } else {
          setCardsToShow(100);
        }
      } else {
        setCardsToShow(8);
      }
    }
  };

  const showModalClicked = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleProductClick = (prod) => {
    showModalClicked();
    setActiveProduct(prod);
  };

  const handleRarityFilter = (rarity) => {
    if (rarity === activeRarity) {
      setActiveRarity("");
    } else {
      setActiveRarity(rarity);
    }
  };

  const isTagIncluded = (tags) => {
    let included = false;
    tagFilters.forEach((tag) => {
      if (tags.includes(tag)) {
        included = true;
      }
    });
    return included;
  };

  const isFiltered = (product) => {
    if (activeRarity === "" || product.rarity === activeRarity) {
      if (
        categoryFilters.length === 0 ||
        categoryFilters.includes(product.category)
      ) {
        if (
          collectionFilters.length === 0 ||
          collectionFilters.includes(product.edition)
        ) {
          if (typeFilters.length === 0 || typeFilters.includes(product.type)) {
            if (tagFilters.length === 0 || isTagIncluded(product.tags)) {
              if (
                searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  const cards = products ? products.slice(0, cardsToShow) : [];

  const ctaText = cardsToShow <= 8 ? "Show More" : "Show Less";
  const ctaStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div className="product-container mt-100 mb-40">
      <div className="flex-center">
        <div
          className="flex-center"
          onClick={() => setSortMenuOpen(!isSortMenuOpen)}
        >
          <p className="purple heading2 m0 pointer fs-35">{activeSort}</p>
          <img className="ml-12 pointer" src="/icons/chevron-down-purple.svg" />
        </div>
        <h2 className="m0 ml-21 fs-35">Products</h2>
      </div>
      <div className="product-control-panel mt-30">
        <div
          className="flex-edge border pointer"
          onClick={() => setFilterMenuOpen(!isFilterMenuOpen)}
          style={{ padding: "0.75rem 1rem" }}
        >
          <p>Filter</p>
          <img
            className="ml-1 mr-2 pointer"
            src={"/icons/chevron-down.svg"}
            alt="chevron"
          />
        </div>
        {isFilterMenuOpen && (
          <FilterMenu
            categoryFilters={categoryFilters}
            setCategoryFilters={setCategoryFilters}
            collectionFilters={collectionFilters}
            setCollectionFilters={setCollectionFilters}
            typeFilters={typeFilters}
            setTypeFilters={setTypeFilters}
            tagFilters={tagFilters}
            setTagFilters={setTagFilters}
          />
        )}
        <div className="vertical-divider-small" />
        <div className="rarity-filters">
          <RarityFilter
            rarity="Cosmic"
            set={handleRarityFilter}
            active={activeRarity}
          />
          <RarityFilter
            rarity="Astronomic"
            set={handleRarityFilter}
            active={activeRarity}
          />
          <RarityFilter
            rarity="Galactic"
            set={handleRarityFilter}
            active={activeRarity}
          />
          <RarityFilter
            rarity="Void"
            set={handleRarityFilter}
            active={activeRarity}
          />
        </div>
        <div className="vertical-divider-small" />
        {window.innerWidth > 1300 && (
          <SearchBar width="12.5rem" setSearchTerm={(e) => setSearchTerm(e)} />
        )}
        {window.innerWidth <= 1300 && (
          <img
            src="/icons/search.svg"
            alt="search"
            style={{
              position: "relative",
              marginLeft: "1.5rem",
              width: "1rem",
            }}
          ></img>
        )}
      </div>
      <div className="horizontal-divider mt-30" />
      {showModal && (
        <ProductModal
          onCloseModal={showModalClicked}
          product={activeProduct}
          erc1155={erc1155}
          user={user}
          buyCrypto={buyCrypto}
          setPurchasedModalOpen={setPurchasedModalOpen}
        />
      )}
      {isPurchasedModalOpen && (
        <PurchasedModal setPurchasedModalOpen={setPurchasedModalOpen} />
      )}
      {isSortMenuOpen && (
        <SortMenu
          setSortMenuOpen={setSortMenuOpen}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
      )}
      <div className="product-grid mt-30">
        {cards.map((product, i) => {
          if (isFiltered(product)) {
            return (
              <div className="product-card glass" key={product._id}>
                <div className="create-chip-header">
                  <p
                    className="fs-14 medium rarity-chip ls-1o6 uppercase"
                    style={{ background: product.color }}
                  >
                    {product.rarity}
                  </p>
                  <p className="maximum-blue-purple-50 semi-bold">
                    {product.supply - product.sold}/{product.supply}
                  </p>
                </div>
                <img
                  className="mt-16"
                  src={gatewayURL + product.image.split("ipfs://")[1]}
                  alt="product"
                />
                <div className="product-stats mt-16">
                  <p className="semi-bold lh-26 fs-17">{product.name}</p>
                  <p className="maximum-blue-purple mt-3">{product.category}</p>
                </div>
                <div className="horizontal-divider mt-10"></div>
                <p className="mt-10 mb-16">
                  Price:{" "}
                  <span className="purple semi-bold">{product.price} ETH</span>
                </p>
                <CTAbutton
                  outline={true}
                  text="More details"
                  height="40px"
                  fill={true}
                  onClick={() => handleProductClick(product)}
                  fontSize="0.938rem"
                />
              </div>
            );
          }
        })}
      </div>
      <div className="mt-40" style={ctaStyle}>
        <Link to={"shop/all"}>
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text={ctaText}
            height="40px"
            fill={false}
            // onClick={handleCardsToShow}
            wide={true}
            fontSize="0.938rem"
          />
        </Link>
      </div>
    </div>
  );
};

export default Products;
