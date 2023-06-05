const formatearDivisa = (cantidad) => {
  let CLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return CLP.format(cantidad);
};

export const utils = { formatearDivisa };
