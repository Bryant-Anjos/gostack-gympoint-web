import produce from 'immer'
import { parseISO, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function enrollments(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollments/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@enrollments/LIST_SUCCESS': {
        draft.index = action.payload.enrollments
        draft.page = action.payload.page
        draft.loading = false
        break
      }
      case '@enrollments/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@enrollments/REMOVE_SUCCESS': {
        const listEnrollments = state.index.filter(
          enrollment => enrollment.id !== action.payload.id
        )

        draft.index = listEnrollments
        break
      }
      case '@enrollments/UPDATE_SUCCESS': {
        const { enrollment } = action.payload

        const index = state.index.findIndex(
          item => Number(item.id) === Number(enrollment.id)
        )

        const checkColor = enrollment.enable ? '#42cb59' : '#ddd'

        const start_date_formated = format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        )

        const end_date_formated = format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        )

        draft.index[index] = {
          ...draft.index[index],
          ...action.payload.enrollment,
          checkColor,
          start_date_formated,
          end_date_formated,
        }
        break
      }
      case '@enrollments/CREATE_SUCCESS': {
        const { enrollment } = action.payload

        const checkColor = enrollment.enable ? '#42cb59' : '#ddd'

        const start_date_formated = format(
          parseISO(enrollment.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        )

        const end_date_formated = format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        )

        draft.index.unshift({
          ...enrollment,
          checkColor,
          start_date_formated,
          end_date_formated,
        })
        break
      }
      default:
    }
  })
}
