import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { db } from "../../config/firebase";
import { getAuthCookie } from "../../utils/cookies";
import "./style.scss";
import { Helmet } from "react-helmet-async";

const CustomSplitBillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userAuth = getAuthCookie() && JSON.parse(getAuthCookie());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomSplitBill = async (payloads) => {
    const { totalPayment } = payloads;

    setIsLoading(true);

    try {
      const result = await addDoc(collection(db, "customSplitBill"), {
        userId: userAuth.uid,
        totalPayment,
        totalPerson: 0,
        detailSplitBill: [],
        createdAt: Timestamp.now(),
      });

      navigate(`/custom-split-bill/${result.id}`);
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
        <title>Split Bill With Friends</title>
      </Helmet>
      <section id="customSplitBill" className="custom__split__bill">
        <div className="container custom__split__bill__container">
          <header className="custom__split__bill__header">
            <h4>Split Bill With Friends</h4>
            <p>
              You can devide the total bill with your friends then you can share
              the bill via email
            </p>
          </header>
          <div className="custom__split__bill__content">
            <form
              className="custom__split__bill__form"
              onSubmit={handleSubmit(handleCustomSplitBill)}
            >
              <div className="custom__split__bill__form__group">
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
              <div className="custom__split__bill__form__action">
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

export default CustomSplitBillPage;
