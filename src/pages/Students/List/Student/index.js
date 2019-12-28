import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import history from '~/services/history'

import { removeRequest } from '~/store/modules/students/actions'

export default function Student({ student }) {
  const dispatch = useDispatch()

  function handleUpdate(id) {
    history.push({
      pathname: '/students/update',
      state: { id },
    })
  }

  function handleRemove(id) {
    dispatch(removeRequest(id))
  }

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.email}</td>
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
          onClick={() => handleRemove(student.id)}
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
}
