import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '~/pages/SignIn'
import Students from '~/pages/Students'
import Plans from '~/pages/Plans'
import Enrollments from '~/pages/Enrollments'
import Questions from '~/pages/Questions'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route isPrivate path="/students" component={Students} />
      <Route isPrivate path="/plans" component={Plans} />
      <Route isPrivate path="/enrollments" component={Enrollments} />
      <Route isPrivate path="/questions" component={Questions} />
    </Switch>
  )
}
