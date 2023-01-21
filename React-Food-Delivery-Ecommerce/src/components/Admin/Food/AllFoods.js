import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, FormGroup, Input, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

function AllOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const [foods, setFoods] = useState();
  const searchedProduct = foods?.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  const fetchFoods = async () => {
    const response = await axiosInstance.get("/seller/").catch((e) => {
      console.log(e.response);
    });
    setFoods(response.data);
  };
  const fetchFoodsByCategory = async () => {
    const response = await axiosInstance
      .get(`/seller/${category}/`)
      .catch((e) => {
        console.log(e.response);
      });
    setFoods(response.data);
  };
  const fetchCategories = async () => {
    const response = await axiosInstance.get("/category/").catch((e) => {
      console.log(e.response);
    });
    setCategories(response.data);
  };
  useEffect(() => {
    fetchFoods();
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (category === "none") {
      fetchFoods();
    } else {
      fetchFoodsByCategory();
    }
  }, [category]);

  const foodStatus = async (item) => {
    await axiosInstance
      .get(`seller/food/status/${item.id}/`)
      .then((res) => {
        document.querySelector(`#status-${item.id}`).innerHTML = res.data.msg;
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <Col className="col-md-8">
      <span className="text-left mr-0">
        <Link to="/food/create">
          <Button>Create New Food</Button>
        </Link>
      </span>
      <h1 className="mb-3 text-center mt-10">
        <u>All Foods</u>
      </h1>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h6 style={{ marginTop: "6px", paddingRight: "10px" }}>
            Search by Category
          </h6>
          <div>
            <FormGroup>
              <Input
                type="select"
                name="category"
                id="exampleSelect"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="none" select="selected">
                  ---------
                </option>
                {categories?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>
        </div>
        <div
          style={{ padding: "4.5px 12px", marginLeft: "20px" }}
          className="search__widget d-flex align-items-center justify-content-between "
        >
          <input
            type="text"
            placeholder="Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>
            <i className="ri-search-line"></i>
          </span>
        </div>
      </div>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th style={{ width: "2.5vw" }}>#</th>
            <th style={{ width: "12vw" }}>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th style={{ width: "18vw" }}></th>
          </tr>
        </thead>
        <tbody>
          {searchedProduct?.map((item, id) => (
            <tr
              style={{
                lineHeight: "15vh",
              }}
            >
              <td>{id + 1}</td>
              <td>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      margin: "auto",
                    }}
                    alt="product_image"
                    src={item.image}
                  />
                </div>
              </td>
              <td>
                <Link to={`/foods/${item.id}`}>{item.title}</Link>
              </td>
              <td>৳{item.price}</td>
              <td>
                <Button
                  id={`status-${item.id}`}
                  onClick={() => {
                    foodStatus(item);
                  }}
                >
                  {item.is_visible ? "Hide" : "Public"}
                </Button>
                &nbsp;
                <Button color="success">
                  <Link to={`/food/update/${item.id}`}>Edit</Link>
                </Button>
                &nbsp;
                <Button color="danger">
                  <Link to={`/food/delete/${item.id}`}>Delete</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default AllOrder;
