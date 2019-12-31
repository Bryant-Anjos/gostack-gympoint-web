import React from 'react'
import PropTypes from 'prop-types'

import history from '~/services/history'

export default function Student({ student, openModal }) {
  function handleUpdate(id) {
    history.push({
      pathname: '/students/update',
      state: { id },
    })
  }

  return (
    <tr>
      <td className="td-left">{student.name}</td>
      <td className="td-left">{student.email}</td>
      <td>{student.age}</td>
      <td>
        <button
          className="update"
          type="button"
          onClick={() => handleUpdate(student.id)}
        >
          editar
        </button>
      </td>
      <td>
        <button
          className="delete"
          type="button"
          onClick={() => openModal(student.id, student.name)}
        >
          apagar
        </button>
      </td>
    </tr>
  )
}

Student.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}
