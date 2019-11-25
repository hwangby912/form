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
  const missionView = async () => {
    const { data } = await axios.get(
      `${baseURL}/advertise/mission_check?id=${props.id}`
    );
    console.log(data);
    if (!data) {
      console.log("data가 없습니다. ");
    }
    setData(data);
    // req.query.id
    // return #, status, title, request-day, totalNumber, startDay, endDay, management
  };

  useEffect(() => {
    missionView();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/advertise/mission`, {
      id: props.id,
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
      <h1>{props.id}님의 광고 관리 / 등록 화면입니다. </h1>
      <Tabs activeTab={{ id: "tab1" }}>
        <Tabs.Tab id="tab1" title="광고 관리">
          {/* {missionView} */}

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
              <tr>
                <th scope="col">11111111</th>
                <th scope="col">22222222</th>
                <th scope="col">33333333</th>
                <th scope="col">44444444</th>
                <th scope="col">55555555</th>
                <th scope="col">66666666</th>
                <th scope="col">77777777</th>
              </tr>
            </thead>
          </table>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" title="광고 등록">
          {/* {advertiseRegister && <Redirect to="/board" />} */}
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
                type="datetime-local"
                className="start-date datepicker form-control"
                placeholder="Enter Start Date"
                id="startDate"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="datetime-local"
                className="end-date datepicker form-control"
                placeholder="Enter End Date"
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
