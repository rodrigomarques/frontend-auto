
import React, { useEffect, useState, useContext } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatOdd, percentStyle, formatHour, formatDate } from "./../../../util/funcao";
import useDocumentTitle from './../Title/useDocumentTitle'
import MyContext from "./../../../context";

export default function Dashboard({title}) {

  const { user, setUser } = useContext(MyContext);
  useDocumentTitle(title);

  const [dadosProximaCorrida, setDadosProximaCorrida] = useState({})
  const [dadosBot, setDadosBot] = useState({});
  const [maxima, setMaxima] = useState({});
  const [maximaForaPodio, setMaximaForaPodio] = useState({});
  const [corridasNoPodio, setCorridasNoPodio] = useState({});
  const [corridasForaPodio, setCorridasForaPodio] = useState({});
  const [dadosUltimasCorrida, setDadosUltimaCorrida] = useState([]);
  const [podio, setPodio] = useState({
    piloto1: 0,  piloto2: 0,  piloto3: 0,
    piloto4: 0,  piloto5: 0,  piloto6: 0,
    piloto7: 0,  piloto8: 0,  piloto9: 0,
    piloto10: 0, piloto11: 0, piloto12: 0,
  });

  const getImageRunner = (posicao) => {
    return `/assets/images/grand_prix_${posicao}.png`;
  }

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
        setPodio(res.data.podio);
      });
    } catch (e) {
      
    }
  }

  const bot = () => {
    try {
      API.get(`view/bot-1`).then((res) => {
        setDadosBot(res.data);
      });
    } catch (e) {}
  };

  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corridas`).then((res) => {
        setDadosUltimaCorrida(res.data.jogos);
      });
    } catch (e) {}
  }
  useEffect(() => {
    
    proximaCorrida();
    ultimasCorridas();
    maxima24HorasCorridas()
    bot()

    const ajaxTime = setInterval(() => {
      proximaCorrida();
      maxima24HorasCorridas();
      ultimasCorridas();
    }, 10000);

    const ajaxTimeBot = setInterval(() => {
      bot();
    }, 15000);
    return (_) => {
      clearTimeout(ajaxTime)
      clearTimeout(ajaxTimeBot);
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
          </div>
          <div className="row">
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
            <div className="col-xl-2 col-md-12 col-lg-6">
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
          {user.isBot !== undefined && user.isBot === 1 && 
            <>
            {dadosBot !== undefined && dadosBot.data !== undefined && (
              <div className="row row-sm">
                <div className="col-lg-12">
                  <div className="card custom-card">
                    <div className="card-body">
                      {dadosBot.showBot4 !== undefined && dadosBot.showBot4 === 1 &&
                        <div>
                          <h3 className="card-title mb-5 text-center">
                            Possíveis pilotos no pódio - {formatDate(dadosBot.data)}{" "}
                            { formatHour(dadosBot.hora) }
                          </h3>
                          <div className="text-center">
                            {dadosBot.botsugerido4 !== undefined &&
                              dadosBot.botsugerido4 !== "" &&
                              dadosBot.botsugerido4.map((itemBot) => {
                                return (
                                  <>
                                    <img src={getImageRunner(itemBot)} alt={"Bot piloto"} />{" "}
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      }
                      {(dadosBot.showBot4 === undefined || dadosBot.showBot4 !== 1) &&
                        <div>
                          <h3 className="card-title mb-5 text-center">
                            Correndo atrás dos pilotos
                          </h3>
                          <div className="text-center">
                            <img src="/assets/images/loading.gif" alt="Loading" className=" loading-gif" />
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
            </>
          }
          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div>
                    <h3 className="card-title mb-5">
                      Próxima Corrida - {dadosProximaCorrida.horario}
                    </h3>
                  </div>

                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard table-poxcorrida ">
                      <thead>
                        <tr>
                          <th>
                            <img src="/assets/images/grand_prix_1.png" alt={"Piloto 1"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_2.png" alt={"Piloto 2"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_3.png" alt={"Piloto 3"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_4.png" alt={"Piloto 4"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_5.png" alt={"Piloto 5"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_6.png" alt={"Piloto 6"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_7.png" alt={"Piloto 7"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_8.png" alt={"Piloto 8"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_9.png" alt={"Piloto 9"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_10.png" alt={"Piloto 10"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_11.png" alt={"Piloto 11"} />
                          </th>
                          <th>
                            <img src="/assets/images/grand_prix_12.png" alt={"Piloto 12"} />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds1))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome1}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto1}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds2))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome2}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto2}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds3))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome3}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto3}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds4))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome4}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto4}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds5))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome5}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto5}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds6))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome6}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto6}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds7))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome7}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto7}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds8))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome8}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto8}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds9))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome9}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto9}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds10))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome10}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto10}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds11))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome11}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto11}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
                          </td>
                          <td>
                            <p>
                              {parse(formatOdd(dadosProximaCorrida.odds12))}
                              <br />
                              <br />
                              <strong>{dadosProximaCorrida.nome12}</strong>
                              <br />
                              veio no pódio <br />
                              <span className="badge bg-default  me-1 mb-1 mt-1">
                                {podio.piloto12}
                              </span>{" "}
                              vezes <br />
                              com esta Odd
                            </p>
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
                            <td>{item.hora}</td>
                            <td>
                              <img src={getImageRunner(item.primeiro)} />{" "}
                              <img src={getImageRunner(item.segundo)} />{" "}
                              <img src={getImageRunner(item.terceiro)} />
                            </td>
                            <td>{parse(formatOdd(item.oddsprimeiro))}</td>
                            <td>{parse(formatOdd(item.oddssegundo))}</td>
                            <td>{parse(formatOdd(item.oddsterceiro))}</td>
                            <td>{item.previsao}</td>
                            <td>{item.tricast}</td>
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
