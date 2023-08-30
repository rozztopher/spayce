import React, { useState, useContext, useEffect } from "react";
import CTAbutton from "../../../components/CTAbutton";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { getSpaceById, getUserById, updateSpace, updateUser } from "../../../utils/dbFunctions";

const Spaces = (props) => {
  const [spacePanel, setSpacePanel] = useState("created");
  const [visibleSpaces, setVisibleSpaces] = useState([]);
  const [owners, setOwners] = useState([]);

  const { setIsEditing, user, setUser, setIsModalOpen } = useContext(UserContext);

  useEffect(() => {
    if (spacePanel === "created") {
      getCreatedSpaces()
    } else {
      getLikedSpaces()
    }
  }, [spacePanel]);

  const getCreatedSpaces = async () => {
    let newVisible = []
    for (let i = 0; i < props.user.spaces.length; i++) {
      const space = await getSpaceById(props.user.spaces[i])
      newVisible.push(space)
    }
    if (visibleSpaces.length === 0 && props.isOwner()) {
      newVisible.push(spaceTemplate);
    }
    setOwners([])
    setVisibleSpaces(newVisible);
  }

  const getLikedSpaces = async () => {
    let newVisible = []
    const likedOwners = []
    for (let i = 0; i < props.user.likedspaces.length; i++) {
      const space = await getSpaceById(props.user.likedspaces[i])
      const owner = await getUserById(space.owner)
      newVisible.push(space)
      owners.push(owner)
    }
    setVisibleSpaces(newVisible);
    setOwners(likedOwners)
  }

  const spaceTemplate = {
    name: "No Spayce",
    rank: "-",
    number: "-",
    views: "-",
    likes: "-",
    src: "",
    liked: "false",
    id: -1,
  };

  const isSpayceLiked = (user, spayce) => {
    if (user.likedspaces) {
      const liked = user.likedspaces;
      if (liked.length) {
        for (let i = 0; i < liked.length; i++) {
          if (liked[i] === spayce._id) return true;
        }
      }
    }
    return false;
  };

  const likeSpayce = async (spayce) => {
    if (user.wallet_address) {
      const newUser = Object.assign(user);
      const newSpayce = Object.assign(spayce);
      let alreadyLiked = false;
  
      newUser.likedspaces.forEach((likedSpayce, i) => {
        if (likedSpayce === spayce._id) {
          alreadyLiked = true;
          newSpayce.likes = newSpayce.likes - 1;
          newUser.likedspaces.splice(i, 1);
        }
      });
  
      if (!alreadyLiked) {
        newUser.likedspaces.push(spayce._id);
        newSpayce.likes = newSpayce.likes + 1;
      }
      newUser.likedspaces = newUser.likedspaces;
  
      await updateUser(user._id, newUser);
      await updateSpace(spayce._id, newSpayce);
  
      setUser(newUser);
    } else { setIsModalOpen(true) }
  };

  const getOwner = async (spayce) => {
    if (Object.keys(spayce).length > 0) {
      const ownerList = Object.assign([], owners);
      const owner = await getUserById(spayce.owner)
      ownerList.push(owner)
      setOwners(ownerList)
    }
    return {};
  };

  const getPFP = (space) => {
    for (let i = 0; i < owners.length; i++) {
      if (space.owner === owners[i]._id) {
        return owners[i].pfp;
      }
    }
    return "";
  };

  if (props.user.wallet_address) {
    return (
      <div className="profile-spaces-container mb-40">
        <div className="space-type-selection">
          <div className="pointer" onClick={() => setSpacePanel("created")}>
            <h3
              className={spacePanel === "created" ? "" : "maximum-blue-purple-75"}
            >
              Created Spayce
            </h3>
            <div
              className={
                spacePanel === "created"
                  ? "selection-bar mt-10"
                  : "selection-bar mt-10 invisible"
              }
            ></div>
          </div>
          <div className="pointer ml-35" onClick={() => setSpacePanel("liked")}>
            <h3
              className={spacePanel === "liked" ? "" : "maximum-blue-purple-75"}
            >
              Liked Spayces ({props.user.likedspaces.length})
            </h3>
            <div
              className={
                spacePanel === "liked"
                  ? "selection-bar mt-1"
                  : "selection-bar mt-1 invisible"
              }
            ></div>
          </div>
        </div>
        <div className="profile-space-list mt-24">
          {visibleSpaces.map((space, i) => {
            const containerClass =
              i === 0
                ? "profile-space-item glass"
                : "profile-space-item glass mt-24";
            const heartClass = isSpayceLiked(user, space)
              ? "space-heart-container-selected pointer"
              : "space-heart-container pointer";
            const heartImg = isSpayceLiked(user, space)
              ? "/icons/heart-purple.svg"
              : "/icons/heart-light.svg";
            return (
              <div className={containerClass} key={space._id + i}>
                <div className="profile-space-item-content">
                  <div className="position-chip-blend">
                    <img src="/icons/trophy-transparent.svg" alt="trophy"></img>
                    <p className="fs-15 ml-8 maximum-blue-purple-50">#{i + 1}</p>
                  </div>
                  <div>
                    <p className="semi-bold fs-20 mb-0">{space.name}</p>
                    {spacePanel === "liked" && (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={getPFP(space)}
                          alt="profile"
                          style={{
                            height: "1.75vw",
                            width: "1.75vw",
                            borderRadius: "100%",
                          }}
                        ></img>
                        <p className="semi-bold fs-14 maximum-blue-purple ml-8">
                          {space.user}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="profile-space-stats mt-24">
                    <p className="fs-14 lotion">Spayce number #{i + 1}</p>
                    <p className="fs-14 lotion mt-6">Views: {space.views}</p>
                    <p className="fs-14 lotion mt-6">Likes: {space.likes}</p>
                  </div>
                  <div className="profile-space-actions mt-5">
                    <Link to={`/myspayce?spayce=${space._id}`}>
                      <CTAbutton
                        background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                        outline={false}
                        text="View spayce"
                        height="40px"
                        onClick={() => {
                          setIsEditing(false);
                        }}
                        fontSize="0.938rem"
                      />
                    </Link>
                    {/* {props.isOwner() && ( */}
                    <Link to={`/myspayce?spayce=${space._id}`}>
                      <img
                        className="ml-1"
                        src="/icons/options.svg"
                        alt="options"
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      ></img>
                    </Link>
                    {/* )} */}
                  </div>
                </div>
                {space.thumbnail && (
                  <div className="profile-space-image-container">
                    <div className={heartClass} onClick={() => likeSpayce(space)}>
                      <img src={heartImg} alt="heart"></img>
                    </div>
                    <img
                      className="profile-space-image"
                      src={space.thumbnail}
                      alt="space"
                    ></img>
                  </div>
                )}
                {!space.thumbnail && (
                  <div className="profile-space-image-container pointer">
                    <img src="/icons/plus.svg" alt="plus"></img>
                    <p className="ceil-90 fs-14 mt-1">Create Spayce</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else return <></>

};

export default Spaces;
