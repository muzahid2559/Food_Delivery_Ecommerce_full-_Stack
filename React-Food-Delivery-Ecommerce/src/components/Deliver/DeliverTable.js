import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Table } from "reactstrap";
import axiosInstance from "../../utils/axiosInstance";

const DeliverTable = () => {
  const [order, setOrder] = useState();
  const fetchDeliveryManOrder = async () => {
    await axiosInstance
      .get("/order/deliver/")
      .then((res) => {
        setOrder(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  useEffect(() => {
    fetchDeliveryManOrder();
  }, []);

  const changeStatus = async (id) => {
    await axiosInstance
      .post("/order/deliver/", { id: id, status: "delivered" })
      .then((res) => {
        if (res.status === 200) {
          document.querySelector(`#button-${id}`).style.display = "none";
          document.querySelector(`#status-${id}`).style.display = "none";
          document.querySelector(`#status-update-${id}`).style.display =
            "block";
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <Col className="col-md-16 mx-5">
      <h1 className="mb-3 text-center mt-10">
        <u>Order Table</u>
      </h1>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th style={{ width: "3vw" }}>#</th>
            <th style={{ width: "25vw" }}>Order ID</th>
            <th>Address</th>
            <th style={{ width: "12vw" }}>Status</th>
            <th style={{ width: "7vw" }}></th>
          </tr>
        </thead>
        <tbody>
          {order?.map((item, id) => (
            <tr>
              <td style={{ paddingTop: "12px" }}>{id + 1}</td>
              <td style={{ paddingTop: "12px" }}>{item.order_id}</td>
              <td style={{ paddingTop: "12px" }}>{item.address}</td>
              <td style={{ paddingTop: "12px" }}>
                {item.status === "delivered" ? (
                  <h6 id={`status-${item.id}`}>
                    <Badge color="primary">Delivered</Badge>
                  </h6>
                ) : (
                  <h6 id={`status-${item.id}`}>
                    <Badge color="danger">Not Delivered</Badge>
                  </h6>
                )}
                <h6 id={`status-update-${item.id}`} style={{ display: "none" }}>
                  <Badge color="primary">Delivered</Badge>
                </h6>
              </td>
              <td>
                {item.status !== "delivered" ? (
                  <Button
                    id={`button-${item.id}`}
                    size="sm"
                    color="primary"
                    onClick={() => {
                      changeStatus(item.id);
                    }}
                  >
                    Completed
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default DeliverTable;
