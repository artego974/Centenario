"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaEspera = void 0;
const typeorm_1 = require("typeorm");
let PessoaEspera = class PessoaEspera {
    constructor(cor, quantidade, data) {
        this.cor = cor;
        this.quantidade = quantidade;
        this.date = data;
    }
};
exports.PessoaEspera = PessoaEspera;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PessoaEspera.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], PessoaEspera.prototype, "cor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], PessoaEspera.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], PessoaEspera.prototype, "date", void 0);
exports.PessoaEspera = PessoaEspera = __decorate([
    (0, typeorm_1.Entity)("pessoaEspera"),
    __metadata("design:paramtypes", [String, Number, Date])
], PessoaEspera);
