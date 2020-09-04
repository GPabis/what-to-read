import React, { Component } from "react";
import axios from "../../axios-orders";
import BestsellerItems from "../../components/BestsellerItems/BestsellerItems";

const date = "2018-01-21";
const list = "combined-print-and-e-book-fiction";
const apiKey = "?api-key=ilptxndRe94rjpJtp6jt9YZzhEhaLIBK";

export default class BestsellerList extends Component {
  state = {
    bestsellerList: {
      category: null,
      publication_date: null,
    },
    books: [],
    error: false,
  };

  componentDidMount() {
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
      .get("/" + date + "/" + list + ".json" + apiKey)
      .then((response) => {
        console.log(response);
        this.setState({
          bestsellerList: {
            publication_date: response.data.results.bestsellers_date,
            category: response.data.results.display_name,
          },
        });
        console.log(this.state.bestsellerList);
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
          publicationDate={this.state.bestsellerList.publication_date}
          bestsellerItemsArr={this.state.books}
        />
      );
    }

    return booksList;
  }
}
