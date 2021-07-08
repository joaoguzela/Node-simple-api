import express from "express"
import clienteRouter from "./routes/cliente.route.js"
const app = express();

app.use(express.json());
app.use("/cliente", clienteRouter);

app.listen(3000,() => {    
    console.log("server started on port:3000")
});