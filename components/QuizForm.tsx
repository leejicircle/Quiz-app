'use client'

import { IQuestion } from '@/utils/types'
import React, { useState } from 'react'
import SelectState from './SelectState'
import { getQuizQuestions, getStates } from '@/utils/functions'
import Question from './Question'

const QuizForm = () => {
  const [state, setState] = useState(1)
  const [QuizStarted, setQuizStarted] = useState(false)
  const [QuizEnded, setQuizEnded] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [answers, setAnswers] = useState<boolean[]>([])
  const [currentAnswer, setcurrentAnswer] = useState(false)
  const [answered, setAnswered] = useState(false)

  const startQuiz = () => {
    setQuestions(getQuizQuestions(state))
    setQuizStarted(true)

  }
  const QuizEnd = () => {
    setQuizEnded(true)

  }
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setAnswers([...answers, currentAnswer])
    setAnswered(false)
  }
  const passed = () => answers.filter(a => a).length >= 2
  
  const newStart = () => {
    setQuizStarted(false)
    setAnswered(false)
    setcurrentAnswer(false)
    setState(1)
    setCurrentQuestion(0)
    setQuestions([])
    setQuizEnded(false)
  }

  return (
    <div
      className={'flex flex-col space-y-4 md:space-y-8 p-4 lg:p-8'}
    >
      <h1
        className='text-4xl font-semibold pb-4 mb-4 border-b border-gray-300'
      >시험</h1>
      {!QuizStarted && (
        <div className='bg-slate-50 p-6 rounded-xl shadow'>
          <h2 className='text-lg'>상태 선택</h2>
          <SelectState
            states={getStates()}
            state={(statevalue) => setState(statevalue)}
          />
          <button
            className={'my-4 px-4 py-2 text-white rounded-lg shadow bg-blue-600 hover:bg-blue-500'}
            onClick={startQuiz}
          >
            연습 테스트 시작
          </button>
        </div>
      )}

      {QuizStarted && !QuizEnded && (
        <div>
          <Question
            question={questions[currentQuestion]}
            getAnswer={(answer) => {
              setcurrentAnswer(answer)
              setAnswered(true)
            }}
            withId={false}
            checkEnabled={false}
          />

          <div>
            <div>
              문제 {currentQuestion + 1} / {questions.length}
            </div>

            {answered && (
              <button
                className='my-4 px-8 py-2 text-white float-right rounded-lg shadow bg-blue-600 hover:bg-blue-500'
                onClick={() => {
                  currentQuestion >= questions.length - 1
                    ? QuizEnd()
                    : nextQuestion()
                }}>
                {currentQuestion >= questions.length - 1 ? "완료" : "다음"}
              </button>
            )}
          </div>
        </div>
      )}
      {QuizEnded && (
        <div className={'bg-slate-50 p-8 rounded-xl shadow'}>
          <div className={'text-4xl font-semibold mb-8'}>결과</div>
          <div>
            <span className={'font-bold'}>{questions.length}</span> 점 중 {" "}
            <span
              className={`font-bold ${passed() ? "text-green-600" : "text-red-600"}`}
            >
              {answers.filter((a) => a).length}
            </span>{" "}
            점을 획득했습니다.
          </div>
          <div className={'my-4'}>
            {passed() ? "축하합니다." : "탈락"}
          </div>
          <button
            className={`my-4 px-8 py-2 text-white float-right rounded-lg shadow
                    bg-blue-600 hover:bg-blue-500`}
            onClick={newStart}
          >
            새로운 연습 테스트 시작
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizForm