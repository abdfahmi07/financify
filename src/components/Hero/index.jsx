import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroImage from "../../assets/images/hero-image.png";
import "./style.scss";

const Hero = () => {
  return (
    <div id="hero" className="hero">
      <div className="container hero__container">
        <div className="hero__headline">
          <h1 className="headline">More features, more productive_..</h1>
          <p className="sub-headline">
            Help you to be more productive through some of the tools that have
            been provided
          </p>
          <a href="#features" className="cta-btn">
            <button>
              Use Now
              <FontAwesomeIcon
                size="xs"
                icon="fa-arrow-down"
                style={{ marginLeft: "8px" }}
              />
            </button>
          </a>
        </div>
        <div className="hero__image">
          <img src={heroImage} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
