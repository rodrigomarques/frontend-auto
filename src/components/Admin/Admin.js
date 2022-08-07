import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import Planos from "./Planos";
import Layout from "./Layout";
import MosaicoOdd from "./MosaicoOdd";
import MosaicoValores from "./MosaicoValores";
import Mosaicos from "./Mosaicos";
import Checkout from "./Planos/checkout";
import ProximasCorridas from "./ProximasCorridas";
import Maximas from "./Maximas";
import Pilotos from "./Maximas/pilotos";
import EditarPerfil from "./User/index";
import { useNavigate, useLocation } from "react-router-dom";
import MyContext from "./../../context";

function Admin() {
  
  const location = useLocation();
  let navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);

  if (user !== null) {
    if (user.perfil === "CLI" && (user.plano_id === null || user.dtExpiracao == null)
        && !["/admin/planos", "/admin/checkout"].includes(location.pathname)) {
      navigate("/admin/planos");
      return;
    }
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard title={"Dashboard - Sistema Autobet"} />} />
        <Route path="/planos" element={<Planos title={"Planos - Sistema Autobet"} />} />
        <Route path="/checkout" element={<Checkout title={"Checkout - Sistema Autobet"} />} />
        <Route path="/proximas-corridas" element={<ProximasCorridas title={"Próximas Corridas - Sistema Autobet"} />} />
        <Route path="/mosaico-back" element={<Mosaicos key={1} show={1} title={"Mosaico - Sistema Autobet"} />} />
        <Route path="/mosaico-prev" element={<Mosaicos key={2} show={2} title={"Mosaico - Sistema Autobet"} />} />
        <Route path="/mosaico-tri" element={<Mosaicos key={3} show={"all"} title={"Mosaico - Sistema Autobet"} />} />
        <Route path="/mosaico-odd" element={<MosaicoOdd title={"Mosaico ODDs - Sistema Autobet"} />} />
        <Route path="/mosaico-valores" element={<MosaicoValores title={"Mosaico de Valores - Sistema Autobet"} />} />
        <Route path="/maximas" element={<Maximas title={"Máxima - Sistema Autobet"} />} />
        <Route path="/pilotos" element={<Pilotos title={"Máxima por Pilotos - Sistema Autobet"} />} />
        <Route path="/editar-perfil" element={<EditarPerfil title={"Editar Perfil - Sistema Autobet"} />} />
      </Routes>
    </Layout>
  );
}

export default Admin;
