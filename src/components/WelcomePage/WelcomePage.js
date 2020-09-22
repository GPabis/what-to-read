import React from 'react';
import Logo from '../Logo/Logo';
import classes from './WelcomePage.module.css';

const welcomePage = () => (
    <div className={classes.WelcomePage}>
        <Logo />
        <h2>
            Looking for a good book? Take a look at <strong>New York Times </strong>
            bestsellers!
        </h2>
        <h3>Follow the instruction:</h3>
        <ol>
            <li>Choose Date of bestsellers edition.</li>
            <li>Choose Bestsellers Category.</li>
            <li>Click on 'SEARCH' button.</li>
            <li>Enjoy!</li>
        </ol>
    </div>
);

export default welcomePage;
