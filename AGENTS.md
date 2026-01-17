# AGENTS.md

This is a `pnpm` + `turbo` monorepo.
Workspaces:

- `apps/ticket-tailor-demo`: Next.js app
- `apps/simple-tix-demo`: Astro + React app (Cloudflare Wrangler deploy)
- `packages/eslint-config`: shared ESLint flat configs
- `packages/typescript-config`: shared TS configs

Keep diffs small/focused, and keep lint/format clean.

## Tooling

- Package manager: `pnpm@10.28.0` (`package.json`)
- Node: `>=20`

## Commands

**Always use `pnpm turbo` with `--filter` to target workspaces** (preferred over `pnpm -C`).

From repo root:

- Install: `pnpm install`
- Dev (all): `pnpm turbo dev`
- Build (all): `pnpm turbo build`
- Lint (all): `pnpm turbo lint`
- Format (all): `pnpm turbo format`

Target a single workspace with `--filter`:

- `pnpm turbo dev --filter=ticket-tailor-demo`
- `pnpm turbo build --filter=simple-tix-demo`
- `pnpm turbo lint --filter=ticket-tailor-demo`

To discover available scripts for a workspace, inspect its `package.json`. Any script defined there can be run via turbo:

```
pnpm turbo <script> --filter=<workspace-name>
```

### Tests

No test runner or `test` scripts are currently configured.

When adding tests, also add:

- `"test"` script in the relevant workspace `package.json`
- A turbo task in `turbo.json` if you want caching/parallelism

Single-test patterns (depending on runner, use turbo filter):

- Vitest file: `pnpm turbo test --filter=<pkg> -- path/to/file.test.ts`
- Vitest by name: `pnpm turbo test --filter=<pkg> -- -t "test name"`
- Jest file: `pnpm turbo test --filter=<pkg> -- path/to/file.test.ts`
- Playwright spec: `pnpm turbo test --filter=<pkg> -- path/to/spec.ts`

## Formatting

- Prefer running `pnpm format` from repo root.
- Root uses Biome (`biome.json`) for JS/TS formatting + import organizing; it ignores `**/*.astro`.
- `apps/simple-tix-demo` uses Prettier (`apps/simple-tix-demo/.prettierrc`) with Astro + Tailwind plugins.
- Root `.prettierrc` exists for non-Astro formatting.

Guidelines:

- Match the nearest formatter config (don’t hand-format against it).
- Keep to 2 spaces; keep lines ~80 chars (Prettier `printWidth: 80`).

## Linting

- Root `.eslintrc.js` applies only at repo root (ignores `apps/**` and `packages/**`).
- Apps use flat configs:
  - `apps/ticket-tailor-demo/eslint.config.mjs` (Next core-web-vitals)
  - `apps/simple-tix-demo/eslint.config.js` (Astro recommended)
- Shared configs live in `packages/eslint-config/`.

## Code Style

### Types

- Repo TS config is strict (`packages/typescript-config/base.json`).
- `noUncheckedIndexedAccess: true`: treat indexed access as possibly `undefined`.
- Prefer `unknown` over `any`; narrow early with runtime guards.
- Prefer discriminated unions over boolean flags.
- Avoid non-null assertions (`!`) unless proven safe.
- Prefer `satisfies` for config objects.

### Imports

- Use ESM.
- Avoid deep relative paths when an alias exists (Next app `@/*`).
- Keep imports organized (Biome can do this).
- Use `import type { ... }` for type-only imports.
- Group imports: external, workspace/alias, relative.

### Formatting

- Default indent is 2 spaces.
- Root JS/TS uses Biome (`biome.json`): double quotes + organize imports.
- Astro files are ignored by Biome; format them with Prettier in `apps/simple-tix-demo`.
- Keep lines ~80 chars where feasible.

### Naming

- `camelCase` vars/functions, `PascalCase` components/types/classes.
- Event handlers: `handleX`, callbacks: `onX`.
- File naming: follow local convention; prefer `kebab-case` where used nearby.

### Structure

- Keep modules small; extract helpers/components instead of growing large files.
- Keep UI components presentational where possible; isolate side effects.
- Respect Next server/client boundaries; don’t import server-only modules into client components.

### Error Handling

- Add explicit, actionable errors at boundaries (API calls, parsing, external I/O).
- Include context (operation + identifier), not secrets.
- Don’t swallow errors; handle or rethrow with context.
- Avoid logging secrets (tokens, IDs, env vars).
- Frontend: render safe fallbacks rather than crashing.
- Validate external data before using it.
