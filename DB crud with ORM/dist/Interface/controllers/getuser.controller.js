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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailController = void 0;
function getUserDetailController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            if (data) {
                res.status(201).send(data[0]);
            }
            else {
                res.status(500).send('not getting data');
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500).send("error while adding data in DB");
        }
    });
}
exports.getUserDetailController = getUserDetailController;
