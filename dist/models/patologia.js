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
exports.Patologia = void 0;
const typeorm_1 = require("typeorm");
const leito_1 = require("./leito");
let Patologia = class Patologia {
    constructor(nome, cid) {
        this.nome = nome;
        this.cid = cid;
    }
};
exports.Patologia = Patologia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Patologia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Patologia.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], Patologia.prototype, "cid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => leito_1.Leito, (leito) => leito.patologia),
    __metadata("design:type", Array)
], Patologia.prototype, "leitos", void 0);
exports.Patologia = Patologia = __decorate([
    (0, typeorm_1.Entity)("patologia"),
    __metadata("design:paramtypes", [String, String])
], Patologia);
