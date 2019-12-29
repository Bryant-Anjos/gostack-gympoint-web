import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd } from 'react-icons/md'
import PropTypes from 'prop-types'

import Plan from './Plan'

import { listRequest } from '~/store/modules/plans/actions'

function List({ plans, loading }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (plans.length === 0) dispatch(listRequest())
  }, [dispatch, plans.length])

  return (
    <>
      <header>
        <h2>Gerenciando planos</h2>

        <div>
          <Link to="/plans/new">
            <button className="red" type="button">
              <MdAdd size={20} />
              <span>Cadastrar</span>
            </button>
          </Link>
        </div>
      </header>

      <section>
        {loading ? (
          <span>Carregando...</span>
        ) : (
          <table>
            <thead>
              <tr>
                <td>Título</td>
                <td>Duração</td>
                <td>Valor mensal</td>
                <td colSpan={2} />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <Plan key={plan.id} plan={plan} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}

List.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  plans: state.plans.index,
  page: state.plans.page,
  loading: state.plans.loading,
})

export default connect(mapStateToProps)(List)
