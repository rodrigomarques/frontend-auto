import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoCores } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";
export default function MosaicoCores({ title:tituloHeader }) {
  useDocumentTitle(tituloHeader);
  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [title, setTitle] = useState("MOSAICO DE CORES");
  const [showNumberOdd, setShowNumberOdd] = useState(1);

  const [header, setHeader] = useState([]);
  const [horaAtual, setHoraAtual] = useState(0);
  
  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corrida-piloto`).then(async (res) => {
        setDadosCorridas(res.data.mosaico);
      });
    } catch (e) {}
  };

  const atualizarHeader = () => {
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
      values.reverse()
      setHeader(values)
      setHoraAtual(dt1)
    }
  }

  useEffect(() => {
    atualizarHeader()
    ultimasCorridas()

    const ajaxTime = setInterval(() => {
      atualizarHeader();
      ultimasCorridas();
    }, 15000);

    return (_) => clearTimeout(ajaxTime);
  }, []);

  return (
    <>
      <div className="side-app">
        <div className="main-container container-fluid">
          <div className="row mt-5">
            <div className="col-lg-12 col-sm-12">
              <div className="card overflow-hidden bg-info-transparent">
                <div className="card-body">
                  <div className="row">
                    <h1 className="page-title text-center">{title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card tableCores">
                <div className="card-body">
                  <ul class="legenda mt-5">
											<li><span class="vermelho"> </span> Pilotos <br />1 - 2 - 3 - 4</li>
											<li><span class="amarelo"> </span> Pilotos <br />5 - 6 - 7 - 8</li>
											<li><span class="roxo"> </span> Pilotos <br />9 - 10 - 11 - 12</li>
									</ul>
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
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:00`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:03`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:06`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:09`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:12`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:15`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:18`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:21`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:24`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:27`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:30`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:33`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:36`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:39`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:42`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:45`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:48`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:51`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:54`],
                                    showNumberOdd
                                  )
                                )}
                              </div>
                            </td>
                            <td>
                              <div>
                                {parse(
                                  formatMosaicoCores(
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
                  <ul class="legenda mt-5">
											<li><span class="vermelho"> </span> Pilotos <br />1 - 2 - 3 - 4</li>
											<li><span class="amarelo"> </span> Pilotos <br />5 - 6 - 7 - 8</li>
											<li><span class="roxo"> </span> Pilotos <br />9 - 10 - 11 - 12</li>
										</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
