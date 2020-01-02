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
        draft.page = action.payload.page
        draft.loading = false
        break
      }
      case '@students/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@students/REMOVE_SUCCESS': {
        const listStudents = state.index.filter(
          student => Number(student.id) !== Number(action.payload.id)
        )

        draft.index = listStudents
        break
      }
      case '@students/UPDATE_SUCCESS': {
        const index = state.index.findIndex(
          student => Number(student.id) === Number(action.payload.student.id)
        )

        draft.index[index] = action.payload.student
        break
      }
      case '@students/CREATE_SUCCESS': {
        draft.index.unshift(action.payload.student)
        break
      }
      default:
    }
  })
}
