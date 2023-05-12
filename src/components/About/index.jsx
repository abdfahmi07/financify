import aboutImage from "../../assets/images/about.png";
import "./style.scss";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container about__container">
        <header className="about__header">
          <h3>About</h3>
          <p>
            This website is intended for those of you who want to be more
            productive in finance management and others
          </p>
        </header>
        <div className="about__image">
          <img src={aboutImage} alt="About Image" />
        </div>
      </div>
    </section>
  );
};

export default About;
