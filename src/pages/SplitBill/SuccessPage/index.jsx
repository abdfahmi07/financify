import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./style.scss";
import { Helmet } from "react-helmet-async";

const SplitBillSuccessPage = () => {
  const { id } = useParams();
  const [splitBillDetail, setSplitBillDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getDetailSplitBill = async () => {
    setIsLoading(true);

    const result = await getDoc(doc(db, "splitBill", id));

    setSplitBillDetail(result.data());
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailSplitBill();
  }, []);

  return (
    <>
      <Helmet>
        <title>Split Bill Success</title>
      </Helmet>
      <section id="splitBillSuccess" className="split__bill__success">
        <div className="container split__bill__success__container">
          <div className="split__bill__success__header">
            <FontAwesomeIcon icon="fa-solid fa-circle-check" bounce />
            <h4>Split Bill Success!</h4>
            <h4>
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(splitBillDetail.resultSplitBill)
              )}
            </h4>
            <p>per person</p>
          </div>
          <div className="split__bill__success__content">
            <div className="split__bill__success__detail">
              <h6>Detail Payment</h6>
              <div className="summary total-payment">
                <h6 className="title">Total Payment</h6>
                <h6 className="value">
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(splitBillDetail.totalPayment)
                  )}
                </h6>
              </div>
              <div className="summary total-person">
                <h6 className="title">Total Person</h6>
                <h6 className="value">
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    `${splitBillDetail.totalPerson} Person`
                  )}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SplitBillSuccessPage;
