import { combineReducers } from 'redux'

import auth from './auth/reducer'
import user from './user/reducer'
import students from './students/reducer'
import plans from './plans/reducer'
import enrollments from './enrollments/reducer'

export default combineReducers({
  auth,
  user,
  students,
  plans,
  enrollments,
})
