import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import { signInRequest } from '~/store/modules/auth/actions'

import logo from '~/img/logo.svg'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

export default function Signin() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <div>
        <img src={logo} alt="Gympoint" />
        <h1>Gympoint</h1>
      </div>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <label htmlFor="password">Sua senha</label>
        <Input name="password" type="password" placeholder="**********" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  )
}
