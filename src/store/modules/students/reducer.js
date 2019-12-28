import produce from 'immer'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function students(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@students/LIST_SUCCESS': {
        draft.index = action.payload.students
        draft.loading = false
        break
      }
      case '@students/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@students/REMOVE_SUCCESS': {
        const listStudents = state.index.filter(
          student => student.id !== action.payload.id
        )

        draft.index = listStudents
        break
      }
      case '@students/UPDATE_SUCCESS': {
        const index = state.index.findIndex(
          student => student.id === action.payload.student.id
        )

        draft.index[index] = action.payload.student
        break
      }
      case '@students/CREATE_SUCCESS': {
        draft.index.push(action.payload.student)
        break
      }
      default:
    }
  })
}
