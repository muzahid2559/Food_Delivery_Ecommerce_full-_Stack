import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

function UpdateFood() {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState();

  const [check, setCheck] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFood = async () => {
    let response = await axiosInstance.get(`/seller/food/${id}/`).catch((e) => {
      console.log(e.response);
    });
    setCategory(response.data.category.id);
    setTitle(response.data.title);
    setPrice(response.data.price);
    setOldImage(response.data.image);
    setDescription(response.data.description);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  let updateFood = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("category", category);
    form_data.append("title", title);
    form_data.append("price", price);
    form_data.append("description", description);
    if (image !== undefined) {
      form_data.append("image", image);
    }
    if (check) {
      form_data.append("image", "");
    }
    await axiosInstance
      .put(`/seller/food/${id}/`, form_data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/all-foods");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchCategories = async () => {
    const response = await axiosInstance.get("/category/").catch((e) => {
      console.log(e.response);
    });
    setCategories(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Row className="my-5">
      <Col className="col-md-6 m-auto">
        <h1 className="mx-2">Food Update</h1>
        <Form
          className="container-fluid my-5"
          onSubmit={updateFood}
          encType="multipart/form-data"
        >
          <FormGroup>
            <Label for="exampleSelect">Category</Label>
            <Input
              type="select"
              name="category"
              id="exampleSelect"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((item) => (
                <option
                  value={item.id}
                  key={item.id}
                  select={item.id === category ? "selected" : ""}
                >
                  {item.title}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleTitle">Title</Label>
            <Input
              type="text "
              name="title"
              id="exampleEmail"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleNumber">Price</Label>
            <Input
              type="number"
              name="price"
              id="exampleNumber"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image</Label>
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
          <FormGroup>
            <Label for="exampleText">Description</Label>
            <Input
              rows="7"
              type="textarea"
              name="description"
              id="exampleText"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <Button color="primary">Update</Button>{" "}
        </Form>
      </Col>
    </Row>
  );
}

export default UpdateFood;
