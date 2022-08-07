import React, { useEffect, useState  } from "react";
import parse from "html-react-parser";
import { validateEmail, validateCpf, validateSenha } from './../../util/validacao'
import InputMask from "react-input-mask";
import API from "./../../http/api";
import { useNavigate } from "react-router-dom";
import TermoPolitica from './TermoPolitica'
import MyButton from "./../MyButton";

export default function NovoCliente() {
  let navigate = useNavigate();
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aceite, setAceite] = useState(false);
  const [erroMsg, setErroMsg] = useState();
  const [sucessoMsg, setSucessoMsg] = useState();

  const [load, setLoad] = useState(false);

  const cadastrar = () => {
    setLoad(true)
    setErroMsg("")
    setSucessoMsg("");            
    let erros = []
    if (nome === "") {
      erros.push("Preencha o campo nome")
    }

    if (telefone === "") {
      erros.push("Preencha o campo Telefone");
    }

    if (!validateCpf(cpf)) {
      erros.push("Preencha o campo cpf");
    }

    if (!validateEmail(email)) {
      erros.push("Preencha o campo e-mail");
    }

    if (!validateSenha(senha)) {
      erros.push("Preencha o campo senha");
    }

    if (!aceite) {
      erros.push("É obrigatório aceitar o termo");
    }

    if (erros.length > 0) {
      setErroMsg(erros.join("<br />"));
      setLoad(false);
    } else if (erros.length === 0) {
      try {
        API.post(`api/clientes/salvar-usuario`, {
          nome: nome,
          telefone: telefone,
          cpf: cpf,
          email: email,
          senha: senha,
        })
          .then(async (res) => {
            setSucessoMsg("Seu cadastro foi realizado com sucesso!");
            setLoad(false);
            setTimeout(() => {
              navigate("/");
            }, 2000)
          })
          .catch((error) => {
            if (error.message !== undefined) {
              Object.entries(error.message).forEach(([key, value]) => erros.push(value));
              setErroMsg(erros.join("<br />"));
            }
            setLoad(false);            
          });
      } catch (e) {setLoad(false);}
    }
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
                      <div className="wrap-input100 validate-input">
                        <input
                          className="input100"
                          type="text"
                          name="nome"
                          value={nome}
                          onChange={(value) => setNome(value.target.value)}
                          placeholder="Nome"
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="mdi mdi-account" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="wrap-input100 validate-input">
                        <InputMask
                          className="input100"
                          value={telefone}
                          mask="(99) 9999-99999"
                          maskPlaceholder=""
                          placeholder="Telefone"
                          onChange={(value) => setTelefone(value.target.value)}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="wrap-input100 validate-input">
                        <InputMask
                          className="input100"
                          value={cpf}
                          mask="999.999.999-99"
                          placeholder="CPF"
                          onChange={(value) => setCpf(value.target.value)}
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i
                            className="fa fa-address-card"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div
                        className="wrap-input100 validate-input"
                        data-bs-validate="E-mail precisa ser em um formato válido: ex@abc.xyz"
                      >
                        <input
                          className="input100"
                          type="text"
                          name="email"
                          value={email}
                          onChange={(value) => setEmail(value.target.value)}
                          placeholder="Email"
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
                          value={senha}
                          onChange={(value) => setSenha(value.target.value)}
                          placeholder="Senha"
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                        </span>
                      </div>
                      <label className="custom-control custom-checkbox mt-4">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked={aceite}
                          onChange={() => setAceite(!aceite)}
                        />
                        <span className="custom-control-label">
                          Aceito os{" "}
                          <a
                            className="text-primary ms-1"
                            data-bs-target="#modal"
                            data-bs-toggle="modal"
                          >
                            termos de uso
                          </a>
                        </span>
                      </label>
                      <div className="container-login100-form-btn">
                        <MyButton
                          text="Cadastrar"
                          click={() => cadastrar()}
                          load={load}
                          className="login100-form-btn btn-primary"
                        />
                      </div>
                      <div className="text-center pt-3">
                        <p className="text-dark mb-0">
                          Já possui conta?
                          <MyButton
                            text="Entrar"
                            click={() => navigate("/")}
                            load={false}
                            className="text-primary ms-1"
                          />
                        </p>
                      </div>
                      {erroMsg && (
                        <div className="alert alert-danger">
                          {parse(erroMsg)}
                        </div>
                      )}
                      {sucessoMsg && (
                        <div className="alert alert-success">
                          {parse(sucessoMsg)}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="modal">
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content modal-content-demo">
                <div className="modal-header">
                  <h6 className="modal-title">TERMOS DE USO</h6>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <TermoPolitica />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" data-bs-dismiss="modal">
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}