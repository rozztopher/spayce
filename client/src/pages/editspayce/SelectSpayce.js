import CTAbutton from "../../components/CTAbutton";
import { Link } from "react-router-dom";

const SelectSpayce = (props) => {
  const spayces = props.spayces;
  return (
    <div className="select-spayce-section">
      <p className="medium fs-15-ep">All your spayces</p>
      <div className="select-spayce-list mt-30">
        {spayces.length > 0 &&
          spayces.map((spayce) => {
            return (
              <div className="select-spayce-item glass mb-15" key={spayce._id}>
                <img
                  src={spayce.thumbnail}
                  alt="space"
                  style={{ borderRadius: "10px" }}
                />
                <p className="fs-16-ep bold mt-12">{spayce.name}</p>
                <p className="fs-14-ep maximum-blue-purple mt-1">
                  {spayce.architecture.frames} Frames
                </p>
                <div className="flex-edge mt-14">
                  <Link to={"/myspayce?spayce=" + spayce._id}>
                    <CTAbutton
                      background="linear-gradient(90deg, #BA04FC 0%, #6700EB 100%)"
                      text="View Spayce"
                      height="30px"
                      fontSize="0.781vw"
                    />
                  </Link>
                  <CTAbutton
                    outline={true}
                    text="Edit Spayce"
                    height="40px"
                    fontSize="0.781vw"
                    onClick={() => props.handleActiveSpayceChange(spayce)}
                  />
                </div>
              </div>
            );
          })}
        <Link to="/create" className="pointer">
          <div className="select-spayce-item glass mb-100 ai-center">
            <img
              src="/icons/plus.svg"
              alt="space"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="fs-14-ep ceil-90 medium mt-10">Create new spayce</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectSpayce;
