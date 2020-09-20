import React, { Component } from "react";
import classes from "./SearchEngine.module.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios-orders";
import BestsellerTypes from "../../components/Navigation/Toolbar/BestsellerTypes/BestsellerTypes";
import Button from "../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

const apiKey = "?api-key=ilptxndRe94rjpJtp6jt9YZzhEhaLIBK";

class SearchEngine extends Component {
  state = {
    bestsellerTypes: [],
    error: false,
    inputValues: {
      dateValue: "2020-01-01",
      categoryValue: "hardcover-nonfiction",
      lastBestsellerDate: "2020-01-01",
    },
    selectedDate: Date.now(),
  };

  componentDidMount() {
    const typeObjectArr = [];
    axios
      .get("/names.json" + apiKey)
      .then((response) => {
        response.data.results.forEach(
          ({ list_name, list_name_encoded, newest_published_date }) => {
            typeObjectArr.push({
              bestsellerTypesName: list_name,
              bestsellerTypesEncodedName: list_name_encoded,
              bestsellerLastDate: newest_published_date,
            });
          }
        );
        this.setState({ bestsellerTypes: typeObjectArr });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  _setBestsellerOptions = () => {
    const { error, bestsellerTypes } = this.state;
    return error ? (
      <option>This isn't working</option>
    ) : !bestsellerTypes.length ? (
      <option>Loading...</option>
    ) : (
      <BestsellerTypes bestsellerTypesArr={bestsellerTypes} />
    );
  };

  submitHandler = (e) => {
    e.preventDefault();
    const queryParam = [];
    for (let i in this.state.inputValues) {
      queryParam.push(encodeURIComponent(i) + "=" + this.state.inputValues[i]);
    }
    const queryString = queryParam.join("&");
    console.log(this.props.history);
    this.props.history.push({
      pathname: "/list/",
      search: "?" + queryString,
    });
  };

  selectDateHandler = (date) => {
    let updatedInputValues = { ...this.state.inputValues };
    updatedInputValues.dateValue = date.toISOString().slice(0, 10);
    this.setState({
      inputValues: { ...updatedInputValues },
      selectedDate: date,
    });
  };

  selectCategoryHanlder = (e) => {
    const currentBestsellerCategory = [...this.state.bestsellerTypes];
    const updatedInputValues = { ...this.state.inputValues };
    let encodedCathegory = currentBestsellerCategory.find((elem) => {
      return elem.bestsellerTypesName === e.target.value;
    });
    console.log(encodedCathegory);
    updatedInputValues.categoryValue =
      encodedCathegory.bestsellerTypesEncodedName;
    updatedInputValues.lastBestsellerDate = encodedCathegory.bestsellerLastDate;
    console.log("1", updatedInputValues);
    this.setState(
      {
        inputValues: { ...updatedInputValues },
      },
      console.log("2", this.state.inputValues)
    );
    console.log("3", this.state.inputValues);
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className={classes.SearchEngine}>
        <DatePicker
          selected={this.state.selectedDate}
          dateFormat="yyyy-MM-dd"
          onChange={this.selectDateHandler}
        />
        <select
          onChange={this.selectCategoryHanlder}
          className={classes.Select}
        >
          {this._setBestsellerOptions()}
        </select>
        <Button>SEARCH</Button>
      </form>
    );
  }
}

export default withRouter(SearchEngine);
