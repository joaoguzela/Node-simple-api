import express from "express"
import clienteRouter from "./routes/cliente.route.js"
import filmeRouter from "./routes/filme.route.js";
import locacaoRouter from "./routes/locacao.route.js";
const app = express();

app.use(express.json());
app.use("/cliente", clienteRouter);
app.use("/filme", filmeRouter);
app.use("/locacao", locacaoRouter)

app.listen(3000,() => {    
    console.log("server started on port:3000")
});