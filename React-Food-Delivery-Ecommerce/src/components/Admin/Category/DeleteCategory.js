import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const DeleteCategory = () => {
  const [title, setTitle] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCategory = async () => {
    let response = await axiosInstance.get(`/category/${id}/`).catch((e) => {
      console.log(e.response);
    });
    setTitle(response.data.title);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  let categoryDelete = async (e) => {
    e.preventDefault();
    await axiosInstance
      .delete(`/category/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          storage.set("message", `"${title}" deleted successfully`);
          navigate("/all-categories");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  let categoryDeleteCancel = async (e) => {
    e.preventDefault();
    navigate("/all-categories");
  };
  return (
    <Row className="my-5">
      <Col className="m-auto">
        <h1 className="mx-2 text-center py-4">
          Are you want to delete "{title}" ?
        </h1>
        <div className="text-center">
          <Button color="danger" onClick={categoryDelete}>
            Delete
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button color="success" onClick={categoryDeleteCancel}>
            Cancel
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default DeleteCategory;
