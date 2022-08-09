import React from "react";
import Navbar from "./components/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Posts from "./components/posts";
import NotFoundPage from "./components/notFoundPage";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/users/:userId?" component={ Posts } />
                <Route path="/404" component={ NotFoundPage } />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
