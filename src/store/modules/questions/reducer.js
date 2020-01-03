import produce from 'immer'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function questions(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@questions/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@questions/LIST_SUCCESS': {
        draft.index = action.payload.questions
        draft.page = action.payload.page
        draft.loading = false
        break
      }
      case '@questions/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@questions/UPDATE_SUCCESS': {
        const listQuestions = state.index.filter(
          question => Number(question.id) !== Number(action.payload.question.id)
        )

        draft.index = listQuestions
        break
      }
      case '@questions/ADD_QUESTION': {
        const question = {
          ...action.payload.question,
          created_at_formated: formatRelative(
            parseISO(action.payload.question.created_at),
            new Date(),
            {
              locale: pt,
              addSuffix: true,
            }
          ),
        }

        draft.index.unshift(question)
        break
      }
      default:
    }
  })
}
