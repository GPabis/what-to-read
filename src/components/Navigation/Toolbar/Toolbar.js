import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import SearchEngine from "../../../containers/SearchEngine/SearchEngine";

const toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <Logo />
      <SearchEngine />
    </div>
  );
};

export default toolbar;
