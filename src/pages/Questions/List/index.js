import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import Question from './Question'

import { listRequest, updateRequest } from '~/store/modules/questions/actions'

import { Modal, Scroll } from './styles'

function List({ questions, loading }) {
  const dispatch = useDispatch()
  const [open, isOpen] = useState(false)
  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    if (questions.length === 0) dispatch(listRequest())
  }, [dispatch, questions.length])

  function openModal(id) {
    const data = questions.find(item => Number(item.id) === Number(id))

    setQuestion(data)
    isOpen(true)
  }

  function handleSubmit(id) {
    if (answer) {
      dispatch(updateRequest(id, answer))
      isOpen(false)
      setQuestion({})
      setAnswer('')
    } else {
      toast.error('A resposta é obrigatória')
    }
  }

  return (
    <>
      <header>
        <h2>Pedidos de auxílio</h2>
      </header>

      <section>
        {loading ? (
          <span>Carregando...</span>
        ) : (
          <table>
            <thead>
              <tr>
                <td className="td-left">Aluno</td>
                <td colSpan={1} />
              </tr>
            </thead>
            <tbody>
              {questions.map(item => (
                <Question key={item.id} question={item} openModal={openModal} />
              ))}
            </tbody>
          </table>
        )}

        <Modal isOpen={open} onRequestClose={() => isOpen(false)}>
          <div>
            <h3>
              {Object.keys(question).length === 0
                ? 'Pergunta do aluno'
                : `${question.student.name} perguntou`}
            </h3>
            <Scroll>
              <p>{Object.keys(question).length > 0 ? question.question : ''}</p>
            </Scroll>
          </div>
          <div>
            <h3>Sua resposta</h3>
            <textarea
              id={answer}
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              disabled={!!question.answer}
            />
            <button type="button" onClick={() => handleSubmit(question.id)}>
              Responder aluno
            </button>
          </div>
        </Modal>
      </section>
    </>
  )
}

List.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  questions: state.questions.index,
  page: state.questions.page,
  loading: state.questions.loading,
})

export default connect(mapStateToProps)(List)
