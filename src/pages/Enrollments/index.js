import React from 'react'
import { Route } from 'react-router-dom'

import List from './List'
import Create from './Create'
import Update from './Update'

import { Container } from '~/components/Container'

export default function Enrollments() {
  return (
    <Container>
      <Route exact isPrivate path="/enrollments" component={List} />
      <Route isPrivate path="/enrollments/new" component={Create} />
      <Route isPrivate path="/enrollments/update" component={Update} />
    </Container>
  )
}
