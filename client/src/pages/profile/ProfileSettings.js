import React, { useState, useContext, useEffect } from "react";
import HashedInput from "../../components/inputs/HashedInput";
import URLInput from "../../components/inputs/URLInput";
import TextField from "../../components/inputs/TextField";
import TextArea from "../../components/inputs/TextArea";
import IconTextField from "../../components/inputs/IconTextField";
import CTAbutton from "../../components/CTAbutton";
import { UserContext } from "../../contexts/UserContext";
import gsap from "gsap";
import { getUserByCustomURL, updateUser } from "../../utils/dbFunctions";
// import { ImageUpload } from "react-ipfs-uploader";

const ProfileSettings = () => {
  const { user, setUser, setIsModalOpen } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [pfp, setPfp] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (user.wallet_address) {
      setUsername(user.display.split("#")[0]);
      setUrl(user.customURL);
      setEmail(user.email);
      setBio(user.bio);
      setTwitter(user.twitter);
      setDiscord(user.discord);
      setInstagram(user.instagram);
      setWebsite(user.website);
      if (!user.wallet_address) {
        setIsModalOpen(true);
      }
      if (imageUrl) {
        setPfp(imageUrl);
      }
    } else {
      setIsModalOpen(true)
    }
  }, [imageUrl]);

  const isDifferent = () => {
    if (user.display !== username) {
      return true;
    } else if (user.customURL !== url) {
      return true;
    } else if (user.email !== email) {
      return true;
    } else if (user.bio !== bio) {
      return true;
    } else if (user.twitter !== twitter) {
      return true;
    } else if (user.discord !== discord) {
      return true;
    } else if (user.instagram !== instagram) {
      return true;
    } else if (user.website !== website) {
      return true;
    } else if (user.pfp !== pfp) {
      return true;
    } else {
      return false;
    }
  };

  const isCustomURLValid = async () => {
    if (user.customURL === url) {
      return true
    } else {
      if (/^[a-z0-9]+$/i.exec(url)) {
        const customURLUser = await getUserByCustomURL(url)
        if (customURLUser) {
          if (customURLUser.customURL === url) {
            return "Custom URL is already taken."
          } else {
            return ""
          }
        } else {
          return ""
        }
      } else {
        return "Custom URL is not valid."
      }
    }
  }

  const validMessage = async () => {
    const isURLValid = await isCustomURLValid()
    if (isURLValid.length > 0) {
      return isURLValid
    } else {
      return "Profile Updated."
    }
  }

  const saveSettings = async () => {
    const newUser = Object.assign({}, user);
    newUser.display = username + "#" + user.display.split("#")[1];
    newUser.twitter = twitter;
    newUser.discord = discord;
    newUser.instagram = instagram;
    newUser.email = email;
    newUser.bio = bio;
    newUser.customURL = url;
    newUser.website = website;
    //newUser.pfp = pfp;
    const message = await validMessage()
    if (message === "Profile Updated") {
      const data = await updateUser(user._id, newUser);
      setUser(data);
    }
    document.querySelector(".settings-confirmation").innerHTML = message
    gsap.set(".settings-confirmation", { display: "block" });
    setTimeout(
      () => gsap.set(".settings-confirmation", { display: "none" }),
      5000
    );
  };

  const buttonColour = isDifferent()
    ? "linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
    : "#CCCCCC";


  if (user.wallet_address) {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div className="profile-settings-container mb-10">
          <h2 className="center">Profile Settings</h2>
          {user.wallet_address && (
            <div className="profile-settings-grid mt-30">
              <div className="profile-settings-form">
                <HashedInput
                  height="46px"
                  placeholder="Enter username"
                  label="Username"
                  set={setUsername}
                  value={username}
                  hash={user.display.split("#")[1]}
                />
                <div className="mt-25"></div>
                <URLInput
                  height="46px"
                  placeholder="Enter custom url"
                  label="Custom URL"
                  set={setUrl}
                  value={url}
                />
                <div className="mt-25"></div>
                <TextArea
                  height="10vh"
                  placeholder="Tell the world your story!"
                  label="Bio"
                  set={setBio}
                  value={bio}
                />
                <div className="mt-25"></div>
                <TextField
                  height="46px"
                  placeholder="Enter email"
                  label="Email Address"
                  set={setEmail}
                  value={email}
                />
                <div className="mt-25"></div>
                <p className="fs-15 medium">Links</p>
                <IconTextField
                  height="46px"
                  placeholder="Twitter"
                  set={setTwitter}
                  icon="/icons/twitter-transparent.svg"
                  value={twitter || ""}
                />
                <div className="mt-10"></div>
                <IconTextField
                  height="46px"
                  placeholder="Discord"
                  set={setDiscord}
                  icon="/icons/discord-transparent.svg"
                  value={discord || ""}
                />
                <div className="mt-10"></div>
                <IconTextField
                  height="46px"
                  placeholder="Instagram"
                  set={setInstagram}
                  icon="/icons/insta-fade.svg"
                  value={instagram || ""}
                />
                <div className="mt-10"></div>
                <IconTextField
                  height="46px"
                  placeholder="Website"
                  set={setWebsite}
                  icon="/icons/world-transparent.svg"
                  value={website || ""}
                />
                <div className="mt-35"></div>
                <CTAbutton
                  background={buttonColour}
                  outline={false}
                  text="Update Profile"
                  height="40px"
                  fill={true}
                  onClick={saveSettings}
                  fontSize="0.938rem"
                />
                <p className="settings-confirmation none purple center mt-10">
                  Profile settings updated :)
                </p>
              </div>
              <div className="profile-settings-pfp">
                <label className="fs-15 medium">Profile Image</label>
                <div className="profile-settings-pfp-container mt-10">
                  <img
                    src={user.pfp || "/images/profile.jpg"}
                    alt="profile"
                  ></img>
                  <p className="fs-14 ceil center mt-10">
                    We recommend an image of at least 400x400.
                  </p>
                  {/* <CTAbutton
                    outline={true}
                    text="Choose file"
                    height="40px"
                    fill={true}
                    fontSize="0.938rem"
                  /> */}
                  {/* <ImageUpload setUrl={setImageUrl} /> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else return <></>
};

export default ProfileSettings;
