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
    },
    selectedDate: Date.now(),
  };

  componentDidMount() {
    const typesObject = {
      bestsellerTypesName: null,
      bestsellerTypesEncodedName: null,
    };
    const typeObjectArr = [];
    axios
      .get("/names.json" + apiKey)
      .then((response) => {
        response.data.results.map((result) => {
          typesObject.bestsellerTypesName = result.list_name;
          typesObject.bestsellerTypesEncodedName = result.list_name_encoded;
          typeObjectArr.push({ ...typesObject });
          return typesObject;
        });
        this.setState({ bestsellerTypes: typeObjectArr });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  _setBestsellerOptions = () => {
    let bestsellerOptions = this.state.error ? (
      <option>This don't working</option>
    ) : (
      <option>Loading...</option>
    );
    if (this.state.bestsellerTypes.length > 0) {
      bestsellerOptions = (
        <BestsellerTypes bestsellerTypesArr={this.state.bestsellerTypes} />
      );
    }
    return bestsellerOptions;
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
    let currentBestsellerCategory = [...this.state.bestsellerTypes];
    let updatedInputValues = { ...this.state.inputValues };
    let encodedCathegory = currentBestsellerCategory.find((elem) => {
      return elem.bestsellerTypesName === e.target.value;
    });
    updatedInputValues.categoryValue =
      encodedCathegory.bestsellerTypesEncodedName;
    this.setState({
      inputValues: { ...updatedInputValues },
    });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className={classes.SearchEngine}>
        <DatePicker
          selected={this.state.selectedDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => this.selectDateHandler(date)}
        />
        <select
          onChange={(e) => this.selectCategoryHanlder(e)}
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
