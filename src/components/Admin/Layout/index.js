import React, { useContext, useEffect, useState } from "react";
import MyContext from "./../../../context";
import Manutencao from "./../Manutencao";
import { useNavigate, Link } from "react-router-dom";
import API from "./../../../http/api";
import jwt_decode from "jwt-decode";
import { browserName, browserVersion } from "react-device-detect";
import axios from "axios";

export default function Layout({ children }) {
  let navigate = useNavigate();
  let { token, setToken, user, setUser } = useContext(MyContext);
  const [manutencao, setManutencao] = useState(false);

  const sair = () => {
    setToken(null);
    localStorage.setItem("tk", null);
    localStorage.setItem("user", null);
    //navigate("/");
    window.location.href = "/";
  };

  const checkValidateUser = async () => {
    let result = await axios.get("https://geolocation-db.com/json/");
    let ip = result.data.IPv4;
    API.post(`api/check-login`, {
      ip: ip,
      host: browserName + " " + browserVersion,
    })
      .then((res) => {
        if (
          res.data.entity.emmanutencao !== undefined &&
          res.data.entity.emmanutencao === 1
        ) {
          setManutencao(true);
        } else {
          setManutencao(false);
        }
        return true;
      })
      .catch((e) => {
        localStorage.setItem("tk", null);
        localStorage.setItem("user", null);
        window.location = "/";
        return true;
      });
  };

  useEffect(() => {
    if (token == null || token === undefined || token === "" || user === null) {
      navigate("/");
      return;
    }

    let limite = new Date(user.exp * 1000);
    let hoje = new Date();

    if (limite < hoje) {
      API.post(`api/refresh`).then(async (res) => {
        if (res.data.access_token !== "") {
          let dados = jwt_decode(res.data.access_token);
          setUser(dados);
          setToken(res.data.access_token);

          localStorage.setItem("tk", res.data.access_token);
        }
      });
    }

    if (
      user.perfil === "CLI" &&
      (user.plano_id === null || user.dtExpiracao == null)
    ) {
      navigate("/admin/planos");
      return;
    }

    checkValidateUser();
    const ajaxCheckValidateUserTime = setInterval(() => {
      checkValidateUser();
    }, 30000);

    return (_) => {
      clearTimeout(ajaxCheckValidateUserTime);
    };
  }, []);

  const download = () => {
    // using Java Script method to get PDF file
    fetch("/assets/padroes_autobet.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "padroes_autobet.pdf";
        alink.click();
      });
    });
  };

  const validarMenu = () => {
    if (
      user.perfil === "CLI" &&
      (user.plano_id === null || user.dtExpiracao == null)
    ) {
      return false;
    }
    return true;
  };

  if (token == null || token === undefined || token === "") {
    return <></>;
  }

  return (
    <>
      <div className="app ltr light-mode horizontal-hover horizontal pb-5">
        <div className="page">
          <div className="page-main">
            <div className="header sticky hor-header">
              <div className="container main-container">
                <div className="d-flex align-items-center">
                  <a
                    aria-label="Hide Sidebar"
                    className="app-sidebar__toggle"
                    data-bs-toggle="sidebar"
                    href="javascript:void(0);"
                  >
                    {" "}
                  </a>
                  <div className="responsive-logo">
                    <Link className="header-logo" to="/admin/">
                      <img
                        src="/assets/images/logo-3.png"
                        className="mobile-logo logo-1"
                        alt="logo"
                      />
                      <img
                        src="/assets/images/logo.png"
                        className="mobile-logo dark-logo-1"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <Link className="col-md-3 logo-horizontal" to="/admin/">
                    <img
                      src="/assets/images/logo.png"
                      className="header-brand-img desktop-logo"
                      alt="logo"
                    />
                    <img
                      src="/assets/images/logo-3.png"
                      className="header-brand-img light-logo1"
                      alt="logo"
                    />
                  </Link>
                  <div className="col-md-5 main-header-center ms-3 d-none d-lg-block text-center">
                    {user.perfil === "CLI" &&
                      user.plano_id !== null &&
                      user.dtExpiracao !== null && (
                        <div>
                          Faltam{" "}
                          <span className="badge bg-default  me-1 mb-1 mt-1">
                            {user.diaExpiracao}
                          </span>{" "}
                          dias para o seu plano expirar
                        </div>
                      )}
                    {user.perfil === "CLI" &&
                      user.plano_id !== null &&
                      user.dtExpiracao == null && (
                        <div>
                          Seu plano expirou!
                          <br />
                          Realize o pagamento para voltar a ter acesso ao
                          sistema.
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 d-flex order-lg-2 ms-auto header-right-icons">
                    <div className="navbar navbar-collapse responsive-navbar p-0">
                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent-4"
                      >
                        <div className="d-flex order-lg-2">
                          <div className="dropdown d-block d-lg-none">
                            <a
                              href="javascript:void(0);"
                              className="nav-link icon"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-search"></i>
                            </a>
                            <div className="dropdown-menu header-search dropdown-menu-start">
                              <div className="input-group w-100 p-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search...."
                                />
                                <div className="input-group-text btn btn-primary">
                                  <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dropdown d-md-flex profile-1">
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="dropdown"
                              className="nav-link leading-none d-flex px-1"
                            >
                              <span>
                                <img
                                  src="/assets/images/user.png"
                                  alt="profile-user"
                                  className="avatar  profile-user brround cover-image"
                                />
                              </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                              <div className="drop-heading">
                                <div className="text-center">
                                  <h5 className="text-dark mb-0">
                                    {user.nome}
                                  </h5>
                                </div>
                              </div>
                              <div className="dropdown-divider m-0"></div>
                              <Link
                                className="dropdown-item"
                                to="/admin/editar-perfil"
                              >
                                <i className="dropdown-icon fe fe-user"></i>{" "}
                                Editar Perfil
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/admin/tutoriais"
                              >
                                <i className="dropdown-icon fe fe-video"></i>{" "}
                                Tutoriais
                              </Link>
                              {user.isBot !== undefined && user.isBot === 1 && (
                                <a
                                  style={{ cursor: "pointer" }}
                                  className="dropdown-item"
                                  onClick={() => download()}
                                >
                                  <i className="dropdown-icon fe fe-file-text"></i>{" "}
                                  Download Padrões
                                </a>
                              )}
                              <a
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={() => sair()}
                              >
                                <i className="dropdown-icon fe fe-alert-circle"></i>{" "}
                                Sair
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky">
              <div
                className="app-sidebar__overlay"
                data-bs-toggle="sidebar"
              ></div>
              <aside className="app-sidebar ps ps--active-y sidemenu-scroll horizontal-main">
                <div className="side-header">
                  <a className="header-brand1" href="/admin/">
                    <img
                      src="/assets/images/logo.png"
                      className="header-brand-img desktop-logo"
                      alt="logo"
                    />
                    <img
                      src="/assets/images/logo-1.png"
                      className="header-brand-img toggle-logo"
                      alt="logo"
                    />
                    <img
                      src="/assets/images/logo-2.png"
                      className="header-brand-img light-logo"
                      alt="logo"
                    />
                    <img
                      src="/assets/images/logo-3.png"
                      className="header-brand-img light-logo1"
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="main-sidemenu is-expanded container">
                  <ul className="side-menu open">
                    {!validarMenu() && (
                      <li className="slide">
                        <Link className="side-menu__item" to="/admin/planos">
                          <i className="side-menu__icon fe fe-package"></i>
                          <span className="side-menu__label">
                            Escolha seu Plano
                          </span>
                        </Link>
                      </li>
                    )}
                    {(user.perfil === "ADMIN" || validarMenu()) && (
                      <>
                        <li className="slide" key="1">
                          <Link className="side-menu__item" to="/admin/">
                            <i className="side-menu__icon fa fa-line-chart"></i>
                            <span className="side-menu__label">Dashboard</span>
                          </Link>
                        </li>
                        <li className="slide" key="2">
                          <Link
                            className="side-menu__item"
                            to="/admin/proximas-corridas"
                          >
                            <i className="side-menu__icon fa fa-road"></i>
                            <span className="side-menu__label">
                              Próximas Corridas
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            to="/admin/mosaico-back"
                          >
                            <i className="side-menu__icon fa fa-delicious"></i>
                            <span className="side-menu__label">
                              Mosaico Back
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            to="/admin/mosaico-prev"
                          >
                            <i className="side-menu__icon fa fa-delicious"></i>
                            <span className="side-menu__label">
                              Mosaico Previsão
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            to="/admin/mosaico-tri"
                          >
                            <i className="side-menu__icon fa fa-delicious"></i>
                            <span className="side-menu__label">
                              Mosaico Tricast
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            to="/admin/mosaico-odd"
                          >
                            <i className="side-menu__icon fa fa-delicious"></i>
                            <span className="side-menu__label">
                              Mosaico Odd
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            to="/admin/mosaico-valores"
                          >
                            <i className="side-menu__icon fa fa-delicious"></i>
                            <span className="side-menu__label">
                              Mosaico Valores
                            </span>
                          </Link>
                        </li>
                        <li className="slide">
                          <Link className="side-menu__item" to="/admin/maximas">
                            <i className="side-menu__icon fa fa-sort-amount-asc"></i>
                            <span className="side-menu__label">Máximas</span>
                          </Link>
                        </li>
                        <li className="slide d-lg-none d-block">
                          <Link
                            to="/admin/editar-perfil"
                            className="side-menu__item"
                          >
                            <i className="side-menu__icon fe fe-user"></i>
                            <span className="side-menu__label">
                              Editar Perfil
                            </span>
                          </Link>
                        </li>
                        <li className="slide slide d-lg-none d-block">
                          <Link
                            className="side-menu__item"
                            to="/admin/tutoriais"
                          >
                            <i className="side-menu__icon fe fe-video"></i>
                            <span className="side-menu__label">Tutoriais</span>
                          </Link>
                        </li>
                        {user.isBot !== undefined && user.isBot === 1 && (
                          <li className="slide slide d-lg-none d-block">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => download()}
                              className="side-menu__item"
                            >
                              <i className="side-menu__icon fe fe-file-text"></i>
                              <span className="side-menu__label">
                                Download Padrões
                              </span>
                            </a>
                          </li>
                        )}
                        <li className="slide slide d-lg-none d-block">
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => sair()}
                            className="side-menu__item"
                          >
                            <i className="side-menu__icon fe fe-alert-circle"></i>
                            <span className="side-menu__label">Sair</span>
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </aside>
            </div>
            {manutencao && (
              <div className="main-content mt-0">
                <Manutencao title="BET em Manutenção" />
              </div>
            )}
            <div className="main-content mt-0">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
