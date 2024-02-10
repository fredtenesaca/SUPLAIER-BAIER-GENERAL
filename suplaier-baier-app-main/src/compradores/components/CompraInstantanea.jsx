import { useEffect, useState, useContext } from "react";
import { apiUrl } from "../../apiUrl";
import { useForm } from "../../hooks";
import { AuthContext } from "../../auth";
export const CompraInstantanea = ({
  setShowCompraInstantanea,
  setUnidadesPetUsuario,
  oferta,
  setShowInstantaneaExitosa,
  costoTotal,
  setCostoTotal,
  producto,
  unidadesPetUsuario,
}) => {
  const { unidadesUser, onInputChange } = useForm({ unidadesUser: 0 });

  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const [proveedor, setProveedor] = useState({});

  const onCompraSubmit = (e) => {
    e.preventDefault();
    crearCompraIndividual();
    setUnidadesPetUsuario(unidadesUser);
    setShowInstantaneaExitosa(true);
    setShowCompraInstantanea(false);
    actualizarOferta();
  };

  const getProveedor = async () => {
    const resp = await fetch(
      `${apiUrl}/usuarios?idUsuario=${oferta.IdProveedor}`
    );
    const data = await resp.json();
    const { rows: proveedor } = !!data && data;
    setProveedor(proveedor[0]);
  };

  const actualizarOferta = async () => {
    const body = {
      IdOferta: oferta.IdOferta,
      NuevoActualProductos:
        parseInt(oferta.ActualProductos) + parseInt(unidadesUser),
    };
    const resp = await fetch(`${apiUrl}/ofertas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    console.log(!!data && "exito");
  };

  const crearCompraIndividual = async () => {
    const body = {
      IdComprador: user.IdUsuario,
      IdProveedor: oferta.IdProveedor,
      IdOferta: oferta.IdOferta,
      Cantidad: unidadesPetUsuario,
      Total: costoTotal,
      Descripcion: "",
      Observacion: "",
      IdEstado: oferta.IdEstadosOferta,
      MetodoPago: "reserva",
      PagadoAProveedor: false,
      TipoCompra: "instantanea",
    };

    const resp = await fetch(`${apiUrl}/compras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    console.log(!!data && "exito");
  };
  useEffect(() => {
    setCostoTotal(parseInt(unidadesUser) * oferta?.ValorUInstantaneo);
    getProveedor();
    // eslint-disable-next-line
  }, [unidadesUser, oferta, setCostoTotal]);

  return (
    <div className="metodoPago animate__animated animate__fadeIn">
      <div className="compraProducto animate__animated animate__slideInDown">
        {/* <div className="metodoPago__barraSup"></div> */}
        <form onSubmit={onCompraSubmit}>
          <div className="compraProducto__box">
            <div className="explorarCat__title">
              <p className="paragraph--mid">
                <b>Unirse a la oferta</b>
              </p>
            </div>
            <hr className="hrGeneral" />
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <div className="oferta-detalle__productoBox__imgBox">
                <img
                  className="oferta-detalle__productoBox__imgBox__img"
                  src={
                    producto?.UrlImg === "no-img.jpeg"
                      ? "/no-img.jpeg"
                      : producto?.UrlImg
                  }
                  alt={producto?.Name}
                />
              </div>
              <div className="oferta-detalle__productoBox__desc">
                <div className="oferta-detalle__productoBox__desc__text">
                  <p className="paragraph">
                    <b>{producto?.Name}</b>
                  </p>
                  <p className="paragraph">
                    Precio unitario: {"$" + oferta?.ValorUInstantaneo}
                  </p>
                  <p className="paragraph">
                    Unidades disponibles:{" "}
                    {oferta?.Maximo - oferta?.ActualProductos}
                  </p>
                </div>
              </div>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">
                <b>Proveedor: {proveedor?.Nombre}</b>
              </p>
            </div>
            <div className="oferta-detalle__productoBox u-margin-top-small">
              <p className="paragraph">
                Fecha de cierre: {oferta?.FechaLimite.split("T")[0]}
              </p>
            </div>
            <div className="oferta-detalle__productoBox__twoColumn">
              <div className="oferta-detalle__productoBox u-margin-top-small ">
                <input
                  type="number"
                  placeholder="Cantidad de unidades a comprar"
                  className="compraProducto__input paragraph"
                  name="unidadesUser"
                  autoComplete="off"
                  value={unidadesUser}
                  onChange={onInputChange}
                  min={1}
                  max={oferta?.Maximo - oferta?.ActualProductos}
                />
              </div>
              <div className="oferta-detalle__productoBox u-margin-top-small u-justify-center">
                <p className="paragraph">
                  <b>Total: $ {!!unidadesUser ? costoTotal.toFixed(2) : 0}</b>
                </p>
              </div>
            </div>
          </div>

          <div className="metodoPago__btnBox">
            <button
              type="button"
              onClick={() => setShowCompraInstantanea(false)}
              className="btn btn--red"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn--blue">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
