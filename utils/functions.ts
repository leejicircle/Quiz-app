import { IQuestion, IState } from "./types"

export const getQuestions = (): IQuestion[] => {
  return require('../data/questions.json')
}
export const getStates = (): IState[] => {
  return require('../data/states.json')
}

export const getQuizQuestions = (state: number): IQuestion[] => {
  const questions = getQuestions()
  const states = getStates()[state -1].questions

  return [...questions.slice(0, 30), ...states.slice(0, 3)]
}