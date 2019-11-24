import React, { useState } from "react";
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
  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/advertise/mission`, {
      title,
      totalNumber,
      content,
      survey,
      startDate,
      endDate
    });
    if (data.result) {
      console.log(data.result);
      setAdvertiseRegister(true);
    } else {
      alert("Advertise Registration is failed");
    }
  };

  return (
    <>
      {advertiseRegister && <Redirect to="/board" />}
      <h1>{props.id}님의 광고 관리 Page입니다. </h1>
      <Tabs activeTab={{ id: "tab1" }}>
        <Tabs.Tab id="tab1" title="광고 관리">
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
                <th scope="col">관리</th>
              </tr>
              <tr>
                <th scope="col">11111111</th>
                <th scope="col">22222222</th>
                <th scope="col">33333333</th>
                <th scope="col">44444444</th>
                <th scope="col">55555555</th>
                <th scope="col">66666666</th>
                <th scope="col">77777777</th>
                <th scope="col">88888888</th>
              </tr>
            </thead>
          </table>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" title="광고 등록">
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
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}
