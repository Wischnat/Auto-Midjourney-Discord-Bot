export interface GptConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  promptRole: string;
  maxPrompts: number;
  promptTopics: string;
}
