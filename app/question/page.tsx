import Question from '@/components/Question'
import { getQuestions } from '@/utils/functions'
import React from 'react'

const QuestionPage = () => {

  const questions = getQuestions()

  return (
    <div
      className={'flex flex-col space-y-4 md:space-y-8 p-4 lg:p-8'}
    >
      {questions.map((question) => (
        <Question
          withId={false}
          checkEnabled={true}
          key={question.id}
          question={question}
        />
      ))}
    </div>
  )
}

export default QuestionPage