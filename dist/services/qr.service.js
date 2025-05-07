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
var _QrService_instances, _QrService__logger, _QrService__axiosInstance, _QrService__rotateMatrix, _QrService__dot, _QrService__norm, _QrService__scalarMultiply, _QrService__subtract, _QrService__transpose, _QrService__qrFactorization;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrService = void 0;
const typedi_1 = require("typedi");
let QrService = class QrService {
    constructor(logger, axiosInstance) {
        _QrService_instances.add(this);
        _QrService__logger.set(this, void 0);
        _QrService__axiosInstance.set(this, void 0);
        __classPrivateFieldSet(this, _QrService__logger, logger, "f");
        __classPrivateFieldSet(this, _QrService__axiosInstance, axiosInstance, "f");
    }
    rotate(qMatrix, rMatrix) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _QrService__logger, "f").log({ level: 'info', message: `inside ${this.constructor.name} rotate` });
            if (!qMatrix || !rMatrix) {
                throw new Error('Missing QR matrices');
            }
            try {
                const rotatedQ = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__rotateMatrix).call(this, qMatrix);
                const rotatedR = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__rotateMatrix).call(this, rMatrix);
                return { rotatedQ, rotatedR };
            }
            catch (error) {
                console.error('Error rotating matrices:', error);
                throw new Error('Internal server error');
            }
        });
    }
    factorize(matrix) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _QrService__logger, "f").log({ level: 'info', message: `inside ${this.constructor.name} factorize` });
            __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `matrix ${JSON.stringify(matrix)}` });
            try {
                const { Q, R } = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__qrFactorization).call(this, matrix);
                __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `Q ${JSON.stringify(Q)}` });
                __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `R ${JSON.stringify(R)}` });
                // const STATS_API_URL = process.env.STATS_API_URL
                // if (!STATS_API_URL) {
                //     throw new Error('Missing STATS_API_URL environment variable');
                // }
                // const response = await this.#_axiosInstance.post(`${STATS_API_URL}/qr`, {
                //   Q,
                //   R
                // })
                return {
                    Q,
                    R,
                    stats: []
                };
            }
            catch (error) {
                __classPrivateFieldGet(this, _QrService__logger, "f").log({ level: 'error', message: `Error in ${this.constructor.name} factorize` });
                throw new Error('Internal server error');
            }
        });
    }
};
exports.QrService = QrService;
_QrService__logger = new WeakMap();
_QrService__axiosInstance = new WeakMap();
_QrService_instances = new WeakSet();
_QrService__rotateMatrix = function _QrService__rotateMatrix(matrix) {
    __classPrivateFieldGet(this, _QrService__logger, "f").log({ level: 'info', message: `inside ${this.constructor.name} _rotateMatrix` });
    const rows = matrix.length;
    __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `rows ${rows}` });
    const cols = matrix[0].length;
    __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `cols ${cols}` });
    const rotated = Array.from({ length: cols }, () => Array(rows));
    __classPrivateFieldGet(this, _QrService__logger, "f").info({ message: `rotated ${JSON.stringify(rotated)}` });
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            rotated[j][rows - 1 - i] = matrix[i][j];
        }
    }
    return rotated;
};
_QrService__dot = function _QrService__dot(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
};
_QrService__norm = function _QrService__norm(v) {
    return Math.sqrt(__classPrivateFieldGet(this, _QrService_instances, "m", _QrService__dot).call(this, v, v));
};
_QrService__scalarMultiply = function _QrService__scalarMultiply(scalar, v) {
    return v.map(x => x * scalar);
};
_QrService__subtract = function _QrService__subtract(a, b) {
    return a.map((x, i) => x - b[i]);
};
_QrService__transpose = function _QrService__transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
};
_QrService__qrFactorization = function _QrService__qrFactorization(A) {
    const m = A.length;
    const n = A[0].length;
    const Q = [];
    const R = Array.from({ length: n }, () => Array(n).fill(0));
    const A_cols = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__transpose).call(this, A);
    const u = [];
    for (let i = 0; i < n; i++) {
        let v = [...A_cols[i]];
        for (let j = 0; j < i; j++) {
            const r = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__dot).call(this, Q[j], A_cols[i]);
            R[j][i] = r;
            const proj = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__scalarMultiply).call(this, r, Q[j]);
            v = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__subtract).call(this, v, proj);
        }
        const normV = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__norm).call(this, v);
        R[i][i] = normV;
        const q = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__scalarMultiply).call(this, 1 / normV, v);
        Q.push(q);
    }
    const Q_matrix = __classPrivateFieldGet(this, _QrService_instances, "m", _QrService__transpose).call(this, Q);
    return { Q: Q_matrix, R };
};
exports.QrService = QrService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('logger')),
    __param(1, (0, typedi_1.Inject)("axios")),
    __metadata("design:paramtypes", [Function, Function])
], QrService);
