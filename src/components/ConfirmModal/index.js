import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from './styles'

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  ...props
}) {
  return (
    <Modal {...props}>
      <main>
        <h1>{message.title}</h1>
        <span>{message.text}</span>
      </main>
      <div>
        <button type="button" onClick={onConfirm} className="confirm">
          Confirmar
        </button>
        <button type="button" onClick={onCancel} className="cancel">
          Cancelar
        </button>
      </div>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

ConfirmModal.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
}
