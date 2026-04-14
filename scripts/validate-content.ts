import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public', 'data');
function resolveSourcePath(): string {
  const candidates = [
    path.join(process.cwd(), 'content', 'aws_master_notes.md'),
    path.join(process.cwd(), 'aws_master_notes.md'),
  ];

  const existing = candidates.find(candidate => fs.existsSync(candidate));
  if (existing) return existing;

  throw new Error(
    `Content source not found. Checked: ${candidates.join(', ')}. ` +
      'Add aws_master_notes.md to one of those locations before validating content.'
  );
}

const SRC = resolveSourcePath();
const raw = fs.readFileSync(SRC, 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(OUT, 'topics.json'), 'utf8'));
const qa = JSON.parse(fs.readFileSync(path.join(OUT, 'qa-all.json'), 'utf8'));

const srcTopics = (raw.match(/^# \d+ — /gm) || []).length;
const srcQA = (raw.match(/^\*\*Q:/gm) || []).length;
const openBlocks = (raw.match(/^```/gm) || []).length;

let pass = true;
function check(cond: boolean, msg: string) {
  if (!cond) {
    console.error(`❌ FAIL: ${msg}`);
    pass = false;
  } else {
    console.log(`✅ ${msg}`);
  }
}

check(
  manifest.totalTopics === srcTopics,
  `Topics: ${manifest.totalTopics} built === ${srcTopics} in source`
);
check(
  qa.totalCount >= srcQA,
  `Q&A: ${qa.totalCount} extracted >= ${srcQA} in source`
);
check(openBlocks % 2 === 0, `Code blocks balanced: ${openBlocks} (must be even)`);
check(
  manifest.topics.every((t: { number: number }) =>
    fs.existsSync(path.join(OUT, `topic-${String(t.number).padStart(2, '0')}.json`))
  ),
  'All topic JSON files exist'
);
check(fs.existsSync(path.join(OUT, 'search-index.json')), 'Search index exists');

if (!pass) {
  console.error('\nValidation failed — fix issues before deploying');
  process.exit(1);
} else {
  console.log('\n✅ All validation checks passed');
}
