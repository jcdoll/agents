# Overview

This project is TODO.

## Safety
- Never run 'git checkout' under ANY circumstances. It is a destructive operation.

## Development scope
- You are developing engineering tools for internal use by other trained engineers.
- You do not need to worry about distributing via `pip` or providing contribution instructions.

## File size and separation of concerns
- Keep files to a manageable size, target <300 LOC by default.
- If files are longer than that they sould probably be split.

## Always plan first
- Typical workflow: user makes a request, you formulate a plan, you share the plan for approval. If approved you implement the plan.
- NEVER assume that presenting a good plan means you should implement it. Require explicit approval.

## If unsure or stuck ask the user
- If the user asks you to do something and it fails, do not silently move on. Ask the user to clarify what you should do.
- If you are unsure about what to do or the user requirements are unclear ask the user.

## Documentation Standards
- Do not use excessive bold in markdown documents. Only use font styling selectively.
- Do not use emojis in either code or docs.
- Do not include "last updated" dates for documentation or code.
- Never add authorship information to a file.

## No legacy baggage
- IMPORTANT: Maintain clean, readable code without legacy baggage.
- For example, when refactoring delete the old interface instead of adding thin wrappers.

## Feedback to user
- When providing commands to the user, do not split across multiple lines, e.g. python commands should be one line.

## Python development environment
- We use `uv` to manage our python environment.
- Be sure that python projects have a pyproject.toml file.
- Use `hatchling` if needed to use one module within another module internally.
- If `uv` fails due to permissions, consult with the user to acquire the necessary permissions or environment modifications.

## Linting
- Linting is heavily encourage.
- Python: `uvx ruff check [path] --fix --extend-select I,B,SIM,C4,ISC,PIE && uvx ruff format [path]`
- Always fix any issues highlighted by the linter.

## Parameters and default settings
- IMPORTANT: Never set default parameters in multiple places in the code.
- Use a single source of truth for parameter defaults (e.g. config.py).
- Use enums rather than bare strings for parameters.
- Do not embed defaults in the code, e.g. never do params.get('key', 5) instead do params['key'].
- Do not use the "if (check config) then (value = from config) else (value = default)" pattern - this breaks the single source of truth rule.

## Code quality
- NEVER use unicode. It breaks python on Windows.
- Use type hints and docstrings for all functions by default.

## Test Execution
- Always run tests after making changes to verify functionality.
- Ensure all tests pass before considering any task complete.
- Use tests to validate behavior rather than manual verification where possible.

## Hardware development
- Read project-specific hardware documentation before making hardware-related suggestions.
- Always consult datasheets and hardware specifications before implementing drivers or hardware interfaces.
- For datasheets, always consult the exact part number specified by the user. Do not use a generic related part.
- Prioritize safety over convenience when dealing with hardware operations.
- When uncertain about hardware impact, always err on the side of caution.
