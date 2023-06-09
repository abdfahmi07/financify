import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoNavbar from "../../../assets/images/logo-nav.png";
import "./style.scss";

const Register = ({
  handleRegister,
  isLoading,
  registerForm,
  handleSubmitForm,
  formErrors,
}) => {
  return (
    <section id="register" className="register">
      <div className="container register__container">
        <div className="register__brand">
          <img src={logoNavbar} alt="" />
          <h6>financify</h6>
        </div>
        <div className="register__content">
          <header className="register__header">
            <h4>Create your account</h4>
          </header>
          <form
            className="register__form"
            onSubmit={handleSubmitForm(handleRegister)}
          >
            <div className="register__form__group">
              <label htmlFor="email" className="form-label">
                Fullname
              </label>
              <input
                type="text"
                className="form-input"
                name="name"
                id="name"
                aria-describedby="name"
                placeholder="john doe"
                {...registerForm("name", {
                  required: "Name must be filled in",
                })}
              />
            </div>
            <div className="register__form__group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                name="email"
                id="email"
                aria-describedby="email"
                placeholder="johndoe@gmail.com"
                {...registerForm("email", {
                  required: "Email must be filled in",
                })}
              />
            </div>
            <div className="register__form__group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                name="password"
                id="password"
                aria-describedby="password"
                placeholder="password"
                {...registerForm("password", {
                  required: "Password must be filled in",
                })}
              />
            </div>
            {(formErrors?.name ||
              formErrors?.email ||
              formErrors?.password) && (
              <span className="custom-invalid-feedback">
                <FontAwesomeIcon
                  icon="fa-solid fa-triangle-exclamation"
                  bounce
                  style={{ marginRight: "5px" }}
                />
                {formErrors?.name?.message ||
                  formErrors?.email?.message ||
                  formErrors?.password?.message}
              </span>
            )}
            <div className="register__form__action">
              <button
                type="submit"
                className="btn__submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "8px" }}
                  ></span>
                )}
                Create Account
              </button>
              <p>
                Have an account? <NavLink to="/login">Sign in</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
