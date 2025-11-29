"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const setorRoutes_1 = __importDefault(require("./routes/setorRoutes"));
const esperaRoutes_1 = __importDefault(require("./routes/esperaRoutes"));
const leitoRoutes_1 = __importDefault(require("./routes/leitoRoutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const leitoController_1 = require("./controllers/leitoController");
const esperaController_1 = require("./controllers/esperaController");
const app = (0, express_1.default)();
const leitoController = new leitoController_1.LeitoController();
const esperaController = new esperaController_1.PessoaEsperaController();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)( /* {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501"
  ],
} */));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use(usuarioRoutes_1.default);
    app.use(setorRoutes_1.default);
    app.use(esperaRoutes_1.default);
    app.use(leitoRoutes_1.default);
    app.use("/leito", leitoRoutes_1.default);
    app.get("/leito/ultima", (req, res) => leitoController.ultimaAtualizacao(req, res));
    app.get("/espera/ultima", (req, res) => esperaController.ultimaAtualizacao(req, res));
    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
    .catch((error) => console.log(error));
