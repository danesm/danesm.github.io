---
title: "Building Custom Agents in Kiro — A Practical Guide"
date: 2026-03-15
description: "Learn how to create custom agents in Kiro to specialise your AI assistant for different tasks — from frontend work to AWS infrastructure — using agent configuration attributes."
tags: ["kiro", "ai", "agents", "context-engineering", "developer-tools"]
logoImage: "/images/kiro-wordmark.png"
---

## What Are Custom Agents?

Kiro ships with a general-purpose agent that handles most coding tasks well. But as projects grow, you often end up with a bloated context window — frontend component libraries, database MCP servers, API docs, and infrastructure configs all competing for the agent's attention.

Custom agents solve this by letting you create focused, task-specific assistants. A frontend agent that knows about your component library. A backend agent that loads your database tools. An infrastructure agent with access to AWS services. Each one stays lean and relevant.

## Where Agent Configs Live

Kiro supports two scopes for custom agents:

- **Workspace-level**: `.kiro/agents/` — shared with your team via version control
- **User-level**: `~/.kiro/agents/` — personal agents that follow you across projects

In the **IDE**, agents are defined as Markdown files (`.md`) with YAML frontmatter for configuration and the body as the system prompt. In the **CLI**, agents use JSON files (`.json`) with a structured schema.

This post covers both formats.

## IDE Agent Format (Markdown)

Create a file like `.kiro/agents/frontend-agent.md`:

```markdown
---
name: frontend-agent
description: Specialised agent for React component development and UI work
model: sonnet
tools:
  - readFile
  - editCode
  - fsWrite
  - getDiagnostics
  - grepSearch
---

You are a frontend specialist working with React 19 and Tailwind CSS v4.

Focus on:
- Component architecture and reusability
- Accessibility best practices
- Responsive design patterns
- Performance optimisation
```

Kiro reads the frontmatter to configure the agent's capabilities, then uses the Markdown body as the system prompt.

## CLI Agent Format (JSON)

For the CLI, create a file like `~/.kiro/agents/frontend-agent.json`:

```json
{
  "name": "frontend-agent",
  "description": "Specialised agent for React component development",
  "prompt": "You are a frontend specialist working with React and Tailwind CSS.",
  "tools": ["fs_read", "fs_write", "execute_bash"],
  "allowedTools": ["fs_read"],
  "resources": ["file://README.md", "file://components/**/*.tsx"]
}
```

## Configuration Attributes Explained

Here's a breakdown of the key attributes you can configure:

### `name`

The agent's identifier. In the CLI, this defaults to the filename if omitted. Keep it short and descriptive.

### `description`

Tells Kiro (and other developers) what this agent does. In the IDE, Kiro uses the description to automatically select the right subagent when delegating tasks — so make it specific.

```yaml
# Good — Kiro knows when to pick this agent
description: Handles Terraform infrastructure changes and AWS resource management

# Too vague — Kiro can't distinguish this from the default agent
description: General helper
```

### `prompt`

The system prompt that shapes the agent's behaviour. In the IDE format, this is the Markdown body below the frontmatter. In the CLI format, it's a string field that also supports `file://` URIs for external prompt files:

```json
{
  "prompt": "file://./prompts/infra-specialist.md"
}
```

This is useful for keeping long, detailed prompts in separate files under version control.

### `model`

Selects which model the agent uses. Options typically include `sonnet`, `opus`, and `haiku`. Subagents inherit the parent's model if this is omitted.

```yaml
model: sonnet
```

Pick the right model for the job — `haiku` for fast, simple tasks like linting checks; `sonnet` for most development work; `opus` for complex architectural decisions.

### `tools`

Controls which tools the agent can access. This is your primary lever for keeping agents focused and secure.

**IDE format** — list tool names directly:
```yaml
tools:
  - readFile
  - editCode
  - fsWrite
  - executeBash
  - getDiagnostics
```

**CLI format** — supports built-in tools, MCP server tools, and wildcards:
```json
{
  "tools": [
    "fs_read",
    "fs_write",
    "execute_bash",
    "@git",
    "@fetch/fetch_url"
  ]
}
```

