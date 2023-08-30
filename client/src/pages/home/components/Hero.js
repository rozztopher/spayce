import React, {useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import CTAbutton from "../../../components/CTAbutton";
import FAB from "../../../components/FAB";
import { getSpaceById, getUserById } from "../../../utils/dbFunctions";
import { SmartContractContext } from "../../../contexts/SmartContractContext";

const featuredSpace = '6295e229e5a299468a786466'
const defaultSpace = {
  user: 'rosstopher#0001',
  name: 'Civic',
  id: '62399d3b97391804654dc473',
  img: '"/images/hero-cropped.jpg"'
}

const Hero = () => {
  const fill = window.innerWidth <= 480 ? true : false;

  const [spayce, setSpayce] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    getHeroProject()
  }, [])

  const getHeroProject = async () => {
    const space = await getSpaceById(featuredSpace)
    const owner = await getUserById(space.owner)
    setSpayce(space)
    setUser(owner)
  }

  return (
    <div className="hero-container">
      <div className="hero-text-content">
        <h1>Spayce — experience art in the metaverse</h1>
        <p className="ceil-90 mb-4 lh-29 mt-22 mb-42">
          Spayce is a place in the metaverse for artists & collectors to
          customise, curate, and showcase their digital art.
        </p>
        <Link to="/myspayce?spayce=6295e229e5a299468a786466">
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text="Try Demo Spayce"
            height="46px"
            wide={!fill}
            fill={fill}
            fontSize={"0.938rem"}
          />
        </Link>
      </div>
      <div className="hero-image-content">
        <div className="hero-image-container" style={{backgroundImage: "url(" + spayce.thumbnail || defaultSpace.img + ")"}}>
          <img className="ring" src="/images/ring.png" alt="ring"></img>
          <Link
            to={"/myspayce?spayce="+spayce._id || defaultSpace.id}
            style={{ width: "100%" }}
          >
            <div className="hero-image-chip glass">
              <div className="hero-image-chip-left">
                <img
                  src={user.pfp || "/images/hero-cropped.jpg"}
                  alt="profile"
                  style={{
                    height: "3rem",
                    width: "3rem",
                    borderRadius: "100%",
                  }}
                ></img>
                <div className="hero-image-chip-text ml-12">
                  <p className="fs-14 maximum-blue-purple">{user.display || defaultSpace.user}</p>
                  <p className="medium">{spayce.name || defaultSpace.name}</p>
                </div>
              </div>
              <div className="hero-image-chip-right">
                <FAB
                  height="3rem"
                  width="3rem"
                  src="/icons/right-arrow.svg"
                  alt="right arrow"
                  outline={true}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
