import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Tabs } from "@yazanaabed/react-tabs";
import axios from "axios";

import "../css/Board.css";
import { baseURL } from "../common/config";

export default function Board(props) {
  const [title, setTitle] = useState("");
  const [totalNumber, setTotalNumber] = useState(0);
  const [content, setContent] = useState("");
  const [survey, setSurvey] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [advertiseRegister, setAdvertiseRegister] = useState(false);
  const [data, setData] = useState();
  const missionData = async () => {
    const { data } = await axios.get(
      `${baseURL}/advertise/mission_check?id=${props.myStorage.getItem("id")}`
    );
    setData(data);
    console.log("data.advertises", data.advertises);
    if (!data) {
      console.log("data가 없습니다. ");
    }
  };

  const missionView = () => {
    if (data) {
      return data.advertises.map((item, idx) => {
        const requestedDate = item.date;
        const dateSplit = requestedDate.split("T");
        const startDate = item.startDate.substring(
          0,
          item.startDate.length - 8
        );
        const endDate = item.endDate.substring(0, item.endDate.length - 8);
        const startDateSplit = startDate.split("T");
        const endDateSplit = endDate.split("T");

        return (
          <tr>
            <th scope="col" className="index">
              {idx + 1}
            </th>
            <th scope="col">
              {item.status === "waiting" ? (
                <button className="btn-primary">{item.status}</button>
              ) : null}
              {item.status === "success" ? (
                <button className="btn-success">{item.status}</button>
              ) : null}
              {item.status === "denied" ? (
                <button className="btn-danger">{item.status}</button>
              ) : null}
            </th>
            <th scope="col" className="board-title">
              {item.title}
            </th>
            <th scope="col" className="request-day">
              {dateSplit[0]}
            </th>
            <th scope="col" className="total-number">
              {item.totalNumber}
            </th>
            <th scope="col" className="start-day">
              {startDateSplit[0]}-{startDateSplit[1]}
            </th>
            <th scope="col" className="end-day">
              {endDateSplit[0]}-{endDateSplit[1]}
            </th>
          </tr>
        );
      });
    }
  };

  useEffect(() => {
    missionData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/advertise/mission`, {
      id: props.myStorage.getItem("id"),
      title,
      totalNumber,
      content,
      survey,
      startDate,
      endDate
    });
    console.log(data);
    if (data.result) {
      console.log(data.result);
      setAdvertiseRegister(true);
    } else {
      alert("Advertise Registration is failed");
    }
  };

  return (
    <>
      <h1>{props.myStorage.getItem("id")}님의 광고 관리 / 등록 화면입니다. </h1>
      <Tabs activeTab={{ id: "tab1" }}>
        <Tabs.Tab id="tab1" title="광고 관리">
          {/* {missionData()} */}

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">상태</th>
                <th scope="col">광고명</th>
                <th scope="col">광고요청일</th>
                <th scope="col">총원</th>
                <th scope="col">광고시작일</th>
                <th scope="col">광고마감일</th>
              </tr>
              {/* data handling */}
              {missionView()}
            </thead>
          </table>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" title="광고 등록">
          {advertiseRegister && <Redirect to="/home" />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="title form-control"
                placeholder="Enter Title"
                id="title"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="total-number">Mission Total User</label>
              <input
                type="number"
                className="total-number form-control"
                placeholder="0"
                id="total-number"
                value={totalNumber}
                onChange={e => {
                  setTotalNumber(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="content form-control"
                placeholder="Enter content"
                id="content"
                value={content}
                onChange={e => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="survey">Survey</label>
              <input
                type="text"
                className="survey form-control"
                placeholder="Enter survey"
                id="survey"
                value={survey}
                onChange={e => {
                  setSurvey(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="datetime"
                className="start-date datepicker form-control"
                id="startDate"
                min={new Date()}
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="end-date datepicker form-control"
                placeholder="Enter End Date"
                min={new Date()}
                id="endDate"
                value={endDate}
                onChange={e => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
