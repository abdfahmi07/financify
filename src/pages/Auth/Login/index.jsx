import { useForm } from "react-hook-form";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { setAuthCookie } from "../../../utils/cookies";
import Login from "../../../components/Auth/Login";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (payloads) => {
    const { email, password } = payloads;

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);
        setAuthCookie(JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        const errorMsg = error.code.split("/")[1].split("-").join(" ");
        const errorMsgFormatted = `${errorMsg[0].toUpperCase()}${errorMsg.substr(
          1
        )}`;

        setIsLoading(false);
        setError("password", {
          type: "custom",
          message: errorMsgFormatted,
        });
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
        registerForm={register}
        handleSubmitForm={handleSubmit}
        formErrors={errors}
      />
    </>
  );
};

export default LoginPage;
