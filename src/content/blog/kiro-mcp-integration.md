---
title: "MCP and Kiro — Giving Your AI IDE Superpowers"
date: 2026-03-15
description: "What is Model Context Protocol (MCP), why it matters for AI-assisted development, and how to set it up in Kiro to connect your IDE to databases, APIs, and dev tools."
tags: ["kiro", "ai", "mcp", "developer-tools"]
logoImage: "/images/kiro-wordmark.png"
---

## The Problem MCP Solves

Out of the box, Kiro can read your files, write code, and run shell commands. That covers a lot. But real development workflows involve more than just code — you need to check Jira tickets, query a database, read internal docs, trigger CI/CD pipelines, or pull metrics from Grafana.

Before MCP, connecting an AI assistant to each of these tools meant custom integrations for every single one. Different APIs, different auth flows, different data formats. It was a mess.

Model Context Protocol (MCP) fixes this by providing a single, standardised way for AI tools to talk to external services. One protocol, any tool.

## MCP in Simple Terms

Think of MCP as USB for AI. Just as USB gave computers a universal port for connecting any peripheral — keyboard, mouse, printer, camera — MCP gives AI models a universal interface for connecting to any tool or data source.

The architecture is straightforward:

- **MCP Client** — built into Kiro, handles communication with servers
- **MCP Server** — a lightweight process that wraps an external tool or service
- **Tools** — specific capabilities a server exposes (e.g., `list_issues`, `query_database`, `get_metrics`)

Kiro talks to MCP servers over standard input/output (stdio) using JSON-RPC. The servers run locally on your machine but can reach both local resources (like a PostgreSQL database) and remote services (like GitLab or Slack).

```
You → Kiro → MCP Client → MCP Server → External Tool/API
                                      → Local Database
                                      → Remote Service
```

## Setting Up MCP in Kiro

MCP servers are configured via JSON files at two levels:

- **Workspace**: `.kiro/settings/mcp.json` — project-specific, shared with your team
- **User**: `~/.kiro/settings/mcp.json` — personal, applies across all projects

Here's what a basic configuration looks like:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Each server entry includes:

- `command` — the executable to run the server
- `args` — arguments passed to the command
- `env` — environment variables (API keys, config flags)
- `disabled` — toggle the server on/off without removing the config
- `autoApprove` — list of tool names that skip the approval prompt

You can also configure MCP through the Kiro UI: open the Kiro activity bar, expand "MCP SERVERS", and edit either the Workspace or User config directly.

## Practical Examples

### AWS Documentation Server

Search and retrieve AWS docs without leaving your IDE:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    }
  }
}
```

Now you can ask Kiro things like "What are the limits for DynamoDB batch writes?" and it'll pull the answer from the official AWS docs.

### GitLab Integration

Connect Kiro to your GitLab project to read issues, merge requests, and pipelines:

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "/path/to/gitlab-mcp",
      "args": [],
      "env": {
        "GITLAB_TOKEN": "your-personal-access-token",
        "GITLAB_URL": "https://gitlab.com"
      },
      "autoApprove": ["list_project_issues", "get_issue"]
    }
  }
}
```

With this set up, you can tell Kiro to "read all open issues from my GitLab project and create specs for each one" — and it'll use the `list_project_issues` tool to fetch them, then generate structured specs using Kiro's spec workflow.

### Database Access

Query your development database directly from chat:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "uvx",
      "args": ["mcp-server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    }
  }
}
```

Ask Kiro "show me the top 10 users by order count" and it'll write and execute the SQL query for you.

## How MCP Fits Into the Kiro Workflow

The real power of MCP shows up when you combine it with Kiro's other features:

**MCP + Specs**: Pull requirements from Jira or GitLab issues, then use Kiro's spec workflow to turn them into structured requirements → design → tasks. No copy-pasting between tools.

**MCP + Custom Agents**: Create a specialised agent that has access to specific MCP servers. An infrastructure agent with AWS and Terraform MCP servers. A frontend agent with a design system MCP server. Each agent gets exactly the tools it needs.

**MCP + Hooks**: Trigger MCP tool calls automatically. When a file is saved, run a linter via an MCP server. When a task completes, update the ticket status in Jira.

## Installing MCP Servers

Most MCP servers are distributed as npm or Python packages. The `uvx` command (from the `uv` Python package manager) is the easiest way to run Python-based servers without installing them globally:

```bash
# Install uv if you don't have it
brew install uv

# Servers run via uvx — no separate install needed
# Just reference them in your mcp.json config
```

For npm-based servers, use `npx`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    }
  }
}
```

## Security Considerations

A few things to keep in mind:

- MCP servers run locally with your user permissions — treat them like any other CLI tool
- Only install servers from trusted sources and review their code/docs
- Use `autoApprove` sparingly — it's convenient but skips the confirmation step
- Store sensitive tokens in environment variables, not hardcoded in config
- Workspace-level configs are committed to version control — don't put secrets there. Use user-level config for tokens

## Finding MCP Servers

The ecosystem is growing fast. Good starting points:

- [MCP Servers GitHub](https://github.com/modelcontextprotocol/servers) — official reference implementations
- [Kiro MCP Examples](https://kiro.dev/docs/cli/mcp/examples) — curated examples for Kiro
- [Kiro MCP Documentation](https://kiro.dev/docs/mcp/configuration) — full configuration reference

Can't find a server for your use case? You can build your own — MCP servers are just programs that speak JSON-RPC over stdio. Kiro can even help you write one.

## The Bigger Picture

MCP is what turns Kiro from a smart code editor into a connected development hub. Instead of switching between your IDE, browser, terminal, project management tool, and monitoring dashboard, you stay in one place and let Kiro reach out to everything on your behalf.

It's an open standard backed by Anthropic and adopted across the industry — so the servers you configure today will work with other MCP-compatible tools tomorrow. That's the real value: invest once, benefit everywhere.
