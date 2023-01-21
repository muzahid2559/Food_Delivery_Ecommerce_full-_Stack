import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

function PendingOrderTable() {
  const [orders, setOrders] = useState();
  const fetchOrders = async () => {
    const response = await axiosInstance
      .get("order/pending/list/")
      .catch((e) => {
        console.log(e.response);
      });
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Col className="col-md-8">
      <h1 className="mb-3 text-center">
        <u>Pending Order Table</u>
      </h1>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th style={{ width: "16vw" }}>Products</th>
            <th style={{ width: "7vw" }}>Amount</th>
            <th style={{ width: "9vw", textAlign: "center" }}>Delivery Man</th>
            <th style={{ width: "2.5vw" }}></th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders?.map((order, id) => (
              <tr key={order.id}>
                <th scope="row">{id + 1}</th>
                <td>{order.address}</td>
                <td>
                  {order.cart.map((item) => (
                    <>
                      {item.quantity} x {item.food.title}
                      <br />
                    </>
                  ))}
                </td>
                <td>৳{order.amount}</td>
                <td style={{ textAlign: "center" }}>
                  {order.deliver_user ? (
                    <>
                      <div
                        style={{
                          width: "25px",
                          height: "25px",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            borderRadius: "50%",
                          }}
                          alt="user_image"
                          src={
                            order?.deliver_user.img === null
                              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              : order?.deliver_user.img
                          }
                        />
                      </div>
                      <div>{order.deliver_user.full_name}</div>
                    </>
                  ) : (
                    "Not Assigned"
                  )}
                </td>
                <td>
                  <Button color="success">
                    <Link to={`/order/update/${order.id}`}>
                      {order.deliver_user ? "EDIT" : "ASSIGN"}
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr rowSpan="4" className="my-3">
                <td colSpan="5" className="text-center">
                  <h4>No pending order available</h4>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </Col>
  );
}

export default PendingOrderTable;
