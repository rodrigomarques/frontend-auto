import React, { useContext, useEffect, useState } from "react";
import MyContext from "./../../context";
import API from "./../../http/api";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import MyButton from "./../MyButton";
import axios from "axios";
import { browserName, browserVersion } from "react-device-detect";

export default function Login() {

  let navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(MyContext);
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState("");
  const [ ip, setIp] = useState("")
  const [load, setLoad] = useState(false);

  useEffect(() => {

    const carregarIp = async () => {
      let result = await axios.get("https://geolocation-db.com/json/");
      setIp(result.data.IPv4)
    }
    carregarIp()
  }, [])

  const efetuarLogin = () => {
    setLoad(true)

    API.post(`api/login`, {
      email: email,
      password: senha,
      ip: ip,
      host : browserName + " " + browserVersion
    })
      .then((res) => {
        if (res.data.access_token !== "") {
          let dados = jwt_decode(res.data.access_token);
          setUser(dados);
          setToken(res.data.access_token);

          localStorage.setItem("tk", res.data.access_token);
          localStorage.setItem("user", JSON.stringify(dados));

          if (
            dados.perfil === "CLI" &&
            (dados.plano_id === null || dados.dtExpiracao == null)
          ) {
            window.location.href = "/admin/planos"
          } else {
            if (dados.aceite === 1) {
              window.location.href = "/admin/"
            } else {
              window.location.href = "/admin/";
              //window.location.href = "/admin/tutoriais";
            }
            //navigate("/admin");
          }
        } else {
          setLoad(false);
          alert("Dados inválidos");
        }
        return false;
      })
      .catch((e) => {
        alert("Dados inválidos");
        setLoad(false);
        return false;
      });
    return false
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
                        <Link
                          className="text-primary ms-1"
                          to="/esqueceu-senha"
                        >
                          Esqueceu a Senha?
                        </Link>
                      </p>
                    </div>
                    <div className="container-login100-form-btn">
                      <MyButton
                        text="Entrar"
                        click={() => efetuarLogin() }
                        load={load}
                        className="login100-form-btn btn-primary"
                      />
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
