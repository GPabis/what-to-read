import React, { Component } from "react";
import axios from "../../axios-orders";
import BestsellerItems from "../../components/BestsellerItems/BestsellerItems";

const apiKey = "?api-key=ilptxndRe94rjpJtp6jt9YZzhEhaLIBK";

export default class BestsellerList extends Component {
  state = {
    bestsellerList: {
      category: null,
      publication_date: null,
    },
    books: [],
    error: false,
    queryValues: {
      dateValue: "2020-01-01",
      categoryValue: "hardcover-nonfiction",
    },
    queryChenges: false,
  };

  componentDidUpdate() {
    const query = new URLSearchParams(this.props.location.search);
    const queryValues = {};
    for (let param of query.entries()) {
      queryValues[param[0]] = param[1];
    }
    if (
      this.state.queryValues.dateValue !== queryValues.dateValue ||
      this.state.queryValues.categoryValue !== queryValues.categoryValue
    ) {
      this.setState({ queryValues: queryValues });
      console.log(this.state.queryValues);
      this._getBooksFromNYTApi();
    }
  }

  _getBooksFromNYTApi = () => {
    let books = {
      rank: null,
      title: null,
      author: null,
      description: null,
      book_image: null,
      amazon_product_url: null,
    };
    let bookArr = [];

    axios
      .get(
        "/" +
          this.state.queryValues.dateValue +
          "/" +
          this.state.queryValues.categoryValue +
          ".json" +
          apiKey
      )
      .then((response) => {
        this.setState({
          bestsellerList: {
            publication_date: response.data.results.bestsellers_date,
            category: response.data.results.display_name,
          },
        });
        response.data.results.books.map((book) => {
          books.rank = book.rank;
          books.title = book.title;
          books.author = book.author;
          books.description = book.description;
          books.book_image = book.book_image;
          books.amazon_product_url = book.amazon_product_url;
          bookArr.push({ ...books });
        });
        this.setState({ books: bookArr });
        console.log(this.state.books[0]);
      })
      .catch((error) => this.setState({ error: true }));
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const queryValues = {};
    for (let param of query.entries()) {
      queryValues[param[0]] = param[1];
    }
    console.log(queryValues);
    this.setState({ queryValues: queryValues });
    this._getBooksFromNYTApi();
  }

  render() {
    let booksList = this.state.error ? (
      <p>We hava a problem!</p>
    ) : (
      <p>Loading...</p>
    );

    if (this.state.books.length > 0) {
      booksList = (
        <BestsellerItems
          category={this.state.bestsellerList.category}
          publicationDate={this.state.queryValues.date}
          bestsellerItemsArr={this.state.books}
        />
      );
    }

    return booksList;
  }
}
