import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from '~/services/api'
import history from '~/services/history'

import {
  listSuccess,
  listFailure,
  removeSuccess,
  removeFailure,
  updateSuccess,
  updateFailure,
  createSuccess,
  createFailure,
} from './actions'

export function* list({ payload }) {
  try {
    const { page } = payload

    const response = yield call(api.get, 'plans', { params: { page } })

    const plans = response.data.map(plan => ({
      ...plan,
      price_formated: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(plan.price),
    }))

    yield put(listSuccess(plans, page))
  } catch (err) {
    toast.error('Falha ao listar planos, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* remove({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.delete, `plans/${id}`)

    const { title } = response.data

    toast.success(`Plano ${title} removido com sucesso!`)
    yield put(removeSuccess(id))
  } catch (err) {
    toast.error('Falha ao deletar plano')
    yield put(removeFailure())
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.put, `plans/${id}`, payload)

    const { title } = response.data

    toast.success(`Plano ${title} editado com sucesso!`)
    yield put(updateSuccess(response.data))
    history.push('/plans')
  } catch (err) {
    toast.error('Falha ao editar plano')
    yield put(updateFailure())
  }
}

export function* create({ payload }) {
  try {
    const response = yield call(api.post, 'plans', payload)

    const { title } = response.data

    toast.success(`Plano ${title} cadastrado com sucesso!`)
    yield put(createSuccess(response.data))
    history.push('/plans')
  } catch (err) {
    toast.error('Falha ao cadastrar plano')
    yield put(createFailure())
  }
}

export default all([
  takeLatest('@plans/LIST_REQUEST', list),
  takeLatest('@plans/REMOVE_REQUEST', remove),
  takeLatest('@plans/UPDATE_REQUEST', update),
  takeLatest('@plans/CREATE_REQUEST', create),
])
