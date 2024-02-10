import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { ContActividades, ContExplorar, OfertaCard, ContFavoritos } from "../../components"
///import { GetCategoriaById, getOfertaByCategoriaProducto } from "../../helpers/getOfertaById";
//import { useContext } from "react";
//import { AuthContext } from "../../auth";
import { apiUrl } from "../../apiUrl";
import { ProdOfertaButtonBox } from "../components";
import { useEffect, useState } from "react";
import { ContMenu } from "../../components/cont_menu/ContMenu";

export const ProdByCatPageProv = () => {

  const location = useLocation();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(queryString.parse(location.search).q);
  }, [location]);

  const [categoria, setCategoria] = useState();

  const getCategoria = async () => {
    const resp = await fetch(`${apiUrl}/catProductos?id=${q}`);
    const data = await resp.json();
    const { rows: categoria } = !!data && data;
    setCategoria(categoria[0]);
  };

  const [ofertas, setOfertas] = useState();

  const getOfertas = async () => {
    const resp = await fetch(
      `${apiUrl}/pubbycategoria?id=${categoria?.IdCatProducto}`
    );
    const data = await resp.json();
    const { rows: ofertas } = !!data && data;
    setOfertas(ofertas.filter((oferta) => oferta.IdEstadosOferta === 1));
  };

  useEffect(() => {
    !!categoria && getOfertas();
    // eslint-disable-next-line
  }, [categoria]);

  useEffect(() => {
    !!q && getCategoria();
    // eslint-disable-next-line
  }, [q]);

  const showError = q.length > 0 && ofertas?.length === 0;


  return (
    <div className="comp-main-container u-margin-top-navbar">
      <div className="comp-main-container__izqCont">
        <ContMenu/>
        <ProdOfertaButtonBox/>
        <ContExplorar />
        <ContFavoritos />
      </div>
      <div className="comp-main-container__divSepIzq"></div>
      <div className="comp-main-container__medCont">
        <div className="comp-main-container__medCont__ofertas">
        <div className="explorarCat__title">
          <span className="material-symbols-rounded icon-grey icon--sm">
              arrow_forward_ios
          </span>
          <p className="paragraph--mid"><b>Productos por categoría: {categoria?.Nombre}</b></p>
          </div>
          <hr className="hrGeneral"/>
          <div className="u-margin-top-small"></div>
          {ofertas?.map(oferta => (
            <OfertaCard
            key={oferta.IdOferta} oferta={oferta}
            />
          ))}
          <div 
            className="busqueda__errorBusqueda" 
            style={{display : showError ? '' : 'none'}}
          >
            <p className="paragraph"> No se han encontrado ofertas</p>
          </div>
        </div>
      </div>
      <div className="comp-main-container__divSepDer"></div>
      <div className="comp-main-container__derCont">
        <ContActividades esProveedor={true}/>
      </div>
    </div>
  )
}
