import { FastifyInstance } from "fastify";
import calculatorToools from "../tools/calculator.tools.json";

interface CalculatorRequest {
    operation: 'add' | 'subtract' | 'multiply' | 'divide';
    a: number;
    b: number;
}

// Ruta completa usando función anónima
export async function calculatorRoutes(fastify: FastifyInstance) {

    fastify.post<{ Body: CalculatorRequest }>(
        "/tools/calculator",
        {
            schema: {
                description: "Realiza operaciones aritméticas básicas como suma, resta, multiplicación y división.",
                tags: ["calculator"],
                body: calculatorToools.inputSchema,
                response: {
                    200: {
                        type: "object",
                        properties: {
                            result: { type: "number"}, 
                            operation: { type: "string"}
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
            },
    
        async (request, reply) => {

            const { operation, a, b } = request.body;

            let result: number = 0;

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

            return { result,operation};
        }
    );
};
﻿