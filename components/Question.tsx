'use client'
import { IQuestion } from '@/utils/types'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'motion/react';
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

      {
        checkEnabled && answer > 0 && !isAnswered &&
        <AnimatePresence>
          <motion.div
            key='answer'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 40 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden"}}
          >

            <div
              onClick={() => {
                setIsAnswered(true)
                setIsTrue(question.answer === answer)
              }}
              className={`bg-blue-600 p-2 text-slate-50 rounded
            text-center shadow hover:bg-blue-500 duration-200 cursor-pointer`}
            >
              답변을 확인하세요.
            </div>
          </motion.div>
        </AnimatePresence>
      }


    </div>
  )
}

export default Question