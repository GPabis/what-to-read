import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";

const DateSelector = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export default DateSelector;
