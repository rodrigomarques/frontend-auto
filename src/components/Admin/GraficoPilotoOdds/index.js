import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import useDocumentTitle from "./../Title/useDocumentTitle";
import { Chart } from "react-google-charts";
import useCheckMobileScreen from "../../IsMobile/useCheckMobileScreen";

export const options = {
  chart: {
    title: "Odds em primeiro",
    subtitle: "Número de vezes que a odd veio em primeiro",
  },
  legend: {position: 'block'},
  series: {
    0: { color: '#981511' },
    1: { color: '#DEC700' },
    2: { color: '#599C6C' }
  },
};

export default function GraficoPilotoOdds({ title:tituloHeader }) {

  useDocumentTitle(tituloHeader);
  const [dadosOdds, setDadosOdds] = useState([
    ['',''],
    ['','']
  ]);
  const [title] = useState("Gráfico de Odss");
  const mobile = useCheckMobileScreen()
  
  const getOdds = () => {
    try {
      API.get(`grafico-linha-odds`).then(async (res) => {
        const valuesHoras = Object.values(res.data.entity.horas)
        const elem = Object.keys(res.data.entity.analise)
        const values = Object.values(res.data.entity.analise)


        let valores = [
          ['ODDS', ...elem]
        ]
        for(let k = 0; k < 20; k++){
          let resultOdds = [];
          let hora = valuesHoras[k]
          for(let i = 0; i < elem.length; i++){
            resultOdds.push(parseInt(values[i][k]))
          }
          valores.push([hora, ...resultOdds])
        }
        setDadosOdds(valores)

        
      });
    } catch (e) {}
  };

  
  useEffect(() => {
    if(mobile){
      options.legend.position = 'none'
    }
    getOdds()
    const ajaxTime = setInterval(() => {
      getOdds()
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
                    data={dadosOdds}
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
