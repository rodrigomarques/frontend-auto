import React, { useContext, useEffect } from "react";
import MyContext from "./../../../context";
import { useNavigate, Link  } from "react-router-dom";
import API from "./../../../http/api";
import jwt_decode from "jwt-decode";

export default function Layout({ children }) {
  let navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(MyContext);
  const sair = () => {
    setToken(null)
    localStorage.setItem("tk", null);
    navigate("/");
  }
  useEffect(() => {
    if (token == null || token === undefined || token === "" || user == null) {
      navigate("/");
      return;
    }

    let limite = new Date(user.exp * 1000);
    let hoje = new Date()

    if (limite < hoje) {
      API.post(`refresh`).then(async (res) => {
        if (res.data.access_token !== "") {
          let dados = jwt_decode(res.data.access_token);
          setUser(dados)
          setToken(res.data.access_token);

          localStorage.setItem("tk", res.data.access_token);
        }
      });
    }
  }, [])

  const validarMenu = () => {
    if(user.perfil === "CLI" && (user.plano_id === null  || user.dtExpiracao == null )){
      return false;  
    }
    return true;
  }

  if (token == null || token === undefined || token === "") {
    return <></>
  }

  return (
    <>
      <body className="app ltr light-mode horizontal-hover horizontal">
        <div className="page">
          <div className="page-main">
            <div className="header sticky hor-header">
              <div className="container-fluid main-container">
                <div className="d-flex align-items-center">
                  <a
                    aria-label="Hide Sidebar"
                    className="app-sidebar__toggle"
                    data-bs-toggle="sidebar"
                    href="javascript:void(0);"
                  ></a>
                  <div className="responsive-logo">
                    <a href="/admin/" className="header-logo">
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
                    </a>
                  </div>
                  <a className="col-md-3 logo-horizontal " href="/admin/">
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
                  </a>
                  <div className="col-md-5 main-header-center ms-3 d-none d-lg-block text-center">
                    {user.perfil === "CLI" && user.plano_id !== null && user.dtExpiracao !== null &&
                      <div>
                        Faltam{" "}
                        <span className="badge bg-default  me-1 mb-1 mt-1">
                          { user.diaExpiracao }
                        </span>{" "}
                        dias para o seu plano expirar
                      </div>
                    }
                    {user.perfil === "CLI" && user.plano_id !== null && user.dtExpiracao == null &&
                      <div>
                        Seu plano expirou!
                        <br />
                        Realize o pagamento para voltar a ter acesso ao sistema.
                      </div>
                    }
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
                          <div className="dropdown d-md-flex">
                            <a className="nav-link icon theme-layout nav-link-bg layout-setting">
                              <span className="dark-layout">
                                <i className="fe fe-moon"></i>
                              </span>
                              <span className="light-layout">
                                <i className="fe fe-sun"></i>
                              </span>
                            </a>
                          </div>
                          <div className="dropdown d-md-flex">
                            <a className="nav-link icon full-screen-link nav-link-bg">
                              <i
                                className="fe fe-minimize fullscreen-button"
                                id="myvideo"
                              ></i>
                            </a>
                          </div>
                          <div className="dropdown d-md-flex notifications">
                            <a
                              className="nav-link icon"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fe fe-bell"></i>
                              <span className=" pulse"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow ">
                              <div className="drop-heading border-bottom">
                                <div className="d-flex">
                                  <h6 className="mt-1 mb-0 fs-16 fw-semibold">
                                    Você tem notificações
                                  </h6>
                                  <div className="ms-auto">
                                    <span className="badge bg-success rounded-pill">
                                      3
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="notifications-menu">
                                <a
                                  className="dropdown-item d-flex"
                                  href="cart.html"
                                >
                                  <div className="me-3 notifyimg  bg-success-gradient brround box-shadow-primary">
                                    <i className="fe fe-shopping-cart"></i>
                                  </div>
                                  <div className="mt-1 wd-80p">
                                    <h5 className="notification-label mb-1">
                                      Seu plano está expirando
                                    </h5>
                                    <span className="notification-subtext">
                                      Faltam 5 dias
                                    </span>
                                  </div>
                                </a>
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
                              <a
                                className="dropdown-item"
                                href="editar-perfil.php"
                              >
                                <i className="dropdown-icon fe fe-user"></i>{" "}
                                Editar Perfil
                              </a>
                              <a className="dropdown-item" href="faq.php">
                                <i className="dropdown-icon fe fe-alert-triangle"></i>{" "}
                                Precisa de Ajuda?
                              </a>
                              <a
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
                  <div className="slide-left disabled active" id="slide-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#7b8191"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                    </svg>
                  </div>
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
                          <Link className="side-menu__item" to="/admin/proximas-corridas">
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
                          <Link className="side-menu__item" to="/admin/maximas">
                            <i className="side-menu__icon fa fa-sort-amount-asc"></i>
                            <span className="side-menu__label">Máximas</span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  <div className="slide-right" id="slide-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#7b8191"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                    </svg>
                  </div>
                </div>
              </aside>
            </div>

            <div className="main-content app-content mt-0">{children}</div>
          </div>
        </div>
      </body>
    </>
  );
}
