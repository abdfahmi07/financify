import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { setAuthCookie } from "../../../utils/cookies";
import Login from "../../../components/Auth/Login";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (payloads) => {
    const { email, password } = payloads;

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);
        setAuthCookie(JSON.stringify(user));
        setIsError(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Financify</title>
      </Helmet>
      <Login
        handleLogin={handleLogin}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default LoginPage;
