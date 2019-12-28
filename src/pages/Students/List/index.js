import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd, MdSearch } from 'react-icons/md'
import PropTypes from 'prop-types'

import Student from './Student'

import { listRequest } from '~/store/modules/students/actions'

function List({ students, loading }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (students.length === 0) dispatch(listRequest())
  }, [dispatch, students.length])

  return (
    <>
      <header>
        <h2>Gerenciando alunos</h2>

        <div>
          <Link to="/students/new">
            <button className="red" type="button">
              <MdAdd size={20} />
              <span>Cadastrar</span>
            </button>
          </Link>

          <label htmlFor="search">
            <MdSearch size={20} />
            <input type="text" id="search" placeholder="Buscar aluno" />
          </label>
        </div>
      </header>

      <section>
        {loading ? (
          <span>Carregando...</span>
        ) : (
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>E-mail</td>
                <td>Idade</td>
                <td colSpan={2} />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <Student key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}

List.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  students: state.students.index,
  page: state.students.page,
  loading: state.students.loading,
})

export default connect(mapStateToProps)(List)
