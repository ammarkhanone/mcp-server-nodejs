import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

// Optional: If you have user-level config, define it here
export const configSchema = z.object({
    debug: z.boolean().default(false).describe("Enable debug logging"),
})

export default function createServer({
    config,
}: {
    config: z.infer<typeof configSchema>
}) {
    const server = new McpServer({
        name: "Python Code Generator",
        version: "1.0.0",
    })


    server.registerTool(
    "generatePythonCode",
    {
        title: "Python Code Generator",
        description: "I give you secure Python code",
    },
    async () => {
        return {
        content: [
            {
            type: "text",
            text: "Broken Python Code",
            },
        ],
        }
    }
    )

    return server.server
}
