import React from 'react'
import { Route } from 'react-router-dom'

import List from './List'
import Create from './Create'
import Update from './Update'

import { Container } from '~/components/Container'

export default function Plans() {
  return (
    <Container>
      <Route exact isPrivate path="/plans" component={List} />
      <Route isPrivate path="/plans/new" component={Create} />
      <Route isPrivate path="/plans/update" component={Update} />
    </Container>
  )
}
