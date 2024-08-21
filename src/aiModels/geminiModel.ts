import { GoogleGenerativeAI } from '@google/generative-ai'
import { ApiKeyNotDefinedError, GenerativeModelError } from '../errors'
import { IModelAI } from './IModelAI'

/**
 * Class representing a Gemini AI model that implements the IModelAI interface.
 *
 * @class GeminiModel
 * @implements {IModelAI}
 */
class GeminiModel implements IModelAI {
  private apiKey: string | undefined
  private model: any

  /**
   * Creates an instance of GeminiModel.
   *
   * @throws {ApiKeyNotDefinedError} If the API key is not defined.
   */
  constructor() {
    this.apiKey = process.env.AIPASSCNI_API_KEY
    if (!this.apiKey) throw new ApiKeyNotDefinedError()

    const genAI = new GoogleGenerativeAI(this.apiKey)
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })
  }

  /**
   * Generates content using the Gemini AI model based on the provided prompt and optional files.
   *
   * @param {string} prompt - The prompt to send to the Gemini AI model.
   * @param {any} [options] - Optional additional options or files to assist in the content generation.
   * @returns {Promise<string>} - The generated content as a string.
   * @throws {GenerativeModelError} If the model fails to generate a valid response.
   */
  async generateContent(prompt: string, options?: any): Promise<string> {
    try {
      const optionsArray = options ? [options].flat() : []
      const generatedContent = await this.model.generateContent([
        prompt,
        ...optionsArray,
      ])
      const response = generatedContent.response?.text()
      if (!response) throw new GenerativeModelError()
      return response
    } catch (error) {
      if (error instanceof Error) throw error
      throw new GenerativeModelError()
    }
  }
}

export default GeminiModel
