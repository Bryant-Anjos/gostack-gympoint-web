import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import history from '~/services/history'

import { removeRequest } from '~/store/modules/students/actions'

export default function Plan({ plan }) {
  const dispatch = useDispatch()

  function handleUpdate(id) {
    history.push({
      pathname: '/plans/update',
      state: { id },
    })
  }

  function handleRemove(id) {
    dispatch(removeRequest(id))
  }

  return (
    <tr>
      <td>{plan.title}</td>
      <td>{`${plan.duration} ${plan.duration > 1 ? 'meses' : 'mês'}`}</td>
      <td>{plan.price_formated}</td>
      <td>
        <button
          className="update"
          type="button"
          onClick={() => handleUpdate(plan.id)}
        >
          editar
        </button>
      </td>
      <td>
        <button
          className="delete"
          type="button"
          onClick={() => handleRemove(plan.id)}
        >
          apagar
        </button>
      </td>
    </tr>
  )
}

Plan.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price_formated: PropTypes.string.isRequired,
  }).isRequired,
}
