import React from "react";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Home from "./layouts/home";
import NotFoundPage from "./components/notFoundPage";
import UserPage from "./components/userPage";
import Users from "./components/users";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/users/:userId" component={ UserPage } />
                <Route path="/users" component={ Users } />
                <Route path="*" component={ NotFoundPage } />
            </Switch>
        </>
    );
};

export default App;
