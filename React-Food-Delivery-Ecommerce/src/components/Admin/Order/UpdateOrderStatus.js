import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const UpdateOrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  const fetchOrder = async () => {
    await axiosInstance
      .get(`/order/status/${id}/`)
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const OrderHandler = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("id", id);
    form_data.append("status", status);
    await axiosInstance
      .post(`/order/status/${id}/`, form_data)
      .then((res) => {
        navigate("/all-orders");
        storage.set("message", "Order Updated");
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <Row className="my-5">
      <h2 className="text-center mb-5">
        <u>Assign Delivery Man</u>
      </h2>
      <Col className="col-md-6 m-auto">
        <h6 className="py-3">
          ORDER ID: <u>{order?.order_id}</u>
        </h6>
        <Form onSubmit={OrderHandler}>
          <FormGroup className="form__group">
            <Label for="exampleSelect">Status</Label>
            <Input
              id="exampleSelect"
              type="select"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {order?.status === "paid" ? (
                <option value="paid" selected>
                  Paid
                </option>
              ) : (
                <option value="paid">Paid</option>
              )}
              {order?.status === "on_the_way" ? (
                <option value="on_the_way" selected>
                  On The Way
                </option>
              ) : (
                <option value="on_the_way">On The Way</option>
              )}

              {order?.status === "delivered" ? (
                <option value="delivered" selected>
                  Delivered
                </option>
              ) : (
                <option value="delivered">Delivered</option>
              )}
            </Input>
          </FormGroup>

          <Button color="primary">Update</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateOrderStatus;
