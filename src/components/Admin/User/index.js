
import React, { useEffect, useState } from "react";
import API from "./../../../http/api";
import AlterarSenha from './alterar-senha'
import AlterarPerfil from "./alterar-perfil";
import useDocumentTitle from "./../Title/useDocumentTitle";

export default function EditarPerfil({ title }) {
  useDocumentTitle(title);
  return (
    <>
      <div class="side-app">
        <div class="main-container container-fluid">
          <div class="row mt-5">
            <div class="col-lg-12 col-md-6 col-sm-12">
                <div class="card overflow-hidden bg-info-transparent">
                    <div class="card-body">
                        <div class="row">
                            <h1 class="page-title text-center">EDITAR PERFIL</h1>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-4 col-md-12 col-sm-12">
              <AlterarSenha />
            </div>
            <div class="col-xl-8 col-md-12 col-sm-12">
              <AlterarPerfil />
            </div>
					</div>
        </div>
      </div>
    </>
  );
}
