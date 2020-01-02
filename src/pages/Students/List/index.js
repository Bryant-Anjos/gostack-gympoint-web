import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { MdAdd, MdSearch } from 'react-icons/md'
import PropTypes from 'prop-types'

import Student from './Student'
import Modal from '~/components/ConfirmModal'
import Pagination from '~/components/Pagination'

import { listRequest, removeRequest } from '~/store/modules/students/actions'

function List({ students, loading, page, amount }) {
  const dispatch = useDispatch()
  const [student, setStudent] = useState({})
  const [open, isOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (students.length === 0) dispatch(listRequest())
  }, [dispatch, students.length])

  function handleDelete() {
    dispatch(removeRequest(student.id))
    isOpen(false)
  }

  function openModal(id, name) {
    setStudent({ id, name })
    isOpen(true)
  }

  const message = useMemo(() => {
    return {
      title: 'Deletar usuário',
      text: `O usuário ${
        student.name ? student.name : ''
      } será deletado, deseja prosseguir?`,
    }
  }, [student.name])

  function handleSearch(e) {
    if (e.keyCode === 13) {
      dispatch(listRequest({ name: search.trim() }))
      setSearch('')
    }
  }

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
            <input
              type="text"
              id="search"
              placeholder="Buscar aluno"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </label>
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
                  <td className="td-left">Nome</td>
                  <td className="td-left">E-mail</td>
                  <td>Idade</td>
                  <td colSpan={2} />
                </tr>
              </thead>
              <tbody>
                {students.map(item => (
                  <Student key={item.id} student={item} openModal={openModal} />
                ))}
              </tbody>
            </table>
            <Pagination
              page={page}
              amount={amount}
              onClickPrevious={() => dispatch(listRequest({ page: page - 1 }))}
              onClickNext={() => dispatch(listRequest({ page: page + 1 }))}
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
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  amount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  students: state.students.index,
  amount: state.students.index.length,
  page: state.students.page,
  loading: state.students.loading,
})

export default connect(mapStateToProps)(List)
