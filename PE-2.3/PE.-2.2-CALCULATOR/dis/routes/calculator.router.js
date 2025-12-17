"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorRoutes = calculatorRoutes;
const calculator_tools_json_1 = __importDefault(require("../tools/calculator.tools.json"));
// Ruta completa usando función anónima
async function calculatorRoutes(fastify) {
    fastify.post("/tools/calculator", {
        schema: {
            description: "Realiza operaciones aritméticas básicas como suma, resta, multiplicación y división.",
            tags: ["calculator"],
            body: calculator_tools_json_1.default.inputSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        result: { type: "number" },
                        operation: { type: "string" }
                    }
                },
                400: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { operation, a, b } = request.body;
        let result = 0;
        switch (operation) {
            case "add":
                result = a + b;
                break;
            case "subtract":
                result = a - b;
                break;
            case "multiply":
                result = a * b;
                break;
            case "divide":
                if (b === 0) {
                    return reply.status(400).send({ error: "No se puede dividir para cero" });
                }
                result = a / b;
                break;
            default:
                return reply.status(400).send({ error: "Operación inválida" });
        }
        return { result, operation };
    });
}
;
