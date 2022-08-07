import React from "react";

export default function MyButton(props) {
  let loading = props.load || false
  if (loading) {
    return (
      <>
        <button className={props.className}>
          <img src="/assets/images/loader.svg" style={{ height: '100%' }} alt="Loading" />
        </button>
      </>
    );
  }
  return (
    <>
      <a href="#" type="button" onClick={() => props.click()} className={ props.className }>
        {props.text}
      </a>
    </>
  );
}