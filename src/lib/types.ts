export type ContentBlockType =
  | 'text-panel'
  | 'code'
  | 'diagram'
  | 'checklist'
  | 'table'
  | 'paragraph'
  | 'qa-pair';

export type SectionType =
  | 'story'
  | 'concept'
  | 'qa'
  | 'checklist'
  | 'pricing'
  | 'relations'
  | 'warning'
  | 'generic';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  language?: string;
}

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  topicNumber: number;
  topicSlug: string;
  topic: string;
}

export interface Section {
  id: string;
  title: string;
  type: SectionType;
  rawMarkdown: string;
  blocks: ContentBlock[];
  qaItems: QAItem[];
  revisionPoints: string[];
}

export interface TopicData {
  number: number;
  slug: string;
  title: string;
  sections: Section[];
}

export interface TopicMeta {
  number: number;
  slug: string;
  title: string;
  sectionCount: number;
  qaCount: number;
}

export interface TopicsManifest {
  topics: TopicMeta[];
  totalTopics: number;
  totalQA: number;
  generatedAt: string;
}

export interface SearchEntry {
  id: string;
  topicNumber: number;
  topicSlug: string;
  sectionId: string;
  sectionTitle: string;
  type: string;
  text: string;
}

export type AppMode = 'learn' | 'revision' | 'interview' | 'scenario';
