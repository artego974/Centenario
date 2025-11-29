import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/data-source';
import UsuarioRoutes from "./routes/usuarioRoutes"
import SetorRoutes from "./routes/setorRoutes"
import esperaRoutes from "./routes/esperaRoutes"
import leitoRoutes from "./routes/leitoRoutes"
import cors from "cors";
import path from 'path';
import { LeitoController } from './controllers/leitoController';
import { PessoaEsperaController } from './controllers/esperaController';


const app: Application = express();
const leitoController = new LeitoController();
const esperaController = new PessoaEsperaController();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cors(/* {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501"
    ],
  } */)
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

AppDataSource.initialize()
  .then(() => {
    
    app.use(UsuarioRoutes);
    app.use(SetorRoutes);
    app.use(esperaRoutes)
    app.use(leitoRoutes)
    app.use("/leito", leitoRoutes);
    app.get("/leito/ultima", (req, res) => leitoController.ultimaAtualizacao(req, res));
    app.get("/espera/ultima", (req, res) => esperaController.ultimaAtualizacao(req, res));



    app.listen(3000, () => console.log('Server rodando na porta 3000'));
  })
  .catch((error) => console.log(error));