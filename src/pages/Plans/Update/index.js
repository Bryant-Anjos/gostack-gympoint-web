import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { Form, Input } from '@rocketseat/unform'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import api from '~/services/api'

import { updateRequest } from '~/store/modules/plans/actions'

const schema = Yup.object().shape({
  title: Yup.string(),
  duration: Yup.number()
    .typeError('A duração precisa ser um número')
    .integer('A duração precisa ser um número inteiro')
    .positive('A duração precisa ser um número positivo'),
  price: Yup.number().typeError('O preço precisa ser um número'),
})

export default function Update({ location }) {
  const dispatch = useDispatch()
  const [plan, setPlan] = useState({})

  useEffect(() => {
    async function getPlan() {
      try {
        const { id } = location.state

        const response = await api.get(`plans/${id}`)

        setPlan(response.data)
      } catch (err) {
        toast.error('Plano não encontrado')
      }
    }

    getPlan()
  }, [location.state])

  const total = useMemo(() => {
    const price = Number(plan.duration) * Number(plan.price)

    return price
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price)
      : 0
  }, [plan.price, plan.duration])

  function handleSubmit(id, { title, duration, price }) {
    dispatch(updateRequest(id, title, duration, price))
  }

  return (
    <>
      <header>
        <h2>Edição de plano</h2>

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
          initialData={plan}
          schema={schema}
          onSubmit={data => handleSubmit(plan.id, data)}
          onChange={e => setPlan({ ...plan, [e.target.id]: e.target.value })}
        >
          <div className="input">
            <label htmlFor="title">
              <p>Título do plano</p>
              <Input name="title" type="text" />
            </label>
          </div>

          <div className="input">
            <label htmlFor="duration">
              <p>
                Duração <span>(em meses)</span>
              </p>
              <Input name="duration" type="text" />
            </label>
            <label htmlFor="price">
              <p>Preço Mensal</p>
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

Update.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }).isRequired,
}
