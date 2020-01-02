import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd } from 'react-icons/md'
import PropTypes from 'prop-types'

import Enrollment from './Enrollment'
import Modal from '~/components/ConfirmModal'
import Pagination from '~/components/Pagination'

import { listRequest, removeRequest } from '~/store/modules/enrollments/actions'

function List({ enrollments, loading, page, amount }) {
  const dispatch = useDispatch()
  const [enrollment, setEnrollment] = useState({})
  const [open, isOpen] = useState(false)

  useEffect(() => {
    if (enrollments.length === 0) dispatch(listRequest())
  }, [dispatch, enrollments.length])

  function handleDelete() {
    dispatch(removeRequest(enrollment.id))
    isOpen(false)
  }

  function openModal(id, studentName) {
    setEnrollment({ id, studentName })
    isOpen(true)
  }

  const message = useMemo(() => {
    return {
      title: 'Deletar matrícula',
      text: `A matrícula do usuário ${
        enrollment.studentName ? enrollment.studentName : ''
      } será deletada, deseja prosseguir?`,
    }
  }, [enrollment.studentName])

  return (
    <>
      <header>
        <h2>Gerenciando matrículas</h2>

        <div>
          <Link to="/enrollments/new">
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
                  <td className="td-left">Aluno</td>
                  <td>Plano</td>
                  <td>Início</td>
                  <td>Término</td>
                  <td>Ativa</td>
                  <td colSpan={2} />
                </tr>
              </thead>
              <tbody>
                {enrollments.map(item => (
                  <Enrollment
                    key={item.id}
                    enrollment={item}
                    openModal={openModal}
                  />
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
  enrollments: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  enrollments: state.enrollments.index,
  amount: state.enrollments.index.length,
  page: state.enrollments.page,
  loading: state.enrollments.loading,
})

export default connect(mapStateToProps)(List)
