import React, { useEffect, useState } from "react";
import FAB from "../../../components/FAB";
import { Link } from "react-router-dom";
import { getSpacesByViews, getUserById } from "../../../utils/dbFunctions";

const Trending = () => {
  const [mostViewed, setMostViewed] = useState([]);

  const getSpayces = async () => {
    const spacesByViews = await getSpacesByViews()
    for (let i = 0; i < spacesByViews.length; i++) {
      const user = await getUserById(spacesByViews[i].owner)
      spacesByViews[i].user = user.display
    }
    setMostViewed(spacesByViews.slice(0, 4))
  };

  useEffect(() => {
    if (mostViewed.length === 0) {
      getSpayces();
    }
  }, [mostViewed]);

  const selectedSpayces = [
    {
      user: "rodellwarner#2840",
      name: 'Favourite spayce 1',
      _id: "620bda02705c1c250c817755",
      likes: 140,
      views: 350,
    },
    {
      user: "tulipvault#8430",
      name: 'Favourite spayce 2',
      _id: "620bda02705c1c250c817755",
      likes: 240,
      views: 394,
    },
    {
      user: "rudy#2739",
      name: 'Favourite spayce 3',
      _id: "620bda02705c1c250c817755",
      likes: 153,
      views: 374,
    },
    {
      user: "chadwicktyler#3529",
      name: 'Favourite spayce 4',
      _id: "620bda02705c1c250c817755",
      likes: 273,
      views: 540,
    },
  ];

  const DesktopTable = (spayces) => {
    return (
      <table className="content-table">
        <thead>
          <tr>
            <th className="maximum-blue-purple-75 left-table fs-14 uppercase medium">Spayce</th>
            <th className="maximum-blue-purple-75 fs-14 uppercase medium">Likes</th>
            <th className="maximum-blue-purple-75 fs-14 uppercase medium">Views</th>
            <th className="maximum-blue-purple-75 right-table fs-14 uppercase medium">#</th>
          </tr>
        </thead>
        <tbody>
          {spayces.map((spayce, i) => {
            return (
              <tr className="glass" key={spayce._id+i}>
                <td className="left-table">
                  <p className="left-table">{spayce.name}</p>
                  <p className="fs-12 left-table white-80">{spayce.user}</p>
                </td>
                <td className="white-80">
                  <img src="/icons/heart.svg" alt="heart"></img>
                  {spayce.likes}
                </td>
                <td className="white-80">
                  <img src="/icons/eye.svg" alt="eye"></img>
                  {spayce.views}
                </td>
                <td className="right-table">
                  <Link to={"/myspayce?spayce="+spayce._id}>
                    <FAB
                      height="2.5rem"
                      width="2.5rem"
                      src="/icons/right-arrow.svg"
                      alt="right arrow"
                      outline={true}
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const MobileTable = (spayces) => {
    return (
      <div className="mobile-trending-table">
        {spayces.map((spayce) => {
          return (
            <div className="mobile-trending-table-card">
              <div className="mobile-trending-table-info">
                {spayce.user}
                <div className="mobile-trending-table-stats">
                  <span className="ceil-60">#{spayce._id.substring(0,4)}</span>
                  <span className="ceil-60">
                    <img src="/icons/heart.svg" alt="heart"></img>
                    {spayce.likes}
                  </span>
                  <span className="ceil-60">
                    <img src="/icons/eye.svg" alt="eye"></img>
                    {spayce.views}
                  </span>
                </div>
              </div>
              <Link className="ml-2" to={"/myspayce?spayce="+spayce._id}>
                <FAB
                  height="3rem"
                  width="3rem"
                  src="/icons/right-arrow.svg"
                  alt="right arrow"
                  outline={true}
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const Table = window.innerWidth <= 1300 ? MobileTable : DesktopTable;

  return (
    <div className="trending-container mt-80">
      <div className="trending-content-container">
        <h3 className="fs-28">Our favourite Spayces</h3>
        {Table(selectedSpayces)}
      </div>
      <div className="trending-content-container">
        <h3 className="fs-28">Trending Spayces</h3>
        {Table(mostViewed)}
      </div>
    </div>
  );
};

export default Trending;
