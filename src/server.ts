import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type CallToolResult, type GetPromptResult, type ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "mcp-server-template",
      version: "0.0.1",
    },
    { capabilities: { logging: {} } },
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

  server.tool("log-info", "A simple tool that logs an info message", () => {
    console.log("This is an info log");
    console.info("This is another info log");

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

  server.tool("log-error", "A simple tool that logs an error message", () => {
    console.warn("This is a warning log");
    console.error("This is an error log");

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

  server.tool("log-debug", "A simple tool that logs a debug message", () => {
    console.log("[debug] This is a message");
    console.log("This is a debug log");

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

  server.tool("log-warning", "A simple tool that logs a warning message", () => {
    console.log("[warn] This is a message");
    console.log("This is another warning log");

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

  server.tool("log-all", "A simple tool that logs messages of all types", () => {
    console.log("[warn] This is a message");
    console.log("[debug] This is another message");
    console.log("this is a regular message");
    console.error("this is an error message");

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

  server.tool("log-json", "A simple tool that logs a JSON", () => {
    console.log("[warn] This is a JSON:", JSON.stringify({ foo: "bar", yolo: { swag: 42 } }));
    console.log("[warn] This is another JSON:", JSON.stringify({ foo: "bar", yolo: { swag: 42 } }, null, 2));

    return {
      content: [{ type: "text", text: "Log successfully printed" }],
    };
  });

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
