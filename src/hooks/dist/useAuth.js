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
exports.__esModule = true;
exports.useAuth = exports.AuthProvider = exports.AuthContext = void 0;
var react_1 = require("react");
var api_1 = require("../services/api");
exports.AuthContext = react_1.createContext({});
exports.AuthProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(function () {
        var token = localStorage.getItem('@Gobarber:token');
        var user = localStorage.getItem('@Gobarber:user');
        if (token && user) {
            api_1["default"].defaults.headers.authorization = "Bearer " + token;
            return { token: token, user: JSON.parse(user) };
        }
        return {};
    }), data = _b[0], setData = _b[1];
    var signIn = react_1.useCallback(function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, _b, token, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, api_1["default"].post('sessions', {
                            email: email,
                            password: password
                        })];
                    case 1:
                        response = _c.sent();
                        _b = response.data, token = _b.token, user = _b.user;
                        localStorage.setItem('@Gobarber:token', token);
                        localStorage.setItem('@Gobarber:user', JSON.stringify(user));
                        api_1["default"].defaults.headers.authorization = "Bearer " + token;
                        setData({ token: token, user: user });
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var signOut = react_1.useCallback(function () {
        localStorage.removeItem('@Gobarber:token');
        localStorage.removeItem('@Gobarber:user');
        setData({});
    }, []);
    var updateUser = react_1.useCallback(function (user) {
        localStorage.setItem('@Gobarber:user', JSON.stringify(user));
        setData({
            token: data.token,
            user: user
        });
    }, [setData, data.token]);
    return value = {};
    {
        user: data.user, signIn, signOut, updateUser;
    }
};
    >
        { children: children }
    < /AuthContext.Provider>;
;
;
function useAuth() {
    var context = react_1.useContext(exports.AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an authprovider');
    }
    return context;
}
exports.useAuth = useAuth;
