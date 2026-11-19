const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT) || 3000;
const paginaInicial = path.join(__dirname, "index.html");

const tarefas = [
  { id: 1, titulo: "Estudar API REST", concluida: false },
  { id: 2, titulo: "Criar um exemplo com Node.js", concluida: true },
  { id: 3, titulo: "Consultar tarefas pelo front-end", concluida: false },
];

const servidor = http.createServer(async (requisicao, resposta) => {
  const url = new URL(requisicao.url, `http://${requisicao.headers.host || "localhost"}`);

  if (requisicao.method === "GET" && url.pathname === "/api/tarefas") {
    resposta.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    resposta.end(JSON.stringify(tarefas));
    return;
  }

  if (
    requisicao.method === "GET" &&
    (url.pathname === "/" || url.pathname === "/index.html")
  ) {
    try {
      const html = await readFile(paginaInicial);
      resposta.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      resposta.end(html);
    } catch (erro) {
      console.error("Erro ao ler index.html:", erro);
      resposta.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      resposta.end("Não foi possível carregar a página.");
    }
    return;
  }

  resposta.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  resposta.end("Rota não encontrada.");
});

servidor.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor disponível em http://127.0.0.1:${PORT}`);
  console.log(`API de tarefas: http://127.0.0.1:${PORT}/api/tarefas`);
});

servidor.on("error", (erro) => {
  console.error("Não foi possível iniciar o servidor:", erro);
  process.exitCode = 1;
});
