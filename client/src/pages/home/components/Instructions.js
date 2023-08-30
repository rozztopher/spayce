import React, {useContext} from "react";
import CTAbutton from "../../../components/CTAbutton";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const Instructions = (props) => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="instructions-container mt-100">
      <h2>How to create your own Spayce?</h2>
      <div className="instruction-container glass">
        <div className="instruction-text-content">
          <div>
            <h3>1. Connect with Metamask</h3>
            <p className="ceil lh-33 mt-20">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          {window.innerWidth <= 480 && <div className="mt-24"/>}
          <CTAbutton
            background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
            outline={false}
            text="Connect Wallet"
            height="46px"
            onClick={props.connectMetamask}
            wide={true}
            fontSize="0.938rem"
          />
        </div>
        <div
          className="instruction-image"
          style={{ backgroundImage: "url(../images/metamask.jpg)" }}
        ></div>
      </div>
      <div className="instruction-container glass">
        <div className="instruction-text-content" style={{ order: 2 }}>
          <div>
            <h3>2. Create and design your Spayce</h3>
            <p className="ceil lh-33 mt-20">
              Velit officia consequat duis enim velit mollit. Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit. Exercitation veniam
              consequat sunt nostrud amet.
            </p>
          </div>
          {window.innerWidth <= 480 && <div className="mt-24"/>}
          <Link to="/create">
            <CTAbutton
              background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
              outline={false}
              text="Create Spayce"
              height="46px"
              onClick={props.connectMetamask}
              wide={true}
              fontSize="0.938rem"
            />
          </Link>
        </div>
        <div
          className="instruction-image"
          style={{ backgroundImage: "url(../images/step1.jpg)", order: 1 }}
        ></div>
      </div>
      <div className="instruction-container glass">
        <div className="instruction-text-content">
          <div>
            <h3>3. Enjoy your Spayce and share with your fam</h3>
            <p className="ceil lh-33 mt-20">
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit.
            </p>
          </div>
          {window.innerWidth <= 480 && <div className="mt-24"/>}
          <Link to={"/profile"+user.customURL}> 
            <CTAbutton
              background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
              outline={false}
              text="Customise Spayce"
              height="46px"
              onClick={props.connectMetamask}
              wide={true}
              fontSize="0.938rem"
            />
          </Link>
        </div>
        <div
          className="instruction-image"
          style={{ backgroundImage: "url(../images/step2.jpg)", order: 2 }}
        ></div>
      </div>
    </div>
  );
};

export default Instructions;
