import { IModelAI } from './IModelAI'

/**
 * Class representing a GPT model that implements the IModelAI interface.
 *
 * @class GptModel
 * @implements {IModelAI}
 */
class GptModel implements IModelAI {
  private apiKey: string

  /**
   * Creates an instance of GptModel.
   *
   * @param {string} apiKey - The API key required for making requests to the GPT model.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Generates content using the GPT model based on the provided prompt.
   *
   * @param {string} prompt - The prompt to send to the GPT model.
   * @returns {Promise<string>} - The generated content as a string.
   */
  async generateContent(prompt: string): Promise<string> {
    // Implement API call to GPT here
    return 'Réponse du modèle GPT'
  }
}

export default GptModel
