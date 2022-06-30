import React, { useContext, useState } from "react";
import MyContext from "./../../context";
import API from "./../../http/api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Login() {

  let navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(MyContext);
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState("");

  const efetuarLogin = () => {
    API.post(`api/login`, {
      email: email,
      password: senha
    }).then((res) => {
      if (res.data.access_token !== "") {
        let dados = jwt_decode(res.data.access_token);
        setUser(dados)
        setToken(res.data.access_token);

        localStorage.setItem("tk", res.data.access_token);

        if (dados.perfil === "CLI" && (dados.plano_id === null || dados.dtExpiracao == null))
          navigate("/admin/planos");
        else
          navigate("/admin/");
          
      }
    })
    .catch(e => {
      alert("Dados inválidos")
    })
  }

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
                    <div
                      className="wrap-input100 validate-input"
                      data-bs-validate="Preencha a senha"
                    >
                      <input
                        className="input100"
                        type="password"
                        name="pass"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="text-end pt-1">
                      <p className="mb-0">
                        <a
                          href="esqueceuSenha.php"
                          className="text-primary ms-1"
                        >
                          Esqueceu a Senha?
                        </a>
                      </p>
                    </div>
                    <div className="container-login100-form-btn">
                      <a
                        href="#"
                        className="login100-form-btn btn-primary"
                        onClick={efetuarLogin}
                      >
                        Entrar
                      </a>
                    </div>
                    <div className="text-center pt-3">
                      <p className="text-dark mb-0">
                        Não é cadastrado?
                        <a href="novo-cliente" className="text-primary ms-1">
                          Criar conta
                        </a>
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
