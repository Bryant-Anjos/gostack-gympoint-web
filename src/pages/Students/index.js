import React from 'react'
import { Route } from 'react-router-dom'

import List from './List'
import Create from './Create'
import Update from './Update'

import { Container } from '~/components/Container'

export default function Students() {
  return (
    <Container>
      <Route exact isPrivate path="/students" component={List} />
      <Route isPrivate path="/students/new" component={Create} />
      <Route isPrivate path="/students/update" component={Update} />
    </Container>
  )
}
