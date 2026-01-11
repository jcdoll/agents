# agents

Shared rules, commands, and skills for AI coding assistants. Uses [rulesync](https://github.com/dyoshikawa/rulesync) to generate configuration for multiple targets from a single source.

## Supported Targets

- Cursor
- Kilocode
- Claude Code
- Codex CLI

## Structure

```
.rulesync/                    # Source of truth - edit files here
  rules/overview.md           # Project rules and guidelines
  commands/prime.md           # Prime command
  commands/review.md          # Code review command
  subagents/planner.md        # Planner subagent
  skills/code-review/SKILL.md # Code review skill
  .aiignore                   # Files for AI to ignore

.claude/settings.json         # Claude Code settings (not managed by rulesync)
rulesync.jsonc                # Configuration
sync-rules.js                 # Generate script (cross-platform)
```

## Prerequisites

Node.js is required to run the sync script.

macOS:
```bash
brew install node
```

Windows:
```bash
scoop install nodejs
```

## Usage

Edit files in `.rulesync/`, then regenerate:

```bash
node sync-rules.js
```


## New Project Setup

To initialize rulesync in a new project:
```bash
npx rulesync init
```

Then copy the `.rulesync/` contents from this repo as a starting point.

## Generated Output

| Target | Output |
|--------|--------|
| AGENTS.md | `AGENTS.md` |
| Cursor | `AGENTS.md`, `.cursor/commands/`, `.cursor/skills/`, `.cursorignore` |
| Kilocode | `.kilocode/rules/`, `.kilocode/workflows/`, `.kilocode/skills/`, `.kilocodeignore` |
| Claude Code | `.claude/CLAUDE.md`, `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, `.claudeignore` |
| Codex CLI | `AGENTS.md`, `.codex/skills/` (via sync script) |

## Customization

The script runs `npx rulesync generate` and performs customization steps.

- AGENTS.md
	- I prefer `AGENTS.md` over tool-specific rules subdirectories (e.g., `.cursor/rules/`) since it's a universal format supported by multiple tools.
	- The sync script removes `.cursor/rules/` after generation because Cursor reads `AGENTS.md` as a fallback.
- Codex skills
	- rulesync doesn't currently support codex project skills, so the script copies the skills to `.codex/skills/`.

## Adding Content

### Rules
Edit `.rulesync/rules/overview.md` to change project guidelines.

### Commands
Add `.md` files to `.rulesync/commands/` with frontmatter:
```yaml
---
description: 'Command description'
targets: ["*"]
---
```

### Skills
Create a directory in `.rulesync/skills/<name>/` with a `SKILL.md` file:
```yaml
---
name: skill-name
description: What the skill does
targets: ["*"]
claudecode:
  allowed-tools: ["Read", "Grep", "Glob", "Bash"]
---
```

### Subagents
Add `.md` files to `.rulesync/subagents/` with frontmatter:
```yaml
---
name: subagent-name
description: What the subagent does
targets: ["*"]
claudecode:
  model: inherit
---
```

## Claude Code Settings

`.claude/settings.json` contains Claude Code-specific configuration (not managed by rulesync):

- Permissions: deny list for dangerous commands, allow list for common dev tools
- Environment: extended timeouts for long-running commands
- Sandbox: enabled with Docker socket access
- Status line: token usage via [ccusage](https://www.npmjs.com/package/ccusage)
