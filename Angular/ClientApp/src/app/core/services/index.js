"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var json_api_service_1 = require("./json-api.service");
var bankinfo_service_1 = require("./bankinfo.service");
exports.services = [
    json_api_service_1.JsonApiService,
    bankinfo_service_1.BankInfoService
];
__export(require("./json-api.service"));
__export(require("./bankinfo.service"));
//# sourceMappingURL=index.js.map