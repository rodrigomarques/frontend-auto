import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./Dashboard";
import Planos from "./Planos";
import Layout from "./Layout";
import MosaicoOdd from "./MosaicoOdd";

import Mosaicos from "./Mosaicos";
import Checkout from "./Planos/checkout";
import ProximasCorridas from "./ProximasCorridas";

import Maximas from "./Maximas";
import Pilotos from "./Maximas/pilotos";

function Admin() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/proximas-corridas" element={<ProximasCorridas />} />
        <Route path="/mosaico-back" element={<Mosaicos key={1} show={1} />} />
        <Route path="/mosaico-prev" element={<Mosaicos key={2} show={2} />} />
        <Route path="/mosaico-tri" element={<Mosaicos key={3} show={"all"} />} />
        <Route path="/mosaico-odd" element={<MosaicoOdd />} />
        <Route path="/maximas" element={<Maximas />} />
        <Route path="/pilotos" element={<Pilotos />} />
      </Routes>
    </Layout>
  );
}

export default Admin;
