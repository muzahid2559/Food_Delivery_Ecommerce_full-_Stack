import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";
import storage from "../../../utils/storage";

const AdminUser = () => {
  const [seller, setSeller] = useState();
  const [superUser, setSuperUser] = useState();
  const navigate = useNavigate();
  const authTokens = storage.get("authTokens");
  const refreshToken = jwt_decode(authTokens?.refresh);
  const fetchSeller = async () => {
    await axiosInstance
      .get("/accounts/seller/list/")
      .then((res) => {
        setSeller(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSeller();
    getSuperUser(refreshToken?.user_id);
  }, []);
  const deleteUser = (id) => {
    navigate(`/user/delete/${id}`);
  };
  const getSuperUser = async (id) => {
    await axiosInstance
      .get(`/accounts/is-superuser/${id}/`)
      .then((res) => {
        setSuperUser(res.data?.is_superuser);
      })
      .catch((e) => {
        console.log(e.response);
      });
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
        <Link to="/user/create/seller">
          <Button>Create New Admin User</Button>
        </Link>
      </span>
      <h1 className="mb-3 text-center mt-10">
        <u>All Admin User</u>
      </h1>
      <Table borderless hover striped responsive>
        <thead>
          <tr>
            <th style={{ width: "3vw" }}>#</th>
            <th style={{ width: "6vw", textAlign: "center" }}>Image</th>
            <th style={{ width: "20vw" }}>Email</th>
            <th style={{ width: "20vw" }}>Phone</th>
            {superUser ? <th style={{ width: "15vw" }}></th> : undefined}
          </tr>
        </thead>
        <tbody>
          {seller?.map((item, index) => (
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
              {superUser ? (
                <td>
                  {refreshToken?.user_id === item.id ? (
                    <Button color="warning" disabled>
                      Disable
                    </Button>
                  ) : (
                    <>
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
                    </>
                  )}
                  &nbsp;
                  {refreshToken?.user_id === item.id ? (
                    <Button color="danger">Delete</Button>
                  ) : (
                    <Button
                      color="danger"
                      onClick={() => {
                        deleteUser(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              ) : undefined}
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default AdminUser;
