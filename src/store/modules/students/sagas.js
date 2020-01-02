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
    const { name, page } = payload
    const response = yield call(api.get, 'students', {
      params: { name, page },
    })

    yield put(listSuccess(response.data, page))
  } catch (err) {
    toast.error('Falha ao listar alunos, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* remove({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.delete, `students/${id}`)

    const { name } = response.data

    toast.success(`Usuário ${name} removido com sucesso!`)
    yield put(removeSuccess(id))
  } catch (err) {
    toast.error('Falha ao deletar aluno')
    yield put(removeFailure())
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.put, `students/${id}`, payload)

    const { name } = response.data

    toast.success(`Usuário ${name} editado com sucesso!`)
    yield put(updateSuccess(response.data))
    history.push('/students')
  } catch (err) {
    toast.error('Falha ao editar aluno')
    yield put(updateFailure())
  }
}

export function* create({ payload }) {
  try {
    const response = yield call(api.post, 'students', payload)

    const { name } = response.data

    toast.success(`Usuário ${name} cadastrado com sucesso!`)
    yield put(createSuccess(response.data))
    history.push('/students')
  } catch (err) {
    toast.error('Falha ao cadastrar aluno')
    yield put(createFailure())
  }
}

export default all([
  takeLatest('@students/LIST_REQUEST', list),
  takeLatest('@students/REMOVE_REQUEST', remove),
  takeLatest('@students/UPDATE_REQUEST', update),
  takeLatest('@students/CREATE_REQUEST', create),
])
