import React, { useState } from "react";
import api from "../api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  return (
    <>
      <span className="badge bg-primary">
        {users.filter((user) => user.name === "Кокс").map((user) => user._id)}
      </span>
    </>
  );
};

export default App;
