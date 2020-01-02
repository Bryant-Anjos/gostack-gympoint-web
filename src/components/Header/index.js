import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'
import history from '~/services/history'

import logo from '~/img/logo.svg'

import { Container, LinkItem, Profile } from './styles'

export default function Header() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)
  const path = history.location.pathname.split('/')[1]

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container active>
      <nav>
        <Link to="/students">
          <img src={logo} alt="Gympoint" />
          <span>Gympoint</span>
        </Link>
      </nav>

      <aside>
        <div>
          <LinkItem selected={path === 'students'} to="/students">
            Alunos
          </LinkItem>
          <LinkItem selected={path === 'plans'} to="/plans">
            Planos
          </LinkItem>
          <LinkItem selected={path === 'enrollments'} to="/enrollments">
            Matrículas
          </LinkItem>
          <LinkItem selected={path === 'questions'} to="/questions">
            Pedidos de Auxílio
          </LinkItem>
        </div>

        <Profile>
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </Profile>
      </aside>
    </Container>
  )
}
