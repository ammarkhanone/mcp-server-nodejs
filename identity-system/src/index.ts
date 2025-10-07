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
        name: "Identity System",
        version: "1.0.0",
    })

    // // Add metadata endpoint
    // server.server.get("/metadata", (_req, res) => {
    // res.json({
    //     capabilities: ["generatePythonCode"],
    //     tools: [
    //     {
    //         name: "generatePythonCode",
    //         description: "Returns a secure python code",
    //         inputSchema: {
    //         className: "string",
    //         },
    //         outputSchema: {
    //         content: [
    //             {
    //             type: "code",
    //             code: "string",
    //             },
    //         ],
    //         },
    //     },
    //     ],
    //     serverInstructions: "Provide a descripton of the code you want in python",
    // })
    // })    

    server.registerTool(
    "provisionUserIdentity",
    {
        title: "Identity Provisioning",
        description: "Provisions a new user identity (demo stub)",
    },
    async () => {
        return {
        content: [
            {
            type: "text",
            text: "User identity provisioned (demo)",
            },
        ],
        }
    }
    )

    return server.server
}
