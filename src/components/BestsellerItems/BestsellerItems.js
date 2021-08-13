import React from 'react';
import BestsellerItem from './BestsellerItem/BestsellerItem';

const bestsellerItems = (props) => (
    <>
        <h1 style={{ textAlign: 'center' }}>
            Bestseller Publication Date: {props.publicationDate} | Category: {props.category}
        </h1>
        {props.bestsellerItemsArr.map((item) => {
            return (
                <BestsellerItem
                    title={item.title}
                    author={item.author}
                    description={item.description}
                    rank={item.rank}
                    key={item.rank}
                    image={item.book_image}
                    amazonLink={item.amazon_product_url}
                />
            );
        })}
    </>
);

export default bestsellerItems;
