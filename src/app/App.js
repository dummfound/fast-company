import React from "react";
import Navbar from "./components/UI/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Home from "./layouts/home";
import NotFoundPage from "./components/UI/notFoundPage";
import UserPage from "./components/page/userPage";
import UsersListPage from "./components/page/usersListPage";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/users/:userId" component={ UserPage } />
                <Route path="/users" component={ UsersListPage } />
                <Route path="*" component={ NotFoundPage } />
            </Switch>
        </>
    );
};

export default App;