Special values in the CLI:
- `"*"` — all available tools
- `"@builtin"` — all built-in tools
- `"@server_name"` — all tools from a specific MCP server
- `"@server_name/tool_name"` — a specific tool from an MCP server

### `allowedTools` (CLI)

Tools listed here skip the user approval prompt. Use this for read-only or low-risk operations:

```json
{
  "allowedTools": [
    "fs_read",
    "fs_*",
    "@git/git_status"
  ]
}
```

Supports glob patterns — `fs_*` matches `fs_read`, `fs_write`, etc.

### `toolsSettings` (CLI)

Fine-grained configuration for individual tools. This is where you set path restrictions and service allowlists:

```json
{
  "toolsSettings": {
    "fs_write": {
      "allowedPaths": ["src/**", "tests/**", "*.json"]
    },
    "use_aws": {
      "allowedServices": ["s3", "lambda", "cloudformation"]
    }
  }
}
```

This is powerful for security — an infrastructure agent can write to `terraform/` but not `src/`, while a frontend agent gets the inverse.

### `mcpServers`

Defines which MCP servers the agent can access. Each agent can have its own set of servers, keeping context isolated:

```json
{
  "mcpServers": {
    "git": {
      "command": "git-mcp",
      "args": [],
      "timeout": 120000
    },
    "fetch": {
      "command": "fetch3.1",
      "args": []
    }
  }
}
```

### `resources`

Gives the agent access to specific files or file patterns as context. Only `file://` URIs are supported:

```json
{
  "resources": [
    "file://README.md",
    "file://docs/**/*.md",
    "file://infrastructure/**/*.yaml"
  ]
}
```

This is great for ensuring an agent always has access to relevant documentation without you needing to manually reference it.

### `hooks` (CLI)

Commands that run at specific lifecycle points:

```json
{
  "hooks": {
    "agentSpawn": [
      { "command": "git status" }
    ],
    "preToolUse": [
      {
        "matcher": "execute_bash",
        "command": "echo \"$(date) - Bash command:\" >> /tmp/audit.log"
      }
    ],
    "postToolUse": [
      {
        "matcher": "fs_write",
        "command": "npm run lint --fix"
      }
    ]
  }
}
```

Available triggers: `agentSpawn`, `userPromptSubmit`, `preToolUse`, `postToolUse`, and `stop`.

## Practical Example: A Three-Agent Setup

Here's how you might structure agents for a full-stack project:

**`.kiro/agents/frontend-agent.md`** — React/UI work with restricted file access

**`~/.kiro/agents/infra-agent.json`** — AWS infrastructure with Terraform access and `use_aws` tool

**`~/.kiro/agents/reviewer.json`** — Read-only code reviewer with no write or shell access

```json
{
  "name": "reviewer",
  "description": "Read-only code review agent that analyses code quality and suggests improvements",
  "prompt": "You are a senior code reviewer. Analyse code for bugs, performance issues, and best practice violations. Never modify files directly — only suggest changes.",
  "tools": ["fs_read", "@git"],
  "allowedTools": ["fs_read", "@git/git_status", "@git/git_diff"],
  "resources": ["file://README.md", "file://.eslintrc*"]
}
```

The key principle: each agent gets the minimum tools and access it needs. A reviewer doesn't need write access. A frontend agent doesn't need AWS tools. This keeps context windows lean and reduces the risk of unintended changes.

## Tips for Writing Good Agent Prompts

1. **Be specific about the domain** — "You are a React component specialist" beats "You are a helpful assistant"
2. **State constraints clearly** — "Never modify files outside the `src/` directory"
3. **Include project context** — reference your tech stack, conventions, and patterns
4. **Keep it focused** — a 10-line prompt for a focused agent outperforms a 100-line prompt trying to cover everything

## Further Reading

- [Kiro Custom Agents Documentation](https://kiro.dev/docs/cli/custom-agents/)
- [Agent Configuration Reference](https://kiro.dev/docs/cli/custom-agents/configuration-reference)
- [Agent Examples](https://kiro.dev/docs/cli/custom-agents/examples)
- [Kiro 0.9 Changelog — Custom Subagents](https://kiro.dev/changelog/ide/0-9)
