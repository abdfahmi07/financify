import { useForm } from "react-hook-form";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { setAuthCookie } from "../../../utils/cookies";
import Register from "../../../components/Auth/Register";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (payloads) => {
    const { name, email, password } = payloads;

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setIsLoading(false);
            setAuthCookie(JSON.stringify(user));
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
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
        <title>Create Account | Financify</title>
      </Helmet>
      <Register
        handleRegister={handleRegister}
        isLoading={isLoading}
        registerForm={register}
        handleSubmitForm={handleSubmit}
        formErrors={errors}
      />
    </>
  );
};

export default RegisterPage;
