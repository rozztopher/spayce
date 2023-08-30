import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import CTAbutton from "../CTAbutton";
import { UserContext } from "../../contexts/UserContext";
import ConnectWalletModal from "./ConnectWalletModal";
import NavProfileOptions from "./NavProfileOptions";
import NavWalletInfo from "./NavWalletInfo";
import SearchBox from "./SearchBox";
import gsap from "gsap";

const searchIconStyle = {
  position: "relative",
  marginLeft: "1.5rem",
  width: "1rem",
};

function Nav() {
  const screenType =
    window.innerWidth < 480
      ? "mobile"
      : window.innerWidth <= 1300
      ? "tablet"
      : "desktop";

  window.addEventListener("wheel", () => {
    if (window.scrollY >= 75) {
      gsap.set(".nav-bar-container", { background: "#050420" });
    } else {
      gsap.set(".nav-bar-container", { background: "initial" });
    }
  });

  const {
    connectMetamask,
    connectTrustWallet,
    user,
    isModalOpen,
    setIsModalOpen,
  } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeRoute, setActiveRoute] = useState("/");
  const [isProfileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const [isWalletInfoOpen, setWalletInfoOpen] = useState(false);

  const updateChip = () => {
    if (window.location.href.includes("community")) {
      setActiveRoute("community");
    } else if (window.location.href.includes("profile")) {
      setActiveRoute("profile");
    } else if (window.location.href.includes("shop")) {
      setActiveRoute("shop");
    } else if (window.location.href.includes("create")) {
      setActiveRoute("create");
    } else {
      setActiveRoute("home");
    }
  };

  const truncateAddress = (str) => {
    let newStr = "";
    for (let i = 0; i < 6; i++) {
      newStr += str.charAt(i);
    }
    newStr += "...";
    for (let i = str.length - 4; i < str.length; i++) {
      newStr += str.charAt(i);
    }
    return newStr;
  };

  const openMobileMenu = () => {
    gsap
      .timeline()
      .to(".mobile-menu-container", { duration: 0.5, left: "0vw" });
  };

  const closeMobileMenu = () => {
    gsap
      .timeline({ onComplete: () => updateChip() })
      .to(".mobile-menu-container", { duration: 0.5, left: "100vw" });
  };

  const handleNavOptions = (option, bool) => {
    if (option === "wallet") {
      setWalletInfoOpen(bool);
      if (bool) {
        setProfileOptionsOpen(false);
      } else {
        setProfileOptionsOpen(true);
      }
    } else if (option === "profile") {
      setProfileOptionsOpen(bool);
      if (bool) {
        setWalletInfoOpen(false);
      } else {
        setWalletInfoOpen(true);
      }
    }
  };

  const MobileMenu = () => {
    return (
      <div className="mobile-menu-container">
        <div className="mobile-menu-top">
          <div className="mobile-menu-header">
            <Link to="/">
              <img
                src="/icons/spayce-logo.svg"
                alt="spayce logo"
                id="nav-logo"
              ></img>
            </Link>
            <div className="mobile-nav-action">
              <img
                className="mobile-nav-action"
                src="/icons/close.svg"
                alt="close"
                onClick={closeMobileMenu}
              ></img>
            </div>
          </div>
          <div className="mobile-menu-links">
            <div
              className="mobile-menu-link"
              style={{ opacity: activeRoute === "home" ? 1 : 1 }}
            >
              <div className="mobile-menu-chip" />
              <Link to="/" onClick={closeMobileMenu}>
                <p className="mobile-menu-text">Home</p>
              </Link>
            </div>
            <div className="mobile-menu-link">
              <div
                className="mobile-menu-chip"
                style={{ opacity: activeRoute === "community" ? 1 : 0 }}
              />
              <Link to="/community" onClick={closeMobileMenu}>
                <p className="mobile-menu-text">Community</p>
              </Link>
            </div>
            <div className="mobile-menu-link">
              <div
                className="mobile-menu-chip"
                style={{ opacity: activeRoute === "shop" ? 1 : 0 }}
              />
              <Link to="/shop" onClick={closeMobileMenu}>
                <p className="mobile-menu-text">Shop</p>
              </Link>
            </div>
            <div className="mobile-menu-link">
              <div
                className="mobile-menu-chip"
                style={{ opacity: activeRoute === "profile" ? 1 : 0 }}
              />
              <Link to={"/profile/" + user.customURL} onClick={closeMobileMenu}>
                <p className="mobile-menu-text">My Profile</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="mobile-menu-bottom">
          <div className="horizontal-divider" />
          <div className="mobile-menu-socials mt-2 mb-2">
            <img src="/icons/twitter.svg" alt="twitter" id="twitter"></img>
            <img src="/icons/telegram.svg" alt="telegram" id="telegram"></img>
            <img src="/icons/discord.svg" alt="discord" id="discord"></img>
          </div>
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text={
              user.wallet_address
                ? truncateAddress(user.wallet_address)
                : "Connect Wallet"
            }
            height="40px"
            fill={true}
            onClick={() => {
              setIsModalOpen(true);
              closeMobileMenu();
            }}
          />
        </div>
      </div>
    );
  };

  const MobileNav = () => {
    return (
      <div className="nav-bar-container">
        <nav>
          <Link to="/">
            <img
              src="/icons/spayce-logo.svg"
              alt="spayce logo"
              id="nav-logo"
            ></img>
          </Link>
          <div className="mobile-nav-actions">
            <div className="mobile-nav-action">
              <img
                className="mobile-nav-action"
                src="/icons/magnifying.svg"
                alt="search"
              ></img>
            </div>
            <div className="mobile-nav-action ml-5">
              <img
                className="mobile-nav-action"
                src="/icons/hamburger.svg"
                alt="menu"
                onClick={openMobileMenu}
              ></img>
            </div>
          </div>
        </nav>
        <MobileMenu />
        {window.innerWidth > 480 && <NavProfileOptions />}
        {window.innerWidth > 480 && <NavWalletInfo />}
        <ConnectWalletModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          connectMetamask={connectMetamask}
          connectTrustWallet={connectTrustWallet}
        />
      </div>
    );
  };

  const hasSpayce = () => {
    if (user.spaces) {
      if (user.spaces.length > 0) {
        return true;
      }
    }
    return false;
  };

  if (screenType === "mobile") {
    return <MobileNav />;
  } else {
    return (
      <div className="nav-bar-container">
        {searchTerm && (
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        <nav>
          <Link to="/">
            <img
              src="/icons/spayce-logo.svg"
              alt="spayce logo"
              id="nav-logo"
            ></img>
          </Link>
          {screenType === "desktop" && (
            <SearchBar width="14vw" setSearchTerm={setSearchTerm} />
          )}
          <div className="nav-option">
            <Link to="/community">
              <li className="semi-bold fs-15">Community</li>
            </Link>
          </div>
          <div className="nav-option">
            <Link to="/shop">
              <li className="semi-bold fs-15">Shop</li>
            </Link>
          </div>
          <div className="nav-option">
            {user.wallet_address && (
              <Link to={"/profile/" + user.customURL}>
                <li className="semi-bold fs-15">My Profile</li>
              </Link>
            )}
            {!user.wallet_address && (
              <li
                onClick={() => setIsModalOpen(true)}
                className="semi-bold fs-15 pointer"
              >
                My Profile
              </li>
            )}
          </div>
          {screenType === "tablet" && (
            <img
              src="/icons/search.svg"
              alt="search"
              style={searchIconStyle}
            ></img>
          )}
          <Link to={hasSpayce() ? "/edit" : "/create"}>
            <CTAbutton
              background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
              outline={false}
              text={hasSpayce() ? "My Spayce" : "Create Spayce"}
              height="40px"
              fontSize="0.938rem"
            />
          </Link>
          {user.wallet_address && (
            <React.Fragment>
              <CTAbutton
                outline={true}
                text={truncateAddress(user.wallet_address) || "Wallet"}
                height="50px"
                fontSize="0.938rem"
                onClick={() => {
                  setWalletInfoOpen(!isWalletInfoOpen);
                  setProfileOptionsOpen(false);
                }}
              />
              <div
                className="nav-icon-container pointer"
                onClick={() => {
                  setProfileOptionsOpen(!isProfileOptionsOpen);
                  setWalletInfoOpen(false);
                }}
              >
                <img
                  src={user.pfp || "/images/profile.jpg"}
                  alt="profile"
                ></img>
              </div>
            </React.Fragment>
          )}
          {!user.wallet_address && (
            <CTAbutton
              height="50px"
              outline={true}
              text="Connect Wallet"
              onClick={() => setIsModalOpen(true)}
              fontSize="0.938rem"
            />
          )}
        </nav>
        {isProfileOptionsOpen && (
          <NavProfileOptions setProfileOptionsOpen={setProfileOptionsOpen} />
        )}
        {isWalletInfoOpen && (
          <NavWalletInfo setWalletInfoOpen={setWalletInfoOpen} />
        )}
        <ConnectWalletModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          connectMetamask={connectMetamask}
          connectTrustWallet={connectTrustWallet}
        />
      </div>
    );
  }
}

export default Nav;
