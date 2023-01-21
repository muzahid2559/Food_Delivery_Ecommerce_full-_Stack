import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  let form_data = new FormData();
  form_data.append("title", title);
  form_data.append("image", image);
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axiosInstance
      .post("/category/create/", form_data)
      .catch((e) => {
        console.log(e.response);
      });
    if (response.status === 201) {
      storage.set("message", "Category created successfully");
      navigate("/all-categories");
    }
  };
  return (
    <Row className="my-5">
      <h2 className="text-center mb-5">
        <u>Create A New Food Category</u>
      </h2>
      <Col className="col-md-6 m-auto">
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <FormGroup>
            <Label for="title-id">Title</Label>
            <Input
              type="text"
              name="title"
              id="title-id"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Category Image</Label>
            <Input
              type="file"
              name="image"
              id="exampleFile"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </FormGroup>
          <Button color="primary">Create</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default AddCategory;
