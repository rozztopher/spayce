import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNFTBySearch,
  getSpaceBySearch,
  getUserById,
  getUserBySearch,
} from "../../utils/dbFunctions";

const itemStyle = {
  width: "100%",
};

const userStyle = {
  width: "100%",
  borderRadius: "100%",
};

const spaceStyle = {
  width: "100%",
  borderRadius: "3px",
};

function SearchBox(props) {
  const [spaceResults, setSpaceResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    if (props.searchTerm) {
      getSpaceResults(props.searchTerm);
      getItemResults(props.searchTerm);
      getUserResults(props.searchTerm);
    }
  }, [props.searchTerm]);

  const getSpaceResults = async (term) => {
    const spaces = await getSpaceBySearch(term);
    for (let i = 0; i < spaces.length; i++) {
      const user = await getUserById(spaces[i].owner);
      spaces[i].ownerName = user.display;
    }
    setSpaceResults(spaces);
  };

  const getItemResults = async (term) => {
    const items = await getNFTBySearch(term);
    setItemResults(items);
  };

  const getUserResults = async (term) => {
    const users = await getUserBySearch(term);
    setUserResults(users);
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

  const refreshSearch = () => {
    props.setSearchTerm("");
    document.getElementById("search-bar").value = "";
  };

  const getMoreDetails = (product) => {
    setTimeout(() => {
      const event = new CustomEvent("HomeProductClick", { detail: product });
      window.dispatchEvent(event);
    }, 1000);
  };

  const handleSpaceClick = () => {
    refreshSearch();
  };

  const handleItemClick = (item) => {
    refreshSearch();
    getMoreDetails(item);
  };

  return (
    <div className="searchbox-container">
      <p className="fs-14 medium">Spayces</p>
      {spaceResults.map((space) => {
        return (
          <Link className="mt-10" to={"/myspayce?spayce=" + space._id}>
            <div
              className="search-block"
              key={space._id}
              onClick={handleSpaceClick}
            >
              <img src={space.thumbnail} alt="spayce" style={spaceStyle} />
              <div>
                <p className="fs-15 semi-bold">{space.name}</p>
                <p className="fs-13 maximum-blue-purple">{space.ownerName}</p>
              </div>
            </div>
          </Link>
        );
      })}
      <p className="fs-14 medium mt-20">Products</p>
      {itemResults.map((item) => {
        return (
          <Link className="mt-10" to="/shop">
            <div
              className="search-block"
              key={item._id}
              onClick={() => handleItemClick(item)}
            >
              <img
                src={"https://ipfs.moralis.io:2053/ipfs/" + item.thumb}
                alt="spayce"
                style={itemStyle}
              />
              <div>
                <p className="fs-15 semi-bold">{item.name}</p>
                <p className="fs-13 maximum-blue-purple">{item.category}</p>
              </div>
            </div>
          </Link>
        );
      })}
      <p className="fs-14 medium mt-20">Users</p>
      {userResults.map((user) => {
        return (
          <Link className="mt-10" to={"/profile/" + user.customURL}>
            <div
              className="search-block"
              key={user._id}
              onClick={handleSpaceClick}
            >
              <img src={user.pfp} alt="spayce" style={userStyle} />
              <div>
                <p className="fs-15 semi-bold">{user.display}</p>
                <p className="fs-13 maximum-blue-purple">
                  {truncateAddress(user.wallet_address)}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SearchBox;
