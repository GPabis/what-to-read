import React, { Component } from 'react';
import axios from '../../axios-orders';
import BestsellerItems from '../../components/BestsellerItems/BestsellerItems';

const apiKey = '?api-key=ilptxndRe94rjpJtp6jt9YZzhEhaLIBK';

export default class BestsellerList extends Component {
    state = {
        bestsellerList: {
            category: null,
            publication_date: null,
        },
        books: [],
        error: false,
        queryValues: {
            dateValue: '2020-01-01',
            categoryValue: 'hardcover-nonfiction',
        },
        queryChenges: false,
    };

    componentDidUpdate() {
        const query = new URLSearchParams(this.props.location.search);
        const queryValues = {};
        for (let param of query.entries()) {
            queryValues[param[0]] = param[1];
        }
        const { dateValue, categoryValue } = this.state.queryValues;

        if (categoryValue !== queryValues.categoryValue || dateValue !== queryValues.dateValue) {
            this.setState({ queryValues }, this._getBooksFromNYTApi);
        }
    }

    _getBooksFromNYTApi = () => {
        this.setState({ error: false });
        const { dateValue, categoryValue } = this.state.queryValues;

        axios
            .get(`/${dateValue}/${categoryValue}.json${apiKey}`)
            .then((response) => {
                const { books: bookList, bestsellers_date, display_name } = response.data.results;

                const books = bookList.map((book) => {
                    const { rank, title, author, description, book_image, amazon_product_url } = book;
                    return {
                        rank,
                        title,
                        author,
                        description,
                        book_image,
                        amazon_product_url,
                    };
                });

                this.setState({
                    bestsellerList: {
                        publication_date: bestsellers_date,
                        category: display_name,
                    },
                    books,
                });
            })
            .catch(() => this.setState({ error: true }));
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const queryValues = {};
        for (let param of query.entries()) {
            queryValues[param[0]] = param[1];
        }
        this.setState({ queryValues: queryValues });
        this._getBooksFromNYTApi();
    }

    render() {
        const { error, books } = this.state;
        return (
            <>
                {error && <p>We have a problem!</p>}
                {!error && !books.length && <p>Loading...</p>}
                {!error && !!books.length && (
                    <BestsellerItems
                        category={this.state.bestsellerList.category}
                        publicationDate={this.state.bestsellerList.publication_date}
                        bestsellerItemsArr={this.state.books}
                    />
                )}
            </>
        );
    }
}
