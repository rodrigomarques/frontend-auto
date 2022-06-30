
import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';

export default function Dashboard() {
  const [dadosProximaCorrida, setDadosProximaCorrida] = useState({})
  const [maxima, setMaxima] = useState({});
  const [maximaForaPodio, setMaximaForaPodio] = useState({});
  const [corridasNoPodio, setCorridasNoPodio] = useState({});
  const [corridasForaPodio, setCorridasForaPodio] = useState({});
  const [dadosUltimasCorrida, setDadosUltimaCorrida] = useState([]);

  const getImageRunner = (posicao) => {
    return `/assets/images/grand_prix_${posicao}.png`;
  }

  const formatDate = (data) => {
    if (data === undefined) return "";
    data = data.replace("-", "/")
    let dt = new Date(data);
    return new Intl.DateTimeFormat("pt-BR").format(dt);
  };
  const formatOdd = (odd) => {
    if (odd >= 12) {
      return `<span className="tag tag-green">${odd}</span>`;
    } else if (odd >= 6) {
      return `<span className="tag tag-yellow">${odd}</span>`;
    } else {
      return `<span className="tag tag-red">${odd}</span>`;
    }
  };


  const maxima24HorasCorridas = () => {
    try {
      API.get(`api/admin/maxima24HorasCorridas`).then((res) => {
        setMaxima(res.data.maxima);
        setMaximaForaPodio(res.data.maximaForaPodio);
        setCorridasNoPodio(res.data.corridasNoPodio);
        setCorridasForaPodio(res.data.corridasForaPodio);
      });
    } catch (e) {}
  };

  const proximaCorrida = () => {
    try {
      API.get(`proxima-corrida`).then((res) => {
        setDadosProximaCorrida(res.data.proximosJogos);
      });
    } catch (e) {
      
    }
  }

  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corridas`).then((res) => {
        setDadosUltimaCorrida(res.data.jogos);
      });
    } catch (e) {}
  }

  const ceilPercent = (percent) => {
    let divisao = Math.trunc(percent / 5)
    return divisao * 5
  }

  const percentStyle = (val1, total) => {
    let vPercent = (val1 / total) * 100
    return `progress-bar progress-bar-striped bg-primary  w-${ceilPercent(vPercent)}`;
  }

  useEffect(() => {
    
    proximaCorrida();
    ultimasCorridas();
    maxima24HorasCorridas()

    const ajaxTime = setInterval(() => {
      proximaCorrida();
      maxima24HorasCorridas();
      ultimasCorridas();
    }, 45000);
    return (_) => {
      clearTimeout(ajaxTime)
    }
    
  }, [])

  return (
    <>
      <div className="side-app">
        <div className="main-container container-fluid">
          <div className="row mt-5">
            <div className="col-lg-12 col-md-6 col-sm-12">
              <div className="card overflow-hidden bg-info-transparent">
                <div className="card-body">
                  <div className="row">
                    <h1 className="page-title text-center">DASHBOARD</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_1.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto1}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto1,
                            maximaForaPodio.piloto1
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto1}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto1}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto1,
                            maxima.piloto1
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto1}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_2.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto2}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto2,
                            maximaForaPodio.piloto2
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto2}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto2}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto2,
                            maxima.piloto2
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto2}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_3.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto3}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto3,
                            maximaForaPodio.piloto3
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto3}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto3}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto3,
                            maxima.piloto3
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto3}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_4.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto4}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto4,
                            maximaForaPodio.piloto4
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto4}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto4}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto4,
                            maxima.piloto4
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto4}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_5.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto5}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto5,
                            maximaForaPodio.piloto5
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto5}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto5}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto5,
                            maxima.piloto5
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto5}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_6.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto6}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto6,
                            maximaForaPodio.piloto6
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto6}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto6}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto6,
                            maxima.piloto6
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto6}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_7.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto7}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto7,
                            maximaForaPodio.piloto7
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto7}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto7}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto7,
                            maxima.piloto7
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto7}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_8.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto8}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto8,
                            maximaForaPodio.piloto8
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto8}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto8}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto8,
                            maxima.piloto8
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto8}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_9.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto9}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto9,
                            maximaForaPodio.piloto9
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto9}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto9}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto9,
                            maxima.piloto9
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto9}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_10.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto10}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto10,
                            maximaForaPodio.piloto10
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto10}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto10}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto10,
                            maxima.piloto10
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto10}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_11.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto11}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto11,
                            maximaForaPodio.piloto11
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto11}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto11}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto11,
                            maxima.piloto11
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto11}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img src="/assets/images/grand_prix_12.png" />
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="text-dark counter mt-0 mb-3 number-font">
                    Fora do Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasForaPodio.piloto12}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasForaPodio.piloto12,
                            maximaForaPodio.piloto12
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maximaForaPodio.piloto12}</div>
                  </div>

                  <h5 className="text-dark counter mt-5 mb-3 number-font">
                    Vindo no Pódio
                  </h5>
                  <div className="row no-gutters align-items-center">
                    <div className="col-2">{corridasNoPodio.piloto12}</div>
                    <div className="col-8">
                      <div className="progress h-1 mt-0 mb-0">
                        <div
                          className={percentStyle(
                            corridasNoPodio.piloto12,
                            maxima.piloto12
                          )}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="col-2">{maxima.piloto12}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div>
                    <h3 className="card-title mb-5">Próxima Corrida</h3>
                  </div>

                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Hora</th>
                          <th>
                            <img src="/assets/images/grand_prix_1.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_2.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_3.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_4.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_5.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_6.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_7.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_8.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_9.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_10.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_11.png" />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_12.png" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{formatDate(dadosProximaCorrida.data)}</td>
                          <td>{dadosProximaCorrida.horario}</td>
                          <td>{parse(formatOdd(dadosProximaCorrida.odds1))}</td>
                          <td>
                            <span className="tag tag-yellow">
                              {dadosProximaCorrida.odds2}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-red">
                              {dadosProximaCorrida.odds3}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-green">
                              {dadosProximaCorrida.odds4}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-yellow">
                              {dadosProximaCorrida.odds5}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-red">
                              {dadosProximaCorrida.odds6}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-green">
                              {dadosProximaCorrida.odds7}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-yellow">
                              {dadosProximaCorrida.odds8}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-red">
                              {dadosProximaCorrida.odds9}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-green">
                              {dadosProximaCorrida.odds10}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-yellow">
                              {dadosProximaCorrida.odds11}
                            </span>
                          </td>
                          <td>
                            <span className="tag tag-red">
                              {dadosProximaCorrida.odds12}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div>
                    <h3 className="card-title mb-5">Últimas Corridas</h3>
                  </div>

                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Hora</th>
                          <th>Resultado</th>
                          <th>Odd 1º</th>
                          <th>Odd 2º</th>
                          <th>Odd 3º</th>
                          <th>Previsão</th>
                          <th>Tricast</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dadosUltimasCorrida.map((item) => (
                          <tr key={item.gameid}>
                            <td>{formatDate(item.data)}</td>
                            <td>
                              {item.hora2}:{item.minuto}
                            </td>
                            <td>
                              <img src={getImageRunner(item.primeiro)} />{" "}
                              <img src={getImageRunner(item.segundo)} />{" "}
                              <img src={getImageRunner(item.terceiro)} />
                            </td>
                            <td>
                              {parse(formatOdd(item.oddsprimeiro))}
                            </td>
                            <td>
                              {parse(formatOdd(item.oddssegundo))}
                            </td>
                            <td>
                              {parse(formatOdd(item.oddsterceiro))}
                            </td>
                            <td>{ item.oddsprevisao }</td>
                            <td>{ item.oddstricast }</td>
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
