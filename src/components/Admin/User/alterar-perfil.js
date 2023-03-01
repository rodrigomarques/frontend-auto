
import React, { useEffect, useContext, useState } from "react";
import API from "./../../../http/api";
import MyContext from "./../../../context";
import parse from "html-react-parser";
import InputMask from "react-input-mask";
import { validateEmail, validateCpf } from './../../../util/validacao'
import jwt_decode from "jwt-decode";

export default function AlterarPerfil() {

  const { token, setToken, user, setUser } = useContext(MyContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [erroMsg, setErroMsg] = useState();
  const [sucessoMsg, setSucessoMsg] = useState();

  useEffect(() => {
    setNome(user.nome)
    setCpf(user.cpf);
    setEmail(user.email);
  }, [])

  const alterarDados = () => {
    setErroMsg("");
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

    if (erros.length > 0) {
      setErroMsg(erros.join("<br />"));
    } else if (erros.length === 0) {

      let erros = [];
      API.post(`api/usuario/atualizar-dados`, {
        nome : nome,
        email : email,
        telefone : telefone,
        cpf : cpf
      })
        .then(async (res) => {
          setSucessoMsg("Seus dados foram atualizados com sucesso!");
          if (res.data.entity.access_token !== "") {
            let dados = jwt_decode(res.data.entity.access_token);
            setUser(dados);
            setToken(res.data.entity.access_token);

            localStorage.setItem("tk", res.data.entity.access_token);
          }
      
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
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dados Pessoais</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <label for="exampleInputname">Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  placeholder="Nome Completo"
                  value={nome}
                  onChange={(value) => setNome(value.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="E-mail"
              value={email}
              onChange={(value) => setEmail(value.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputnumber">Telefone</label>
            <InputMask
              className="form-control"
              value={telefone}
              mask="(99) 9999-99999"
              maskPlaceholder=""
              placeholder="Telefone"
              onChange={(value) => setTelefone(value.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputname">CPF</label>
            <InputMask
              className="form-control"
              value={cpf}
              mask="999.999.999-99"
              placeholder="CPF"
              onChange={(value) => setCpf(value.target.value)}
            />
          </div>
        </div>
        <div className="card-footer text-end">
          <a onClick={() => alterarDados()} className="btn btn-success mt-1">
            Salvar
          </a>
        </div>
        {erroMsg && <div className="alert alert-danger">{parse(erroMsg)}</div>}
        {sucessoMsg && (
          <div className="alert alert-success">{parse(sucessoMsg)}</div>
        )}
      </div>
    </>
  );
}