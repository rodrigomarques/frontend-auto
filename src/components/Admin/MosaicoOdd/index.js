import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoOdd } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function MosaicoOdd({ title }) {

  useDocumentTitle(title);

  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [header, setHeader] = useState([]);
  const [showNumberOdd, setShowNumberOdd] = useState("all");
  const [horaAtual, setHoraAtual] = useState(0);
  
  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corrida-odds`).then(async (res) => {
        setDadosCorridas(res.data.mosaico);
      });
    } catch (e) {}
  }

  const configHeader = () => {
    let values = [];
    var dt1 = new Date().toLocaleString("en-GB", {
        hour: "2-digit",
        timeZone: "Europe/London",
      });
    if (horaAtual !== dt1) {
      for (let i = 0; i < 24; i++) {
        let hora = dt1 - i; //data.getHours() - i;

        if (hora < 0) {
          hora = hora + 24;
        }
        if (hora < 10) hora = "0" + hora;
        values.push(hora);
      }
      values.reverse();
      setHeader(values);
      setHoraAtual(dt1)
    }
  }

  useEffect(() => {
    configHeader()
    ultimasCorridas();

    
    const ajaxTime = setInterval(() => {
      ultimasCorridas();
      configHeader()
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
            <div className="col-lg-12 col-sm-12">
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
                        Odd Back
                      </a>
                      <a
                        className={
                          showNumberOdd == 2
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd(2)}
                      >
                        Odd Previsão
                      </a>
                      <a
                        className={
                          showNumberOdd == "all"
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd("all")}
                      >
                        Odd Tricast
                      </a>
                    </div>
                  </div>
                  {Object.entries(dadosCorridas).forEach(([chave, valor]) => (
                    <tr>
                      <th>{chave}</th>
                    </tr>
                  ))}
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
                        </tr>
                      </thead>
                      <tbody>
                        {header.map((item) => (
                          <tr>
                            <th>{item}</th>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:00`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:03`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:06`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:09`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:12`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:15`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:18`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:21`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:24`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:27`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:30`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:33`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:36`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:39`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:42`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:45`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:48`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:51`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:54`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoOdd(
                                    dadosCorridas[`${item}:57`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
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
