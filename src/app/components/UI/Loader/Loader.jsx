import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
    return (
        <>
            <div className={classes.wrap}>
                <div className={classes.loader}></div>
                <span className={classes.text}>loading...</span>
            </div>
        </>
    );
};

export default Loader;
