import Tesseract from 'tesseract.js'
import { extractPassportData } from './../../src/cmr/passportExtractor'
import {
  ApiKeyNotDefinedError,
  GenerativeModelError,
  UnsupportedFileTypeError,
} from './../../src/errors'
import { IModelAI } from '../../src/aiModels/IModelAI'

jest.mock('tesseract.js')
jest.mock('@google/generative-ai')

/**
 * Test suite for the `extractPassportData` function.
 *
 * This suite tests various scenarios for extracting passport data, including handling errors and successful data extraction.
 */
describe('extractPassportData', () => {
  const mockApiKey = 'fake-api-key'
  const mockImagePath = './../../images/passport1.jpg'
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      AIPASSCNI_API_KEY: mockApiKey,
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  /**
   * Test to ensure that an `ApiKeyNotDefinedError` is thrown if the API key is not defined.
   *
   * @returns {Promise<void>}
   */
  it('should throw an ApiKeyNotDefinedError if API_KEY is not defined', async () => {
    process.env = originalEnv
    const recognizeSpy = jest.spyOn(Tesseract, 'recognize').mockResolvedValue({
      data: {
        text: JSON.stringify('lastNames: Doe, firstNames: John'),
      },
    } as unknown as Tesseract.RecognizeResult)

    const mockModelInstance = {
      generateContent: jest.fn().mockRejectedValue(new ApiKeyNotDefinedError()),
    }

    await expect(
      extractPassportData(mockImagePath, mockModelInstance as IModelAI),
    ).rejects.toThrow(ApiKeyNotDefinedError)

    expect(recognizeSpy).toHaveBeenCalled()
    recognizeSpy.mockRestore()
  })

  /**
   * Test to ensure that an `UnsupportedFileTypeError` is thrown for unsupported file types.
   *
   * @returns {Promise<void>}
   */
  it('should throw an UnsupportedFileTypeError for unsupported file types', async () => {
    const unsupportedFilePath = './../../images/unsupportedFile.txt'
    await expect(
      extractPassportData(unsupportedFilePath, {} as IModelAI),
    ).rejects.toThrow(UnsupportedFileTypeError)
  })

  /**
   * Test to verify that extracted data is returned correctly when valid images are provided.
   *
   * @returns {Promise<void>}
   */
  it('should return extracted CNI data when provided with valid images', async () => {
    const mockResponse = {
      lastNames: 'Doe',
      firstNames: 'John',
    }

    const recognizeSpy = jest.spyOn(Tesseract, 'recognize').mockResolvedValue({
      data: {
        text: JSON.stringify('lastNames: Doe, firstNames: John'),
      },
    } as unknown as Tesseract.RecognizeResult)

    const mockModelInstance = {
      generateContent: jest
        .fn()
        .mockResolvedValue(JSON.stringify(mockResponse)),
    }

    const result = await extractPassportData(
      mockImagePath,
      mockModelInstance as IModelAI,
    )
    expect(result).toEqual(mockResponse)

    expect(recognizeSpy).toHaveBeenCalled()
    recognizeSpy.mockRestore()
  })

  /**
   * Test to ensure that a `GenerativeModelError` is thrown if the generative model fails to generate content.
   *
   * @returns {Promise<void>}
   */
  it('should return GenerativeModelError if the generative model fails to generate content', async () => {
    const mockResponse = {
      lastNames: 'Doe',
      firstNames: 'John',
    }

    const recognizeSpy = jest.spyOn(Tesseract, 'recognize').mockResolvedValue({
      data: {
        text: JSON.stringify('lastNames: Doe, firstNames: John'),
      },
    } as unknown as Tesseract.RecognizeResult)

    const mockModelInstance = {
      generateContent: jest.fn().mockRejectedValue(new GenerativeModelError()),
    }

    await expect(
      extractPassportData(mockImagePath, mockModelInstance as IModelAI),
    ).rejects.toThrow(GenerativeModelError)

    expect(recognizeSpy).toHaveBeenCalled()
    recognizeSpy.mockRestore()
  })

  /**
   * Test to handle and assert errors from the generative model gracefully.
   *
   * @returns {Promise<void>}
   */
  it('should handle generative model errors gracefully', async () => {
    const mockResponse = {
      lastNames: 'Doe',
      firstNames: 'John',
    }

    const recognizeSpy = jest.spyOn(Tesseract, 'recognize').mockResolvedValue({
      data: {
        text: JSON.stringify('lastNames: Doe, firstNames: John'),
      },
    } as unknown as Tesseract.RecognizeResult)

    const mockModelInstance = {
      generateContent: jest
        .fn()
        .mockResolvedValue(new Error('Something went wrong')),
    }

    await expect(
      extractPassportData(mockImagePath, mockModelInstance as IModelAI),
    ).rejects.toThrow(Error)
  })
})
