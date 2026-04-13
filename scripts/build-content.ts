import fs from 'fs';
import path from 'path';

const SRC = path.join(process.cwd(), 'content', 'aws_master_notes.md');
const OUT = path.join(process.cwd(), 'public', 'data');

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function detectSectionType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('story')) return 'story';
  if (t.includes('interview') || t.includes('q&a')) return 'qa';
  if (t.includes('best practice') || t.includes('checklist')) return 'checklist';
  if (t.includes('connects to')) return 'relations';
  if (t.includes('gotcha') || t.includes('warning')) return 'warning';
  if (t.includes('pric') || t.includes('cost')) return 'pricing';
  return 'concept';
}

function detectBlockType(content: string, lang?: string): string {
  if (lang) return 'code';
  const boxChars = /[│─┌└┐┘├┤╔═║╗╝╚▼►◄▲→←↓↑]/;
  if (boxChars.test(content)) return 'diagram';
  return 'text-panel';
}

function extractRevisionPoints(rawText: string): string[] {
  const points: string[] = [];
  const lines = rawText.split('\n');
  let firstPara = '';
  for (const line of lines) {
    if (line.match(/^[✅❌☐→⚠️]/u)) {
      points.push(line.trim());
    }
    if (!firstPara && line.trim().length > 40 && !line.startsWith('#') && !line.startsWith('`')) {
      firstPara = line.trim();
    }
  }
  if (firstPara && points.length === 0) points.unshift(firstPara);
  return points.slice(0, 8);
}

function parseCodeBlocks(raw: string) {
  const blocks: { type: string; content: string; language?: string }[] = [];
  const parts = raw.split(/(```[\s\S]*?```)/g);
  for (const part of parts) {
    if (part.startsWith('```')) {
      const inner = part.slice(3, -3);
      const newlineIdx = inner.indexOf('\n');
      const lang = newlineIdx >= 0 ? inner.slice(0, newlineIdx).trim() : inner.trim();
      const content = newlineIdx >= 0 ? inner.slice(newlineIdx + 1).trim() : '';
      blocks.push({
        type: detectBlockType(content, lang || undefined),
        content,
        language: lang || undefined,
      });
    } else if (part.trim()) {
      blocks.push({ type: 'paragraph', content: part.trim() });
    }
  }
  return blocks;
}

function extractQA(
  sections: { title: string; raw: string }[],
  topicNumber: number,
  topicSlug: string,
  topicTitle: string
) {
  const qaItems: {
    id: string;
    question: string;
    answer: string;
    topicNumber: number;
    topicSlug: string;
    topic: string;
  }[] = [];
  for (const section of sections) {
    const lines = section.raw.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const qMatch = lines[i].match(/^\*\*Q: (.+)\*\*$/);
      if (qMatch) {
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith('```')) j++;
        if (j < lines.length) {
          j++;
          const answerLines: string[] = [];
          while (j < lines.length && !lines[j].startsWith('```')) {
            answerLines.push(lines[j]);
            j++;
          }
          const answer = answerLines.join('\n').trim();
          if (answer) {
            qaItems.push({
              id: `${topicSlug}-q${qaItems.length + 1}`,
              question: qMatch[1],
              answer,
              topicNumber,
              topicSlug,
              topic: topicTitle,
            });
          }
        }
      }
    }
  }
  return qaItems;
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const raw = fs.readFileSync(SRC, 'utf8');

  const topicChunks = raw.split(/(?=^# \d+ — )/m).filter(c => c.match(/^# \d+ — /m));
  const topicsMeta: {
    number: number;
    slug: string;
    title: string;
    sectionCount: number;
    qaCount: number;
  }[] = [];
  const allQA: {
    id: string;
    question: string;
    answer: string;
    topicNumber: number;
    topicSlug: string;
    topic: string;
  }[] = [];
  const searchEntries: {
    id: string;
    topicNumber: number;
    topicSlug: string;
    sectionId: string;
    sectionTitle: string;
    type: string;
    text: string;
  }[] = [];

  for (const chunk of topicChunks) {
    const headerMatch = chunk.match(/^# (\d+) — (.+)$/m);
    if (!headerMatch) continue;

    const number = parseInt(headerMatch[1]);
    const title = headerMatch[2].trim();
    const slug = `${String(number).padStart(2, '0')}-${slugify(title)}`;

    const sectionChunks = chunk.split(/(?=^## )/m).filter(s => s.startsWith('##'));
    const sections: {
      id: string;
      title: string;
      type: string;
      rawMarkdown: string;
      blocks: { type: string; content: string; language?: string }[];
      qaItems: {
        id: string;
        question: string;
        answer: string;
        topicNumber: number;
        topicSlug: string;
        topic: string;
      }[];
      revisionPoints: string[];
    }[] = [];

    for (const sec of sectionChunks) {
      const secHeader = sec.match(/^## (.+)$/m);
      if (!secHeader) continue;
      const sectionTitle = secHeader[1].trim();
      const sectionId = slugify(sectionTitle.replace(/[^\w\s]/g, ''));
      const sectionType = detectSectionType(sectionTitle);
      const rawContent = sec.slice(sec.indexOf('\n') + 1).trim();

      const qaItems =
        sectionType === 'qa'
          ? extractQA([{ title: sectionTitle, raw: rawContent }], number, slug, title)
          : [];

      allQA.push(...qaItems);

      const revisionPoints = extractRevisionPoints(rawContent);
      const blocks = parseCodeBlocks(rawContent);

      searchEntries.push({
        id: `${slug}-${sectionId}`,
        topicNumber: number,
        topicSlug: slug,
        sectionId,
        sectionTitle,
        type: sectionType,
        text: rawContent
          .replace(/```[\s\S]*?```/g, ' ')
          .replace(/[#*`_]/g, ' ')
          .replace(/\s+/g, ' ')
          .slice(0, 500),
      });

      sections.push({
        id: sectionId,
        title: sectionTitle,
        type: sectionType,
        rawMarkdown: rawContent,
        blocks,
        qaItems,
        revisionPoints,
      });
    }

    const topicData = { number, slug, title, sections };
    fs.writeFileSync(
      path.join(OUT, `topic-${String(number).padStart(2, '0')}.json`),
      JSON.stringify(topicData, null, 2)
    );

    topicsMeta.push({
      number,
      slug,
      title,
      sectionCount: sections.length,
      qaCount: sections.flatMap(s => s.qaItems).length,
    });
  }

  const manifest = {
    topics: topicsMeta,
    totalTopics: topicsMeta.length,
    totalQA: allQA.length,
    generatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(OUT, 'topics.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(
    path.join(OUT, 'qa-all.json'),
    JSON.stringify({ questions: allQA, totalCount: allQA.length }, null, 2)
  );
  fs.writeFileSync(
    path.join(OUT, 'search-index.json'),
    JSON.stringify({ entries: searchEntries }, null, 2)
  );

  console.log(
    `✅ Built ${topicsMeta.length} topics, ${allQA.length} Q&A pairs, ${searchEntries.length} search entries`
  );
  topicsMeta.forEach(t =>
    console.log(`   ${t.slug} — ${t.sectionCount} sections, ${t.qaCount} Q&As`)
  );
}

main();
