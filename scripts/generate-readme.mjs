import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  authorName,
  description,
  displayName,
  getAddonRecords,
  releaseVersion,
  repoRoot,
} from "./lib/addon-records.mjs";

function row(record) {
  const metadata = record.metadata;
  const repo = metadata.repository ? `[Repo](${metadata.repository})` : "";
  return `| ${displayName(record)} | ${authorName(metadata.author ?? record.manifest?.author)} | ${description(record)} | ${metadata.trust} | ${metadata.verification} | ${metadata.status} | ${releaseVersion(record)} | ${repo} |`;
}

const records = await getAddonRecords();
const official = records.filter((record) => record.metadata.trust === "official");
const community = records.filter((record) => record.metadata.trust === "community");
const header = "| Addon | Author | Description | Trust | Verification | Status | Version | Repo |\n| --- | --- | --- | --- | --- | --- | --- | --- |";

await writeFile(
  path.join(repoRoot, "community/README.md"),
  `# Community Addons

Community addons are author-maintained. Unverified directory entries are for discovery only; verified community addons are reviewed, built from pinned source, and hosted by Wealthfolio.

${header}
${community.map(row).join("\n")}

## Pending

The previous community note included "Stock Picker Helper", but it did not include a public repository URL. Add it as a directory entry once the repo is available.
`,
);

await writeFile(
  path.join(repoRoot, "official/README.md"),
  `# Official Addons

Official addons are owned and supported by Wealthfolio.

${header}
${official.map(row).join("\n")}

`,
);

console.log("Generated official/README.md and community/README.md");
