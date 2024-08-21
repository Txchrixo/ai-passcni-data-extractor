/**
 * Module for extracting data from Cameroonian CNIs using OCR and a generative AI model.
 *
 * @module CniExtractor
 */
require('dotenv').config()
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
import {
  ApiKeyNotDefinedError,
  GenerativeModelError,
  UnsupportedFileTypeError,
} from '../errors'
import { IModelAI } from '../aiModels/IModelAI'

/**
 * Interface representing the structure of the CNI data.
 */
interface CniData {
  lastNames: string
  firstNames: string
  dateOfBirth: string
  placeOfBirth: string
  gender: string
  height: string
  profession: string
  motherName: string
  fatherName: string
  address: string
  issueDate: string
  expiryDate: string
  idPost: string
  cniUniqueId: string
  cniNumber: string
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
  return mimeType
}

/**
 * Converts a local file to a part that can be used by a generative AI model.
 *
 * @param {string} filePath - The path to the file.
 * @param {string} mimeType - The MIME type of the file.
 * @returns {Object} - The file part containing inline data with base64 encoding and MIME type.
 */
function fileToGenerativePart(filePath: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
      mimeType,
    },
  }
}

/**
 * Extracts CNI data from the front and back images using OCR and a generative AI model.
 *
 * @param {string} frontImagePath - The path to the front image of the CNI.
 * @param {string} backImagePath - The path to the back image of the CNI.
 * @param {IModelAI} model - The generative AI model used to process the extracted text.
 * @returns {Promise<CniData | null>} - The extracted CNI data as a TypeScript object or null if extraction fails.
 * @throws {Error} If an error occurs during the extraction process.
 */
export const extractCniData = async (
  frontImagePath: string,
  backImagePath: string,
  model: IModelAI,
): Promise<CniData | null> => {
  try {
    const filePartFront = fileToGenerativePart(
      frontImagePath,
      detectMimeType(frontImagePath),
    )
    const filePartBack = fileToGenerativePart(
      backImagePath,
      detectMimeType(backImagePath),
    )

    const prompt = `
      You are given a TypeScript interface and the front and back images of a National ID Card (CNI). Your task is to extract the data according to the provided interface and return it as a TypeScript object.

      interface CniData  {
          lastNames: string;
          firstNames: string;
          dateOfBirth: string;
          placeOfBirth: string;
          gender: string;
          height: string;
          profession: string;
          motherName: string;
          fatherName: string;
          address: string;
          issueDate: string;
          expiryDate: string;
          idPost: string;
          cniUniqueId: string;
          cniNumber: string;
      }

      Instructions:
      - Extract the 'cniNumber' ensuring it is a numeric string.
      - Ensure that the 'gender' field is correctly identified as 'M' or 'F'.
      - Ensure that the 'expiryDate' is 10 years after the 'issueDate'. 
      - Extract the 'placeOfBirth' from the images and cross-check it against the provided list of valid place names in Cameroon. If the place name is not in the list, correct it to the closest valid name. For example, correct "OBSCHANG" to "DSCHANG"
      - Combine the relevant information from both the front and back images, ensuring the data is correctly formatted according to the provided TypeScript interface.
    `

    const response = await model.generateContent(prompt, [
      filePartFront,
      filePartBack,
    ])

    return JSON.parse(response) as CniData
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error)
    return Promise.reject(error)
  }
}
