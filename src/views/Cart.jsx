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

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <>
      <h1>Mi carrito</h1>

      <ul className="list-group list-group-flush">
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
                <button type="button" className="btn btn-primary">
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-white border"
                  disabled={true}
                >
                  1
                </button>
                <button type="button" className="btn btn-primary">
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
