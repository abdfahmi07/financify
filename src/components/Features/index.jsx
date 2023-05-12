import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import customSplitBillLogo from "../../assets/images/custom-split-bill.png";
import splitBillLogo from "../../assets/images/split-bill.png";
import "./style.scss";

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container features__container">
        <header className="features__header">
          <h3>Features</h3>
          <p>
            There are two features available at the moment, but there may be
            additions in the future
          </p>
        </header>
        <div className="features__content">
          <div className="feature">
            <img src={splitBillLogo} alt="" />
            <div>
              <h5>Split Bill</h5>
              <p>You can divide the total bill by the same amount</p>
            </div>
            <NavLink to="/split-bill">
              <button>
                Use Feature
                <FontAwesomeIcon
                  size="xs"
                  icon="fa-chevron-right"
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </NavLink>
          </div>
          <div className="feature">
            <img src={customSplitBillLogo} alt="" />
            <div>
              <h5>Split Bill With Friends</h5>
              <p>
                You can devide the total bill with your friends then you can
                share the bill via email
              </p>
            </div>
            <NavLink to="/custom-split-bill">
              <button>
                Use Feature
                <FontAwesomeIcon
                  size="xs"
                  icon="fa-chevron-right"
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
