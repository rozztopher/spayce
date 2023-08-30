import React, { useContext, useEffect, useState } from "react";
import CTAbutton from "../CTAbutton";
import { UserContext } from "../../contexts/UserContext";
import Web3 from "web3";
import axios from "axios";

const url =
  "https://min-api.cryptocompare.com/data/histoday?fsym=" +
  "MATIC" +
  "&tsym=" +
  "USD";

const NavProfileOptions = (props) => {
  const [balance, setBalance] = useState(0);
  const [usd, setUSD] = useState(0);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getWalletBalance();
    if (balance > 0) {
      getUSD();
    }
  }, [balance]);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(user.wallet_address);
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

  const getWalletBalance = async () => {
    const testnet = "https://rpc-mumbai.maticvigil.com/";
    const walletAddress = user.wallet_address;

    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    var balance = await web3.eth.getBalance(walletAddress); //Will give value in.
    balance = web3.utils.fromWei(balance);
    setBalance(parseFloat(balance).toFixed(4));
  };

  const getUSD = () => {
    axios
      .get(url)
      .then((res) => {
        const data = res.data.Data;
        const rate = data[data.length - 1].open;
        const usd = rate * balance;
        setUSD(parseFloat(usd).toFixed(2));
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  const refreshFunds = () => {
    getWalletBalance().then(getUSD());
  };

  const logOut = () => {
    setUser({})
    props.setProfileOptionsOpen(false)
  }

  return (
    <div className="profile-info-container">
      <div className="flex-edge">
        <p className="ceil-90">
          {user.wallet_address ? truncateAddress(user.wallet_address) : ""}
        </p>
        <img
          className="pointer"
          src="/icons/clipboard.svg"
          alt="clipboard"
          onClick={copyAddressToClipboard}
        />
      </div>
      <div className="profile-info-subcontainer mt-20">
        <p className="fs-14 ube-70">Total balance</p>
        <p className="semi-bold fs-20">{balance} MATIC</p>
      </div>
      <div className="flex-edge mt-20 mb-20">
        <div>
          <p className="semi-bold m0">MATIC</p>
          <p className="ube-90 fs-12">Polygon</p>
        </div>
        <div>
          <p className="right semi-bold m0">{balance}</p>
          <p className="ube-90 fs-12">${usd} USD</p>
        </div>
      </div>
      <CTAbutton
        outline={true}
        text="Refresh funds"
        height="46px"
        fill={true}
        onClick={refreshFunds}
        fontSize="0.938rem"
      />
      <div className="mt-10"></div>
      <CTAbutton
        outline={true}
        text="Log out"
        height="46px"
        fill={true}
        onClick={logOut}
        fontSize="0.938rem"
      />
    </div>
  );
};

export default NavProfileOptions;
