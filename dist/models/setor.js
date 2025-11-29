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
exports.Setor = void 0;
const typeorm_1 = require("typeorm");
const leito_1 = require("./leito");
let Setor = class Setor {
    constructor(nome, qntdLeitos) {
        this.nome = nome;
        this.qntdLeitos = qntdLeitos;
    }
};
exports.Setor = Setor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Setor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Setor.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Setor.prototype, "qntdLeitos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leito_1.Leito, (leito) => leito.setor),
    __metadata("design:type", Array)
], Setor.prototype, "leitos", void 0);
exports.Setor = Setor = __decorate([
    (0, typeorm_1.Entity)("setor"),
    __metadata("design:paramtypes", [String, Number])
], Setor);
