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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _QrController__qaService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrController = void 0;
const qr_service_1 = require("../services/qr.service");
const typedi_1 = require("typedi");
let QrController = class QrController {
    constructor(qaService) {
        _QrController__qaService.set(this, void 0);
        __classPrivateFieldSet(this, _QrController__qaService, qaService, "f");
    }
    factorize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matrix } = req.body;
            if (!matrix) {
                res.status(400).json({ error: 'Missing matrix' });
                return;
            }
            const response = yield __classPrivateFieldGet(this, _QrController__qaService, "f").factorize(matrix);
            res.json({ Q: response.Q, R: response.R, stats: response.stats });
        });
    }
    rotate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { qMatrix, rMatrix } = req.body;
            const { rotatedQ, rotatedR } = yield __classPrivateFieldGet(this, _QrController__qaService, "f").rotate(qMatrix, rMatrix);
            res.json({ rotatedQ, rotatedR });
        });
    }
};
exports.QrController = QrController;
_QrController__qaService = new WeakMap();
exports.QrController = QrController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [qr_service_1.QrService])
], QrController);
