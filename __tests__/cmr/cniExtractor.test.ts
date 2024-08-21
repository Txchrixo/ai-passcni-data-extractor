import { IModelAI } from '../../src/aiModels/IModelAI'
import { extractCniData } from './../../src/cmr/cniExtractor'
import {
  ApiKeyNotDefinedError,
  GenerativeModelError,
  UnsupportedFileTypeError,
} from './../../src/errors'
import fs from 'fs'

jest.mock('fs')
jest.mock('@google/generative-ai')

/**
 * Test suite for the `extractCniData` function.
 *
 * This suite tests various scenarios for extracting CNI data, including handling errors and successful data extraction.
 */
describe('extractCniData', () => {
  const mockApiKey = 'fake-api-key'
  const mockFrontImagePath = './../../images/cni11.jpg'
  const mockBackImagePath = './../../images/cni12.jpg'
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

    const mockModelInstance = {
      generateContent: jest.fn().mockRejectedValue(new ApiKeyNotDefinedError()),
    }

    ;(fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('fake data'))

    await expect(
      extractCniData(
        mockFrontImagePath,
        mockBackImagePath,
        mockModelInstance as IModelAI,
      ),
    ).rejects.toThrow(ApiKeyNotDefinedError)
  })

  /**
   * Test to ensure that an `UnsupportedFileTypeError` is thrown for unsupported file types.
   *
   * @returns {Promise<void>}
   */
  it('should throw an UnsupportedFileTypeError for unsupported file types', async () => {
    const unsupportedFilePath = './../../images/unsupportedFile.txt'
    await expect(
      extractCniData(unsupportedFilePath, unsupportedFilePath, {} as IModelAI),
    ).rejects.toThrow(UnsupportedFileTypeError)
  })

  /**
   * Test to verify that extracted CNI data is returned correctly when valid images are provided.
   *
   * @returns {Promise<void>}
   */
  it('should return extracted CNI data when provided with valid images', async () => {
    const mockResponse = {
      lastNames: 'Doe',
      firstNames: 'John',
      dateOfBirth: '1990-01-01',
      placeOfBirth: 'City',
      gender: 'M',
      height: '180cm',
      profession: 'Engineer',
      motherName: 'Jane Doe',
      fatherName: 'John Doe Sr.',
      address: '123 Street Name',
      issueDate: '2020-01-01',
      expiryDate: '2030-01-01',
      idPost: 'Post123',
      cniUniqueId: 'Unique123',
      cniNumber: '123456789',
    }

    const mockModelInstance = {
      generateContent: jest
        .fn()
        .mockResolvedValue(JSON.stringify(mockResponse)),
    }

    ;(fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('fake data'))

    const result = await extractCniData(
      mockFrontImagePath,
      mockBackImagePath,
      mockModelInstance as IModelAI,
    )
    expect(result).toEqual(mockResponse)
  })

  /**
   * Test to ensure that an `ApiKeyNotDefinedError` is thrown if the API key is not defined.
   *
   * @returns {Promise<void>}
   */
  it('should return GenerativeModelError if the generative model fails to generate content', async () => {
    const mockModelInstance = {
      generateContent: jest.fn().mockRejectedValue(new GenerativeModelError()),
    }

    ;(fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('fake data'))

    await expect(
      extractCniData(
        mockFrontImagePath,
        mockBackImagePath,
        mockModelInstance as IModelAI,
      ),
    ).rejects.toThrow(GenerativeModelError)
  })

  /**
   * Test to ensure that an `UnsupportedFileTypeError` is thrown for unsupported file types.
   *
   * @returns {Promise<void>}
   */
  it('should handle generative model errors gracefully', async () => {
    const mockModelInstance = {
      generateContent: jest
        .fn()
        .mockRejectedValue(new Error('Something went wrong')),
    }

    ;(fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('fake data'))

    await expect(
      extractCniData(
        mockFrontImagePath,
        mockBackImagePath,
        mockModelInstance as IModelAI,
      ),
    ).rejects.toThrow(Error)
  })
})
