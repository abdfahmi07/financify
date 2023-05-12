import { useState } from "react";
import { useForm } from "react-hook-form";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router";
import { db } from "../../config/firebase";
import { getAuthCookie } from "../../utils/cookies";
import "./style.scss";
import { Helmet } from "react-helmet-async";

const SplitBillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userAuth = getAuthCookie() && JSON.parse(getAuthCookie());
  const [isLoading, setIsLoading] = useState(false);

  const handleSplitBill = async (payloads) => {
    const { totalPayment, totalPerson } = payloads;

    setIsLoading(true);

    try {
      const result = await addDoc(collection(db, "splitBill"), {
        userId: userAuth.uid,
        totalPayment,
        totalPerson,
        resultSplitBill: parseInt(totalPayment) / parseInt(totalPerson),
        createdAt: Timestamp.now(),
      });

      navigate(`/split-bill/${result.id}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useState(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Split Bill</title>
      </Helmet>
      <section id="splitBill" className="split__bill">
        <div className="container split__bill__container">
          <header className="split__bill__header">
            <h4>Split Bill</h4>
            <p>You can divide the total bill by the same amount</p>
          </header>
          <div className="split__bill__content">
            <form
              className="split__bill__form"
              onSubmit={handleSubmit(handleSplitBill)}
            >
              <div className="split__bill__form__group">
                <label htmlFor="email" className="form-label">
                  Total payment
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="totalPayment"
                  id="totalPayment"
                  aria-describedby="totalPayment"
                  placeholder="enter nominal"
                  {...register("totalPayment", {
                    required: "total payment must be filled in",
                  })}
                />
                {errors?.totalPayment && (
                  <div className="custom-invalid-feedback">
                    {errors?.totalPayment?.message}
                  </div>
                )}
              </div>
              <div className="split__bill__form__group">
                <label htmlFor="password" className="form-label">
                  Total person
                </label>
                <input
                  type="number"
                  className="form-input"
                  name="totalPerson"
                  id="totalPerson"
                  aria-describedby="totalPerson"
                  placeholder="enter total person"
                  {...register("totalPerson", {
                    required: "total person must be filled in",
                  })}
                  min="1"
                  max="100"
                />
                {errors?.totalPerson && (
                  <div className="custom-invalid-feedback">
                    {errors?.totalPerson?.message}
                  </div>
                )}
              </div>
              <div className="split__bill__form__action">
                <button type="submit" className="btn__calculate">
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "8px" }}
                    ></span>
                  )}
                  Calculate
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SplitBillPage;
