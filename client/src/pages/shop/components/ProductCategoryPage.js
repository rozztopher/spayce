import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { SmartContractContext } from "../../../contexts/SmartContractContext";
import CTAbutton from "../../../components/CTAbutton";
import ProductModal from "./ProductModal";
import PurchasedModal from "./PurchasedModal";
import { getNFTsByCategory, getAlNFTs } from "../../../utils/dbFunctions";
import {
  getCategoryAttribute,
  getCollectionAttribute,
  getRarityAttribute,
  getRarityColor,
  getTypeAttribute,
} from "../../../utils/Common";
import { gatewayURL } from "../../../clients/ipfsClient";
import Web3 from "web3";
import RarityFilter from "./RarityFilter";
import FilterMenu from "./FilerMenu";
import SearchBar from "../../../components/SearchBar";
import Pagination from "./Pagination";

const ProductCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const [isPurchasedModalOpen, setPurchasedModalOpen] = useState(false);
  const [activeRarity, setActiveRarity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [collectionFilters, setCollectionFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { category } = useParams();

  const { erc1155, user, buyCrypto } = useContext(UserContext);
  const { getSold, getSupply, getPrice } = useContext(SmartContractContext);

  const MAXITEMS = 12;

  useEffect(() => {
    if (category) {
      getProducts();
    }
  }, []);

  const handleProductClick = (prod) => {
    showModalClicked();
    setActiveProduct(prod);
  };

  const getProducts = async () => {
    const nfts =
      category === "all"
        ? await getAlNFTs()
        : await getNFTsByCategory(category);
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

  const showModalClicked = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleRarityFilter = (rarity) => {
    if (rarity === activeRarity) {
      setActiveRarity("");
    } else {
      setActiveRarity(rarity);
    }
  };

  const isFiltered = (product) => {
    if (activeRarity === "" || product.rarity === activeRarity) {
      return true
    }
    return false;
  };

  const filteredList = [];
  products.forEach((product) => {
    if (isFiltered(product)) {
      filteredList.push(product);
    }
  });

  const start = page * MAXITEMS - MAXITEMS;
  const end = page * MAXITEMS;
  const limit = Math.ceil(filteredList.length / MAXITEMS);
  const paginatedProducts = filteredList.slice(start, end);
  const header = category === "all" ? "All Products" : category

  return (
    <div className="category-page-container">
      <h2 className="center">{header}</h2>
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
            setFilterMenuOpen={setFilterMenuOpen}
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
      <div className="product-grid mb-40 mt-30">
        {products.length > 0 &&
          paginatedProducts.map((product, i) => {
            return (
              <div className="product-card glass" key={product._id + i}>
                <div className="create-chip-header">
                  <p
                    className="fs-14 medium rarity-chip ls-1o6"
                    style={{ background: product.color }}
                  >
                    {product.rarity}
                  </p>
                  <p className="ceil-60">
                    {product.supply - product.sold}/{product.supply}
                  </p>
                </div>
                <img
                  src={gatewayURL + product.image.split("ipfs://")[1]}
                  alt="product"
                />
                <div className="product-stats">
                  <p className="lotion">{product.name}</p>
                  <p className="maximum-blue-purple-75">{product.category}</p>
                </div>
                <div className="horizontal-divider mt-1o5"></div>

                <p>
                  Price:{" "}
                  <span className="purple semi-bold">{product.price} ETH</span>
                </p>
                <CTAbutton
                  outline={true}
                  text="More details"
                  height="40px"
                  fill={true}
                  onClick={() => handleProductClick(product)}
                />
              </div>
            );
          })}
      </div>
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
      <Pagination page={page} setPage={setPage} limit={limit} />
    </div>
  );
};

export default ProductCategoryPage;
