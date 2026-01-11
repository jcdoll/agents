const { execSync } = require('child_process');
const { cpSync, mkdirSync, rmSync, existsSync } = require('fs');

// Run rulesync
execSync('npx rulesync generate', { stdio: 'inherit' });

// Remove redundant .cursor/rules (AGENTS.md is sufficient for Cursor rules)
if (existsSync('.cursor/rules')) {
    rmSync('.cursor/rules', { recursive: true, force: true });
    console.log('Removed .cursor/rules/ (using AGENTS.md instead)');
}

// Sync skills to .codex (rulesync doesn't support codexcli skills at project level)
if (existsSync('.rulesync/skills')) {
    mkdirSync('.codex/skills', { recursive: true });
    cpSync('.rulesync/skills', '.codex/skills', { recursive: true });
    console.log('Synced skills to .codex/skills/');
}
