import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import parse from 'html-react-parser';
import { formatMosaicoCores } from "./../../../util/funcao";
import useDocumentTitle from "./../Title/useDocumentTitle";
import Piloto from "../../Piloto";
export default function MosaicoCores({ title:tituloHeader }) {
  useDocumentTitle(tituloHeader);
  const [dadosCorridas, setDadosCorridas] = useState([]);
  const [title, setTitle] = useState("MOSAICO PAR/ÍMPAR");
  const [showNumberOdd, setShowNumberOdd] = useState(1);

  const [header, setHeader] = useState([]);
  const [horaAtual, setHoraAtual] = useState(0);
  
  const classPilotoCor = (posicao) => {
    if(["1","3","5"].includes(posicao)){
      return "verde"
    }else if(["2","4","6"].includes(posicao)){
      return "vermelho "
    }else if(["7","9","11"].includes(posicao)){
      return "amarelo"
    }else{
      return "roxo"
    }
  }

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

          <div className="row row-sm">
            <div className="col-lg-12">
              <div className="card custom-card tableCores">
                <div className="card-body">
                  <ul class="legenda mt-5">
											<li><span class="verde"> </span> Pilotos <br />1 - 3 - 5</li>
                      <li><span class="vermelho"> </span> Pilotos <br />2 - 4 - 6</li>
											<li><span class="amarelo"> </span> Pilotos <br />7 - 9 - 11</li>
											<li><span class="roxo"> </span> Pilotos <br />8 - 10 - 12</li>
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
                        </tr>
                      </thead>
                      <tbody>
                        {header.map((item) => (
                          <tr>
                            <th>{item}</th>
                            <Piloto index="00" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="03" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="06" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="09" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="12" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="15" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="18" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="21" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="24" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="27" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="30" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="33" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="36" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="39" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="42" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="45" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="48" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="51" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="54" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
                            <Piloto index="57" dadosCorridas={dadosCorridas} showNumberOdd={showNumberOdd} item={item} handlerFormatColor={ (pos, show) => { return formatMosaicoCores(pos, show, (pos)=> { return classPilotoCor(pos) } ) }} />
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
                  <ul class="legenda mt-5">
                    <li><span class="verde"> </span> Pilotos <br />1 - 3 - 5</li>
                    <li><span class="vermelho"> </span> Pilotos <br />2 - 4 - 6</li>
                    <li><span class="amarelo"> </span> Pilotos <br />7 - 9 - 11</li>
                    <li><span class="roxo"> </span> Pilotos <br />8 - 10 - 12</li>
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
