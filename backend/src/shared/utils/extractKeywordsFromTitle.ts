const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'in',
  'on',
  'of',
  'for',
  'and',
  'or',
  'to',
  'with',
  'by',
  'from',
  'at',
  'as',
  'into',
  'about',
  'over',
  'under',
  'between',
  'through',
  'without',
  'within',
  'across',
  'is',
  'are',
  'be',
  'this',
  'that',
  'these',
  'those',
  'overview',
]);

export function extractKeywordsFromTitle(title: string): string[] {
  if (!title) return [];

  const cleaned = title.toLowerCase().replace(/[^a-z0-9]+/gi, ' '); // remove punctuation

  const tokens = cleaned
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(
      (t) => t && !STOP_WORDS.has(t) && t.length > 2 // ignore very short tokens
    );

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const token of tokens) {
    if (!seen.has(token)) {
      seen.add(token);
      unique.push(token);
    }
  }

  return unique;
}

/*
 NOTE: For example title:

 "Artificial intelligence-enabled predictive modelling in psychiatry: overview of machine learning applications in mental health research."

This will produce keywords roughly like:

[
  "artificial",
  "intelligence",
  "enabled",
  "predictive",
  "modelling",
  "psychiatry",
  "machine",
  "learning",
  "applications",
  "mental",
  "health",
  "research"
]
*/
