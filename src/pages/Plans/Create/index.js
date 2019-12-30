import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import { createRequest } from '~/store/modules/plans/actions'

const schema = Yup.object().shape({
  title: Yup.string().required('O título do plano é obrigatório'),
  duration: Yup.number()
    .typeError('A duração precisa ser um número')
    .required('A duração é obrigatória')
    .integer('A duração precisa ser um número inteiro')
    .positive('A duração precisa ser um número positivo'),
  price: Yup.number()
    .typeError('O preço precisa ser um número')
    .required('O preço é obrigatório'),
})

export default function Create() {
  const dispatch = useDispatch()
  const [plan, setPlan] = useState({})

  const total = useMemo(() => {
    const price = Number(plan.duration) * Number(plan.price)

    return price
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      : 0
  }, [plan.price, plan.duration])

  function handleSubmit({ title, duration, price }) {
    dispatch(createRequest(title, duration, price))
  }

  return (
    <>
      <header>
        <h2>Cadastro de plano</h2>

        <div>
          <Link to="/plans">
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
          schema={schema}
          onSubmit={handleSubmit}
          onChange={e => setPlan({ ...plan, [e.target.id]: e.target.value })}
        >
          <div className="input">
            <label htmlFor="title">
              <p className="required">Título do plano</p>
              <Input name="title" type="text" />
            </label>
          </div>

          <div className="input">
            <label htmlFor="duration">
              <p className="required">
                Duração <span>(em meses)</span>
              </p>
              <Input name="duration" type="text" />
            </label>
            <label htmlFor="price">
              <p className="required">Preço mensal</p>
              <Input name="price" type="text" />
            </label>
            <label htmlFor="total">
              <p>Preço total</p>
              <input id="total" type="text" value={total} disabled />
            </label>
          </div>
        </Form>
      </section>
    </>
  )
}
