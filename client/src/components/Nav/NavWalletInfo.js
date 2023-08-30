import React, { useContext } from "react";
import CTAbutton from "../CTAbutton";
import { UserContext } from "../../contexts/UserContext";

const NavWalletInfo = (props) => {
  const { setUser, setIsModalOpen } = useContext(UserContext);

  const logOut = () => {
    setUser({})
    props.setWalletInfoOpen(false)
  }

  const connectWallet = () => {
      props.setWalletInfoOpen(false)
      setIsModalOpen(true)
  }

  return (
    <div className="profile-info-container">
      <CTAbutton
        outline={true}
        text="Connect another wallet"
        height="46px"
        fill={true}
        onClick={connectWallet}
      />
      <div className="mt-10"></div>
      <CTAbutton
        outline={true}
        text="Log out"
        height="46px"
        fill={true}
        onClick={logOut}
      />
    </div>
  );
};

export default NavWalletInfo;
