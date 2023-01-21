import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import storage from "../utils/storage";
import axiosInstance from "../utils/axiosInstance";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const getUserData = async () => {
    let response = await axiosInstance.get("/accounts/detail/");
    setEnterName(response.data.full_name);
    setEnterAddress(response.data.address);
    setEnterNumber(response.data.phone);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserData();
  }, []);

  const TotalAmount = useSelector((state) => state.cart.totalAmount);

  const submitHandler = (e) => {
    e.preventDefault();

    const cartItems = storage.get("cartItems");
    const createOrder = async () => {
      await axiosInstance
        .post("/order/", {
          cart: cartItems,
          address: enterAddress,
          phone: enterNumber,
        })
        .then((res) => {
          if (res.status === 201) {
            storage.remove("cartItems");
            storage.remove("totalAmount");
            storage.remove("totalQuantity");
            const makePayment = async () => {
              await axiosInstance
                .post("/order/payment/", {
                  id: res.data.id,
                })
                .then((e) => {
                  window.location.replace(e.data.GatewayPageURL);
                })
                .catch((e) => e.response);
            };
            makePayment();
          }
        })
        .catch((e) => e.response);
    };
    createOrder();
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={enterName}
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    required
                    value={enterAddress}
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone number"
                    required
                    value={enterNumber}
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Payment
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>৳{TotalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
