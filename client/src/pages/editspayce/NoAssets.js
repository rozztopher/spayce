import { Link } from "react-router-dom";

const NoAssets = () => {
  return (
    <div className="no-assets-container">
      <div className="no-asset-container glass">
        <p className="semi-bold fs-16-ep">No assets found</p>
        <img className="mt-12" src="/waves/no-asset-wave.png" alt="wave" />
        <p className="fs-14-ep ceil mt-14">
          If it's an error, please refresh and try again. You can also find the
          answer in the{" "}
          <Link className="purple fs-14-ep" to="/faq">
            FAQs
          </Link>{" "}
          or contact us on{" "}
          <a
            className="purple fs-14-ep"
            href="https://discord.com/invite/spayce"
            target="_blank"
          >
            Discord
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NoAssets;
