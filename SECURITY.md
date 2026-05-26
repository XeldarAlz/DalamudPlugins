# Security policy

## Supported versions

Only the current state of `main` is supported. `repo.json` is regenerated on every plugin release and every 6 hours; if you're seeing stale data, check the latest commit on `main` first.

## What this repo is

A plugin index. It doesn't run code on your machine — it serves `repo.json`, a JSON manifest that points XIVLauncher at release binaries hosted on the individual plugin repos. Each plugin's release binary is the security boundary; this repo is just the directory.

## Reporting a vulnerability

Please report security issues privately via GitHub's private vulnerability reporting:

https://github.com/XeldarAlz/DalamudPlugins/security/advisories/new

Please don't open a public issue or Discussion for anything that could let someone publish a tampered manifest, redirect installs, or otherwise mislead users before a fix is out.

What counts:

- Repo, workflow, or generator behavior that could let an attacker inject a malicious entry, redirect `DownloadLinkInstall`, or otherwise tamper with the served manifest.
- Token, secret, or permission misconfiguration in `.github/workflows/`.
- Supply-chain risk in `generator/` dependencies that could be triggered during CI.

What doesn't:

- Security issues in a specific plugin's runtime behavior — those belong in that plugin's own `SECURITY.md` (see the README for source links).
- The fact that the listed plugins automate gameplay, which is against Square Enix's Terms of Service. That's documented and is the user's choice.

I'll aim to acknowledge reports within a few days and to ship a fix as soon as I've verified the issue.
