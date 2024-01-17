import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import useDocumentTitle from "./../Title/useDocumentTitle";
import { Chart } from "react-google-charts";
import useCheckMobileScreen from "../../IsMobile/useCheckMobileScreen";

export const options = {
  chart: {
    title: "Pilotos no pódio",
    subtitle: "Número de vezes que o piloto veio no pódio",
  },
  legend: {position: 'block'},
  series: {
    0: { color: '#981511' },
    1: { color: '#593512' },
    2: { color: '#19137F' },
    3: { color: '#7181D9' },
    4: { color: '#164C1E' },
    5: { color: '#599C6C' },
    6: { color: '#DEC700' },
    7: { color: '#EA821F' },
    8: { color: '#333333' },
    9: { color: '#AFAFAF' },
    10: { color: '#582363' },
    11: { color: '#E87DA4' },
  },
};

export default function GraficoPiloto({ title:tituloHeader }) {

  useDocumentTitle(tituloHeader);
  const [dadosPilotos, setDadosPilotos] = useState([
    ['',''],
    ['','']
  ]);
  const [title] = useState("Gráfico de Pilotos");
  const mobile = useCheckMobileScreen()
  
  const getPilotos = () => {
    try {
      API.get(`grafico-linha`).then(async (res) => {
        const valuesHoras = Object.values(res.data.entity.horas)
        const elem = Object.keys(res.data.entity.analise)
        const values = Object.values(res.data.entity.analise)


        let valores = [
          ['Pilotos', ...elem]
        ]
        for(let k = 0; k < 20; k++){
          let resultPilotos = [];
          let hora = valuesHoras[k]
          for(let i = 0; i < elem.length; i++){
            //let percent = (values[i][k] / 20) * 100
            //resultPilotos.push(parseInt(percent))
            resultPilotos.push(parseInt(values[i][k]))
          }
          valores.push([hora, ...resultPilotos])
        }
        setDadosPilotos(valores)

        
      });
    } catch (e) {}
  };

  
  useEffect(() => {
    if(mobile){
      options.legend.position = 'none'
    }
    getPilotos()
    const ajaxTime = setInterval(() => {
      getPilotos()
    }, 60000);

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
                  <Chart
                    chartType="Line"
                    height='500px'
                    data={dadosPilotos}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
