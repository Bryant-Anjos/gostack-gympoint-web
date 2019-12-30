import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd } from 'react-icons/md'
import PropTypes from 'prop-types'

import Enrollment from './Enrollment'

import { listRequest } from '~/store/modules/enrollments/actions'

function List({ enrollments, loading }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (enrollments.length === 0) dispatch(listRequest())
  }, [dispatch, enrollments.length])

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
          <table>
            <thead>
              <tr>
                <td>Aluno</td>
                <td>Plano</td>
                <td>Início</td>
                <td>Término</td>
                <td>Ativa</td>
                <td colSpan={2} />
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <Enrollment key={enrollment.id} enrollment={enrollment} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}

List.propTypes = {
  enrollments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  enrollments: state.enrollments.index,
  page: state.enrollments.page,
  loading: state.enrollments.loading,
})

export default connect(mapStateToProps)(List)
