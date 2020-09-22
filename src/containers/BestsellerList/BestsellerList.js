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
            lastBestsellerDate: '2017-01-29',
        },
        queryChenges: false,
        searchByLastDate: false,
    };

    componentDidUpdate() {
        console.log('Update!');
        let queryValues = this._getValuesFromURL();
        const { dateValue, categoryValue } = this.state.queryValues;
        if (
            categoryValue !== queryValues.categoryValue ||
            (dateValue !== queryValues.dateValue && dateValue !== queryValues.lastBestsellerDate) ||
            (dateValue === queryValues.lastBestsellerDate &&
                this._isEarlierThanLastBestsellerDate(queryValues.lastBestsellerDate, queryValues.dateValue))
        ) {
            console.log('Update [2]');
            this.setState({ queryValues, searchByLastDate: false }, this._getBooksFromNYTApi);
        }
    }

    _isEarlierThanLastBestsellerDate(lastBestsellerDate, choosenDate) {
        const d1 = new Date(lastBestsellerDate);
        const d2 = new Date(choosenDate);
        return d1 > d2;
    }

    _getValuesFromURL() {
        const query = new URLSearchParams(this.props.location.search);
        console.log('ss');
        let queryValues = {};
        for (let param of query.entries()) {
            queryValues[param[0]] = param[1];
        }
        if (this.state.searchByLastDate) {
            queryValues = this._searchByLastBestsellerDate(queryValues);
        }
        return queryValues;
    }

    _searchByLastBestsellerDate(queryValues) {
        const updatedQuery = { ...queryValues };
        updatedQuery.dateValue = queryValues.lastBestsellerDate;
        return updatedQuery;
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
            .catch((error) => {
                if (error.response.data.errors[0] === 'No list found for list name and/or date provided.') {
                    this.setState({ searchByLastDate: true });
                } else this.setState({ error: true });
            });
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
                {error && <p>We have a problem! Try again later. </p>}
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
