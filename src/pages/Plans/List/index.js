import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd } from 'react-icons/md'
import PropTypes from 'prop-types'

import Plan from './Plan'
import Modal from '~/components/ConfirmModal'
import Pagination from '~/components/Pagination'

import { listRequest, removeRequest } from '~/store/modules/plans/actions'

function List({ plans, loading, page, amount }) {
  const dispatch = useDispatch()
  const [plan, setPlan] = useState({})
  const [open, isOpen] = useState(false)

  useEffect(() => {
    if (plans.length === 0) dispatch(listRequest())
  }, [dispatch, plans.length])

  function handleDelete() {
    dispatch(removeRequest(plan.id))
    isOpen(false)
  }

  function openModal(id, title) {
    setPlan({ id, title })
    isOpen(true)
  }

  const message = useMemo(() => {
    return {
      title: 'Deletar plano',
      text: `O plano ${
        plan.title ? plan.title : ''
      } será deletado, deseja prosseguir?`,
    }
  }, [plan.title])

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
          <>
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
                {plans.map(item => (
                  <Plan key={item.id} plan={item} openModal={openModal} />
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              amount={amount}
              onClickPrevious={() => dispatch(listRequest(page - 1))}
              onClickNext={() => dispatch(listRequest(page + 1))}
            />
          </>
        )}
      </section>
      <Modal
        isOpen={open}
        onRequestClose={() => isOpen(false)}
        onConfirm={handleDelete}
        onCancel={() => isOpen(false)}
        message={message}
      />
    </>
  )
}

List.propTypes = {
  plans: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  plans: state.plans.index.map(item => ({
    ...item,
    duration_formated: `${item.duration} ${
      item.duration > 1 ? 'meses' : 'mês'
    }`,
  })),
  amount: state.plans.index.length,
  page: state.plans.page,
  loading: state.plans.loading,
})

export default connect(mapStateToProps)(List)
