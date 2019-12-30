import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { removeRequest } from '~/store/modules/students/actions'

export default function Question({ question, openModal }) {
  const dispatch = useDispatch()

  return (
    <tr>
      <td>
        {question.student.name}
        <small>{question.created_at_formated}</small>
      </td>
      <td>
        <button
          className="update"
          type="button"
          onClick={() => openModal(question.id)}
        >
          Responder
        </button>
      </td>
    </tr>
  )
}

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price_formated: PropTypes.string.isRequired,
  }).isRequired,
}
