import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from './../Title/useDocumentTitle'

export default function Header(props) {
  
  useDocumentTitle(props.title);

  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-12 col-md-6 col-sm-12">
          <div className="card overflow-hidden bg-info-transparent">
            <div className="card-body">
              <div className="row">
                <h1 className="page-title text-center">MÁXIMAS</h1>
                <h6 className="text-center mb-0">Últimas 24 horas</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-sm">
        <div className="col-lg-12">
          <div className="row mb-7 mt-3">
            <div className="btn-list col-12 text-center">
              <Link
                className={
                  props.link === 1 ? "btn btn-primary" : "btn btn-primary-light"
                }
                to="/admin/maximas"
              >
                {" "}
                Máxima de Números
              </Link>
              <Link
                to="/admin/pilotos"
                className={
                  props.link === 2 ? "btn btn-primary" : "btn btn-primary-light"
                }
              >
                Máxima de Pilotos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
