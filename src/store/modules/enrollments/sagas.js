import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

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

    const response = yield call(api.get, 'enrollments', { params: { page } })

    const enrollments = response.data.map(enrollment => {
      return {
        ...enrollment,
        checkColor: enrollment.enable ? '#42cb59' : '#ddd',
        start_date_formated: format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date_formated: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }
    })

    yield put(listSuccess(enrollments, page))
  } catch (err) {
    toast.error('Falha ao listar as matrículas, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* remove({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.delete, `enrollments/${id}`)

    const { title } = response.data

    toast.success(`Matrícula ${title} removida com sucesso!`)
    yield put(removeSuccess(id))
  } catch (err) {
    toast.error('Falha ao deletar matrícula')
    yield put(removeFailure())
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.put, `enrollments/${id}`, payload)

    toast.success(`Matrícula editada com sucesso!`)
    yield put(updateSuccess(response.data))
    history.push('/enrollments')
  } catch (err) {
    toast.error('Falha ao editar matrícula')
    yield put(updateFailure())
  }
}

export function* create({ payload }) {
  try {
    const response = yield call(api.post, 'enrollments', payload)

    toast.success(`Matrícula cadastrada com sucesso!`)
    yield put(createSuccess(response.data))
    history.push('/enrollments')
  } catch (err) {
    toast.error('Falha ao cadastrar matrícula')
    yield put(createFailure())
  }
}

export default all([
  takeLatest('@enrollments/LIST_REQUEST', list),
  takeLatest('@enrollments/REMOVE_REQUEST', remove),
  takeLatest('@enrollments/UPDATE_REQUEST', update),
  takeLatest('@enrollments/CREATE_REQUEST', create),
])
