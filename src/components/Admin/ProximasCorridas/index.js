import React, { useEffect, useState } from "react";
import API from "../../../http/api";
import { getImageRunner, formatOdd } from "../../../util/funcao";
import parse from "html-react-parser";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function ProximasCorridas({ title }) {
  useDocumentTitle(title);
  const [jogos, setJogos] = useState([]);
  const [jogoAtual, setJogoAtual] = useState({
    nome1: "", nome2: "", nome3: "", nome4: "", nome5: "", nome6: "", nome7: "", nome8: "", nome9: "", nome10: "", nome11: "", nome12: "",
    odds1: "", odds2: "", odds3: "", odds4: "", odds5: "", odds6: "", odds7: "", odds8: "", odds9: "", odds10: "", odds11: "", odds12: ""  });
  const [podio, setPodio] = useState({});

  const ultimasCorridas = () => {
    try {
      API.get(`api/admin/corridas/proximas`).then(async (res) => {
        setJogos(res.data.jogos);
        if (jogoAtual.hasOwnProperty("nome1") === false || jogoAtual.nome1 === "") {
          setJogoAtual(res.data.jogos[0]);
          carregarPodio(res.data.jogos[0].gameid);
        }
      });
    } catch (e) {}
  }

  const carregarPodio = (gameid) => {
    try {
      API.get(`api/admin/corridas/${gameid}/podio`).then(async (res) => {
        setPodio(res.data.podio);
      });
    } catch (e) {}
  }

  useEffect(() => {
    ultimasCorridas()
  }, [])

  return (
    <>
      <div className="side-app" style={{ marginBottom: 40 }}>
        <div className="main-container container-fluid">
          <div className="row mt-5">
            <div className="col-lg-12 col-sm-12">
              <div className="card overflow-hidden bg-info-transparent">
                <div className="card-body">
                  <div className="row">
                    <h1 className="page-title text-center">
                      PRÓXIMAS CORRIDAS
                    </h1>
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
                      {jogos.map((jogo) => {
                        return (
                          <a
                            href="javascript:void(0);"
                            className={
                              jogoAtual.gameid === jogo.gameid
                                ? "btn btn-primary"
                                : "btn btn-primary-light"
                            }
                            key={jogo.gameid}
                            onClick={() => {
                              setJogoAtual(jogo);
                              carregarPodio(jogo.gameid);
                            }}
                          >
                            {jogo.horario}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-dashboard table-poxcorrida">
                      <thead>
                        <tr>
                          <th>
                            <img src={getImageRunner(1)} />
                          </th>
                          <th>
                            <img src={getImageRunner(2)} />
                          </th>
                          <th>
                            <img src={getImageRunner(3)} />
                          </th>
                          <th>
                            <img src={getImageRunner(4)} />
                          </th>
                          <th>
                            <img src={getImageRunner(5)} />
                          </th>
                          <th>
                            <img src={getImageRunner(6)} />
                          </th>
                          <th>
                            <img src={getImageRunner(7)} />
                          </th>
                          <th>
                            <img src={getImageRunner(8)} />
                          </th>
                          <th>
                            <img src={getImageRunner(9)} />
                          </th>
                          <th>
                            <img src={getImageRunner(10)} />
                          </th>
                          <th>
                            <img src={getImageRunner(11)} />
                          </th>
                          <th>
                            <img src={getImageRunner(12)} />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {jogoAtual !== undefined && (
                          <tr>
                            <td>{parse(formatOdd(jogoAtual.odds1))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds2))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds3))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds4))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds5))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds6))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds7))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds8))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds9))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds10))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds11))}</td>
                            <td>{parse(formatOdd(jogoAtual.odds12))}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {jogoAtual !== undefined && (
            <>
              <div className="row">
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(1)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome1}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto1}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds1))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(2)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome2}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto2}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds2))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(3)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome3}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto3}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds3))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(4)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome4}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto4}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds4))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(5)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome5}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto5}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds5))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(6)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome6}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto6}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds6))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(7)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome7}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto7}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds7))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(8)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome8}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto8}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds8))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(9)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome9}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto9}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds9))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(10)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome10}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto10}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds10))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(11)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome11}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto11}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds11))}
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 col-lg-6">
                  <div className="card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          <img src={getImageRunner(12)} />
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-3">
                      <strong>{jogoAtual.nome12}</strong>
                      <br />
                      veio no pódio{" "}
                      <span className="badge bg-default  me-1 mb-1 mt-1">
                        {podio.piloto12}
                      </span>{" "}
                      vezes
                      <br />
                      com a Odd {parse(formatOdd(jogoAtual.odds12))}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
