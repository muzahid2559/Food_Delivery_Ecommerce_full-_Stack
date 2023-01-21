import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const DeleteUser = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    let response = await axiosInstance
      .get(`/accounts/detail/${id}/`)
      .catch((e) => {
        console.log(e.response);
      });
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  let userDelete = async (e) => {
    e.preventDefault();
    await axiosInstance
      .delete(`/accounts/detail/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          storage.set("message", `"${user?.full_name}" deleted successfully`);
          if (user?.type === "seller") {
            navigate("/all-admin-user");
          } else if (user?.type === "buyer") {
            navigate("/all-buyers");
          } else {
            navigate("/all-delivery-users   ");
          }
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  let userDeleteCancel = async (e) => {
    e.preventDefault();
    if (user?.type === "seller") {
      navigate("/all-admin-user");
    } else if (user?.type === "buyer") {
      navigate("/all-buyers");
    } else {
      navigate("/all-delivery-users");
    }
  };

  return (
    <Row className="my-5">
      <Col className="m-auto">
        <h1 className="mx-2 text-center py-4">
          Are you want to delete "{user?.email}" user ?
        </h1>
        <div className="text-center">
          <Button color="danger" onClick={userDelete}>
            Delete
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button color="success" onClick={userDeleteCancel}>
            Cancel
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default DeleteUser;
