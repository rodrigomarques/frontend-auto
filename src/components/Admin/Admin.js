import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import Planos from "./Planos";
import Layout from "./Layout";
import MosaicoOdd from "./MosaicoOdd";
import MosaicoValores from "./MosaicoValores";
import MosaicoCores from "./MosaicoCores";
import MosaicoParImpar from "./MosaicoParImpar";
import Mosaicos from "./Mosaicos";
import Checkout from "./Planos/checkout";
import ProximasCorridas from "./ProximasCorridas";
import Maximas from "./Maximas";
import Pilotos from "./Maximas/pilotos";
import EditarPerfil from "./User/index";
import Tutorial from "./Tutorial";
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
        <Route exact path="/admin/" element={<Dashboard title={"Dashboard - Sistema Autobet"} />} />
        <Route exact path="/admin/planos" element={<Planos title={"Planos - Sistema Autobet"} />} />
        <Route exact path="/admin/checkout" element={<Checkout title={"Checkout - Sistema Autobet"} />} />
        <Route exact path="/admin/proximas-corridas" element={<ProximasCorridas title={"Próximas Corridas - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-back" element={<Mosaicos key={1} show={1} title={"Mosaico - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-prev" element={<Mosaicos key={2} show={2} title={"Mosaico - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-tri" element={<Mosaicos key={3} show={"all"} title={"Mosaico - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-odd" element={<MosaicoOdd title={"Mosaico ODDs - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-cores" element={<MosaicoCores title={"Mosaico de Cores - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-parimpar" element={<MosaicoParImpar title={"Mosaico de Par/Ímpar - Sistema Autobet"} />} />
        <Route exact path="/admin/mosaico-valores" element={<MosaicoValores title={"Mosaico de Valores - Sistema Autobet"} />} />
        <Route exact path="/admin/maximas" element={<Maximas title={"Máxima - Sistema Autobet"} />} />
        <Route exact path="/admin/pilotos" element={<Pilotos title={"Máxima por Pilotos - Sistema Autobet"} />} />
        <Route exact path="/admin/editar-perfil" element={<EditarPerfil title={"Editar Perfil - Sistema Autobet"} />} />
        <Route exact path="/admin/tutoriais" element={<Tutorial title={"Como jogar na bet365 - Sistema Autobet"} />} />
      </Routes>
    </Layout>
  );
}

export default Admin;
