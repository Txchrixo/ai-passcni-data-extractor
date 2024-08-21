/**
 * Custom error class for handling unsupported file types.
 *
 * @class UnsupportedFileTypeError
 * @extends {Error}
 */
class UnsupportedFileTypeError extends Error {
  /**
   * Creates an instance of UnsupportedFileTypeError.
   *
   * @param {string} fileExt - The unsupported file extension.
   */
  constructor(fileExt: string) {
    super(`Unsupported file type: ${fileExt}`)
    this.name = 'UnsupportedFileTypeError'
  }
}

/**
 * Custom error class for handling undefined API keys.
 *
 * @class ApiKeyNotDefinedError
 * @extends {Error}
 */
class ApiKeyNotDefinedError extends Error {
  /**
   * Creates an instance of ApiKeyNotDefinedError.
   */
  constructor() {
    super('API_KEY is not defined')
    this.name = 'ApiKeyNotDefinedError'
  }
}

/**
 * Custom error class for handling failures in generating content with a generative model.
 *
 * @class GenerativeModelError
 * @extends {Error}
 */
class GenerativeModelError extends Error {
  /**
   * Creates an instance of GenerativeModelError.
   */
  constructor() {
    super('Failed to get a valid response from the generative model.')
    this.name = 'GenerativeModelError'
  }
}

export { UnsupportedFileTypeError, ApiKeyNotDefinedError, GenerativeModelError }
