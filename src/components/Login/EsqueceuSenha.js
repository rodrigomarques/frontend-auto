/* eslint-disable jsx-a11y/anchor-is-valid */
//import React, { useContext, useState } from "react";
import React, { useState } from "react";
//import MyContext from "./../../context";
import API from "./../../http/api";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";

export default function EsqueceuSenha() {

  let navigate = useNavigate();
  //const { token, setToken, user, setUser } = useContext(MyContext);
  const [email, setEmail] = useState('')
  const [erroMsg, setErroMsg] = useState();
  const [sucessoMsg, setSucessoMsg] = useState();

  const enviarSenha = () => {
    let erros = [];
    setErroMsg("");
    if (email === "") {
      setErroMsg("Preencha o campo e-mail");
    } else {
      API.post(`recuperar-senha`, {
        email: email,
      })
        .then(async (res) => {
          setSucessoMsg("Nova senha foi enviada para seu e-mail");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          if (error.message !== undefined) {
            Object.entries(error.message).forEach(([key, value]) =>
              erros.push(value)
            );
            setErroMsg(erros.join("<br />"));
          }
        });
    }
  };

	return (
    <>
      <div className="login-img">
        <div className="page">
          <div className="">
            <div className="container-login100">
              <div className="wrap-login100 p-0">
                <div className="card-body">
                  <form className="login100-form validate-form">
                    <span className="login100-form-title">
                      <img
                        src="assets/images/logo-3.png"
                        className="header-brand-img"
                        alt=""
                      />
                    </span>
                    <div
                      className="wrap-input100 validate-input"
                      data-bs-validate="E-mail precisa ser em um formato válido: ex@abc.xyz"
                    >
                      <input
                        className="input100"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="zmdi zmdi-email" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="container-login100-form-btn">
                      <a
                        href="#"
                        className="login100-form-btn btn-primary"
                        onClick={enviarSenha}
                      >
                        Enviar Senha
                      </a>
                    </div>
                    {erroMsg && (
                      <div className="alert alert-danger">{parse(erroMsg)}</div>
                    )}
                    {sucessoMsg && (
                      <div className="alert alert-success">
                        {parse(sucessoMsg)}
                      </div>
                    )}
                    <div className="text-center pt-3">
                      <p className="text-dark mb-0">
                        <Link className="text-primary ms-1" to="/">
                          Logar
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#top" id="back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
}
