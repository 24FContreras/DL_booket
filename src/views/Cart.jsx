import { useEffect, useState } from "react";
import { useSessionContext } from "../context/sessionContext";
import { utils } from "../utils";

const Cart = () => {
  const { session, setSession } = useSessionContext();

  const getTotal = () => {
    if (session.items.length > 1) {
      return session.cart.items.reduce((a, b) => a.precio + b.precio, 0);
    } else if (session.cart.items.length === 1) {
      return session.cart.items[0].precio;
    } else return 0;
  };

  const handleRemove = (id) => {
    const newSession = { ...session };
    const index = session.cart.items.findIndex((item) => item.id === id);

    if (session.cart.items[index].cantidadCompra > 1) {
      newSession.cart.items[index].cantidadCompra--;
    } else {
      newSession.cart.items.splice(index, 1);
    }
    setSession(newSession);
    localStorage.setItem("booketCart", JSON.stringify(session.cart));
  };

  const handleAdd = (id) => {
    const newSession = { ...session };
    const index = session.cart.items.findIndex((item) => item.id === id);

    if (
      session.cart.items[index].stock >=
      session.cart.items[index].cantidadCompra + 1
    ) {
      newSession.cart.items[index].cantidadCompra++;
      setSession(newSession);
      localStorage.setItem("booketCart", JSON.stringify(session.cart));
    } else {
      alert("Supera el stock disponible");
    }
  };

  useEffect(() => {
    console.log(session.cart.items);
  }, []);

  return (
    <>
      <h1>Mi carrito</h1>

      <ul className="list-group list-group-flush">
        {session.cart.items.length === 0 && (
          <p>No tienes artículos en tu carrito</p>
        )}

        {session.cart.items.map((item) => (
          <li
            className="list-group-item d-flex flew-row justify-content-between"
            key={item.id}
          >
            <div className="d-flex flex-row gap-2">
              <img
                src={`https://booketapi.onrender.com/images/books/${item.portada}`}
                alt=""
                height="80px"
              />
              <div>
                <p className="m-0">{item.titulo}</p>
                <p className="m-0">
                  {item.autor} - {item.editorial} - {item.encuadernacion}
                </p>
                <p>{utils.formatearDivisa(item.precio)}</p>
              </div>
            </div>
            <div>
              <div
                className="btn-group-vertical btn-group-sm"
                role="group"
                aria-label="Vertical button group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAdd(item.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-white border"
                  disabled={true}
                >
                  {item.cantidadCompra}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleRemove(item.id)}
                >
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
        <p className="fs-4">
          Total:{" "}
          {session.cart.items.length &&
            utils.formatearDivisa(
              session.cart.items.reduce((a, b) => a + b.precio, 0)
            )}
        </p>
        <button className="btn btn-primary rounded-pill">Comprar</button>
      </div>
    </>
  );
};

export default Cart;
