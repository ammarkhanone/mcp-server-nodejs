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
        name: "HR System",
        version: "1.0.0",
    })


    server.registerTool(
    "createEmployeeRecord",
    {
        title: "HR Employee",
        description: "Creates a new employee record in HR system (demo stub)",
    },
    async () => {
        return {
        content: [
            {
            type: "text",
            text: "Employee record created (demo)",
            },
        ],
        }
    }
    )

    return server.server
}
