import React from "react";
import classes from "./BestsellerItem.module.css";
import Button from "../../UI/Button/Button";

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
      <Button>BUY</Button>
      <Button>REVIEWS</Button>
    </div>
  </div>
);

export default bestsellerItem;
