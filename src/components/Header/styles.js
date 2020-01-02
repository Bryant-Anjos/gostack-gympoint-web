import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;

  a {
    text-transform: uppercase;
    font-weight: bold;
  }

  nav {
    padding: 20px 30px;

    img {
      height: 30px;
    }

    a {
      display: flex;
      align-items: center;
    }

    span {
      color: #ee4d64;
      font-size: 18px;
      margin-left: 15px;
    }
  }

  aside {
    padding-left: 25px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      left: 0;
      border-left: 1px solid #ccc;
    }
  }
`

export const LinkItem = styled(Link)`
  margin: 0 10px;
  color: ${props => (props.selected ? '#333' : '#999')};
  transition: color 0.3s;

  &:hover {
    ${props => (props.selected ? null : 'color: #333')}
  }
`

export const Profile = styled.div`
  margin-right: 30px;

  strong {
    font-size: 1.1em;
    color: #444;
  }

  button {
    border: none;
    background: none;
    display: block;
    margin-top: 5px;
    cursor: pointer;
    color: #ee4d64;
    font-size: 1em;
    text-align: right;

    &:hover {
      text-decoration: underline;
    }
  }
`
