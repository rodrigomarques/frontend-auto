import React, { useEffect, useState } from "react";
import { fn, totalDias } from "./../../../util/funcao";

import { useNavigate } from "react-router-dom";
import API from "./../../../http/api";

import useDocumentTitle from "./../Title/useDocumentTitle";

export default function Planos({ title }) {
  useDocumentTitle(title);

  let navigate = useNavigate();
  const [planos, setPlanos] = useState([]);

  const listarPlanos = () => {
    try {
      API.get(`api/admin/plano`).then(async (res) => {
        setPlanos(res.data.entity);
      });
    } catch (e) {}
  };

  const escolherPlano = (plano) => {
    navigate("/admin/checkout", { state: { plano } });
  };

  useEffect(() => {
    listarPlanos();
  }, []);

  return (
    <>
      <div className="side-app" >
        <div className="main-container container-fluid">
          <div className="row justify-content-center">
            {planos.length > 0 &&
              planos.map((plano) => (
                <div className="col-sm-6 col-xl-3 primary" key={plano.id}>
                  <div className="princing-item mb-4 mt-6">
                    <div className="pricing-divider text-center br-5">
                      <h3 className="text-light">{plano.plano}</h3>
                      <h4 className="my-0 display-2 text-light fw-normal mb-3">
                        <span className="h3">R$</span> {fn(plano.valor)}
                      </h4>
                      <svg
                        class="pricing-divider-img"
                        enable-background="new 0 0 300 100"
                        height="100px"
                        id="Layer_1"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 300 100"
                        width="300px"
                        x="0px"
                        xmlSpace="preserve"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                        y="0px"
                      >
                        <path
                          class="deco-layer deco-layer--1"
                          d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
                                    c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z"
                          fill="#FFFFFF"
                          opacity="0.6"
                        ></path>
                        <path
                          class="deco-layer deco-layer--2"
                          d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
                                    c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z"
                          fill="#FFFFFF"
                          opacity="0.6"
                        ></path>
                        <path
                          class="deco-layer deco-layer--3"
                          d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
                                    H42.401L43.415,98.342z"
                          fill="#FFFFFF"
                          opacity="0.7"
                        ></path>
                        <path
                          class="deco-layer deco-layer--4"
                          d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
                                c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z"
                          fill="#FFFFFF"
                        ></path>
                      </svg>
                    </div>
                    <div className=" br-5 bg-white mt-0 shadow text-center">
                      <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item">
                          <b>{totalDias(plano.recorrencia_mes, plano.recorrencia_dias)} dias</b> de acesso
                        </li>
                        <li className="list-group-item">
                          <b>Resultados das corridas</b>
                        </li>
                        <li className="list-group-item">
                          <b>Máximas</b> de pilotos e Odds
                        </li>
                        <li className="list-group-item">
                          <b>4</b> Mosaicos
                        </li>
                        <li className="list-group-item">
                          <b>Histórico</b> dos Pilotos
                        </li>
                        <li className="list-group-item">
                          <b>Entre outras</b> funcionalidades
                        </li>
                      </ul>
                      <div className="card-footer">
                        <button
                          type="button"
                          onClick={() => escolherPlano(plano)}
                          className="btn btn-primary "
                        >
                          Escolher Plano
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
