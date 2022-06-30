import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import { formatOdd } from "./../../../util/funcao";
import Header from "./header";
import parse from "html-react-parser";

export default function Pilotos() {
  const [resultadoPilotos, setResultadoPilotos] = useState([]);
  const [allPilotos, setAllPilotos] = useState([]);
  const [nome, setNome] = useState('');

  const maximaPilotos = () => {
    try {
      API.get(`api/admin/maximaPilotos`).then((res) => {
        setAllPilotos(res.data.resultadoPilotos);
        setResultadoPilotos(res.data.resultadoPilotos)
        });
    } catch (e) {console.log(e);}
  };

  useEffect(() => {
    maximaPilotos();

    setInterval(() => {
      maximaPilotos();
    }, 90000);
  }, [])

  useEffect(() => {
    let pilotos = allPilotos.filter((item) =>
      item.nome.toUpperCase().includes(nome.toUpperCase())
    );
    setResultadoPilotos(pilotos)
  }, [nome]);

  return (
    <>
      <div class="side-app">
        <div class="main-container container-fluid">
          <Header />
          <div class="row row-sm">
            <div class="col-lg-12">
              <div class="card custom-card">
                <div class="card-body">
                  <div class="row justify-content-end mb-5">
                    <div class="col-5">
                      <div class="main-header-center ms-8 d-none d-lg-block">
                        <input
                          class="form-control"
                          placeholder="Digite o nome do piloto..."
                          type="search"
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-odd">
                      <thead>
                        <tr>
                          <th></th>
                          <th>ODD</th>
                          <th>PRIMEIRO</th>
                          <th>SEGUNDO</th>
                          <th>TERCEIRO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultadoPilotos &&
                          resultadoPilotos.map((piloto) => (
                            <tr>
                              <td>{piloto.nome}</td>
                              <td>{parse(formatOdd(piloto.odd))}</td>
                              <td>{piloto.primeiro}</td>
                              <td>{piloto.segundo}</td>
                              <td>{piloto.terceiro}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}