import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoOddNovo, formatMosaicoOdd } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function MosaicoOdd({ title }) {

  useDocumentTitle(title);

  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [header, setHeader] = useState([]);
  const [showNumberOdd, setShowNumberOdd] = useState("all");
  const [horaAtual, setHoraAtual] = useState(0);

  const [pos1, setPos1] = useState('');
  const [pos2, setPos2] = useState('');
  const [pos3, setPos3] = useState('');
  
  const ultimasCorridas = () => {
    try {
      API.get(`ultimas-corrida-odds`).then(async (res) => {
        setDadosCorridas(res.data.mosaico);
      });
    } catch (e) {}
  }

  const configHeader = () => {
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
      values.reverse();
      setHeader(values);
      setHoraAtual(dt1)
    }
  }

  useEffect(() => {
    configHeader()
    ultimasCorridas();

    
    const ajaxTime = setInterval(() => {
      ultimasCorridas();
      configHeader()
    }, 45000);

    return (_) => clearTimeout(ajaxTime)
  }, [])

  useEffect(() => {
    
  }, [dadosCorridas]);

  const selecionarCorredor = (pos) => {
    let p1 = pos
    let alterou = false

    if(pos1 == '' && p1 != pos1){
      setPos1(p1)
      alterou = true
    }else if(pos1 != '' && p1 == pos1){
      setPos1('')
      alterou = true
    }

    if(!alterou){
      if(pos2 == '' && p1 != pos2){
        setPos2(p1)
        alterou = true
      }else if(pos2 != '' && p1 == pos2){
        setPos2('')
        alterou = true
      }
    }

    if(!alterou){
      if(pos3 == '' && p1 != pos3){
        setPos3(p1)
        alterou = true
      }else if(pos3 != '' && p1 == pos3){
        setPos3('')
        alterou = true
      }
    }
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
                    <h1 className="page-title text-center">MOSAICO DE ODD</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card">
                <div className="card-body">
                  <div className="row mb-5">
                    <div className="btn-list col-12 text-center">
                      <a
                        className={
                          showNumberOdd == 1
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd(1)}
                      >
                        Odd Back
                      </a>
                      <a
                        className={
                          showNumberOdd == 2
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd(2)}
                      >
                        Odd Previsão
                      </a>
                      <a
                        className={
                          showNumberOdd == "all"
                            ? "btn btn-primary"
                            : "btn btn-primary-light"
                        }
                        onClick={() => setShowNumberOdd("all")}
                      >
                        Odd Tricast
                      </a>
                    </div>
                  </div>
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
                        </tr>
                      </thead>
                      <tbody>
                        {header.map((item) => (
                          <tr>
                            <th>{item}</th>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:00`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:00`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:00`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:00`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:03`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:03`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:03`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:03`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:06`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:06`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:06`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:06`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:09`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:09`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:09`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:09`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:12`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:12`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:12`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:12`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:15`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:15`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:15`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:15`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:18`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:18`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:18`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:18`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:21`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:21`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:21`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:21`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:24`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:24`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:24`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:24`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:27`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:27`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:27`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:27`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:30`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:30`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:30`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:30`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:33`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:33`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:33`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:33`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:36`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:36`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:36`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:36`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:39`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:39`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:39`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:39`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:42`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:42`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:42`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:42`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:45`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:45`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:45`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:45`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:48`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:48`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:48`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:48`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:51`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:51`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:51`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:51`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:54`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:54`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:54`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:54`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                            <td>
                              <div>
                              <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[0]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:57`],0,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[1]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:57`],1,pos1,pos2,pos3,showNumberOdd))}</a>
                                <a onClick={ () => {  
                                  let pos = dadosCorridas[`${item}:57`]; 
                                  selecionarCorredor(pos[2]) }}>
                                    {parse(formatMosaicoOddNovo(dadosCorridas[`${item}:57`],2,pos1,pos2,pos3,showNumberOdd))}</a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
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
