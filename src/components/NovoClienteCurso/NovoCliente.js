import React, { useEffect, useState  } from "react";
import parse from "html-react-parser";
import { validateEmail, validateCpf, validateSenha, validateTelefone } from './../../util/validacao'
import InputMask from "react-input-mask";
import API from "./../../http/api";
import { useNavigate } from "react-router-dom";
import TermoPolitica from './../NovoCliente/TermoPolitica'
import { getNumberOnly } from "./../../util/funcao";
import MyButton from "./../MyButton";

export default function NovoClienteCurso() {
  let navigate = useNavigate();
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aceite, setAceite] = useState(false);
  const [erroMsg, setErroMsg] = useState();
  const [sucessoMsg, setSucessoMsg] = useState();

  const [cep, setCep] = useState();
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState();

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

    if (!validateTelefone(telefone)) {
      erros.push("Preencha o campo telefone");
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

    let newCep = getNumberOnly(cep)
    if (newCep === "" || newCep.length !== 8) {
      erros.push("Cep inválido");
    }

    if (rua === "") {
      erros.push("Rua inválido");
    }

    if (numero === "") {
      erros.push("Número inválido");
    }

    if (bairro === "") {
      erros.push("Bairro inválido");
    }

    if (cidade === "") {
      erros.push("Rua inválido");
    }
    if (erros.length > 0){
      setErroMsg(erros.join("<br />"));
      setLoad(false);
    } else if (erros.length === 0) {
      try {
        API.post(`api/clientes/salvar-usuario-curso`, {
          nome: nome,
          telefone: telefone,
          cpf: cpf,
          email: email,
          senha: senha,
          cep: newCep,
          rua: rua,
          complemento: complemento,
          numero: numero,
          bairro: bairro,
          cidade: cidade,
          uf: uf,
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
          <div className="container-login100">
                <div className="wrap-login100 p-0">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Dados do Aluno</h3>
                </div>
                <div className="card-body">
                  <span className="login100-form-title">
                    <img
                      src="assets/images/logo-3.png"
                      className="header-brand-img"
                      alt=""
                    />
                  </span>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">
                          Nome <span className="text-red">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="nome"
                          value={nome}
                          onChange={(value) => setNome(value.target.value)}
                          placeholder="Nome"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="basic-url" class="form-label">Telefone <span className="text-red">*</span></label>
                        <div className="input-group">
                          <span class="input-group-text" id="basic-addon3">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </span>
                          <InputMask
                            className="form-control"
                            value={telefone}
                            mask="(99) 9999-99999"
                            maskPlaceholder=""
                            placeholder="Telefone"
                            onChange={(value) => setTelefone(value.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="basic-url" class="form-label">CPF <span className="text-red">*</span></label>
                        <div className="input-group">
                          <span class="input-group-text" id="basic-addon3">
                            <i
                              className="fa fa-address-card"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <InputMask
                            className="form-control"
                            value={cpf}
                            mask="999.999.999-99"
                            placeholder="CPF"
                            onChange={(value) => setCpf(value.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="basic-url" class="form-label">E-mail <span className="text-red">*</span></label>
                        <div className="input-group">
                          <span class="input-group-text" id="basic-addon3">
                            <i className="zmdi zmdi-email" aria-hidden="true"></i>
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(value) => setEmail(value.target.value)}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="basic-url" class="form-label">Senha <span className="text-red">*</span></label>
                        <div className="input-group">
                          <span class="input-group-text" id="basic-addon3">
                            <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                          </span>
                          <input
                            className="form-control"
                            type="password"
                            name="pass"
                            value={senha}
                            onChange={(value) => setSenha(value.target.value)}
                            placeholder="Senha"
                          />
                        </div>
                      </div>
                    </div>

                  <div className="col-md-12">
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
                    </div>
                  </div>
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
                        click={() => window.location.href = '/'}
                        load={false}
                        className="text-primary ms-1"
                      />
                    </p>
                  </div>

                  <form className="login100-form validate-form">
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
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Endereço de Faturamento</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">
                          Cep <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Endereço"
                          value={cep}
                          id="formCep"
                          onChange={(e) => setCep(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label className="form-label">
                          Endereço <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Endereço"
                          id="formRua"
                          value={rua}
                          onChange={(e) => setRua(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Número <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Número"
                          id="formNumero"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Complemento</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Complemento"
                          id="formComplemento"
                          value={complemento}
                          onChange={(e) => setComplemento(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-5">
                      <div className="form-group">
                        <label className="form-label">
                          Bairro<span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Bairro"
                          id="formBairro"
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Cidade <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cidade"
                          id="formCidade"
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Estado <span className="text-red">*</span>
                        </label>
                        <select
                          className="form-control form-select "
                          data-bs-placeholder="Select"
                          value={uf}
                          id="formUf"
                          onChange={(e) => setUf(e.target.value)}
                        >
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                          <option value="EX">Estrangeiro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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