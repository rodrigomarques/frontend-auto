import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoNovo, formatImage,showAtivo } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";
export default function Mosaicos({ title:tituloHeader, show }) {
  useDocumentTitle(tituloHeader);
  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [title, setTitle] = useState("MOSAICO DE ODD");

  const [header, setHeader] = useState([]);
  const [showNumberOdd, setShowNumberOdd] = useState("all");
  const [horaAtual, setHoraAtual] = useState(0);

  const [pos1, setPos1] = useState('');
  const [pos2, setPos2] = useState('');
  const [pos3, setPos3] = useState('');
  const [pos4, setPos4] = useState('');
  const [pos5, setPos5] = useState('');
  const [pos6, setPos6] = useState('');
  
  const [showPercent, setShowPercent] = useState(false);
  const [percentVitoria, setPercentVitoria] = useState({});
  const [percentVitoriaMin, setPercentVitoriaMin] = useState({});

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
    if (show === 2) setTitle("MOSAICO PREVISÃO");
    else if (show === "all") setTitle("MOSAICO TRICAST");
    else if (show === 1) setTitle("MOSAICO BACK");
    setShowNumberOdd(show);

    atualizarHeader()
    ultimasCorridas()

    const ajaxTime = setInterval(() => {
      atualizarHeader();
      ultimasCorridas();
    }, 15000);

    return (_) => clearTimeout(ajaxTime);
  }, []);

  const selecionarCorredor = async (pos) => {
    let p1 = pos
    let alterou = false

    let marc = marcados
    //let marc = []

    if(marc === undefined) marc = []
    
    if(marc.includes(pos)){
      marc = marc.filter(val => val !== pos)
      //NAO ATUALIZA
      const novoMarc = Array.from(marc);
      setMarcados(novoMarc)
      contarAcerto('')
      
    }else{
      if(marc.length >= 6 ) return 
      if(marc.length === 0){
        marc[0] = pos
        setMarcados(marc)
      }else{
        const novoMarc = Array.from(marc);
        novoMarc.push(pos)
        setMarcados(novoMarc)
      }
      contarAcerto(pos)
    }

    /*
    if(pos === pos2){
      setPos2('')
      marc[1] = ''
      marc = marc.filter(val => val !== "")
      setMarcados(marc)
      contarAcerto(pos)
      return 
    }

    if(pos === pos3){
      setPos3('')
      marc[2] = ''
      marc = marc.filter(val => val !== "")
      setMarcados(marc)
      contarAcerto(pos)
      return 
    }

    if(pos === pos4){
      setPos4('')
      marc[3] = ''
      marc = marc.filter(val => val !== "")
      setMarcados(marc)
      contarAcerto(pos)
      return 
    }

    if(pos === pos5){
      setPos5('')
      marc[4] = ''
      marc = marc.filter(val => val !== "")
      setMarcados(marc)
      contarAcerto(pos)
      return 
    }

    if(pos === pos6){
      setPos6('')
      marc[5] = ''
      marc = marc.filter(val => val !== "")
      setMarcados(marc)
      contarAcerto(pos)
      return 
    }

    if(showNumberOdd !== 'all'){
      if(pos === pos4){
        setPos4('')
        marc[3] = ''
        marc = marc.filter(val => val !== "")
        setMarcados(marc)
        contarAcerto(pos)
        return 
      }
    }
    
    if(pos1 == '' && p1 != pos1){
      //setPos1(p1)
      marc[0] = p1
      alterou = true
      setMarcados(marc)
      contarAcerto(p1)
    }else if(pos1 != '' && p1 == pos1){
      //setPos1('')
      marc[0] = ''
      marc = marc.filter(val => val !== "")
      alterou = true
      setMarcados(marc)
      contarAcerto('')
    }

    if(!alterou){
      if(pos2 == '' && p1 != pos2){
        //setPos2(p1)
        marc[1] = p1
        alterou = true
        setMarcados(marc)
        contarAcerto(p1)
      }else if(pos2 != '' && p1 == pos2){
        //setPos2('')
        marc[1] = ''
        marc = marc.filter(val => val !== "")
        alterou = true
        setMarcados(marc)
        contarAcerto('')
      }
    }

    if(!alterou){
      if(pos3 == '' && p1 != pos3){
        //setPos3(p1)
        marc[2] = p1
        alterou = true
        setMarcados(marc)
        contarAcerto(p1)
      }else if(pos3 != '' && p1 == pos3){
        //setPos3('')
        marc[2] = ''
        marc = marc.filter(val => val !== "")
        alterou = true
        setMarcados(marc)
        contarAcerto('')
      }
    }

    if(!alterou && showNumberOdd !== 'all'){
      if(pos4 === '' && p1 !== pos4){
        setPos4(p1)
        marc[3] = p1
        alterou = true
        setMarcados(marc)
        contarAcerto(p1)
      }else if(pos4 !=='' && p1 === pos4){
        setPos4('')
        marc[3] = ''
        marc = marc.filter(val => val !== "")
        alterou = true
        setMarcados(marc)
        contarAcerto('')
      }
    }

    if(!alterou && showNumberOdd !== 'all'){
      if(pos5 === '' && p1 !== pos5){
        setPos5(p1)
        marc[4] = p1
        alterou = true
        setMarcados(marc)
        contarAcerto(p1)
      }else if(pos5 !=='' && p1 === pos5){
        setPos5('')
        marc[4] = ''
        marc = marc.filter(val => val !== "")
        alterou = true
        setMarcados(marc)
        contarAcerto('')
      }
    }

    if(!alterou && showNumberOdd !== 'all'){
      if(pos6 === '' && p1 !== pos6){
        setPos6(p1)
        marc[5] = p1
        alterou = true
        setMarcados(marc)
        contarAcerto(p1)
      }else if(pos6 !=='' && p1 === pos6){
        setPos6('')
        marc[5] = ''
        marc = marc.filter(val => val !== "")
        alterou = true
        setMarcados(marc)
        contarAcerto('')
      }
    }
    //setMarcados(marc)
    */
    
  }
  useEffect(() => {
    contarAcerto('')
  }, [marcados])

  const contarAcerto = (pos) => {
    
    //if(pos == ''){
    if(marcados === undefined || marcados === '' || marcados.length === 0){
      setPercentVitoria({})
      setPercentVitoriaMin({})
      setShowPercent(false)
      return true
    }

    if(marcados.length > 0){
      let totalVazio = 0
      marcados.map( val => {
        if(val === '') totalVazio++
      })

      if(totalVazio === marcados.length){
        setPercentVitoria({})
        setPercentVitoriaMin({})
        setShowPercent(false)
        return true
      }
    }
   
    let minutos = [
      '00','03','06','09','12','15','18','21','24','27','30','33','36','39','42','45','48','51','54','57'
    ]

    setShowPercent(true)
    //let vitorias = percentVitoria
    //let vitoriasMin = percentVitoriaMin
    let vitorias = {}
    let vitoriasMin = {}
    
    header.map(cab => {
      let total = 0;
      let acertos = 0;
      minutos.forEach(minuto => {
        if(showNumberOdd === 1 ){
          if(dadosCorridas[`${cab}:${minuto}`] !== undefined && 
          marcados.includes(dadosCorridas[`${cab}:${minuto}`][0]) ){
          //pos == dadosCorridas[`${cab}:${minuto}`][0]){  
            acertos++;
          }
        }else if(showNumberOdd === 2 ){
          if(dadosCorridas[`${cab}:${minuto}`] !== undefined && showAtivo(dadosCorridas[`${cab}:${minuto}`], 2, marcados)){
            acertos++;
          }
          if(dadosCorridas[`${cab}:${minuto}`] !== undefined && (
            marcados.includes(dadosCorridas[`${cab}:${minuto}`][0]) || marcados.includes(dadosCorridas[`${cab}:${minuto}`][1]) )){
            //acertos++;        
          }
        }else if(showNumberOdd === 'all' ){
          if(dadosCorridas[`${cab}:${minuto}`] !== undefined && showAtivo(dadosCorridas[`${cab}:${minuto}`], 'all', marcados)){
            acertos++;
          }
          /*if(dadosCorridas[`${cab}:${minuto}`] !== undefined && (
            marcados.includes(dadosCorridas[`${cab}:${minuto}`][0]) || marcados.includes(dadosCorridas[`${cab}:${minuto}`][1]) || marcados.includes(dadosCorridas[`${cab}:${minuto}`][2]) )){
            //pos === dadosCorridas[`${cab}:${minuto}`][0] 
          //|| pos === dadosCorridas[`${cab}:${minuto}`][1] || pos === dadosCorridas[`${cab}:${minuto}`][2])){  
            acertos++;        
          }*/
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

    minutos.map(cab => {
      let totalMin = 0;
      let acertosMin = 0;
      header.forEach(hora => {
        if(showNumberOdd === 1 ){
          if(dadosCorridas[`${hora}:${cab}`] !== undefined && 
            marcados.includes(dadosCorridas[`${hora}:${cab}`][0]) ){
            //pos == dadosCorridas[`${hora}:${cab}`][0]){  
            acertosMin++;        
          }
        }else if(showNumberOdd === 2 ){
          if(dadosCorridas[`${hora}:${cab}`] !== undefined && showAtivo(dadosCorridas[`${hora}:${cab}`], 2, marcados)){
            acertosMin++;
          }
          if(dadosCorridas[`${hora}:${cab}`] !== undefined && (
            marcados.includes(dadosCorridas[`${hora}:${cab}`][0]) || marcados.includes(dadosCorridas[`${hora}:${cab}`][1]) )) {
            //pos === dadosCorridas[`${hora}:${cab}`][0] 
            //|| pos === dadosCorridas[`${hora}:${cab}`][1])){  
            //acertosMin++;        
          }
        }else if(showNumberOdd === 'all' ){
          if(dadosCorridas[`${hora}:${cab}`] !== undefined && showAtivo(dadosCorridas[`${hora}:${cab}`], 'all', marcados)){
            acertosMin++;
          }
          /*
          if(dadosCorridas[`${hora}:${cab}`] !== undefined && (
            marcados.includes(dadosCorridas[`${hora}:${cab}`][0]) || marcados.includes(dadosCorridas[`${hora}:${cab}`][1]) || marcados.includes(dadosCorridas[`${hora}:${cab}`][2]) )){
            //pos === dadosCorridas[`${hora}:${cab}`][0] 
          //|| pos === dadosCorridas[`${hora}:${cab}`][1] || pos === dadosCorridas[`${hora}:${cab}`][2])){  
            acertosMin++;        
          }*/
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

          {marcados !== undefined && marcados !== '' && marcados.length > 0 && showPercent && (
            <div className="row row-sm">
              <div className="col-lg-12">
                <div className="card custom-card">
                  <div className="card-body">
                    <p style={{ fontSize: '14px', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', lineHeight: '30px'}}>
                      Pilotos Selecionados 
                      <br />
                      {marcados.map((item, index) => (
                        <>
                        {item !== '' && (
                          <>
                            {show === 2 && 
                              parse(formatImage(item, index%2 === 1 ? 'padding-right: 5px' : '' ))
                            }
                            {show === 'all' && 
                              parse(formatImage(item, (index+1)%3 === 0 ? 'padding-right: 5px' : '' ))
                            }
                            {show === 1 && 
                              parse(formatImage(item))
                            }
                          </>
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
              <div className="card custom-card">
                <div className="card-body">
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
                                  showAtivo(dadosCorridas[`${item}:00`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:00`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:00`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:00`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:03`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:03`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:03`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:03`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:03`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:06`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:06`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:06`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:06`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:06`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:09`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:09`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:09`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:09`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:09`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:12`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:12`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:12`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:12`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:12`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:15`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:15`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:15`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:15`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:15`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:18`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:18`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:18`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:18`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:18`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:21`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:21`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:21`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:21`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:21`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:24`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:24`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:24`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:24`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:24`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:27`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:27`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:27`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:27`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:27`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:30`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:30`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:30`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:30`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:30`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:33`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:33`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:33`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:33`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:33`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:36`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:36`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:36`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:36`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:36`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:39`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:39`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:39`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:39`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:39`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:42`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:42`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:42`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:42`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:42`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:45`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:45`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:45`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:45`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:45`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:48`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:48`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:48`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:48`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:48`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:51`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:51`],show, marcados) 
                              )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:51`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:51`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:51`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:54`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:54`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:54`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:54`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:54`],2,pos1,pos2,pos3,show, marcados))}</a>
                              </div>
                            </td>
                            <td className={ (
                              dadosCorridas[`${item}:57`] != undefined && (
                                showAtivo(dadosCorridas[`${item}:57`],show, marcados) 
                                )) ? " atv ":" " }>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:57`],0,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:57`],1,pos1,pos2,pos3,show, marcados))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoNovo(dadosCorridas[`${item}:57`],2,pos1,pos2,pos3,show, marcados))}</a>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
