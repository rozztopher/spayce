import CTAbutton from "../../components/CTAbutton";
import { Link } from "react-router-dom";

const SavedModal = (props) => {
  const spayce = props.spayce;
  return (
    <div className="spayce-modal">
      <div className="spayce-modal-content">
        <h3 className="center fs-28-ep">Your Spayce is now Live!</h3>
        <img className="mt-20" src="/images/saved.gif" alt="thank you" />
        <img className="mt-24" src="/waves/saved-waves.svg" alt="waves" style={{width: "28%"}} />
        <p className="center ceil fs-16-ep lh-31 mt-14 mb-31">
          Congratulations! Your Spayce is now live and other users can visit it.
          You can also mint your Spayce to make it appear in your wallet.
        </p>
        <Link to={"/myspayce?spayce="+spayce._id}>
          <CTAbutton
            outline={true}
            text="View Spayce"
            height="46px"
            wide={true}
            fontSize="0.938rem"
          />
        </Link>
      </div>
    </div>
  );
};

export default SavedModal;
