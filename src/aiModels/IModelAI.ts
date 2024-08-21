/**
 * Interface for generative AI model interactions.
 *
 * @module IModelAI
 */

/**
 * Interface for interacting with generative AI models.
 *
 * @interface IModelAI
 */
export interface IModelAI {
  /**
   * Generates content based on a provided prompt and optional files.
   *
   * @param {string} prompt - The prompt to send to the model.
   * @param {Array<any>} [files] - Optional files to assist in the content generation.
   * @returns {Promise<string>} - The generated content as a string.
   */
  generateContent(prompt: string, options?: any): Promise<string>
}
