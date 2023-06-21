import { Configuration, OpenAIApi } from "openai";
import config from "../../config/config";
import { gpt } from "../../config/config.json";

export class GPT {
  private _openAI: OpenAIApi;

  //https://platform.openai.com/docs/models/overview
  private _model: string;
  private _prompt: string;
  private _maxTokens: number;
  private _temperature: number;
  private _topP: number;
  private _frequencyPenalty: number;
  private _presence_Penalty: number;
  private _models: Map<string, number>;

  public constructor() {
    const configuration: Configuration = new Configuration({
      apiKey: config.OPENAI_API_KEY,
    });
    this._openAI = new OpenAIApi(configuration);
    this._prompt = `
    Assume the role of a midjourney (image creation) prompt creator.
    Create 2 random stock photo prompts for me.
    The structure of the output should be in JSON format: {"prompts":["string", "string"]}
    `;

    // https://community.openai.com/t/request-query-for-a-models-max-tokens/161891
    this._models = new Map<string, number>([["text-davinci-003", 4097]]);

    // "These values were taken from the OpenAI playground."
    this._model = gpt.model;
    this._maxTokens = gpt.maxTokens;
    this._temperature = 1.0;
    this._topP = 1.0;
    this._frequencyPenalty = 0;
    this._presence_Penalty = 0;
  }

  public async generatePrompts(): Promise<string[]> {
    try {
      let prompts: string[];

      const completion = await this._openAI.createCompletion({
        model: this._model,
        prompt: this._prompt,
        max_tokens: this._maxTokens,
        temperature: this._temperature,
        top_p: this._topP,
        frequency_penalty: this._frequencyPenalty,
        presence_penalty: this._presence_Penalty,
      });

      const text = completion.data.choices.at(0)?.text!;

      const parsed = JSON.parse(text);
      prompts = parsed.prompts;

      return prompts;
    } catch (error) {
      throw error; // Rethrow the error or handle it as needed
    }
  }

  public get models(): Map<string, number> {
    return this._models;
  }

  public set model(value: string) {
    this._model = value;
  }

  public set maxTokens(value: number) {
    this._maxTokens = value;
  }
}
