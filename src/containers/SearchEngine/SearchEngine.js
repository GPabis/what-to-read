import React, { Component } from "react";
import classes from "./SearchEngine.module.css";
import DateSelector from "./DateSelector/DateSelector";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios-orders";
import BestsellerTypes from "../../components/BestsellerTypes/BestsellerTypes";

const apiKey = "?api-key=ilptxndRe94rjpJtp6jt9YZzhEhaLIBK";

export default class SearchEngine extends Component {
  state = {
    bestsellerTypes: [],
    error: false,
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

  render() {
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

    return (
      <form className={classes.SearchEngine}>
        <DateSelector />
        <select className={classes.Select}>{bestsellerOptions}</select>
        <button className={classes.Button}>SEARCH</button>
      </form>
    );
  }
}
