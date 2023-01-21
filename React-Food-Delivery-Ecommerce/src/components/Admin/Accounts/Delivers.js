import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

const Delivers = () => {
  const [deliverMan, setDeliverMan] = useState();
  const navigate = useNavigate();
  const fetchSeller = async () => {
    await axiosInstance
      .get("/accounts/deliver/list/")
      .then((res) => {
        setDeliverMan(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSeller();
  }, []);
  const deleteUser = (id) => {
    navigate(`/user/delete/${id}`);
  };
  const changeActive = async (id) => {
    await axiosInstance
      .get(`/accounts/active/${id}/`)
      .then((res) => {
        if (res.data.active === true) {
          document.querySelector(`#active-${id}`).innerHTML = "Disable";
          document.querySelector(`#active-${id}`).className = "btn btn-warning";
        } else if (res.data.active === false) {
          document.querySelector(`#active-${id}`).innerHTML = "Enable";
          document.querySelector(`#active-${id}`).className = "btn btn-success";
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  return (
    <Col className="col-md-8">
      <span className="text-left mr-0">
        <Link to="/user/create/deliver">
          <Button>Create New Deliver User</Button>
        </Link>
      </span>
      <h1 className="mb-3 text-center mt-10">
        <u>All Deliver Users</u>
      </h1>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th style={{ width: "3vw" }}>#</th>
            <th style={{ width: "6vw", textAlign: "center" }}>Image</th>
            <th style={{ width: "20vw" }}>Email</th>
            <th style={{ width: "20vw" }}>Phone</th>
            <th style={{ width: "15vw" }}></th>
          </tr>
        </thead>
        <tbody>
          {deliverMan?.map((item, index) => (
            <tr>
              <td style={{ paddingTop: "12px" }}>{index + 1}</td>
              <td>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
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
                      item?.img === null
                        ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        : item?.img
                    }
                  />
                </div>
              </td>
              <td style={{ paddingTop: "12px" }}>{item.email}</td>
              <td style={{ paddingTop: "12px" }}>{item.phone}</td>
              <td>
                {item.is_active === true ? (
                  <Button
                    id={`active-${item.id}`}
                    color="warning"
                    onClick={() => {
                      changeActive(item.id);
                    }}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button
                    id={`active-${item.id}`}
                    color="success"
                    onClick={() => {
                      changeActive(item.id);
                    }}
                  >
                    Enable
                  </Button>
                )}
                &nbsp;
                <Button
                  color="danger"
                  onClick={() => {
                    deleteUser(item.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default Delivers;
