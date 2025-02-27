import { IQuestion } from '@/utils/types'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'


interface Props {
  question: IQuestion;
  withId: boolean;
  checkEnabled: boolean;
  getAnswer?: (answer: boolean) => void;
}
const Question = ({ question, withId, checkEnabled, getAnswer }: Props) => {
  const [answer, setAnswer] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isTrue, setIsTrue] = useState(false)

  return (
    <div
      className={`bg-slate-100 rounded-xl shadow p-4 border-4 border-t-8
      ${isAnswered ? isTrue ? "border-green-600" : "border-red-600" : "border-transparent"}
      `}
    >
      <div className={'text-slate-500 text-xl mb-4'}>
        {(withId ? question.id + ") " : "") + question.text}
      </div>

      {question.options.map((option) => (
        <label
          key={option.id}
          onClick={() => {
            setAnswer(option.id)
            setIsAnswered(false)
            if (getAnswer) {
              getAnswer(question.answer === answer)
            }
          }}
          htmlFor={`option_${question.id}_${option.id}`}
          className={`flex justify-start items-center space-x-4
             text-gray-500 bg-white 
             shadow-sm rounded-lg my-2 px-4 py-2 border-2 duration-200
             border-transparent hover:border-blue-600 cursor-pointer`}
        >
          {isAnswered &&
            (isTrue ? (
              option.id === question.answer ? (
                <CheckCircleIcon className={'w-6 h-6 stroke-green-600'} />
              ) : (
                <></>
              )
            ) : option.id === question.answer ? (
              <CheckCircleIcon className={'w-6 h-6 stroke-green-600'} />
            ) : (
              <XCircleIcon className={'w-6 h-6 stroke-red-600'} />
            )
            )}

          <input
            id={`option_${question.id}_${option.id}`}
            type={'radio'}
            name={`question_${question.id}`}
          />
          <span className={'w-full'}>{option.text}</span>
        </label>
      ))}

    </div>
  )
}

export default Question