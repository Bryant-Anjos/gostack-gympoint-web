import styled from 'styled-components'
import ReactModal from 'react-modal'
import { darken } from 'polished'

export const Modal = styled(ReactModal).attrs(() => ({
  style: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
    },
    content: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '30px',
      borderRadius: '4px',
      minWidth: '400px',
      minHeight: '150px',
      margin: 'auto',
    },
  },
}))`
  h1 {
    text-transform: uppercase;
    font-size: 14px;
    color: #444;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    height: 40px;
    padding: 0 20px;
    border-radius: 4px;
    margin-top: 20px;
    transition: background 0.5s;

    & + button {
      margin-left: 15px;
    }

    &.confirm {
      background-color: #4d85ee;

      &:hover {
        background-color: ${darken(0.05, '#4d85ee')};
      }
    }

    &.cancel {
      background-color: #ee4d64;

      &:hover {
        background-color: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`
