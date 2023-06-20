import { Configuration, OpenAIApi } from "openai";

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

  public constructor() {
    const configuration: Configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this._openAI = new OpenAIApi(configuration);
    this._prompt = `
    Assume the role of a midjourney (image creation) prompt creator.
    Create 2 random stock photo prompts for me.
    The structure of the output should be in JSON format: {"prompts":["string", "string"]}
    `;

    // "These values were taken from the OpenAI playground."
    this._model = "text-davinci-003";
    this._maxTokens = 256;
    this._temperature = 1.0;
    this._topP = 1.0;
    this._frequencyPenalty = 0;
    this._presence_Penalty = 0;
  }

  public async generatePrompts(): Promise<string[]> {
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
  }
}
