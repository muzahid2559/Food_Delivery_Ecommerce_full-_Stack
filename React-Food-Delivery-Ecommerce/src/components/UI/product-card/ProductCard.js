import React from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import useAuth from "../../../hooks/useAuth";

const ProductCard = (props) => {
  const { userType } = useAuth();
  const { id, title, image, price } = props.item;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image,
        price,
      })
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className="d-flex align-items-center justify-content-between ">
          <span className="product__price">৳{price}</span>
          {userType === "seller" ? (
            ""
          ) : (
            <button className="addTOCart__btn" onClick={addToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
