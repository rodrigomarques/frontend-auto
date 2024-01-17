import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoCores, formatImage, showAtivoColor } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";
export default function MosaicoCores({ title:tituloHeader }) {
  useDocumentTitle(tituloHeader);
  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [title, setTitle] = useState("MOSAICO DE CORES");
  const [showNumberOdd, setShowNumberOdd] = useState(1);
  
  const [percentVitoriaMin, setPercentVitoriaMin] = useState({});
  const [percentVitoria, setPercentVitoria] = useState({});
  
  const [showPercent, setShowPercent] = useState(false);

  const [header, setHeader] = useState([]);
  const [horaAtual, setHoraAtual] = useState(0);
  const [marcados, setMarcados] = useState([]);
  
  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corrida-piloto`).then(async (res) => {
        setDadosCorridas(res.data.mosaico);
      });
    } catch (e) {}
  };

  const atualizarHeader = () => {
    let values = [];
    var dt1 = new Date().toLocaleString("en-GB", {
      hour: "2-digit",
      timeZone: "Europe/London",
    });
    if (horaAtual !== dt1) {
      for (let i = 0; i < 24; i++) {
        let hora = dt1 - i; //data.getHours() - i;
        if (hora < 0) {
          hora = hora + 24;
        }
        if (hora < 10) hora = "0" + hora;
        values.push(hora);
      }
      values.reverse()
      setHeader(values)
      setHoraAtual(dt1)
    }
  }

  useEffect(() => {
    atualizarHeader()
    ultimasCorridas()

    const ajaxTime = setInterval(() => {
      atualizarHeader();
      ultimasCorridas();
    }, 15000);

    return (_) => clearTimeout(ajaxTime);
  }, []);

  const selecionarCorredor = (pos) => {
    pos = parseInt(pos)
    let bloco1 = [1,2,3,4]
    let bloco2 = [5,6,7,8]
    let bloco3 = [9,10,11,12]

    let marc = marcados
    let nvMarcados = marc.filter(val => val !== "")
    let jaExisteMarcado = []
    if(bloco1.includes(pos)){
      jaExisteMarcado = marc.filter(val => bloco1.includes(val))
    }else if(bloco2.includes(pos)){
      jaExisteMarcado = marc.filter(val => bloco2.includes(val))
    }else if(bloco3.includes(pos)){
      jaExisteMarcado = marc.filter(val => bloco3.includes(val))
    }

    if(jaExisteMarcado.length > 0){
      nvMarcados = nvMarcados.filter(val => !jaExisteMarcado.includes(val))
      //nvMarcados = nvMarcados.splice(nvMarcados.indexOf(pos), 1);
      //console.log('nvMarcados', nvMarcados.indexOf(pos))
      setMarcados(nvMarcados)

      nvMarcados = nvMarcados.filter(val => val !== "")
      if(nvMarcados.length === 0){
        setPercentVitoriaMin({})
        setPercentVitoria({})
        setShowPercent(false)
        return ;
      }
      atualizaHeader(percentVitoriaMin, nvMarcados)
      return ;
    }

    if(nvMarcados.length >= 3 ){
      return ;
    }

    if(nvMarcados.length === 0){
      setPercentVitoriaMin({})
      setPercentVitoria({})
      setShowPercent(false)
    }

    if(!nvMarcados.includes(pos)){
      nvMarcados.push(pos)
    }

    setMarcados(nvMarcados)
    atualizaHeader(percentVitoriaMin, nvMarcados)
  }

  const contarAcerto = (piloto, nvMarcados) => {
    //let marc = marcados
    //let nvMarcados = marc.filter(val => val !== "")
    for(let index in nvMarcados){
      let valMarc = nvMarcados[index]
      //console.log(valMarc  + " = " + piloto)
      if(valMarc <= 4 && piloto <= 4){
        return true
      }else if(valMarc > 4 && valMarc <= 8 && piloto > 4 && piloto <= 8){
        return true
      }else if(valMarc > 8 && piloto > 8){
        return true
      }
    }

    return false;
  }

  const atualizaHeader = (percentVitoriaMin, nvMarcados) => {
    let minutos = [
      '00','03','06','09','12','15','18','21','24','27','30','33','36','39','42','45','48','51','54','57'
    ]
    setShowPercent(true)

    let vitorias = percentVitoria
    // eslint-disable-next-line array-callback-return
    header.map(cab => {
      let total = 0;
      let acertos = 0;
      minutos.forEach(minuto => {
        //if(dadosCorridas[`${cab}:${minuto}`] !== undefined && nvMarcados.includes(dadosCorridas[`${cab}:${minuto}`][0]) ){
        if(dadosCorridas[`${cab}:${minuto}`] !== undefined && contarAcerto(dadosCorridas[`${cab}:${minuto}`][0], nvMarcados) ){
          acertos++;        
        }
        total++;
      })

      let percAcert = 0;
      if(acertos >= 0){
        percAcert = (acertos/total) * 100;
      }
      
      if(!isNaN(percAcert)){
        percAcert = percAcert.toFixed(0)
      }

      let elemProp = 'header' + cab
      vitorias[elemProp] = percAcert + "%"
    })
    setPercentVitoria(vitorias)


    let vitoriasMin = percentVitoriaMin
    
    // eslint-disable-next-line array-callback-return
    minutos.map(cab => {
      let totalMin = 0;
      let acertosMin = 0;
      header.forEach(hora => {
        //if(dadosCorridas[`${hora}:${cab}`] !== undefined && nvMarcados.includes(dadosCorridas[`${hora}:${cab}`][0]) ){
        if(dadosCorridas[`${hora}:${cab}`] !== undefined && contarAcerto(dadosCorridas[`${hora}:${cab}`][0], nvMarcados) ){
          acertosMin++;        
        }
        totalMin++;
      })
      
      let percAcert = 0;
      if(acertosMin >= 0){
        percAcert = (acertosMin/totalMin) * 100;
      }
      

      let elemProp = 'header' + cab
      if(!isNaN(percAcert)){
        percAcert = percAcert.toFixed(0)
      }
      vitoriasMin[elemProp] = percAcert + "%"
    })

    setPercentVitoriaMin(vitoriasMin)
  }

  return (
    <>
      <div className="side-app">
        <div className="main-container container-fluid">
          <div className="row mt-5">
            <div className="col-lg-12 col-sm-12">
              <div className="card overflow-hidden bg-info-transparent">
                <div className="card-body">
                  <div className="row">
                    <h1 className="page-title text-center">{title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {marcados !== undefined && marcados !== '' && marcados.length > 0 && (
            <div className="row row-sm">
              <div className="col-lg-12">
                <div className="card custom-card">
                  <div className="card-body">
                    <p style={{ fontSize: '14px', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', lineHeight: '30px'}}>
                      Cores Selecionadas
                      <br />
                      {marcados.map((item) => (
                        <>
                        {item !== '' && (
                          <span className="headerCores me-2">
                            {parse(formatMosaicoCores([item], 1, undefined, false))}
                          </span>
                        )}
                        </>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card tableCores">
                <div className="card-body">
                  <ul class="legenda mt-5">
											<li><span class="vermelho"> </span> Pilotos <br />1 - 2 - 3 - 4</li>
											<li><span class="amarelo"> </span> Pilotos <br />5 - 6 - 7 - 8</li>
											<li><span class="roxo"> </span> Pilotos <br />9 - 10 - 11 - 12</li>
									</ul>
                  {Object.entries(dadosCorridas).forEach(([chave, valor]) => (
                    <tr>
                      <th>{chave}</th>
                    </tr>
                  ))}
                  <div className="table-responsive">
                    <table className="table border text-nowrap text-md-nowrap table-bordered mg-b-0 table-odd">
                      <thead>
                        <tr style={{ backgroundColor: "#EDEDED" }}>
                          <th></th>
                          <th>00</th>
                          <th>03</th>
                          <th>06</th>
                          <th>09</th>
                          <th>12</th>
                          <th>15</th>
                          <th>18</th>
                          <th>21</th>
                          <th>24</th>
                          <th>27</th>
                          <th>30</th>
                          <th>33</th>
                          <th>36</th>
                          <th>39</th>
                          <th>42</th>
                          <th>45</th>
                          <th>48</th>
                          <th>51</th>
                          <th>54</th>
                          <th>57</th>
                          { showPercent && (
                          <th></th>
                          )}
                        </tr>
                        { showPercent && (
                        <tr>
                          <th></th>
                          <th>{(percentVitoriaMin[`header00`] !== undefined)?<>
                              {percentVitoriaMin[`header00`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header03`] !== undefined)?<>
                              {percentVitoriaMin[`header03`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header06`] !== undefined)?<>
                              {percentVitoriaMin[`header06`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header09`] !== undefined)?<>
                              {percentVitoriaMin[`header09`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header12`] !== undefined)?<>
                              {percentVitoriaMin[`header12`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header15`] !== undefined)?<>
                              {percentVitoriaMin[`header15`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header18`] !== undefined)?<>
                              {percentVitoriaMin[`header18`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header21`] !== undefined)?<>
                              {percentVitoriaMin[`header21`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header24`] !== undefined)?<>
                              {percentVitoriaMin[`header24`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header27`] !== undefined)?<>
                              {percentVitoriaMin[`header27`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header30`] !== undefined)?<>
                              {percentVitoriaMin[`header30`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header33`] !== undefined)?<>
                              {percentVitoriaMin[`header33`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header36`] !== undefined)?<>
                              {percentVitoriaMin[`header36`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header39`] !== undefined)?<>
                              {percentVitoriaMin[`header39`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header42`] !== undefined)?<>
                              {percentVitoriaMin[`header42`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header45`] !== undefined)?<>
                              {percentVitoriaMin[`header45`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header48`] !== undefined)?<>
                              {percentVitoriaMin[`header48`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header51`] !== undefined)?<>
                              {percentVitoriaMin[`header51`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header54`] !== undefined)?<>
                              {percentVitoriaMin[`header54`]}
                              </>:""}</th>
                          <th>{(percentVitoriaMin[`header57`] !== undefined)?<>
                              {percentVitoriaMin[`header57`]}
                              </>:""}</th>
                          <th></th>
                        </tr>
                      )}
                      </thead>
                      <tbody>
                        {header.map((item) => (
                          <tr>
                            <th>{item}</th>
                            <td className={ (
                              dadosCorridas[`${item}:00`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:00`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    { showAtivoColor(dadosCorridas[`${item}:00`], marcados) }
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:00`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:03`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:03`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:03`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:06`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:06`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:06`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:09`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:09`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:09`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:12`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:12`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:12`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:15`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:15`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:15`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:18`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:18`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:18`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:21`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:21`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:21`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:24`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:24`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:24`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:27`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:27`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:27`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:30`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:30`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:30`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:33`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:33`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:33`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:36`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:36`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:36`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:39`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:39`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:39`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:42`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:42`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:42`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:45`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:45`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:45`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:48`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:48`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:48`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:51`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:51`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:51`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:54`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:54`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:54`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:57`] !== undefined && (
                                showAtivoColor(dadosCorridas[`${item}:57`], marcados) 
                              )) ? " atv-cores ":" " }>
                              <div>
                              <a  onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[0]) }}>
                                  {parse(
                                  formatMosaicoCores(
                                    dadosCorridas[`${item}:57`],
                                    showNumberOdd
                                  )
                                )}
                                </a>
                              </div>
                            </td>
                            { showPercent && (
                            <td>
                              {(percentVitoria[`header${item}`] !== undefined)?<>
                              {percentVitoria[`header${item}`]}
                              </>:""}
                            </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        { showPercent && (
                          <tr>
                            <th></th>
                            <th>{(percentVitoriaMin[`header00`] !== undefined)?<>
                                {percentVitoriaMin[`header00`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header03`] !== undefined)?<>
                                {percentVitoriaMin[`header03`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header06`] !== undefined)?<>
                                {percentVitoriaMin[`header06`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header09`] !== undefined)?<>
                                {percentVitoriaMin[`header09`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header12`] !== undefined)?<>
                                {percentVitoriaMin[`header12`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header15`] !== undefined)?<>
                                {percentVitoriaMin[`header15`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header18`] !== undefined)?<>
                                {percentVitoriaMin[`header18`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header21`] !== undefined)?<>
                                {percentVitoriaMin[`header21`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header24`] !== undefined)?<>
                                {percentVitoriaMin[`header24`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header27`] !== undefined)?<>
                                {percentVitoriaMin[`header27`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header30`] !== undefined)?<>
                                {percentVitoriaMin[`header30`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header33`] !== undefined)?<>
                                {percentVitoriaMin[`header33`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header36`] !== undefined)?<>
                                {percentVitoriaMin[`header36`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header39`] !== undefined)?<>
                                {percentVitoriaMin[`header39`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header42`] !== undefined)?<>
                                {percentVitoriaMin[`header42`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header45`] !== undefined)?<>
                                {percentVitoriaMin[`header45`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header48`] !== undefined)?<>
                                {percentVitoriaMin[`header48`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header51`] !== undefined)?<>
                                {percentVitoriaMin[`header51`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header54`] !== undefined)?<>
                                {percentVitoriaMin[`header54`]}
                                </>:""}</th>
                            <th>{(percentVitoriaMin[`header57`] !== undefined)?<>
                                {percentVitoriaMin[`header57`]}
                                </>:""}</th>
                            <th></th>
                          </tr>
                        )}
                        <tr style={{ backgroundColor: "#EDEDED" }}>
                          <th></th>
                          <th>00</th>
                          <th>03</th>
                          <th>06</th>
                          <th>09</th>
                          <th>12</th>
                          <th>15</th>
                          <th>18</th>
                          <th>21</th>
                          <th>24</th>
                          <th>27</th>
                          <th>30</th>
                          <th>33</th>
                          <th>36</th>
                          <th>39</th>
                          <th>42</th>
                          <th>45</th>
                          <th>48</th>
                          <th>51</th>
                          <th>54</th>
                          <th>57</th>
                          { showPercent && (
                          <th></th>
                          )}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <ul class="legenda mt-5">
											<li><span class="vermelho"> </span> Pilotos <br />1 - 2 - 3 - 4</li>
											<li><span class="amarelo"> </span> Pilotos <br />5 - 6 - 7 - 8</li>
											<li><span class="roxo"> </span> Pilotos <br />9 - 10 - 11 - 12</li>
										</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
