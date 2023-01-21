import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Col, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

function AllOrders() {
  const [orders, setOrders] = useState();
  const fetchOrders = async () => {
    const response = await axiosInstance
      .get("order/seller/list/")
      .catch((e) => {
        console.log(e.response);
      });
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="col-md-8">
      <h1 className="mb-3 text-center">
        <u>Order Table</u>
      </h1>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th style={{ width: "20vw" }}>Address</th>
            <th>Products</th>
            <th style={{ width: "3vw" }}>Amount</th>
            <th style={{ width: "9vw" }} className="text-center">
              Deliver Man
            </th>
            <th style={{ width: "1vw" }} className="text-center">
              Status
            </th>
            <th style={{ width: "1vw" }}></th>
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
                <td className="text-center">
                  {order.status === "paid" ? (
                    <h5>
                      <Badge color="success">Paid</Badge>
                    </h5>
                  ) : order.status === "on_the_way" ? (
                    <h5>
                      <Badge color="warning">On the way</Badge>
                    </h5>
                  ) : order.status === "delivered" ? (
                    <h5>
                      <Badge color="primary">Delivered</Badge>
                    </h5>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <Button color="success">
                    <Link to={`/order/update/status/${order.id}`}>EDIT</Link>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr rowSpan="4" className="my-3">
                <td colSpan="5" className="text-center">
                  <h4>No order available</h4>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </Col>
  );
}

export default AllOrders;
