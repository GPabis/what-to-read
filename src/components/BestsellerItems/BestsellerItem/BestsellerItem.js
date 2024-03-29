import React from 'react';
import classes from './BestsellerItem.module.css';
import classesBtn from '../../UI/Button/Button.module.css';

const bestsellerItem = (props) => (
    <div className={classes.BestsellerItem}>
        <img src={props.image} alt="Something wrong"></img>
        <div className={classes.Description}>
            <h2>
                {props.rank}.{props.title}
            </h2>
            <h3>by {props.author}</h3>
            <div>
                <h3>Description:</h3>
                <p>{props.description}</p>
            </div>
        </div>
        <div className={classes.Buttons}>
            <a className={classesBtn.Button} href={props.amazonLink} target="_blank" rel="noopener noreferrer">
                BUY
            </a>
        </div>
    </div>
);

export default bestsellerItem;
