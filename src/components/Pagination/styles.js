import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  margin: 20px auto 0;
  max-width: 300px;
  display: flex;
  justify-content: space-between;

  button {
    height: 40px;
    padding: 0 20px;
    border-radius: 4px;
    border: none;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #ee4d64;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${darken(0.03, '#ee4d64')};
    }

    &:disabled {
      background-color: #c0c0c0;
      cursor: default;
    }
  }
`
