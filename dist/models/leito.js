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
exports.Leito = void 0;
const typeorm_1 = require("typeorm");
const setor_1 = require("./setor");
const patologia_1 = require("./patologia");
let Leito = class Leito {
    constructor(init) {
        if (init) {
            Object.assign(this, init);
        }
    }
};
exports.Leito = Leito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Leito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false, default: "livre" }),
    __metadata("design:type", String)
], Leito.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Leito.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setor_1.Setor, (setor) => setor.leitos, { onDelete: "CASCADE" }),
    __metadata("design:type", setor_1.Setor)
], Leito.prototype, "setor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patologia_1.Patologia, (patologia) => patologia.leitos, {
        onDelete: "SET NULL",
        nullable: true
    }),
    __metadata("design:type", Object)
], Leito.prototype, "patologia", void 0);
exports.Leito = Leito = __decorate([
    (0, typeorm_1.Entity)("leito"),
    __metadata("design:paramtypes", [Object])
], Leito);
