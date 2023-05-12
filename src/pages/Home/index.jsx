import { Helmet } from "react-helmet-async";
import About from "../../components/About";
import Features from "../../components/Features";
import Hero from "../../components/Hero";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Hero />
      <Features />
      <About />
    </>
  );
};

export default HomePage;
