import React from "react";

export default function MyButton(props) {
  let loading = props.load || false
  if (loading) {
    return (
      <>
        <div className={props.className}>
          <img src="/assets/images/loader.svg" style={{ height: '100%' }} alt="Loading" />
        </div>
      </>
    );
  }
  return (
    <>
      <button type="button" onClick={() => props.click()} className={props.className} >
        {props.text}
      </button>
    </>
  );
}