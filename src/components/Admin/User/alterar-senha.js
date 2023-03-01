
import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from "html-react-parser";
export default function AlterarSenha() {

    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erroMsg, setErroMsg] = useState();
    const [sucessoMsg, setSucessoMsg] = useState();
    
    const alterarDados = () => {
        setErroMsg("")
        setSucessoMsg("")

        if (novaSenha !== confirmarSenha) {
            setErroMsg("As senhas devem ser iguais")
        } else {
            let erros = [];
            API.post(`api/usuario/atualizar-senha`, {
              senhaatual: senha,
              novasenha: novaSenha,
            })
              .then(async (res) => {
                setSucessoMsg("Sua senha foi atualizada com sucesso!");
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
    }
    return (
      <>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Alterar Senha</div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Senha Atual</label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nova Senha</label>
              <input
                type="password"
                className="form-control"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmar Nova Senha</label>
              <input
                type="password"
                className="form-control"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>
          <div className="card-footer text-end">
            <a onClick={() => alterarDados()} className="btn btn-primary">
              Atualizar
            </a>
          </div>
          {erroMsg && (
            <div className="alert alert-danger">{parse(erroMsg)}</div>
          )}
          {sucessoMsg && (
            <div className="alert alert-success">{parse(sucessoMsg)}</div>
          )}
        </div>
      </>
    );
}