import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import logo from '~/img/logo@1x.png'

import { Container, LinkItem, Profile } from './styles'

export default function Header() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)

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
          <LinkItem selected to="/students">
            Alunos
          </LinkItem>
          <LinkItem to="/plans">Planos</LinkItem>
          <LinkItem to="/enrollments">Matrículas</LinkItem>
          <LinkItem to="/questions">Pedidos de Auxílio</LinkItem>
        </div>

        <Profile>
          <strong>{profile.name}</strong>
          <span onClick={handleSignOut}>Sair do sistema</span>
        </Profile>
      </aside>
    </Container>
  )
}
