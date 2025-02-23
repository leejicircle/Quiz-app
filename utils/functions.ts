import { IQuestion } from "./types"

export const getQuestions = (): IQuestion[] => {
  return require('../data/questions.json')
}