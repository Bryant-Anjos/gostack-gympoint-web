import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function Pagination({
  page,
  amount,
  onClickPrevious,
  onClickNext,
}) {
  return page === 1 && amount < 10 ? null : (
    <Container>
      <button
        onClick={page === 1 ? () => {} : onClickPrevious}
        disabled={page === 1}
        type="button"
      >
        Anterior
      </button>
      <button
        onClick={amount < 10 ? () => {} : onClickNext}
        disabled={amount < 10}
        type="button"
      >
        Próxima
      </button>
    </Container>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
}

Pagination.defaultProps = {
  onClickPrevious: () => {},
  onClickNext: () => {},
}
