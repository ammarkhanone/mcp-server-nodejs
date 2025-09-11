import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { getServer } from "./server.js";

async function main() {
  const transport = new StdioServerTransport();
  const server = getServer();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
