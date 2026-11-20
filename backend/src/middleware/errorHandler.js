export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Rota não encontrada.", path: req.originalUrl });
}

export function errorHandler(error, _req, res, _next) {
  const status = Number.isInteger(error.status) ? error.status : 500;
  const body = {
    error: status >= 500 ? "Erro interno do servidor." : error.message
  };
  if (error.errors) body.errors = error.errors;

  if (status >= 500) console.error(error);
  res.status(status).json(body);
}
