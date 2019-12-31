import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt'
import * as Yup from 'yup'

import { createRequest } from '~/store/modules/students/actions'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  height: Yup.number()
    .typeError('A altura precisa ser um número válido')
    .min(0)
    .max(3),
  weight: Yup.number()
    .typeError('O peso precisa ser um número válido')
    .min(0)
    .max(999.99),
})

export default function Create() {
  const dispatch = useDispatch()
  const [birthday, setBirthday] = useState(new Date())

  function handleSubmit({ name, email, weight, height }) {
    dispatch(createRequest(name, email, birthday, weight, height))
  }

  return (
    <>
      <header>
        <h2>Cadastro de aluno</h2>

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
        <Form id="form" schema={schema} onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">
              <p className="required">Nome Completo</p>
              <Input name="name" type="text" placeholder="John Doe" />
            </label>
          </div>

          <div className="input">
            <label htmlFor="email">
              <p className="required">Endereço de e-mail</p>
              <Input name="email" type="text" placeholder="exemplo@email.com" />
            </label>
          </div>

          <div className="input">
            <label htmlFor="birthday">
              <p className="required">Data de nascimento</p>
              <DatePicker
                name="birthday"
                selected={birthday}
                onChange={date => setBirthday(date)}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                locale={pt}
              />
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
