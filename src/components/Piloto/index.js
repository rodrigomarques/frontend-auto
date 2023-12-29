import React from "react";
import parse from 'html-react-parser';

export default function Piloto(props) {

  let dadosCorridas = props.dadosCorridas || []
  let item = props.item || ''
  let showNumberOdd = props.showNumberOdd || 'all'
  let index = props.index || '00'

  const formatCor = (pos, show) => {
    if(props.handlerFormatColor !== undefined){
        return props.handlerFormatColor(pos, show)
    }
    return ""
  }
  
  return (
    <td>
        <div>
            {parse(
                formatCor(
                dadosCorridas[`${item}:${index}`],
                showNumberOdd
                )
            )}
        </div>
    </td>
  )
}