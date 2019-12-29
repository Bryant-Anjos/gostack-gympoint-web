import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import api from '~/services/api'

import { updateRequest } from '~/store/modules/students/actions'

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um e-mail válido'),
  birthday: Yup.date().typeError('Data de nascimento inválida'),
  height: Yup.number()
    .typeError('A altura precisa ser um número válido')
    .min(0)
    .max(3),
  weight: Yup.number()
    .typeError('O peso precisa ser um número')
    .min(0)
    .max(999.99),
})

export default function Update({ location }) {
  const dispatch = useDispatch()
  const [student, setStudent] = useState({})

  useEffect(() => {
    async function getStudent() {
      try {
        const { id } = location.state

        const response = await api.get(`students/${id}`)

        setStudent(response.data)
      } catch (err) {
        toast.error('Aluno não encontrado')
      }
    }

    getStudent()
  }, [location.state])

  function handleSubmit(id, { name, email, birthday, weight, height }) {
    dispatch(updateRequest(id, name, email, birthday, weight, height))
  }

  return (
    <>
      <header>
        <h2>Edição de aluno</h2>

        <div>
          <Link to="/students">
            <button className="grey" type="button">
              <MdKeyboardArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          </Link>

          <>
            <button className="red" type="submit" form="form">
              <MdCheck size={20} />
              <span>Salvar</span>
            </button>
          </>
        </div>
      </header>

      <section>
        <Form
          id="form"
          initialData={student}
          schema={schema}
          onSubmit={data => handleSubmit(student.id, data)}
        >
          <div>
            <label htmlFor="name">
              <p>Nome Completo</p>
              <Input name="name" type="text" />
            </label>
          </div>

          <div>
            <label htmlForIdade="email">
              <p>Endereço de e-mail</p>
              <Input name="email" type="text" />
            </label>
          </div>

          <div>
            <label htmlFor="birthday">
              <p>Data de nascimento</p>
              <Input name="birthday" type="text" />
            </label>
            <label htmlFor="weight">
              <p>
                Peso <span>(em kg)</span>
              </p>
              <Input name="weight" type="text" />
            </label>
            <label htmlFor="height">
              <p>Altura</p>
              <Input name="height" type="text" />
            </label>
          </div>
        </Form>
      </section>
    </>
  )
}

Update.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }).isRequired,
}
