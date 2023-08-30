import TextField from "../../components/inputs/TextField";
import CTAbutton from "../../components/CTAbutton";

const EditArchitecture = (props) => {
  const spayce = props.spayce;
  return (
    <div className="edit-architecture-container">
      <TextField
        label="Spayce Title"
        placeholder="Untitled"
        set={props.setName}
        value={props.name}
      />
      <p className="fs-15-ep medium mt-20">Spayce Design</p>
      <div className="architecture-overview glass mt-10">
        <img src={spayce.thumbnail} alt="architecture" />
        <p className="fs-16-ep semi-bold mt-12">{spayce.architecture.name}</p>
        <p className="fs-14-ep maximum-blue-purple mt-1 mb-12">
          {spayce.architecture.frames} frames
        </p>
        <div className="horizontal-divider mt-6 mb-6" />
        <p className="fs-14 mb-20">
          Price <span className="purple bold">{spayce.price}</span>
        </p>
        <CTAbutton
          outline={true}
          text="Change the Spayce Design"
          height="40px"
          fontSize={"0.781vw"}
        />
      </div>
      <div className="mt-20"></div>
    </div>
  );
};

export default EditArchitecture;
