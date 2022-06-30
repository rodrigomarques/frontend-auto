import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import Header from "./header";
import { percentStyle } from "./../../../util/funcao";

export default function Maxima() {
  const [maxima, setMaxima] = useState({});
  const [maximaForaPodio, setMaximaForaPodio] = useState({});
  const [corridasNoPodio, setCorridasNoPodio] = useState({});
  const [corridasForaPodio, setCorridasForaPodio] = useState({});
  let posicoes = { pos1: { atual: 0, maxima: 0 }, pos2: { atual: 0, maxima: 0 }, pos3: { atual: 0, maxima: 0 } }
  const [corridasForaPodioPorPiloto, setCorridasForaPodioPorPiloto] = useState({
    piloto1: posicoes,
    piloto2: posicoes,
    piloto3: posicoes,
    piloto4: posicoes,
    piloto5: posicoes,
    piloto6: posicoes,
    piloto7: posicoes,
    piloto8: posicoes,
    piloto9: posicoes,
    piloto10: posicoes,
    piloto11: posicoes,
    piloto12: posicoes,
  });

  const maxima24HorasCorridasPorPosicao = () => {
    try {
      API.get(`api/admin/maxima24HorasCorridasPorPosicao`).then((res) => {
        setCorridasForaPodioPorPiloto(res.data.maximaForaPodio);
      });
    } catch (e) {}
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

  useEffect(() => {
    maxima24HorasCorridas()
    maxima24HorasCorridasPorPosicao()

    const ajaxTime = setInterval(() => {
      maxima24HorasCorridas();
      maxima24HorasCorridasPorPosicao()
    }, 45000);

    return (_) => clearTimeout(ajaxTime)
  }, [])

  return (
    <>
      <div className="side-app">
        <div className="main-container container-fluid">
          <Header />
          <div className="row">
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_1.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 1</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto1.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_2.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 2</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto2.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_3.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 3</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto3.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_4.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 4</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto4.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
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
                      <img alt="piloto" src="/assets/images/grand_prix_5.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 5</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto5.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_6.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 6</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto6.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_7.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 7</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto7.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_8.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 8</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto8.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
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
                      <img alt="piloto" src="/assets/images/grand_prix_9.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 9</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto9.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_10.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 10</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto10.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_11.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 11</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto11.pos3.maxima}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12 col-lg-6">
              <div className="card">
                <div className="card-header justify-content-center">
                  <div className="card-title">
                    <p className="text-center mt-0 mb-0">
                      <img alt="piloto" src="/assets/images/grand_prix_12.png" />
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
                  <hr className="mt-5 mb-5" />
                  <div className="table-responsive">
                    <p>
                      Sem o <strong>piloto 12</strong> no pódio
                    </p>
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard">
                      <thead className="bg-gray-transparent">
                        <tr>
                          <th></th>
                          <th>Atual</th>
                          <th>Máxima</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1º</td>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos1.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos1.maxima}</td>
                        </tr>
                        <tr>
                          <th>2º</th>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos2.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos2.maxima}</td>
                        </tr>
                        <tr>
                          <th>3º</th>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos3.atual}</td>
                          <td>{corridasForaPodioPorPiloto.piloto12.pos3.maxima}</td>
                        </tr>
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