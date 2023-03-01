import React, { useContext, useEffect, useState } from "react";
import MyContext from "./../../../context";
import { useLocation, useNavigate } from "react-router-dom";
import API from "./../../../http/api";
import { totalDias, getNumberOnly, fn } from "./../../../util/funcao";
import jwt_decode from "jwt-decode";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function Checkout({ title }) {
  useDocumentTitle(title);

  const { token, setToken, user, setUser } = useContext(MyContext);
  let navigate = useNavigate();
  const { state } = useLocation();

  const [pagamentoEmAberto, setPagamentoEmAberto] = useState([]);

  const [cep, setCep] = useState();
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState();

  const [urlBoleto, setUrlBoleto] = useState('');
  const [pix, setPix] = useState(false);
  const [imagePix, setImagePix] = useState("");
  const [urlPix, setUrlPix] = useState("");
  const [cupomDesconto, setCupomDesconto] = useState("");
  const [cupom, setCupom] = useState({});

  const [nomeCartao, setNomeCartao] = useState();
  
  const [numCartao, setNumCartao] = useState();
  const [cpfTitular, setCpfTitular] = useState();
  const [valor, setValor] = useState(0);

  const { plano } = state;
  
  useEffect(() => {
    API.get(`api/admin/cupom/${cupomDesconto}`)
      .then((res) => {
        setCupom({})
        let pCupom = res.data.entity;
        if (pCupom) {
          setCupom(pCupom)
          let novoValor =
            pCupom.tipo_desconto !== undefined && pCupom.tipo_desconto.toUpperCase() === "PERCENT"
              ? (plano.valor * (100 - pCupom.valor)) / 100
              : plano.valor - pCupom.valor;
          setValor(novoValor)

          document.getElementById("idCupomDesconto").value = pCupom.id
          
        } else {
          document.getElementById("idCupomDesconto").value = 0
          setValor(plano.valor)
        }
      })
      .catch((e) => {
        setCupom({})
        setValor(plano.valor)
        let cupDesc = document.getElementById("idCupomDesconto")
        if(cupDesc)
          cupDesc.value = 0
      });
  }, [cupomDesconto])

  useEffect(() => {
    carregar()

    API.get(`api/pagamento-em-aberto`)
      .then((res) => {
        console.log(res.data.entity);
        if (res.data.entity !== undefined) {
          setPagamentoEmAberto(res.data.entity);
        } 
      })
      .catch((e) => {
        
      });
    
    
    const validarPagamentoId = setInterval(() => {
        API.post(`api/refresh`).then(async (res) => {
          if (res.data.access_token !== "") {
            let dados = jwt_decode(res.data.access_token);
            setUser(dados);
            setToken(res.data.access_token);

            localStorage.setItem("tk", res.data.access_token);

            if (
              dados.perfil === "CLI" &&
              dados.plano_id !== null &&
              dados.dtExpiracao !== null
            ) {
              navigate("/admin/");
            }
          }
        });
      }, 4000);

    return (_) => clearTimeout(validarPagamentoId);

  }, []);

  useEffect(() => {
    if (cep !== undefined && cep !== "") {
      let novoCep = getNumberOnly(cep)
      fetch(`https://viacep.com.br/ws/${novoCep}/json/`)
        .then((value) => value.json())
        .then((result) => {
          if (result !== "") {
            setRua(result.logradouro)
            setBairro(result.bairro);
            setCidade(result.localidade);
            setUf(result.uf)
          }
        })
        .catch(err => {

        });
    }
  }, [cep]);

  useEffect(() => {
    let novoCpf = getNumberOnly(cpfTitular)
    setCpfTitular(novoCpf);
  }, [cpfTitular]);
  
  const carregar = async () => {
    setValor(plano.valor)

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = async () => await scriptLoaded();

    document.body.appendChild(script);

    return () => {
      let iframe = document.querySelector("iframe");
      document.body.removeChild(iframe);
      document.body.removeChild(script);
    };
  }
  const validarEndereco = () => {
    let message = []
    let newCep = getNumberOnly(cep)
    if (newCep === "" || newCep.length !== 8) {
      message.push("Cep inválido");
    }

    if (rua === "") {
      message.push("Rua inválido");
    }

    if (numero === "") {
      message.push("Número inválido");
    }

    if (bairro === "") {
      message.push("Bairro inválido");
    }

    if (cidade === "") {
      message.push("Rua inválido");
    }

    return message;

  }

  const pagarBoleto = async () => {
    let key = process.env.PUBLIC_KEY_TEST;
    let nomeCompleto = user.nome;
    let nomeQuebrado = nomeCompleto.split(" ");
    let nome = nomeQuebrado[0];
    let sobrenome = "Nao Informado";
    if (nomeQuebrado[1] !== undefined) {
      sobrenome = nomeQuebrado[1];
    }

    let messageErro = validarEndereco();
    if (messageErro.length > 0) {
      alert(messageErro.join("\n"));
      return null;
    }
    let newCep = getNumberOnly(cep);
    //transaction_amount: "" + plano.valor,
    let cupomid = null
    if (cupom && cupom.id) {
      cupomid = cupom.id;
    }
    let objParam = {
      transaction_amount: "" + valor,
      description: "Autobet " + plano.plano,
      email: user.email,
      nome: nome,
      sobrenome: sobrenome,
      number: user.cpf,
      cep: newCep,
      rua: rua,
      complemento: complemento,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      plano_id: plano.id,
      cupom_id: cupomid
    };

    API.post(`api/boleto`, objParam)
      .then((res) => {
        if (res.data.entity.link !== undefined) {
          setUrlBoleto(res.data.entity.link);
        } else {
          alert("Boleto não gerado, entre em contato com o administrador");
        }
      })
      .catch((e) => {
        alert("Boleto não gerado, entre em contato com o administrador");
      });
  }

  const pagarPix = async () => {
    let nomeCompleto = user.nome
    let nomeQuebrado = nomeCompleto.split(" ")
    let nome = nomeQuebrado[0]
    let sobrenome = "Nao Informado"
    if (nomeQuebrado[1] !== undefined) {
      sobrenome = nomeQuebrado[1];
    }

    let messageErro = validarEndereco()
    if (messageErro.length > 0) {
      alert(messageErro.join("\n"))
      return null;
    }
    let newCep = getNumberOnly(cep);
    let cupomid = null;
    if (cupom && cupom.id) {
      cupomid = cupom.id;
    }

    let objParam = {
      transaction_amount: "" + valor,
      description: "Autobet " + plano.plano,
      email: user.email,
      nome: nome,
      sobrenome: sobrenome,
      number: user.cpf,
      cep: newCep,
      complemento: complemento,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      plano_id: plano.id,
      cupom_id: cupomid,
    };
    
    API.post(`api/pix`, objParam)
      .then((res) => {
        console.log(res.data.entity.link);
        if (res.data.entity.qr_code !== undefined) {
          setPix(true);
          setImagePix(`data:image/png;base64,${res.data.entity.qr_code_base64}`);
          setUrlPix(res.data.entity.qr_code);          
        } else {
          alert("PIX não gerado, entre em contato com o administrador");
        }
      })
      .catch((e) => {
        console.log(e)
        alert("PIX não gerado, entre em contato com o administrador");
      });
  }
  
  let mercadopago = undefined
  let cardForm = undefined
  const scriptLoaded = async () => {
    if (mercadopago === undefined) {
      mercadopago = await new window.MercadoPago(
        "APP_USR-be28598e-fbd1-405b-8230-e20b814bf3df"
      );
    }

    if (cardForm === undefined) {
      cardForm = await mercadopago.cardForm({
        amount: "" + valor,
        autoMount: true,
        form: {
          id: "formcheckout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular do cartão",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "Data de vencimento (MM/YYYY)",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
          },

          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do documento",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emissor",
          },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: async function (event) {
            event.preventDefault();
            let nvCep = document.getElementById("formCep").value
            let rua = document.getElementById("formRua").value;
            let complemento = document.getElementById("formComplemento").value;
            let numero = document.getElementById("formNumero").value;
            let bairro = document.getElementById("formBairro").value;
            let cidade = document.getElementById("formCidade").value;
            let uf = document.getElementById("formUf").value;
            let idCupomDesconto = document.getElementById("idCupomDesconto").value
            //console.log(JSON.parse(cardForm.getCardFormData()));

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              token: cardToken,
              amount,
              installments,
              identificationNumber,
              identificationType,
              cardholderName : nome,
            } = cardForm.getCardFormData();

            let newCep = getNumberOnly(nvCep);
            
            API.post("/api/pagar", {
              token_cc: cardToken,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Plano Autobet",
              email,
              cep: newCep,
              rua: rua,
              complemento: complemento,
              numero: numero,
              bairro: bairro,
              cidade: cidade,
              uf: uf,
              cardholderName: nome,
              plano_id: plano.id,
              type: identificationType,
              number: identificationNumber,
              cupom_id : idCupomDesconto,
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            })
              .then((result) => {
                console.log(result);
                if (result.data.entity.status === "ok") {
                  alert(
                    "Pagamento realizado com sucesso, aguarde a confirmação do pagamento!"
                  );
                } else {
                  alert(
                    "Pagamento não realizado, entre em contato com o administrador"
                  );
                }
              })
              .catch((err) => {
                alert(
                  "Pagamento não realizado, entre em contato com o administrador"
                );
                console.log(err);
              });
          },
        },
      });
    }

    //console.log(await cardForm.createCardToken());
  };

  const buscarPagamento = (fatura) => {
    if (fatura.url_externo !== null) {
      return (
        <div>
          <a target="_blank" href={fatura.url_externo} className="btn btn-info">
            <i className="fa fa-barcode"></i> Ver boleto
          </a>
        </div>
      );
    } else if (fatura.qr_code_base64 !== undefined && fatura.qr_code_base64 !== null) {
      let image = `data:image/png;base64,${fatura.qr_code_base64}`;
      return (
        <p className="text-center">
          <img src={image} width="35%" />
        </p>
      );
    }

    return <></>
  };



  return (
    <>
      <form id="formcheckout" className="mb-5">
        <div className="side-app">
          <div className="main-container container-fluid">
            <div className="row mt-5">
              <div className="col-lg-12 col-md-6 col-sm-12">
                <div className="card overflow-hidden bg-info-transparent">
                  <div className="card-body">
                    <div className="row">
                      <h1 className="page-title text-center">
                        Falta pouco! Você escolheu o {plano.plano}.{" "}
                        <strong>
                          {totalDias(
                            plano.recorrencia_mes,
                            plano.recorrencia_dias
                          )}{" "}
                          dias de acesso - R$ {fn(valor)}
                        </strong>
                        .
                      </h1>
                      <h4 className="card-title mt-4 mb-0 text-center">
                        Preencha os campos abaixo e realize seu pagamento.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {pagamentoEmAberto && pagamentoEmAberto.length > 0 && (
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="alert alert-info">
                        Você possui faturas de pagamento em aberto:
                        {pagamentoEmAberto.map((fatura) => {
                          return (
                            <div key={fatura.id}>
                              <b>{fatura.metodo_pagamento}</b> no valor de R${" "}
                              {fn(fatura.valor_pago)} {buscarPagamento(fatura)}
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
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
                            className="form-control form-select select2"
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
              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Dados do Pagamento</h3>
                  </div>
                  <div className="card-body">
                    <div className="card-pay">
                      <div className="form-group">
                        <label className="form-label">Cupom de Desconto</label>
                        <input
                          value={cupomDesconto}
                          onChange={(e) => setCupomDesconto(e.target.value)}
                          type="text"
                          name="cupomDesconto"
                          className="form-control"
                          placeholder="Possui um código? Digite aqui"
                        />
                        <input
                          type="hidden"
                          id="idCupomDesconto"
                          className="form-control"
                        />
                      </div>
                      <ul className="tabs-menu nav">
                        <li className="">
                          <a
                            href="#tab20"
                            className="active"
                            data-bs-toggle="tab"
                          >
                            <i className="fa fa-credit-card"></i> Cartão de
                            Crédito
                          </a>
                        </li>
                        <li>
                          <a href="#tab21" data-bs-toggle="tab" className="">
                            <i className="fa fa-barcode"></i> Boleto
                          </a>
                        </li>
                        <li>
                          <a href="#tab22" data-bs-toggle="tab" className="">
                            <img src="/assets/images/pix.png" /> Pix
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active show" id="tab20">
                          <div className="form-group">
                            <label className="form-label">
                              Nome impresso no cartão
                            </label>
                            <input
                              value={nomeCartao}
                              onChange={(e) => setNomeCartao(e.target.value)}
                              type="text"
                              name="cardholderName"
                              id="form-checkout__cardholderName"
                              className="form-control"
                              placeholder="Nome impresso no cartão"
                            />
                          </div>

                          <input
                            style={{ display: "none" }}
                            type="email"
                            name="cardholderEmail"
                            className="form-control"
                            id="form-checkout__cardholderEmail"
                          />

                          <div className="form-group">
                            <label className="form-label">Cpf</label>
                            <input
                              value={cpfTitular}
                              onChange={(e) => setCpfTitular(e.target.value)}
                              type="text"
                              name="identificationNumber"
                              className="form-control"
                              id="form-checkout__identificationNumber"
                              placeholder="CPF do titular"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">
                              Número do Cartão
                            </label>
                            <div className="input-group">
                              <input
                                value={numCartao}
                                type="text"
                                name="cardNumber"
                                id="form-checkout__cardNumber"
                                className="form-control"
                                placeholder="Número do cartão"
                              />
                              <span className="input-group-text btn btn-success shadow-none">
                                <i className="fa fa-cc-visa"></i> &nbsp;{" "}
                                <i className="fa fa-cc-amex"></i> &nbsp;
                                <i className="fa fa-cc-mastercard"></i>
                              </span>

                              <select
                                style={{ display: "none" }}
                                name="issuer"
                                id="form-checkout__issuer"
                              ></select>
                              <input
                                style={{ display: "none" }}
                                name="identificationType"
                                id="form-checkout__identificationType"
                                value="CPF"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-8">
                              <div className="form-group">
                                <label className="form-label">
                                  Data de expiração
                                </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="checkout__expirationDate"
                                    id="form-checkout__expirationDate"
                                    className="form-control"
                                    placeholder="dATA eXPIRAÇÃO"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label className="form-label">CVV</label>
                                <input
                                  type="number"
                                  name="securityCode"
                                  id="form-checkout__securityCode"
                                  className="form-control"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>
                          <select
                            style={{ display: "none" }}
                            name="installments"
                            id="form-checkout__installments"
                          ></select>
                          <input
                            type="submit"
                            value="Pagar"
                            className="btn  btn-lg btn-primary"
                          />
                        </div>
                        <div className="tab-pane" id="tab21">
                          {urlBoleto === "" && (
                            <p>
                              <a
                                onClick={() => {
                                  pagarBoleto();
                                }}
                                className="btn btn-primary"
                              >
                                <i className="fa fa-barcode"></i> Visualizar
                                boleto
                              </a>
                            </p>
                          )}
                          {urlBoleto !== "" && (
                            <p>
                              <a
                                target="_blank"
                                href={urlBoleto}
                                className="btn btn-info"
                              >
                                <i className="fa fa-barcode"></i> Ver boleto
                              </a>
                            </p>
                          )}
                          <p className="mb-0">
                            <strong>Atenção:</strong> Pagamentos através de
                            boleto bancário podem levar até 48 horas para
                            compensar. O sistema será liberado após a
                            confirmação do pagamento.
                          </p>
                        </div>
                        <div className="tab-pane" id="tab22">
                          {!pix && (
                            <p>
                              <a
                                onClick={() => {
                                  pagarPix();
                                }}
                                className="btn btn-primary"
                              >
                                <i className="fa fa-barcode"></i> Gerar Pix
                              </a>
                            </p>
                          )}

                          {pix && (
                            <>
                              <p className="text-center">
                                <img src={imagePix} width="35%" />
                              </p>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="aqui entra o código do pix gerado no sistema"
                                  value={urlPix}
                                  id="urlPix"
                                />
                                <span
                                  className="input-group-text btn btn-primary"
                                  onClick={() => {
                                    navigator.clipboard.writeText(urlPix);
                                    alert("Pix copiado");
                                  }}
                                >
                                  Copiar
                                </span>
                              </div>
                              <br />
                              <p className="mb-0">
                                <strong>Atenção:</strong> Realize o pagamento
                                através do qrcode ou pelo código copia e cola.
                                Pagamentos por pix são aprovados em até 2
                                minutos.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
