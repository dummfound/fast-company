import React from "react";
import User from "./user";
import Users from "./users";
import { useParams } from "react-router-dom";

const UserListSecond = () => {
    const params = useParams();

    const { userId } = params;

    return <>{userId ? <User id={userId} /> : <Users />}</>;
};

export default UserListSecond;
