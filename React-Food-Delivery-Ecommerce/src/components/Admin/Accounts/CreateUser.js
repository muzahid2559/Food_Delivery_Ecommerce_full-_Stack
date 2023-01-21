import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const CreateUser = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const msg = storage.get("message");
  const [message, setMessage] = useState(msg);
  const navigate = useNavigate();
  const { type } = useParams();
  const userCreate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("type", type);
    await axiosInstance
      .post("/accounts/create/", formData)
      .then((res) => {
        if (res.status === 201) {
          storage.set("message", `Account created successfully`);
          if (type === "seller") {
            navigate("/all-admin-user");
          } else if (type === "buyer") {
            navigate("/all-buyers");
          } else if (type === "deliver") {
            navigate("/all-delivery-users");
          }
        }
      })
      .catch((e) => {
        if (e.response.data.email) {
          setMessage("Email already exists");
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        }
        console.log(e.response);
      });
  };

  return (
    <Row className="my-5">
      {message && isAlertVisible ? (
        <Alert className="text-center" color="danger">
          {message}
        </Alert>
      ) : undefined}
      <Col className="col-md-6 m-auto">
        <h1 className="mx-2">Create New User</h1>
        <Form className="container-fluid my-5" onSubmit={userCreate}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormGroup>
          <Button color="primary">Create</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateUser;
