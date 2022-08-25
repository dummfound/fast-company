import React from "react";
import NavBar from "./components/navBar";

import { Route, Switch } from "react-router-dom";
import Home from "./layouts/home";
import Login from "./layouts/Login";
import NotFound from "./components/not-found";

import UserListSecond from "./components/userListSecond";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />

                <Route path="/users/:userId?" component={UserListSecond} />
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
