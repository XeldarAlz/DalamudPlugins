import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PLUGINS_FILE = join(__dirname, 'plugins.json');
const OUTPUT_FILE = join(ROOT, 'repo.json');

const GH_TOKEN = process.env.GITHUB_TOKEN || '';

function ghHeaders(extra = {}) {
  const h = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'XeldarAlz-DalamudPlugins-generator',
    ...extra,
  };
  if (GH_TOKEN) h.Authorization = `Bearer ${GH_TOKEN}`;
  return h;
}

async function fetchJson(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}\n${body.slice(0, 300)}`);
  }
  return res.json();
}

async function fetchPluginEntry({ owner, repo, branch, internalName }) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/repo.json`;
  const data = await fetchJson(url, ghHeaders());
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`${owner}/${repo}@${branch}/repo.json is not a non-empty array`);
  }
  const entry = data.find(e => e.InternalName === internalName) || data[0];
  if (entry.InternalName !== internalName) {
    console.warn(`[${owner}/${repo}] InternalName "${entry.InternalName}" doesn't match expected "${internalName}" — using first entry anyway.`);
  }
  return entry;
}

async function fetchDownloadCount({ owner, repo }) {
  let total = 0;
  let page = 1;
  for (;;) {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100&page=${page}`;
    const releases = await fetchJson(url, ghHeaders());
    if (!Array.isArray(releases) || releases.length === 0) break;
    for (const rel of releases) {
      for (const asset of rel.assets || []) {
        total += asset.download_count || 0;
      }
    }
    if (releases.length < 100) break;
    page += 1;
  }
  return total;
}

async function main() {
  const { plugins } = JSON.parse(await readFile(PLUGINS_FILE, 'utf8'));
  const output = [];
  for (const p of plugins) {
    process.stdout.write(`[${p.owner}/${p.repo}] fetching... `);
    const [entry, count] = await Promise.all([
      fetchPluginEntry(p),
      fetchDownloadCount(p),
    ]);
    entry.DownloadCount = count;
    output.push(entry);
    process.stdout.write(`v${entry.AssemblyVersion}, DL=${count}\n`);
  }

  const next = JSON.stringify(output, null, 2) + '\n';
  let prev = '';
  try { prev = await readFile(OUTPUT_FILE, 'utf8'); } catch {}
  if (prev === next) {
    console.log('repo.json unchanged.');
    return;
  }
  await writeFile(OUTPUT_FILE, next);
  console.log(`repo.json written (${output.length} plugins).`);
}

main().catch(err => {
  console.error('Generator failed:', err.message);
  process.exit(1);
});
