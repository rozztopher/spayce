import React, { Component } from "react";
import * as erc1155ABI from "../utils/erc1155ABI.json";
import Web3 from "web3";

const SmartContractContext = React.createContext();

class SmartContractProvider extends Component {
  state = {
    erc1155: {},
  };

  /**
   * Sets the contract object so that contract
   * functions can be used throughout the app
   * @param {*} web3 A web3 provider
   */
  initialiseERC1155Contract = () => {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const erc1155Contract = new web3.eth.Contract(
      erc1155ABI.default,
      "0xBCbd1E7D727094E0b2a75Cf0bB4e7B1732950448"
    );
    this.setState({ erc1155: erc1155Contract });
  };

  createToken = (id, supply, price, start, end) => {
    const wei = Web3.utils.toBN(price)
    this.state.erc1155.methods
      .createToken(id, supply, wei, start, end)
      .send({ from: "0x09a532e9f2A1ECfb04dA0D0F99cBE937aEeB251b" }, (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: " + res);
      });
  };

  getPrice = async (tokenId) => {
    const price = await this.state.erc1155.methods.getTokenPrice(tokenId).call();
    return price
  }

  getSold = async (tokenId) => {
    const sold = await this.state.erc1155.methods.totalSupply(tokenId).call();
    return sold
  };

  getSupply = async (tokenId) => {
    const supply = await this.state.erc1155.methods.getTokenMaxSupply(tokenId).call();
    return supply
  };

  mint = (tokenId, address, cost) => {
    this.state.erc1155.methods
      .mint(tokenId, 1)
      .send({
        from: address,
        value: cost,
      })
      .then((res) => {
        const event = new Event("MintComplete", {detail: res})
        window.dispatchEvent(event)
      });
  };

  mintBatch = (address, tokenId, amount) => {};

  /**
   * Provides the variables and functions that can be
   * used in any component throughout the app
   * @returns the STATE
   */
  render() {
    return (
      <SmartContractContext.Provider
        value={{
          initialiseERC1155Contract: this.initialiseERC1155Contract,
          createToken: this.createToken,
          getSold: this.getSold,
          getSupply: this.getSupply,
          getPrice: this.getPrice,
          mint: this.mint,
          mintBatch: this.mintBatch,
        }}
      >
        {this.props.children}
      </SmartContractContext.Provider>
    );
  }
}

const SmartContractConsumer = SmartContractContext.Consumer;

export { SmartContractConsumer, SmartContractContext };

export default SmartContractProvider;
