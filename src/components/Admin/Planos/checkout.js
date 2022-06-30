import React, { useContext, useEffect, useState } from "react";
import MyContext from "./../../../context";
import { useLocation } from "react-router-dom";
import API from "./../../../http/api";
import { getNumberOnly  } from "./../../../util/funcao";

export default function Checkout() {
  const { user, setUser } = useContext(MyContext);
  const { state } = useLocation();

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


  const [nomeCartao, setNomeCartao] = useState();
  
  const [numCartao, setNumCartao] = useState();
  const [cpfTitular, setCpfTitular] = useState();

  const { plano } = state;

  useEffect(() => {
    carregar()
  }, []);
  const carregar = async () => {
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
    let objParam = {
      transaction_amount: "" + plano.valor,
      description: "Autobet " + plano.plano,
      email: user.email,
      nome: nome,
      sobrenome: sobrenome,
      number: user.cpf,
      cep: newCep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      plano_id: plano.id,
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
    let objParam = {
      transaction_amount: "" + plano.valor,
      description: "Autobet " + plano.plano,
      email: user.email,
      nome: nome,
      sobrenome: sobrenome,
      number: user.cpf,
      cep: newCep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      plano_id: plano.id,
    };
    
    API.post(`api/pix`, objParam)
      .then((res) => {
        console.log(res.data.entity.link);
        if (res.data.entity.qr_code !== undefined) {
          setPix(true);
          setImagePix(`data:image/png;base64,${res.data.entity.qr_code_base64}`);
          setUrlPix(res.data.entity.qr_code);          
        } else {
          alert("NADA")
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
        "TEST-8f313f06-ddfe-4ea1-b5a8-ef95dbdf6de0"
      );
    }

    if (cardForm === undefined) {
      cardForm = await mercadopago.cardForm({
        amount: "" + plano.valor,
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

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            API.post("/api/pagar", {
              token: cardForm.token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Plano Autobet",
              email,
              type: identificationType,
              number: identificationNumber,
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
              })
              .catch((err) => {
                console.log("Erro");
                console.log(err);
              });
          },
        },
      });
    }

    //console.log(await cardForm.createCardToken());
  };

  const pagar = async () => {
    /*console.log(cardForm);
    let cardValues = await cardForm.createCardToken();

    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      installments,
      identificationNumber,
      identificationType,
    } = cardForm.getCardFormData();
    console.log(cardForm.getCardFormData());

    alert(issuer_id);
    alert(installments);
    /*
    API.post("/api/pagar", {
      token: cardValues.token,
      issuer_id,
      payment_method_id,
      transaction_amount: Number(amount),
      installments: Number(installments),
      description: "Plano Autobet",
      email,
      type: identificationType,
      number: identificationNumber,
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
      })
      .catch((err) => {
        console.log("Erro");
        console.log(err);
      });*/
  };

  return (
    <>
      <form id="formcheckout">
        <div className="side-app">
          <div className="main-container container-fluid">
            <div className="row mt-5">
              <div className="col-lg-12 col-md-6 col-sm-12">
                <div className="card overflow-hidden bg-info-transparent">
                  <div className="card-body">
                    <div className="row">
                      <h1 className="page-title text-center">
                        Falta pouco! Você escolheu o plano{plano.plano}
                        <strong>
                          {plano.recorrencia_mes} Mês(es) - R$ {plano.valor}
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
                  <div className="card-body">
                    <div className="card-pay">
                      <ul className="tabs-menu nav">
                        <li className="">
                          <a
                            href="#tab20"
                            className="active"
                            data-bs-toggle="tab"
                          >
                            <i className="fa fa-credit-card"></i> Credit Card
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
                                <img src={ imagePix } width="35%" />
                              </p>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="aqui entra o código do pix gerado no sistema"
                                  value={urlPix}
                                  id="urlPix"
                                />
                                <span className="input-group-text btn btn-primary" onClick={() => {
                                  navigator.clipboard.writeText(urlPix)
                                  alert("Pix copiado")
                                }}>
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
