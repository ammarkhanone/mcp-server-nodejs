import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type CallToolResult, type GetPromptResult, type ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "mcp-server-template",
      version: "0.0.1",
    },
    { capabilities: {} },
  );

  // Register a simple prompt
  server.prompt(
    "greeting-template",
    "A simple greeting prompt template",
    {
      name: z.string().describe("Name to include in greeting"),
    },
    async ({ name }): Promise<GetPromptResult> => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    },
  );

  server.tool(
    "greet",
    "A simple greeting tool",
    {
      name: z.string().describe("Name to greet"),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}!`,
          },
        ],
      };
    },
  );

  // Arithmetic tools (ported from Python calculator)
  server.tool(
    "add",
    "Add two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(a + b) }] };
    },
  );

  server.tool(
    "subtract",
    "Subtract two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(a - b) }] };
    },
  );

  server.tool(
    "multiply",
    "Multiply two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(a * b) }] };
    },
  );

  server.tool(
    "divide",
    "Divide two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      if (b === 0) throw new Error("Division by zero is not allowed.");
      return { content: [{ type: "text", text: String(a / b) }] };
    },
  );

  server.tool(
    "power",
    "Power of two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(Math.pow(a, b)) }] };
    },
  );

  server.tool(
    "sqrt",
    "Square root of a number",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      if (a < 0) throw new Error("sqrt: input must be non-negative");
      return { content: [{ type: "text", text: String(Math.sqrt(a)) }] };
    },
  );

  server.tool(
    "cbrt",
    "Cube root of a number",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      // Math.cbrt preserves sign for negative numbers
      return { content: [{ type: "text", text: String(Math.cbrt(a)) }] };
    },
  );

  server.tool(
    "factorial",
    "Factorial of a non-negative integer",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      if (!Number.isFinite(a) || a < 0 || !Number.isInteger(a)) {
        throw new Error("factorial: input must be a non-negative integer");
      }
      // compute factorial (may overflow for large inputs)
      let n = Math.floor(a);
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return { content: [{ type: "text", text: String(result) }] };
    },
  );

  server.tool(
    "log",
    "Log of a number (base optional, default e)",
    { a: z.number(), base: z.number().optional() },
    async ({ a, base }): Promise<CallToolResult> => {
      const b = base ?? Math.E;
      if (a <= 0) throw new Error("log: input must be positive");
      if (b <= 0 || b === 1) throw new Error("log: base must be positive and not equal to 1");
      const value = Math.log(a) / Math.log(b);
      return { content: [{ type: "text", text: String(value) }] };
    },
  );

  server.tool(
    "remainder",
    "Remainder of two numbers division",
    { a: z.number(), b: z.number() },
    async ({ a, b }): Promise<CallToolResult> => {
      if (b === 0) throw new Error("remainder: division by zero");
      return { content: [{ type: "text", text: String(a % b) }] };
    },
  );

  server.tool(
    "sin",
    "Sine of a number (radians)",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(Math.sin(a)) }] };
    },
  );

  server.tool(
    "cos",
    "Cosine of a number (radians)",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(Math.cos(a)) }] };
    },
  );

  server.tool(
    "tan",
    "Tangent of a number (radians)",
    { a: z.number() },
    async ({ a }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: String(Math.tan(a)) }] };
    },
  );

  // Add a greeting tool similar to the Python resource
  server.tool(
    "get_greeting",
    "Get a personalized greeting",
    { name: z.string() },
    async ({ name }): Promise<CallToolResult> => {
      return { content: [{ type: "text", text: `Hello, ${name}!` }] };
    },
  );

  server.resource(
    "greeting-resource",
    "https://example.com/greetings/default",
    { mimeType: "text/plain" },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: "https://example.com/greetings/default",
            text: "Hello, world!",
          },
        ],
      };
    },
  );

  return server;
};
