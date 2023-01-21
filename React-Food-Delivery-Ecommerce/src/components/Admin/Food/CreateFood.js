import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

function CreateFood() {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  let form_data = new FormData();
  let createFood = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("category", category);
    form_data.append("title", title);
    form_data.append("price", price);
    form_data.append("description", description);
    if (image !== null) {
      form_data.append("image", image);
    }
    await axiosInstance
      .post("/seller/", form_data)
      .then((res) => {
        if (res.status === 201) {
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
        <h1 className="mx-2">Food Create</h1>
        <Form
          className="container-fluid my-5"
          onSubmit={createFood}
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
              <option select="selected">---------</option>
              {categories?.map((item) => (
                <option value={item.id} key={item.id}>
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
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Image</Label>
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <Button color="primary">Create</Button>{" "}
        </Form>
      </Col>
    </Row>
  );
}

export default CreateFood;
