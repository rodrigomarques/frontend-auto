const getImageRunner = (posicao) => {
  return `/assets/images/grand_prix_${posicao}.png`;
};

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

const formatMosaico = (posicoes, show = "all") => {
  if (posicoes === undefined) return "";
  if (typeof posicoes !== "object") return posicoes;
  let formatString = "";
    posicoes.map((elem, index) => {
        if (show !== "all") {
            if (show > index) {
                formatString += "<img src=" + getImageRunner(elem) + " style='max-width: none;'/>";
                formatString += " ";
            }
        } else {
            formatString +=
                "<img src=" + getImageRunner(elem) + " style='max-width: none;'/>";
            formatString += " ";
      }
      return formatString;
  });
  return formatString;
};

const formatDate = (data) => {
  if (data === undefined) return "";
  data = data.replace("-", "/");
  let dt = new Date(data);
  return new Intl.DateTimeFormat("pt-BR").format(dt);
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
  if (odd >= 12) {
    return `<span className="tag tag-green">${odd}</span>`;
  } else if (odd > 6) {
    return `<span className="tag tag-yellow">${odd}</span>`;
  } else {
    return `<span className="tag tag-red">${odd}</span>`;
  }
};

const ceilPercent = (percent) => {
  let divisao = Math.trunc(percent / 5);
  return divisao * 5;
};

const percentStyle = (val1, total) => {
  let vPercent = (val1 / total) * 100;
  return `progress-bar progress-bar-striped bg-primary  w-${ceilPercent(
    vPercent
  )}`;
};

export { getImageRunner, formatMosaicoOdd, formatMosaico, formatDate, formatOdd, fn, getNumberOnly, percentStyle };
