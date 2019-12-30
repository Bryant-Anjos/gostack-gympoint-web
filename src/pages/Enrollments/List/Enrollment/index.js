import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { MdCheckCircle } from 'react-icons/md'

import history from '~/services/history'

import { removeRequest } from '~/store/modules/enrollments/actions'

export default function Enrollment({ enrollment }) {
  const dispatch = useDispatch()

  function handleUpdate(id) {
    history.push({
      pathname: '/enrollments/update',
      state: { id },
    })
  }

  function handleRemove(id) {
    dispatch(removeRequest(id))
  }

  return (
    <tr>
      <td>{enrollment.student.name}</td>
      <td>{enrollment.plan.title}</td>
      <td>{enrollment.start_date_formated}</td>
      <td>{enrollment.end_date_formated}</td>
      <td>
        <MdCheckCircle
          size={20}
          color={enrollment.enable ? '#42cb59' : '#ddd'}
        />
      </td>
      <td>
        <button
          className="update"
          type="button"
          onClick={() => handleUpdate(enrollment.id)}
        >
          editar
        </button>
      </td>
      <td>
        <button
          className="delete"
          type="button"
          onClick={() => handleRemove(enrollment.id)}
        >
          apagar
        </button>
      </td>
    </tr>
  )
}

Enrollment.propTypes = {
  enrollment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date_formated: PropTypes.string.isRequired,
    end_date_formated: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    enable: PropTypes.bool.isRequired,
    student: PropTypes.object.isRequired,
    plan: PropTypes.object.isRequired,
  }).isRequired,
}
