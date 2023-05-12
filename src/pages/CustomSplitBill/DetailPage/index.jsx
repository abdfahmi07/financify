import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../../../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import peopleAvatar from "../../../assets/images/people-img.png";
import moment from "moment/moment";
import "./style.scss";

const CustomSplitBillDetailPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [currentIndex, setIsCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [customSplitBillDetail, setCustomSplitBillDetail] = useState({});
  const [isAddPeopleDisable, setIsAddPeopleDisable] = useState(false);
  const formsRef = useRef([]);

  const customSplitBillRef = doc(db, "customSplitBill", id);

  const getDetailCustomSplitBill = async () => {
    setIsLoading(true);

    const result = await getDoc(customSplitBillRef);
    const data = result.data();

    setCustomSplitBillDetail(data);
    setIsLoading(false);
  };

  const handleAddForm = async () => {
    setCustomSplitBillDetail({
      ...customSplitBillDetail,
      detailSplitBill: [...customSplitBillDetail.detailSplitBill, {}],
    });
    setIsAddPeopleDisable(true);

    await updateDoc(customSplitBillRef, {
      detailSplitBill: [...customSplitBillDetail.detailSplitBill, {}],
    });
  };

  const handleAddPerson = async (idx, payloads) => {
    const { name, email, amount, additionalInformation } = payloads;

    if (parseInt(customSplitBillDetail.totalPayment) < parseInt(amount)) {
      setError("amount", {
        type: "custom",
        message: "The amount exceeds the total payment",
      });
    } else {
      customSplitBillDetail.detailSplitBill[idx] = {
        name,
        email,
        amount,
        additionalInformation,
      };

      setIsLoading(true);

      await updateDoc(customSplitBillRef, {
        totalPerson: customSplitBillDetail.detailSplitBill.length,
        detailSplitBill: [...customSplitBillDetail.detailSplitBill],
      });

      setIsLoading(false);
      setCustomSplitBillDetail({
        ...customSplitBillDetail,
        totalPayment:
          parseInt(customSplitBillDetail.totalPayment) - parseInt(amount),
        detailSplitBill: [...customSplitBillDetail.detailSplitBill],
      });
      setIsAddPeopleDisable(false);
      reset({
        name: "",
        email: "",
        amount: "",
        additionalInformation: "",
      });
    }
  };

  const handleDeletePerson = async (detailIndex) => {
    const filteredPeople = customSplitBillDetail.detailSplitBill.filter(
      (detail, idx) => idx !== detailIndex
    );

    setCustomSplitBillDetail({
      ...customSplitBillDetail,
      detailSplitBill: [...filteredPeople],
    });

    await updateDoc(customSplitBillRef, {
      detailSplitBill: [...filteredPeople],
    });

    setIsAddPeopleDisable(false);
  };

  const sendEmail = (event, detailIndex) => {
    event.preventDefault();

    const {
      VITE_EMAIL_SERVICE_ID,
      VITE_EMAIL_TEMPLATE_ID,
      VITE_EMAIL_PUBLIC_KEY,
    } = import.meta.env;

    setIsCurrentIndex(detailIndex);
    setIsLoadingShare(true);

    emailjs
      .sendForm(
        VITE_EMAIL_SERVICE_ID,
        VITE_EMAIL_TEMPLATE_ID,
        formsRef.current[detailIndex],
        VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          setIsLoadingShare(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    getDetailCustomSplitBill();
  }, []);

  return (
    <>
      <Helmet>
        <title>Detail | Split Bill With Friends</title>
      </Helmet>
      <section
        id="customSplitBillDetail"
        className="custom__split__bill__detail"
      >
        <div className="container custom__split__bill__detail__container">
          <header className="custom__split__bill__detail__header">
            <h4>Split Bill With Friends</h4>
            <p>
              You can devide the total bill with your friends then you can share
              the bill via email
            </p>
          </header>
          <div className="custom__split__bill__detail__content">
            <div className="custom__split__bill__summary__top">
              <h6 className="summary-title">Total Payment</h6>
              <h5 className="summary-amount">
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                ) : customSplitBillDetail.totalPayment === 0 ? (
                  <>
                    <FontAwesomeIcon
                      icon="fa-solid fa-circle-check"
                      bounce
                      style={{ marginRight: "8px" }}
                    />
                    Split Bill Done
                  </>
                ) : (
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(customSplitBillDetail.totalPayment)
                )}
              </h5>
            </div>
            <div className="custom__split__bill__summary__body">
              <h6>Person</h6>
              <div className="custom__split__bill__summary__form">
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                ) : (
                  customSplitBillDetail?.detailSplitBill?.length !== 0 &&
                  customSplitBillDetail?.detailSplitBill?.map((detail, idx) =>
                    Object.keys(detail).length === 0 ? (
                      <form
                        key={idx}
                        className="summary__form__group"
                        onSubmit={handleSubmit((payloads) =>
                          handleAddPerson(idx, payloads)
                        )}
                      >
                        <div className="summary__form__inputs">
                          <input
                            type="text"
                            className="form-input"
                            name="name"
                            id="name"
                            aria-describedby="name"
                            placeholder="name"
                            {...register("name", {
                              required: "name must be filled in",
                            })}
                            autoFocus
                          />
                          {errors?.name && (
                            <div className="custom-invalid-feedback">
                              {errors?.name?.message}
                            </div>
                          )}
                          <input
                            type="email"
                            className="form-input"
                            name="email"
                            id="email"
                            aria-describedby="email"
                            placeholder="email"
                            {...register("email", {
                              required: "email must be filled in",
                            })}
                          />
                          {errors?.email && (
                            <div className="custom-invalid-feedback">
                              {errors?.email?.message}
                            </div>
                          )}
                          <input
                            type="text"
                            className="form-input"
                            name="amount"
                            id="amount"
                            aria-describedby="amount"
                            placeholder="amount"
                            {...register("amount", {
                              required: "amount must be filled in",
                            })}
                          />
                          {errors?.amount && (
                            <div className="custom-invalid-feedback">
                              {errors?.amount?.message}
                            </div>
                          )}
                          <input
                            type="text"
                            className="form-input"
                            name="additional_info"
                            id="additionalInformation"
                            aria-describedby="Additional Information"
                            placeholder="additional information"
                            {...register("additionalInformation", {
                              required:
                                "additional information must be filled in",
                            })}
                          />
                          {errors?.additionalInformation && (
                            <div className="custom-invalid-feedback">
                              {errors?.additionalInformation?.message}
                            </div>
                          )}
                        </div>
                        <div className="summary__form__actions">
                          <button className="cta-add">Add</button>
                          <button
                            className="cta-cancel"
                            onClick={() => handleDeletePerson(idx)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form
                        key={idx}
                        className="person"
                        ref={(element) => (formsRef.current[idx] = element)}
                        onSubmit={(event) => sendEmail(event, idx)}
                      >
                        <div className="person__left__side">
                          <input
                            type="text"
                            name="transaction_date"
                            value={moment(
                              customSplitBillDetail.createdAt?.toDate()
                            ).format("dddd, Do MMMM YYYY")}
                            hidden
                          />
                          <input
                            type="text"
                            name="user_name"
                            value={detail.name}
                            hidden
                          />
                          <input
                            type="text"
                            name="user_email"
                            value={detail.email}
                            hidden
                          />
                          <input
                            type="text"
                            name="user_amount"
                            value={detail.amount}
                            hidden
                          />
                          <input
                            type="text"
                            name="additional_info"
                            value={detail.additionalInformation}
                            hidden
                          />
                          <img
                            className="person__avatar"
                            src={peopleAvatar}
                            alt="People Avatar"
                          />
                          <div className="person__info">
                            <h6>{detail.name}</h6>
                            <p>{detail.email}</p>
                          </div>
                        </div>
                        <div className="person__right__side">
                          <div className="person__info__sec">
                            <h6 className="person__amount">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(detail.amount)}
                            </h6>
                            <p>{detail.additionalInformation}</p>
                          </div>
                          <button type="submit" className="btn">
                            {isLoadingShare && idx === currentIndex ? (
                              <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></div>
                            ) : (
                              <FontAwesomeIcon icon="fa-solid fa-share" />
                            )}
                          </button>
                        </div>
                      </form>
                    )
                  )
                )}
                {customSplitBillDetail.totalPayment === 0 ? (
                  <button className="cta-submit">Go to history</button>
                ) : (
                  <button
                    className="cta-submit"
                    onClick={handleAddForm}
                    disabled={isAddPeopleDisable}
                  >
                    Add Person{" "}
                    <FontAwesomeIcon
                      icon="fa-solid fa-circle-plus"
                      style={{ marginLeft: "5px" }}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomSplitBillDetailPage;
