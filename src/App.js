import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import EsqueceuSenha from "./components/Login/EsqueceuSenha";
import NovoCliente from "./components/NovoCliente/NovoCliente";
import NovoClienteCurso from "./components/NovoClienteCurso/NovoCliente";
import Admin from "./components/Admin/Admin";
import MyContext from "./context";

import "./App.css";

function App() {
  let tk = localStorage.tk !== undefined && localStorage.tk !== null ? localStorage.tk : null
  let lcUser = localStorage.user !== undefined && localStorage.user !== null ? JSON.parse(localStorage.user) : null;

  const [token, setToken] = useState(tk);
  const [user, setUser] = useState(lcUser);

  return (
    <MyContext.Provider value={{ token, setToken, user, setUser }}>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/novo-cliente" element={<NovoCliente />} />
          <Route exact path="/novo-cliente-curso" element={<NovoClienteCurso />} />
          <Route exact path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );

}

export default App;
