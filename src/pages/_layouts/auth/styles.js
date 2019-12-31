import styled from 'styled-components'
import { darken } from 'polished'

export const Wrapper = styled.div`
  min-height: 100%;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 350px;
  padding: 50px 30px;
  border-radius: 4px;

  div {
    text-align: center;
  }

  h1 {
    color: #ee4d64;
  }

  h1,
  label {
    text-transform: uppercase;
    font-weight: bold;
  }

  form {
    margin: 25px auto 0;
    display: flex;
    flex-direction: column;

    label {
      color: #333;
    }

    input {
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
    }

    span {
      color: #ee4d64;
      margin: -15px 0 15px;
    }

    button {
      border: none;
      background-color: #ee4d64;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.03, '#ee4d64')};
      }
    }

    input,
    button {
      height: 45px;
      border-radius: 4px;
    }
  }
`
