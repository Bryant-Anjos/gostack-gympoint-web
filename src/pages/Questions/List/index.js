import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import Question from './Question'

import { listRequest } from '~/store/modules/plans/actions'

function List({ questions, loading }) {
  const dispatch = useDispatch()
  const [open, isOpen] = useState(false)
  const [question, setQuestion] = useState({})

  useEffect(() => {
    if (questions.length === 0) dispatch(listRequest())
  }, [dispatch, questions.length])

  function openModal(id) {
    const data = questions.find(item => Number(item.id) === Number(id))

    setQuestion(data)
    isOpen(true)
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
                <td>Aluno</td>
                <td colSpan={1} />
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <Question
                  key={question.id}
                  question={question}
                  openModal={openModal}
                />
              ))}
            </tbody>
          </table>
        )}

        <ReactModal
          isOpen={open}
          onRequestClose={() => isOpen(!open)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
            content: {
              width: '500px',
              height: '70%',
              margin: 'auto',
              transition: 'opacity .5s',
            },
          }}
        >
          <h3>Pergunta do aluno</h3>
          <p>{Object.keys(question).length > 0 ? question.question : ''}</p>
          <h3>Sua resposta</h3>
          <textarea name="" id="" cols="30" rows="10" />
          <button type="submit">Responder aluno</button>
        </ReactModal>
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
