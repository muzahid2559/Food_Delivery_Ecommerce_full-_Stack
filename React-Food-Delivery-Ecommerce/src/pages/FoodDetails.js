import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import "../styles/food-details.css";
import ProductCard from "../components/UI/product-card/ProductCard";
import axiosInstance from "../utils/axiosInstance";
import useAuth from "../hooks/useAuth";

const FoodDetails = () => {
  const { userType } = useAuth();
  const [tab, setTab] = useState("desc");
  const [product, setProduct] = useState();
  const [allProducts, setAllProducts] = useState();
  const [allReviews, setAllReviews] = useState();
  const [active, setActive] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const title = product?.title;
  const category = product?.category.title;
  const image = product?.image;
  const price = product?.price;
  const description = product?.description;
  const status = product?.is_visible;

  let getFoods = async () => {
    let response = await axiosInstance.get("");
    setAllProducts(response.data);
  };
  let getFood = async () => {
    let response = await axiosInstance.get(`/${id}/`);
    setProduct(response.data);
  };
  let getReviews = async () => {
    let response = await axiosInstance.get(`order/review/${id}/`);
    setAllReviews(response.data);
  };
  let checkReviews = async () => {
    let response = await axiosInstance
      .get(`order/check-review/${id}/`)
      .catch((e) => {
        console.log(e.response);
      });
    setActive(response.data.msg);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFoods();
    getFood();
    getReviews();
    checkReviews();
  }, [active]);

  const relatedProduct = allProducts?.filter(
    (item) => category === item.category.title
  );

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image,
      })
    );
  };

  const Rating = (n) => {
    var elements = [];
    for (let i = 0; i < n; i++) {
      elements.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
          style={{ margin: "0 2px" }}
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }
    for (let i = 0; i < 5 - n; i++) {
      elements.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-star"
          viewBox="0 0 16 16"
          style={{ margin: "0 2px" }}
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      );
    }
    return elements;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post(`order/review/${id}/`, {
        rating: rating,
        review: review,
        id: id,
      })
      .then((res) => {
        if (res.data.msg === "success") {
          setActive(false);
          getAllReview();
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const getAllReview = () => {
    return (
      <div className="tab__form mb-3">
        {allReviews?.map((item) => (
          <div className="review pt-5">
            <p className="user__name mb-0 flex">
              {item.name} &nbsp; &nbsp; &nbsp; &nbsp; {"   "}
              {Rating(item.rating)}
            </p>

            <p className="feedback__text">{item.review}</p>
          </div>
        ))}
        {active ? (
          <form
            className="form"
            onSubmit={submitHandler}
            style={{ marginTop: "10vh" }}
          >
            <FormGroup className="form__group">
              <Label for="exampleSelect">Rating</Label>
              <Input
                id="exampleSelect"
                name="rating"
                type="select"
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option selected>5</option>
              </Input>
            </FormGroup>
            <div className="form__group">
              <textarea
                rows={5}
                type="text"
                placeholder="Write your review"
                required
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="addTOCart__btn">
              Submit
            </button>
          </form>
        ) : undefined}
      </div>
    );
  };

  return (
    <Helmet title="Product-details">
      {status ? (
        <>
          <CommonSection title={title} />
          <section>
            <Container>
              <Row>
                <Col lg="4" md="4">
                  <div className="product__main-img ">
                    <img src={image} alt="" className="w-100" />
                  </div>
                </Col>

                <Col lg="6" md="6">
                  <div className="single__product-content mt-5 offset-2">
                    <h2 className="product__title mb-3">{title}</h2>
                    <p className="product__price">
                      Price: <span>৳{price}</span>
                    </p>
                    <p className="category mb-5">
                      Category: <span>{category}</span>
                    </p>
                    {userType === "seller" ? (
                      ""
                    ) : (
                      <button className="addTOCart__btn" onClick={addItem}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </Col>

                <Col lg="12">
                  <div className="tabs d-flex align-items-center gap-5 py-3">
                    <h6
                      className={` ${tab === "desc" ? "tab__active" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h6>
                    <h6
                      className={` ${tab === "rev" ? "tab__active" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Review
                    </h6>
                  </div>

                  {tab === "desc" ? (
                    <div className="tab__content">
                      <p>{description}</p>
                    </div>
                  ) : (
                    getAllReview()
                  )}
                </Col>

                <Col lg="12" className="mb-5 mt-4">
                  <h2 className="related__Product-title">
                    You might also like
                  </h2>
                </Col>

                {relatedProduct?.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    className="mb-4"
                    key={item.id}
                  >
                    <ProductCard item={item} />
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <h1 className="text-center" style={{ padding: "90px 0", color: "red" }}>
          Wrong Link.......
        </h1>
      )}
    </Helmet>
  );
};

export default FoodDetails;
