/**
 * Module for extracting data from Cameroonian passports using OCR and a generative AI model.
 *
 * @module PassportExtractor
 */
require('dotenv').config()
import { IModelAI } from '../aiModels/IModelAI'
import { UnsupportedFileTypeError } from '../errors'
import path from 'path'
const Tesseract = require('tesseract.js')

/**
 * Interface representing the structure of the passport data.
 */
interface PassportData {
  lastNames: string
  firstNames: string
  nationality: string
  dateOfBirth: string
  gender: string
  placeOfBirth: string
  issueDate: string
  expiryDate: string
  profession: string
  height: string
  can: string
  placeOfIssue: string
}

/**
 * Mapping of file extensions to MIME types.
 *
 * @constant {Object<string, string>}
 */
const MIME_TYPES: { [key: string]: string } = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
}

/**
 * Detects the MIME type of a file based on its extension.
 *
 * @param {string} filePath - The path to the file.
 * @returns {string} - The detected MIME type.
 * @throws {UnsupportedFileTypeError} If the file extension is unsupported.
 */
function detectMimeType(filePath: string): string {
  const fileExt = path.extname(filePath).toLowerCase()
  const mimeType = MIME_TYPES[fileExt]
  if (!mimeType) {
    throw new UnsupportedFileTypeError(fileExt)
  }
  return filePath
}

/**
 * Extracts passport data from an image using OCR and a generative AI model.
 *
 * @param {string} imagePath - The path to the passport image.
 * @param {IModelAI} model - The generative AI model used to process the extracted text.
 * @returns {Promise<PassportData | null>} - The extracted passport data as a TypeScript object or null if extraction fails.
 * @throws {Error} If an error occurs during the extraction process.
 */
export const extractPassportData = async (
  imagePath: string,
  model: IModelAI,
): Promise<PassportData | null> => {
  try {
    const result = await Tesseract.recognize(detectMimeType(imagePath), 'fra')
    const text = result.data.text

    const prompt = `
            You are given a TypeScript interface and a piece of passport information obtained from Tesseract OCR. Your task is to extract the data from the text according to the provided interface and return it as a TypeScript object.

            interface PassportData {
                lastNames: string;
                firstNames: string;
                nationality: string;
                dateOfBirth: string;
                gender: string;
                placeOfBirth: string;
                issueDate: string;
                expiryDate: string;
                profession: string;
                height: string;
                can: string;
                placeOfIssue: string;
            }

            Text:
            "${text}"

             Instructions:
            - When extracting the 'nationality' field, ensure that there is no space after the '/' character. The correct format should be 'CAMEROUNAISE/CAMEROONIAN', not 'CAMEROUNAISE/ CAMEROONIAN'.
            - When extracting the 'gender' field, ensure that it's either 'F' or 'M'. If it's not accurate, determine it based on the name provided.

            Please extract the information from the text and format it according to the TypeScript interface provided. The output should be a JSON object.
        `

    const response = await model.generateContent(prompt)

    return JSON.parse(response) as PassportData
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error)
    return null
  }
}
