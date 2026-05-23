# XeldarAlz Dalamud Plugins

Custom Dalamud plugin repository for plugins authored by [@XeldarAlz](https://github.com/XeldarAlz).

## Install

Add this URL to Dalamud:

```
https://raw.githubusercontent.com/XeldarAlz/DalamudPlugins/main/repo.json
```

1. In-game, run `/xlsettings` → **Experimental**.
2. Under **Custom Plugin Repositories**, paste the URL above, tick **Enabled**, click **+**, then **Save and Close**.
3. Open `/xlplugins` → **All Plugins** and search for any of the plugins listed below.

Each plugin auto-updates from its own source repository when a new release is published.

## Plugins

| Plugin | Description | Source |
|---|---|---|
| **PVP Auto LB** | Auto-fires your PvP Limit Break at low-HP enemies. | [FFXIV-PvPAutoLB](https://github.com/XeldarAlz/FFXIV-PvPAutoLB) |
| **Doman Mahjong Solver** | Doman Mahjong helper — hints or auto-play. | [FFXIV-DomanMahjongSolver](https://github.com/XeldarAlz/FFXIV-DomanMahjongSolver) |

## How updates land here

Each plugin's source repo has its own release workflow. When a new version is tagged, the workflow:

1. Builds the plugin and creates a GitHub Release with `latest.zip` attached
2. Uses a Personal Access Token to update this repository's `repo.json` — bumping the relevant entry's `AssemblyVersion`, `TestingAssemblyVersion`, `DownloadCount`, and `LastUpdate`

Dalamud clients then pick up the new version on their next refresh.

## License

AGPL-3.0-or-later. Individual plugins are licensed under their own source repositories.
