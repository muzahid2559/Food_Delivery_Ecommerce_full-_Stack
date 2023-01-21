import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Col, FormGroup, Input, Label, Row } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const UpdateOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [deilverUser, setDeilverUser] = useState([]);
  const [deliverMans, setDeliverMans] = useState();
  const navigate = useNavigate();
  const fetchDeliveryManList = async () => {
    let response = await axiosInstance.get(`/accounts/deliver/`).catch((e) => {
      console.log(e.response);
    });
    setDeliverMans(response.data);
  };

  const fetchOrder = async () => {
    await axiosInstance
      .get(`/order/deliver/${id}/`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    fetchOrder();
    fetchDeliveryManList();
  }, []);

  const orderHandler = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("id", id);
    form_data.append("deliver_user", deilverUser);
    await axiosInstance
      .post(`/order/deliver/${id}/`, form_data)
      .then((res) => {
        navigate("/pending-order");
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
        <Form onSubmit={orderHandler}>
          <FormGroup className="form__group">
            <Label for="exampleSelect">Assign</Label>
            <Input
              id="exampleSelect"
              name="deliver_user"
              type="select"
              onChange={(e) => {
                setDeilverUser(e.target.value);
              }}
            >
              <option key="0" value={[]}>
                ---------
              </option>
              {deliverMans?.map((item, id) => (
                <>
                  {order?.deliver_user?.id === item.id ? (
                    <option key={id + 1} value={item.id} selected>
                      {item.full_name}
                    </option>
                  ) : (
                    <option key={id + 1} value={item.id}>
                      {item.full_name}
                    </option>
                  )}
                </>
              ))}
            </Input>
          </FormGroup>

          <Button color="primary">Update</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateOrder;
