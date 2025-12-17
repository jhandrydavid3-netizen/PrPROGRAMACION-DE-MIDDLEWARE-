import { FastifyInstance } from "fastify";
import calculatorToools from "../tools/calculator.tools.json";

interface CalculatorRequest {
  operation: "add" | "subtract" | "multiply" | "divide";
  a: number;
  b: number;
}

export async function calculatorRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CalculatorRequest }>(
    "/tools/calculator",
    {
      schema: {
        summary: "Calculadora MCP",
        description:
          "Realiza operaciones aritméticas básicas como suma, resta, multiplicación y división.",
        tags: ["calculator"],

        body: {
          ...calculatorToools.inputSchema,

          // 🔴 IMPORTANTE: examples DEBE ser ARRAY
          examples: [
            {
              operation: "add",
              a: 5,
              b: 3
            },
            {
              operation: "subtract",
              a: 10,
              b: 4
            },
            {
              operation: "multiply",
              a: 6,
              b: 7
            },
            {
              operation: "divide",
              a: 20,
              b: 4
            },
            {
              operation: "divide",
              a: 10,
              b: 0
            }
          ]
        },

        response: {
          200: {
            description: "Resultado exitoso de la operación",
            type: "object",
            properties: {
              result: { type: "number" },
              operation: { type: "string" }
            },
            examples: [
              {
                result: 8,
                operation: "add"
              }
            ]
          },

          400: {
            description: "Error de validación o lógica",
            type: "object",
            properties: {
              error: { type: "string" }
            },
            examples: [
              {
                error: "No se puede dividir para cero"
              },
              {
                error: "Operación inválida"
              }
            ]
          },

          500: {
            description: "Error interno del servidor",
            type: "object",
            examples: [
              {
                error: "Error interno del servidor"
              }
            ]
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
            return reply
              .status(400)
              .send({ error: "No se puede dividir para cero" });
          }
          result = a / b;
          break;

        default:
          return reply.status(400).send({ error: "Operación inválida" });
      }

      return { result, operation };
    }
  );
}
