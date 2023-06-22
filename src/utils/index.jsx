const formatearDivisa = (cantidad) => {
  let CLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return CLP.format(cantidad);
};

const setError = (errors, field) => {
  const error = errors.find((item) => item.path === field);

  if (error) {
    return error.msg;
  } else return "";
};

export const utils = { formatearDivisa, setError };
