import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import storage from "../utils/storage";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserType, setAuthenticated } from "../store/auth/authSlice";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

const INITIAL_LOGIN_DATA = {
  email: "",
  password: "",
};

const Login = () => {
  const { authenticated } = useAuth();
  const baseURL = process.env.REACT_APP_SERVICE_URL;
  const [data, setData] = useState(INITIAL_LOGIN_DATA);
  const msg = storage.get("message");
  const [message, setMessage] = useState(msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseURL}/accounts/login/`, data)
      .then((res) => {
        if (res.status === 200) {
          storage.set("authTokens", res.data);
          const user = jwt_decode(res.data.access);
          dispatch(setUserType(user.user_type));
          dispatch(setAuthenticated(true));
          navigate("/home");
          window.location.reload();
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setMessage("credential is wrong");
      });
  };
  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.currentTarget.name] = e.currentTarget.value;
    setData(userdata);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (authenticated) {
      navigate("/");
    }
    if (message) {
      storage.remove("message");
    }
  }, []);
  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      {message ? <Alert color="primary">{message}</Alert> : undefined}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={userData}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={userData}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
