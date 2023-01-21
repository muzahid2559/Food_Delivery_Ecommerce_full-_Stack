import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

function UpdateCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(undefined);
  const [oldImage, setOLDImage] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("title", title);
    if (image !== undefined) {
      form_data.append("image", image);
    }
    if (check) {
      form_data.append("image", "");
    }
    const response = await axiosInstance
      .put(`/category/${id}/`, form_data)
      .catch((e) => {
        console.log(e.response);
      });
    if (response.status === 200) {
      storage.set("message", "Category updated successfully");
      navigate("/all-categories");
    }
  };

  const fetchCategory = async () => {
    await axiosInstance
      .get(`/category/${id}/`)
      .then((res) => {
        setTitle(res.data.title);
        setOLDImage(res.data.image);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Row className="my-5">
      <h2 className="text-center mb-5">
        <u>Update Food Category</u>
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
            {oldImage ? (
              <div
                style={{
                  fontSize: "13px",
                  display: "flex",
                  marginBottom: "-3px",
                }}
              >
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
              name="image"
              id="exampleFile"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </FormGroup>
          <Button color="primary">Update</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default UpdateCategory;
