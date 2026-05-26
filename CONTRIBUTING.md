# Contributing

Thanks for taking an interest. This repo is the custom Dalamud plugin index for [@XeldarAlz](https://github.com/XeldarAlz). The plugins themselves live in their own repos; this one just aggregates manifests into `repo.json` so XIVLauncher can install them. PRs to the index, generator, or README are welcome.

## What this repo is (and isn't)

- **Is:** `repo.json` (the manifest XIVLauncher reads), `generator/` (Node script that builds it), `.github/workflows/update-repo.yml` (refreshes it on a schedule and on plugin releases), README and badges.
- **Isn't:** plugin source code. Bug reports or feature requests for a specific plugin belong in that plugin's repo — see the table in the README for source links.

## Quick start

```bash
git clone https://github.com/XeldarAlz/DalamudPlugins.git
cd DalamudPlugins
node generator/index.js
```

You need Node 22+. Set `GITHUB_TOKEN` to avoid hitting unauthenticated rate limits when the generator fetches plugin metadata and release download counts.

## Adding a plugin to the index

1. The plugin must have its own GitHub repo with a `repo.json` containing a valid Dalamud manifest entry (`InternalName`, `AssemblyVersion`, `DownloadLinkInstall`, etc.).
2. Add an entry to `generator/plugins.json`:
   ```json
   { "owner": "...", "repo": "...", "branch": "...", "internalName": "..." }
   ```
3. Run `node generator/index.js` locally and confirm the entry resolves and `repo.json` regenerates correctly.
4. Open a PR with the `plugins.json` change. From then on, the workflow keeps `repo.json` and `downloads.json` updated automatically.

## Before you open a PR

1. `node generator/index.js` runs cleanly.
2. Generated `repo.json` and `downloads.json` are either unchanged or the intended update is included.
3. Keep the diff focused. One concern per PR.
4. Match the existing style: terse and direct. No heavy abstractions "for later."
5. If your change affects what users see (README, badges, install instructions), update the README.

## Security

Please don't file public issues for security problems; see [SECURITY.md](SECURITY.md).

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be decent.

## License

By contributing, you agree your contributions are licensed under AGPL-3.0-or-later, the same as this repo.
