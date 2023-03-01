import React, { useEffect, useState, useContext } from "react";
import useDocumentTitle from "./../Title/useDocumentTitle";
import MyButton from "./../../MyButton";
import YoutubeEmbed from "./../Youtube/YoutubeEmbed";
import API from "./../../../http/api";
import axios from "axios";
import { browserName, browserVersion } from "react-device-detect";
import MyContext from "./../../../context";
import jwt_decode from "jwt-decode";
export default function Tutorial({ title }) {

  let { token, setToken, user, setUser } = useContext(MyContext);

  useDocumentTitle(title);
  const [aceite, setAceite] = useState(false);
  const [ip, setIp] = useState("");
  const [videos, setVideos] = useState([]);
  
  const getVideos = () => {
    try {
      API.get(`api/admin/tutorial`).then(async (res) => {
        setVideos(res.data.entity)
      });
    } catch (e) {}
  }

  const confirmar = () => {
    if (!aceite) {
      alert("É necessário marcar o aceite")
      return;
    }

    API.post(`api/aceitar`, {
      ip: ip,
      host: browserName + " " + browserVersion,
    }).then((res) => {
      let dados = jwt_decode(res.data.token);
      setUser(dados);
      setToken(res.data.token);

      localStorage.setItem("tk", res.data.token);
      localStorage.setItem("user", JSON.stringify(dados));
      window.location.href='/admin/'
    }).catch(err => {
      alert("Aceite não pode ser realizado. Tente novamente mais tarde!")
    });
  }

  useEffect(() => {
    const carregarIp = async () => {
      let result = await axios.get("https://geolocation-db.com/json/");
      setIp(result.data.IPv4);
    };
    getVideos()
    carregarIp();
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
                    <h1 className="page-title text-center">VIDEO TUTORIAL</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-sm">
            {(user.aceite === undefined || user.aceite !== 1) && (
              <div className="col-lg-12">
                <div className="wrap-login100 p-0 mb-4">
                  <div className="card-body">
                    <form className="validate-form">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked={aceite}
                          onChange={() => setAceite(!aceite)}
                        />
                        <span className="custom-control-label">
                          Eu confirmo que assisti todos os vídeos de "como jogar
                          na bet365".
                        </span>
                      </label>
                      {aceite && (
                        <MyButton
                          text="Confirmar"
                          click={() => confirmar()}
                          className=" btn btn-primary"
                        />
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )}
            {videos !== undefined && videos.length > 0 && videos.map(( video ) => {
              return (
                <div className="col-lg-4">
                  <div className="card custom-card">
                    <div className="card-header justify-content-center">
                      <div className="card-title">
                        <p className="text-center mt-0 mb-0">
                          { video.titulo }
                        </p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <YoutubeEmbed embedId={ video.url_yt } />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
