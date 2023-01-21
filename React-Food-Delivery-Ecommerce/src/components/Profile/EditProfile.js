import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";
import storage from "../../utils/storage";

function EditProfile() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [check, setCheck] = useState(false);
  const getUserData = async () => {
    let response = await axiosInstance.get("/accounts/detail/");
    setFullName(response.data.full_name);
    setEmail(response.data.email);
    setAddress(response.data.address);
    setPhone(response.data.phone);
    setOldImage(response.data.img);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("full_name", fullName);
    form_data.append("email", email);
    form_data.append("address", address);
    form_data.append("phone", phone);
    if (image !== null) {
      form_data.append("img", image);
    }
    if (check) {
      form_data.append("img", "");
    }
    await axiosInstance
      .put("/accounts/detail/", form_data)
      .then((res) => {
        if (res.status === 200) {
          storage.set("message", "Profile updated successfully");
          navigate("/profile");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <Row className="my-5">
      <Col className="col-md-6 m-auto">
        <h1 className="mx-2">Update Profile</h1>
        <Form
          className="container-fluid my-5"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <FormGroup>
            <Label for="exampleFullName">Full Name</Label>
            <Input
              type="text "
              name="full_name"
              id="exampleFullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="text "
              name="email"
              id="exampleEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input
              type="text"
              name="address"
              id="exampleAddress"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePhone">Phone Number</Label>
            <Input
              type="text"
              name="phone"
              id="examplePhone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Profile Picture</Label>
            {oldImage ? (
              <div style={{ fontSize: "13px", display: "flex" }}>
                <div>{oldImage}&nbsp; &nbsp; &nbsp; &nbsp;</div>
                <div>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        setCheck(e.target.value);
                      }}
                    />
                    <Label check>clear</Label>
                  </FormGroup>
                </div>
              </div>
            ) : (
              ""
            )}

            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </FormGroup>
          <Button color="primary">Update</Button>{" "}
        </Form>
      </Col>
    </Row>
  );
}

export default EditProfile;
