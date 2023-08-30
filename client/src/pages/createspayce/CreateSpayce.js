import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SmartContractContext } from "../../contexts/SmartContractContext";
import CTAbutton from "../../components/CTAbutton";
import { useHistory } from "react-router-dom";
import { addSpace, createSpace } from "../../utils/dbFunctions";
import SpayceFilter from "./SpayceFilter";
import { getArchitectures } from "../../utils/dbFunctions";
import { gatewayURL } from "../../clients/ipfsClient";
import {
  getRarityColor,
  getRarityAttribute,
  getCategoryAttribute,
  getTypeAttribute,
  getCollectionAttribute,
  getFrameAttribute,
} from "../../utils/Common";
import Web3 from "web3";
import ProductModal from "../shop/components/ProductModal";
import PurchasedModal from "../shop/components/PurchasedModal";

const CreateSpayce = () => {
  const [active, setActive] = useState("Purchased");
  const [architectures, setArchitectures] = useState([]);
  const [owned, setOwned] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clickedArchitecture, setClickedArchitecture] = useState({});
  const [isPurchasedModalOpen, setPurchasedModalOpen] = useState(false);

  const { user, setUser, setIsModalOpen, nfts } = useContext(UserContext);
  const { getPrice, getSold, getSupply, mint } =
    useContext(SmartContractContext);

  const history = useHistory();

  const featured = [9];
  const collaboration = [9];

  useEffect(() => {
    if (document.getElementById("app-container")) {
      document.getElementById("app-container").style.width = null;
    }
    getAllArchitectures();
    getUserOwnedArchitectures();
    window.addEventListener("MintComplete", () => {
      setShowModal(false);
      setPurchasedModalOpen(true);
    });
  }, []);

  const getAllArchitectures = async () => {
    const nfts = await getArchitectures();
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
      nfts[i].frames = getFrameAttribute(nfts[i].attributes);
    }
    setArchitectures(nfts);
  };

  const getUserOwnedArchitectures = () => {
    const ownedArchitectures = [];
    nfts.forEach((nft) => {
      if (
        nft.creator &&
        nft.creator.address === "0xdf06e7baa32acf0bc2022ca4905f3de252734ca7"
      ) {
        nft.traits.forEach((trait) => {
          if (trait.trait_type === "Type") {
            if (trait.value === "Architecture") {
              ownedArchitectures.push(parseInt(nft.token_id));
            }
          }
        });
      }
    });
    setOwned(ownedArchitectures);
  };

  const create = async (item) => {
    const spayce = {
      architecture: item,
      thumbnail: gatewayURL + item.image.split("ipfs://")[1],
      owner: user._id,
      creator: user._id,
      name: user.display.split("#")[0] + "'s Spayce",
      frames: {},
      interior: {},
    };
    const newSpace = await createSpace(spayce);
    await addSpace(newSpace._id, user);
    const newUser = Object.assign({}, user);
    newUser.spaces.push(newSpace._id);
    setUser(newUser);
    history.push(`/edit`);
  };

  const handleButtonClick = (architecture) => {
    if (user.wallet_address) {
      if (owned.includes(architecture.id)) {
        create(architecture);
      } else {
        setClickedArchitecture(architecture);
        setShowModal(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const showModalClicked = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const isFiltered = (architecture) => {
    if (active === "Purchased") {
      if (owned.includes(architecture.id)) return true;
    } else if (active === "Featured") {
      if (featured.includes(architecture.id)) return true;
    } else if (active === "Collaboration") {
      if (collaboration.includes(architecture.id)) return true;
    } else if (active === architecture.rarity) return true;
    else return false;
  };

  const Header = () => {
    return (
      <div className="create-header-container center">
        <h2 className="mt4 fs-45">Create your Spayce</h2>
        <p className="ceil fs-18 medium mt-37">
          Select 3D Spayce where you'll be able to craft experiences to show
          your NFTs.
        </p>
      </div>
    );
  };

  const SpayceGrid = () => {
    return (
      <div className="create-grid-container mt-40 mb-40">
        {architectures.map((architecture, i) => {
          if (isFiltered(architecture)) {
            return (
              <div
                className="create-chip-container glass"
                key={architecture.image_url + i}
              >
                <div className="create-chip-header">
                  <p
                    className="fs-14 ls-1o6 uppercase medium rarity-chip"
                    style={{ background: architecture.color }}
                  >
                    {architecture.rarity.toUpperCase()}
                  </p>
                  <p className="maximum-blue-purple-50 semi-bold">
                    {architecture.supply - architecture.sold}/
                    {architecture.supply}
                  </p>
                </div>
                <img
                  className="mt-16"
                  src={gatewayURL + architecture.image.split("ipfs://")[1]}
                  alt="spayce"
                  style={{ width: "100%", borderRadius: "10px" }}
                ></img>
                <p className="fs-20 semi-bold mt-20">{architecture.name}</p>
                <p className="maximum-blue-purple mt-5">
                  {architecture.frames} Frames
                </p>
                <div className="horizontal-divider mt-12" />
                <p className="mt-12 mb-16">
                  Price:{" "}
                  <span className="purple semi-bold">
                    {architecture.price} ETH
                  </span>
                </p>
                {user.wallet_address && (
                  <CTAbutton
                    background={
                      owned.includes(architecture.id)
                        ? "linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                        : ""
                    }
                    text={
                      owned.includes(architecture.id)
                        ? "Continue with the Spayce"
                        : "More details"
                    }
                    height="40px"
                    fill={true}
                    outline={owned.includes(architecture.id) ? false : true}
                    onClick={() => handleButtonClick(architecture)}
                    fontSize="0.938rem"
                  />
                )}
              </div>
            );
          }
        })}
        {showModal && (
          <ProductModal
            onCloseModal={showModalClicked}
            product={clickedArchitecture}
            user={user}
          />
        )}
        {isPurchasedModalOpen && (
          <PurchasedModal setPurchasedModalOpen={setPurchasedModalOpen} />
        )}
      </div>
    );
  };

  return (
    <div className="create-container mt-10 mb-10">
      <Header />
      <SpayceFilter active={active} setActive={setActive} />
      <SpayceGrid />
    </div>
  );
};

export default CreateSpayce;
