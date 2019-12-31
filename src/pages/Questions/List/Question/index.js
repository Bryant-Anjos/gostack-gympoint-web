import React from 'react'
import PropTypes from 'prop-types'

export default function Question({ question, openModal }) {
  return (
    <tr>
      <td className="td-left">
        {question.student.name}
        <small>{question.created_at_formated}</small>
      </td>
      <td className="td-left">
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
    student: PropTypes.object.isRequired,
    created_at_formated: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}
