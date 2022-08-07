import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoOddValores, fn } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function MosaicoOddValor({ title }) {

  useDocumentTitle(title);

  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [header, setHeader] = useState([]);
  const [showNumberOdd, setShowNumberOdd] = useState(2);
  const [totalPagoHora, setTotalPagoHora] = useState(0);

  const addTotalPago = (horaAtual) => {
    let total = 0
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:00`]))
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:03`]))
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:06`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:09`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:12`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:15`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:18`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:21`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:24`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:27`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:30`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:33`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:36`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:39`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:42`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:45`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:48`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:51`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:54`]));
    total += parseFloat(getValor(dadosCorridas[`${horaAtual}:57`]));
    return "R$ " + fn(total);
  }

  const getValor = (corrida) => {
    if (corrida === undefined) return 0;
    if (typeof corrida !== "object") return 0;
    let valor = 0;
    corrida.map((elem, index) => {
      let posicaoExibir = index + 1;
      if (showNumberOdd === posicaoExibir) {
        valor = elem;
      }
      return elem;
    });
    return valor;
  }
  const ultimasCorridas = () => {
    try {
      API.get(`api/ultimas-corrida-valores`).then(async (res) => {
        setDadosCorridas(res.data.mosaico);
      });
    } catch (e) {}
  }

  useEffect(() => {
    let values = [];
    var dt1 = new Date().toLocaleString("en-GB", {
      hour: "2-digit",
      timeZone: "Europe/London",
    });

    for (let i = 0; i < 24; i++) {
      let hora = dt1 - i //data.getHours() - i;
      
      if (hora < 0) {
        hora = hora + 24 ;
      }
      if(hora < 10) hora = "0" + hora;
      values.push(hora);
    }
    values.reverse();
    setHeader(values)
    ultimasCorridas();

    
    const ajaxTime = setInterval(() => {
      ultimasCorridas();
    }, 45000);

    return (_) => clearTimeout(ajaxTime)
  }, [])

  useEffect(() => {
    
  }, [dadosCorridas]);

  return (
    <>
      <div className="side-app">
        <div className="main-container container-fluid">
          <div className="row mt-5">
            <div className="col-lg-12 col-md-6 col-sm-12">
              <div className="card overflow-hidden bg-info-transparent">
                <div className="card-body">
                  <div className="row">
                    <h1 className="page-title text-center">MOSAICO DE ODD</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div className="row mb-5">
                    <div className="btn-list col-12 text-center">
                      <a
                        className={
                          showNumberOdd == 1
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd(1)}
                      >
                        Valor Previsão
                      </a>
                      <a
                        className={
                          showNumberOdd == 2
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd(2)}
                      >
                        Valor Tricast
                      </a>
                    </div>
                  </div>
                  {Object.entries(dadosCorridas).forEach(([chave, valor]) => {
                    <tr>
                      <th>{chave}</th>
                    </tr>;
                  })}
                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-odd">
                      <thead>
                        <tr style={{ backgroundColor: "#EDEDED" }}>
                          <th></th>
                          <th>00</th>
                          <th>03</th>
                          <th>06</th>
                          <th>09</th>
                          <th>12</th>
                          <th>15</th>
                          <th>18</th>
                          <th>21</th>
                          <th>24</th>
                          <th>27</th>
                          <th>30</th>
                          <th>33</th>
                          <th>36</th>
                          <th>39</th>
                          <th>42</th>
                          <th>45</th>
                          <th>48</th>
                          <th>51</th>
                          <th>54</th>
                          <th>57</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {header.map((item, key) => (
                          <tr key={key}>
                            <th>{item}</th>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:00`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:03`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:06`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:09`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:12`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:15`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:18`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:21`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:24`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:27`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:30`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:33`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:36`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:39`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:42`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:45`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:48`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:51`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:54`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOddValores(
                                    dadosCorridas[`${item}:57`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>{addTotalPago(item)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ backgroundColor: "#EDEDED" }}>
                          <th></th>
                          <th>00</th>
                          <th>03</th>
                          <th>06</th>
                          <th>09</th>
                          <th>12</th>
                          <th>15</th>
                          <th>18</th>
                          <th>21</th>
                          <th>24</th>
                          <th>27</th>
                          <th>30</th>
                          <th>33</th>
                          <th>36</th>
                          <th>39</th>
                          <th>42</th>
                          <th>45</th>
                          <th>48</th>
                          <th>51</th>
                          <th>54</th>
                          <th>57</th>
                          <th></th>
                        </tr>
                      </tfoot>
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
