import React, { Component } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { getNFTByToken, login } from "../utils/dbFunctions";
import * as testNFTs from "../utils/nfts.json"
import { getAllNFTs } from "../services/ipfsService";

const UserContext = React.createContext();

/**
 * The most important and complex file within the app
 * hence all of the functions are commented describing
 * their utility.
 *
 * This is the context that holds all information about
 * a logged in user and also stores the functions and
 * contracts from web3
 */
class UserProvider extends Component {
  state = {
    user: {},
    nfts: [],
    rarities: [],
    visited: [],
    isModalOpen: false,
    isEditing: false,
  };

  /**
   * sets a logged in user to the app context
   * @param {*} newUser the user object to set
   */
  setUser = (newUser) => {
    this.setState({ user: newUser });
  };

  /**
   * sets wether the modal for connecting a wallet should be open
   * @param {*} bool true or false
   */
  setIsModalOpen = (bool) => {
    this.setState({ isModalOpen: bool });
  };

  /**
   * sets wether the 3D spayce should open in editing or view mode
   * @param {*} bool true or false
   */
  setIsEditing = (bool) => {
    this.setState({ isEditing: bool });
  };

  /**
   * This function keeps a history of spayces that has
   * been visited by the user during the session. The
   * purpose of this is to make sure the user doesn't
   * spam the refresh button to boost the view count
   * @param {*} id a list of spayces visited by the user
   */
  pushVisited = (id) => {
    const newVisited = Object.assign([], this.visited);
    if (!newVisited.includes(id)) {
      newVisited.push(id);
      this.setState({ visited: newVisited });
    }
  };

  /**
   * Gets all nfts owned by a user on all supported chains
   * using the Moralis API
   * @param {*} account wallet address
   * @returns a list of user owned nft objects
   */
  getAllNFTs = async (account) => {
    const nfts = await getAllNFTs(account)
    return nfts
  };

  /**
   * Connects the metamask wallet
   */
  connectMetamask = async () => {
    const provider = window.ethereum;
    if (typeof provider !== undefined) {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          this.createUser(accounts[0]);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      window.ethereum.on("accountsChanged", (accounts) => {
        this.createUser(accounts[0]);
      });
    } else {
      alert("Please install wallet");
    }
  };

  /**
   * Connects TrustWallet
   * (can be changed to connect any wallet 
   * that supports WalletConnect)
   */
  connectTrustWallet = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      this.createUser(accounts[0]);
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      this.createUser(accounts[0]);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
    });
  };

  /**
   * Creates a new user and adds it to the database.
   * Before doing so it gathers all user NFTs and
   * formats the spayce objects in a way that makes
   * it easy to access throughout the app.
   * Could be made shorter.
   * @param {*} address wallet address
   */
  createUser = async (address) => {
    const newUser = {
      display: this.generateUsername(),
      user_id: address,
      wallet_address: address,
      pfp: "/images/default-pfp.jpg",
      customURL: address
    };

    const data = await login(newUser)
    const nfts = await this.getAllNFTs(data.wallet_address)
    sessionStorage.setItem("jwt", data.token);

    this.setState({ user: data });
    this.setState({ nfts: nfts });
  };

  /**
   * Generates a username based on the star signs
   * @returns A unique username
   */
  generateUsername() {
    const signs = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ];
    var sign =
      Number(
        new Intl.DateTimeFormat("fr-TN-u-ca-persian", {
          month: "numeric",
        }).format(Date.now())
      ) - 1;
    return signs[sign] + "Spaycer";
  }

  /**
   * Logs a user out
   */
  signOut = () => {
    this.setState({});
  };

  /**
   * Provides the variables and functions that can be
   * used in any component throughout the app
   * @returns the STATE
   */
  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          nfts: this.state.nfts,
          isModalOpen: this.state.isModalOpen,
          isEditing: this.state.isEditing,
          visited: this.state.visited,
          setUser: this.setUser,
          connectMetamask: this.connectMetamask,
          connectTrustWallet: this.connectTrustWallet,
          signOut: this.signOut,
          setIsModalOpen: this.setIsModalOpen,
          setIsEditing: this.setIsEditing,
          pushVisited: this.pushVisited,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserConsumer, UserContext };

export default UserProvider;
