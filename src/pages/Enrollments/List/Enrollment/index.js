import React from 'react'
import PropTypes from 'prop-types'
import { MdCheckCircle } from 'react-icons/md'

import history from '~/services/history'

export default function Enrollment({ enrollment, openModal }) {
  function handleUpdate(id) {
    history.push({
      pathname: '/enrollments/update',
      state: { id },
    })
  }

  return (
    <tr>
      <td className="td-left">{enrollment.student.name}</td>
      <td>{enrollment.plan.title}</td>
      <td>{enrollment.start_date_formated}</td>
      <td>{enrollment.end_date_formated}</td>
      <td>
        <MdCheckCircle size={20} color={enrollment.checkColor} />
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
          onClick={() => openModal(enrollment.id, enrollment.student.name)}
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
    checkColor: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}
