import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import Spaces from "./components/Spaces";
import { getSpaceById, getUserByCustomURL } from "../../utils/dbFunctions";

const Profile = () => {

  const { user } = useContext(UserContext);

  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    document.getElementById('app-container').style.width = null
    getUser();
  }, []);

  const getUser = async () => {
    if (id) {
      const profile = await getUserByCustomURL(id)
      setUserProfile(profile)
    }
  };

  const isOwner = () => {
    return user.wallet_address === userProfile.wallet_address;
  };

  return (
    <div className="profile-container mt-40 mb-10">
      {userProfile.wallet_address && (
        <>
          <ProfileCard isOwner={isOwner} user={userProfile} />
          <Spaces user={userProfile} isOwner={isOwner} />
        </>
      )}
    </div>
  );
};

export default Profile;
