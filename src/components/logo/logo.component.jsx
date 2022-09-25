import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="ma4 ma0">
      <Tilt>
        <div
          className="br2 shadow-2"
          style={{
            height: 150,
            width: 150,
            background: "linear-gradient(89deg, #FF5EDF, #04C8DE)",
          }}
        >
          <div className="p3">
            <img src={brain} style={{ paddingTop: "20px" }} alt="brain-logo" />
          </div>
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
