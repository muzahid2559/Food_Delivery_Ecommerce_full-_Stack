import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const DeleteFood = () => {
  const [title, setTitle] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFood = async () => {
    let response = await axiosInstance.get(`/seller/food/${id}/`).catch((e) => {
      console.log(e.response);
    });
    setTitle(response.data.title);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  let foodDelete = async (e) => {
    e.preventDefault();
    await axiosInstance
      .delete(`/seller/food/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          storage.set("message", `"${title}" deleted successfully`);
          navigate("/all-foods");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  let foodDeleteCancel = async (e) => {
    e.preventDefault();
    navigate("/all-foods");
  };

  return (
    <Row className="my-5">
      <Col className="m-auto">
        <h1 className="mx-2 text-center py-4">
          Are you want to delete "{title}" ?
        </h1>
        <div className="text-center">
          <Button color="danger" onClick={foodDelete}>
            Delete
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button color="success" onClick={foodDeleteCancel}>
            Cancel
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default DeleteFood;
