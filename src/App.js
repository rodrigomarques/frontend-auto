import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import NovoCliente from "./components/NovoCliente/NovoCliente";
import Admin from "./components/Admin/Admin";
import MyContext from "./context";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <MyContext.Provider value={{ token, setToken, user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/novo-cliente" element={<NovoCliente />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );

}

export default App;
