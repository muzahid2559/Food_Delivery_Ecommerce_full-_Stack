import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Table } from "reactstrap";
import axiosInstance from "../../../utils/axiosInstance";

var monthName = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const Bar = () => {
  const [totalIncome, setTotalIncome] = useState();
  const [yearIncome, setYearIncome] = useState();
  const [monthIncome, setMonthIncome] = useState();
  const [dayIncome, setDayIncome] = useState();
  const [singleDayIncome, setSingleDayIncome] = useState();
  const [year, setYear] = useState("all-year");
  const [month, setMonth] = useState("all-month");
  const [day, setDay] = useState("all-day");
  let title = document.querySelector("#title");
  let monthID = document.querySelector("#month");
  let dayID = document.querySelector("#day");
  let yearInc = document.querySelector("#year-income");
  let monthInc = document.querySelector("#month-income");
  let dayInc = document.querySelector("#day-income");
  let singledayInc = document.querySelector("#single-day-income");

  const fetchTotalIncome = async () => {
    await axiosInstance
      .get("/order/total-income/")
      .then((res) => {
        setTotalIncome(res.data.income);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchIncomeByYear = async () => {
    await axiosInstance
      .get("/order/total-income/year-list/")
      .then((res) => {
        setYearIncome(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchIncomeByMonth = async (year) => {
    await axiosInstance
      .get(`/order/total-income/month-list/${year}/`)
      .then((res) => {
        setMonthIncome(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchIncomeByDay = async (year, month) => {
    await axiosInstance
      .get(`/order/total-income/day-list/${year}/${month}/`)
      .then((res) => {
        setDayIncome(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const fetchDayIncome = async (year, month, day) => {
    await axiosInstance
      .get(`/order/total-income/day-list/${year}/${month}/${day}/`)
      .then((res) => {
        setSingleDayIncome(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    fetchTotalIncome();
    fetchIncomeByYear();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // by year
    if (year !== "all-year") {
      title.innerHTML = "Month";
      monthID.style.display = "block";
      yearInc.style.display = "none";
      monthInc.style.display = null;
      singledayInc.style.display = "none";
      fetchIncomeByMonth(year);
    } else {
      if (singledayInc) singledayInc.style.display = "none";
      if (monthInc) monthInc.style.display = "none";
      if (title) title.innerHTML = "Year";
      setMonth("all-month");
      if (monthID) monthID.style.display = "none";
      if (yearInc) yearInc.style.display = null;
    }

    // by month
    if (month !== "all-month") {
      title.innerHTML = "Date";
      fetchIncomeByDay(year, month);
      monthInc.style.display = "none";
      dayInc.style.display = null;
      singledayInc.style.display = "none";
      dayID.style.display = null;
    } else {
      setDay("all-day");
      if (singledayInc) singledayInc.style.display = "none";
      if (dayInc) dayInc.style.display = "none";
      if (dayID) dayID.style.display = "none";
    }

    // by date
    if (day !== "all-day") {
      dayInc.style.display = "none";
      fetchDayIncome(year, month, day);
      monthInc.style.display = "none";
      singledayInc.style.display = null;
    } else {
      if (singledayInc) singledayInc.style.display = "none";
    }
  }, [year, month, day]);
  return (
    <Col className="col-md-8">
      <h1 className="mb-3 text-center">
        <u>Revenue</u>
      </h1>
      <div className="py-2">
        <div style={{ fontSize: "20px" }}>
          Total income: <b>{totalIncome}TK</b>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div id="year" className="px-2">
          <div style={{ display: "flex" }}>
            <h6 style={{ marginTop: "6px", paddingRight: "10px" }}>By Year</h6>
            <div>
              <FormGroup>
                <Input
                  type="select"
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="all-year" select="selected">
                    All
                  </option>
                  {yearIncome
                    ?.map((a) => a)
                    .reverse()
                    .map((item) => (
                      <option value={item.year}>{item.year}</option>
                    ))}
                </Input>
              </FormGroup>
            </div>
          </div>
        </div>
        <div id="month" style={{ display: "none" }} className="px-2">
          <div style={{ display: "flex" }}>
            <h6 style={{ marginTop: "6px", paddingRight: "10px" }}>By Month</h6>
            <div>
              <FormGroup>
                <Input
                  type="select"
                  name="month"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="all-month" select="selected">
                    All
                  </option>
                  {monthName.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>
        </div>
        <div id="day" style={{ display: "none" }} className="px-2">
          <div style={{ display: "flex" }}>
            <h6 style={{ marginTop: "6px", paddingRight: "10px" }}>By Date</h6>
            <div>
              <FormGroup>
                <Input
                  type="select"
                  name="category"
                  id="exampleSelect"
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="all-day" select="selected">
                    All
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option id="feb1" value="29">
                    29
                  </option>
                  <option id="feb2" value="30">
                    30
                  </option>
                  <option id="last" style={{ display: "none" }} value="31">
                    31
                  </option>
                </Input>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table
          borderless
          hover
          striped
          responsive
          style={{ width: "40%", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th id="title" style={{ width: "3vw", fontSize: "20px" }}>
                Year
              </th>
              <th style={{ width: "3vw", fontSize: "20px" }}>Income</th>
            </tr>
          </thead>
          <tbody id="year-income">
            {yearIncome
              ?.map((a) => a)
              .reverse()
              .map((item) => (
                <tr>
                  <td>{item.year}</td>
                  <td>৳{item.income}</td>
                </tr>
              ))}
          </tbody>
          <tbody style={{ display: "none" }} id="month-income">
            {monthIncome?.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.amount !== "-" ? <>৳{item.amount}</> : "-"}</td>
              </tr>
            ))}
          </tbody>
          <tbody style={{ display: "none" }} id="day-income">
            {dayIncome?.map((item) => (
              <tr>
                <td>{item.day}</td>
                <td>{item.amount !== "-" ? <>৳{item.amount}</> : "-"}</td>
              </tr>
            ))}
          </tbody>
          <tbody style={{ display: "none" }} id="single-day-income">
            <tr>
              <td>{singleDayIncome?.day}</td>
              <td>
                {singleDayIncome?.day_income !== null ? (
                  <>৳{singleDayIncome?.day_income}</>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
};

export default Bar;
