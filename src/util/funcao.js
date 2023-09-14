const getImageRunner = (posicao) => {
  return `/assets/images/grand_prix_${posicao}.png`;
};

  const totalDias = (mes, dias) => {
    let mesEmDias = 0
    if (mes !== undefined && mes > 0) {
      mesEmDias = mes * 30
    }

    return dias + mesEmDias
}
  
const formatMosaicoOdd = (posicoes, show = "all") => {
  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let formatString = "";
    posicoes.map((elem, index) => {
        if (show !== "all") {
            if (show > index) {
                formatString += formatOdd(elem);
                formatString += " ";
            }
        } else {
            formatString += formatOdd(elem);
            formatString += " ";
      }
      return formatString;
  });
  return formatString;
};


const formatMosaicoOddValores = (oddPaga, show = 1) => {
  if (oddPaga === undefined) return "";
  if (typeof oddPaga !== "object") return oddPaga;
  let formatString = "";
  oddPaga.map((elem, index) => {
    let posicaoExibir = index + 1
    if (show === posicaoExibir) {
      if(show === 1) formatString += formatOddValorPrevisao(elem);
      if (show === 2) formatString += formatOddValorTricast(elem);
      formatString += " ";
    }
    return formatString;
  });
  return formatString;
};


const formatMosaico = (posicoes, show = "all", pos1 = '', pos2 = '', pos3 = '') => {
  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let formatString = "";
    posicoes.map((elem, index) => {
        let style = ''
        if(pos1 === elem){
          style = 'border: 5px #F00 solid;'
        }
        if(pos2 === elem){
          style = 'border: 5px #0F0 solid;'
        }
        if(pos3 === elem){
          style = 'border: 5px #000 solid;'
        }
        
        if (show !== "all") {
            if (show > index) {
                formatString += "<img src=" + getImageRunner(elem) + " style='max-width: none;"+style+"'/>";
                formatString += " ";
            }
        } else {
            formatString += "<img src=" + getImageRunner(elem) + " class='elem" +elem+ "' style='max-width: none;"+style+"'/>";
            formatString += " ";
      }
      return formatString;
  });
  return formatString;
};

const formatMosaicoNovo = (posicoes, index = 0, pos1 = '', pos2 = '', pos3 = '', show = 'all') => {
  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let elem = posicoes[index]
  let style = ''
    if(pos1 === elem){
      style = 'border: 5px #F00 solid;'
    }
    if(pos2 === elem){
      style = 'border: 5px #0F0 solid;'
    }
    if(pos3 === elem){
      style = 'border: 5px #000 solid;'
    }
    
    if(show !== 'all' && show < index + 1){
      return '';
    }
  let formatString = "";
  formatString += "<img src=" + getImageRunner(elem) + " style='max-width: none;"+style+"'/>";
  formatString += " ";
  return formatString;
};

const formatMosaicoOddNovo = (posicoes, index = 0, pos1 = '', pos2 = '', pos3 = '', show = 'all') => {

  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let elem = posicoes[index]
  
  let style = ''
    if(pos1 === elem){
      style = 'border: 5px #F00 solid;'
    }
    if(pos2 === elem){
      style = 'border: 5px #0F0 solid;'
    }
    if(pos3 === elem){
      style = 'border: 5px #000 solid;'
    }
    
    if(show !== 'all' && show < index + 1){
      return '';
    }
  let formatString = "";
  formatString += "<span style='max-width: none;"+style+"'>" + formatOdd(elem) + "</span>" 
  formatString += " ";
  return formatString;
};

const classPilotoCor = (posicao) => {
  if(posicao <= 4){
    return "vermelho";
  }else if(posicao <= 8){
    return "amarelo";
  }else{
    return "roxo";
  }
}
const formatMosaicoCores = (posicoes, show = "all") => {
  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let formatString = "";
    posicoes.map((elem, index) => {
        if (show !== "all") {
            if (show > index) {
                formatString += "<span class='" +classPilotoCor(elem)+ "'>" +elem+ "</span>";
                formatString += " ";
            }
        } else {
            formatString += "<span class='" +classPilotoCor(elem)+ "'>" +elem+ "</span>";
            formatString += " ";
      }
      return formatString;
  });
  return formatString;
};


const formatDate = (data) => {
  if (data === undefined) return "";
  if (data === "") return "";
  data = data.replace(/-/g, "/");
  let dt = new Date(data);
  return new Intl.DateTimeFormat("pt-BR").format(dt);
};

const formatHour = (hora) => {
  if (hora === undefined) return "";
  if (hora === "") return "";
  return hora.substring(0,5)
};

const getNumberOnly = (str) => {
  if (str === undefined) return "";
  return str.replace(/\D/g, "");
};

const fn = (value, currencyStyle) => {
  if (value === undefined || value === "") return "0,00";
  let formato = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "BRL",
  };

  if (currencyStyle !== undefined) {
    formato.style = "currency";
  }

  value = parseFloat(value);
  return value.toLocaleString("pt-BR", formato);
};

const formatOdd = (odd) => {
  if (odd === "undefined" || odd === undefined)
    return ""
  
  if (odd >= 12) {
    return `<span className="tag tag-green">${odd}</span>`;
  } else if (odd > 6) {
    return `<span className="tag tag-yellow">${odd}</span>`;
  } else {
    return `<span className="tag tag-red">${odd}</span>`;
  }
};

const formatOddValorPrevisao = (odd) => {
  if (odd === "undefined" || odd === undefined) return "";
  if (odd >= 230) {
    return `<span className="tag tag-green">${odd}</span>`;
  } else if (odd >= 100) {
    return `<span className="tag tag-yellow">${odd}</span>`;
  } else {
    return `<span className="tag tag-red">${odd}</span>`;
  }
};

const formatOddValorTricast = (odd) => {
  if (odd === "undefined" || odd === undefined) return "";
  if (odd >= 3000) {
    return `<span className="tag tag-green">${odd}</span>`;
  } else if (odd >= 1000) {
    return `<span className="tag tag-yellow">${odd}</span>`;
  } else {
    return `<span className="tag tag-red">${odd}</span>`;
  }
};

const ceilPercent = (percent) => {
  let divisao = Math.trunc(percent / 5);
  let result = divisao * 5;
  //35, 55,  85
  if (result === 35) result = 40
  else if (result === 55) result = 60
  else if (result === 85) result = 90
  return result;
};

const percentStyle = (val1, total) => {
  let vPercent = (val1 / total) * 100;
  return `progress-bar progress-bar-striped bg-primary  w-${ceilPercent(
    vPercent
  )}`;
};

const nVezes = (num) => {
  if (num === undefined) return ""
  if (num === "") return "";
  if (num === 1 || num === "1") return "vez"
  if (num > 1 || num === 0) return "vezes";
  return "";
};

export {
  getImageRunner,
  formatMosaicoOdd,
  formatMosaico,
  formatDate,
  formatOdd,
  fn,
  getNumberOnly,
  percentStyle,
  formatMosaicoOddValores,
  formatHour,
  nVezes,
  totalDias,
  formatMosaicoCores,
  formatMosaicoNovo,
  formatMosaicoOddNovo
};
