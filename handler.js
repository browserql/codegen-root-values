"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var promises_1 = require("fs/promises");
var path_1 = require("path");
function findResolvers(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var files, resolvers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log({ dir: dir });
                    return [4 /*yield*/, (0, promises_1.readdir)(dir)];
                case 1:
                    files = _a.sent();
                    resolvers = [];
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var source, link, _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        source = (0, path_1.join)(dir, file);
                                        return [4 /*yield*/, (0, promises_1.stat)(source)];
                                    case 1:
                                        link = _d.sent();
                                        if (!link.isDirectory()) return [3 /*break*/, 3];
                                        _b = (_a = resolvers.push).apply;
                                        _c = [resolvers];
                                        return [4 /*yield*/, findResolvers(source)];
                                    case 2:
                                        _b.apply(_a, _c.concat([(_d.sent())]));
                                        return [3 /*break*/, 4];
                                    case 3:
                                        if (/\.ts$/.test(file)) {
                                            resolvers.push(source);
                                        }
                                        _d.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, resolvers];
            }
        });
    });
}
function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
}
function handler(_a) {
    var args = _a.arguments;
    return __awaiter(this, void 0, void 0, function () {
        var resolvers;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, findResolvers(args.directory)];
                case 1:
                    resolvers = _b.sent();
                    return [2 /*return*/, resolvers
                            .map(function (resolver) {
                            var _a;
                            var name = (_a = last(resolver.split('/'))) === null || _a === void 0 ? void 0 : _a.replace(/\.ts$/, '');
                            return "export { " + name + " } from '" + args.base + "/" + (0, path_1.relative)(process.cwd(), resolver.replace(/\.ts$/, '')) + "'";
                        })
                            .join('\n')];
            }
        });
    });
}
exports.handler = handler;
