import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '~/services/api'
import history from '~/services/history'

import {
  listSuccess,
  listFailure,
  updateSuccess,
  updateFailure,
} from './actions'

export function* list({ payload }) {
  try {
    const { page } = payload

    const response = yield call(api.get, 'help-orders', { params: { page } })

    const questions = response.data.map(question => ({
      ...question,
      created_at_formated: formatRelative(
        parseISO(question.created_at),
        new Date(),
        {
          locale: pt,
          addSuffix: true,
        }
      ),
    }))

    yield put(listSuccess(questions, page))
  } catch (err) {
    toast.error('Falha ao listar perguntas, tente novamente mais tarde')
    yield put(listFailure())
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.put, `help-orders/${id}/answer`, payload)

    toast.success('Pergunta respondida com sucesso!')
    yield put(updateSuccess(response.data))
    history.push('/questions')
  } catch (err) {
    toast.error('Falha ao responder pergunta')
    yield put(updateFailure())
  }
}

export default all([
  takeLatest('@questions/LIST_REQUEST', list),
  takeLatest('@questions/UPDATE_REQUEST', update),
])
