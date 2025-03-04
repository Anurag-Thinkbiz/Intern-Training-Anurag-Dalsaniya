"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidation = void 0;
const SchemaValidation = (schema) => (req, res, next) => {
    const result = schema.validate(Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params));
    if (result.error) {
        return res.status(400).json(result.error.details);
    }
    next();
};
exports.SchemaValidation = SchemaValidation;
