import React, { useState, useEffect, useMemo } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import socketio from 'socket.io-client'

import Question from './Question'
import Pagination from '~/components/Pagination'

import {
  listRequest,
  updateRequest,
  addQuestion,
} from '~/store/modules/questions/actions'

import { Modal, Scroll } from './styles'

function List({ questions, loading, page, amount }) {
  const dispatch = useDispatch()
  const [open, isOpen] = useState(false)
  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState('')

  const user = useSelector(state => state.user.profile)

  const socket = useMemo(
    () =>
      socketio('http://192.168.0.107:3333', {
        query: {
          user_id: user.id,
        },
      }),
    [user.id]
  )

  useEffect(() => {
    socket.on('question', newQuestion => dispatch(addQuestion(newQuestion)))
  }, [dispatch, socket])

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
          <>
            <table>
              <thead>
                <tr>
                  <td className="td-left">Aluno</td>
                  <td colSpan={1} />
                </tr>
              </thead>
              <tbody>
                {questions.map(item => (
                  <Question
                    key={item.id}
                    question={item}
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
  amount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  questions: state.questions.index,
  amount: state.questions.index.length,
  page: state.questions.page,
  loading: state.questions.loading,
})

export default connect(mapStateToProps)(List)
