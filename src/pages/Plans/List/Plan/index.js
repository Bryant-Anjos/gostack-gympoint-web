import React from 'react'
import PropTypes from 'prop-types'

import history from '~/services/history'

export default function Plan({ plan, openModal }) {
  function handleUpdate(id) {
    history.push({
      pathname: '/plans/update',
      state: { id },
    })
  }

  return (
    <tr>
      <td>{plan.title}</td>
      <td>{plan.duration_formated}</td>
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
          onClick={() => openModal(plan.id, plan.title)}
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
    duration_formated: PropTypes.string.isRequired,
    price_formated: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}
