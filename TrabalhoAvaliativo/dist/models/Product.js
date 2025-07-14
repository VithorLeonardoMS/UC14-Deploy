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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Product = class Product {
    constructor(name, price, description, image, user) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.user = user;
        this.brand = null;
        this.model = null;
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.products),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40, nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40, nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 9, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)("products"),
    __metadata("design:paramtypes", [String, Number, String, String, User_1.User])
], Product);
