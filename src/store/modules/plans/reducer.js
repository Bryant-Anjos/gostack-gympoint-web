import produce from 'immer'

const INITIAL_STATE = {
  loading: false,
  page: 1,
  index: [],
}

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plans/LIST_REQUEST': {
        draft.loading = true
        break
      }
      case '@plans/LIST_SUCCESS': {
        draft.index = action.payload.plans
        draft.page = action.payload.page
        draft.loading = false
        break
      }
      case '@plans/LIST_FAILURE': {
        draft.loading = false
        break
      }
      case '@plans/REMOVE_SUCCESS': {
        const listPlans = state.index.filter(
          plan => plan.id !== action.payload.id
        )

        draft.index = listPlans
        break
      }
      case '@plans/UPDATE_SUCCESS': {
        const index = state.index.findIndex(
          plan => plan.id === action.payload.plan.id
        )

        draft.index[index] = action.payload.plan
        break
      }
      case '@plans/CREATE_SUCCESS': {
        draft.index.unshift(action.payload.plan)
        break
      }
      default:
    }
  })
}
