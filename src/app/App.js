import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/UI/navBar";
import UserPageEdit from "./components/page/editUserPage";
import UserPage from "./components/page/userPage";
import UsersListPage from "./components/page/usersListPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId/edit" component={UserPageEdit} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={UsersListPage} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
