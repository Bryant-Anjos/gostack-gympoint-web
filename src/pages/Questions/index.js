import React from 'react'
import { Route } from 'react-router-dom'

import List from './List'

import { Container } from '~/components/Container'

export default function Questions() {
  return (
    <Container>
      <Route exact isPrivate path="/questions" component={List} />
    </Container>
  )
}
